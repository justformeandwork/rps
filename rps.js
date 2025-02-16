let score=JSON.parse(localStorage.getItem('score'))||{wins:0,
  losses:0,
  ties:0
}
let is_auto=false;
let incode;
let mymove;
updateScore();
function autoPlay(){
  if(!is_auto){
    incode=setInterval(()=>{
      mymove=pickCompMove();
      compMove=pickCompMove();
      resultMove(mymove);
      updateScore();
    },1000);
    is_auto=true;
  }
  else{
    clearInterval(incode);
    is_auto=false;
  }
}
document.querySelector('.Reset-button').addEventListener('click',()=>{
  document.querySelector('.confirm-button').innerHTML=`Are you sure you want to reset the score? <button class="yes-button">Yes</button><button class="no-button">No</button>`;
  document.querySelector('.yes-button').addEventListener('click',()=>{
    score.wins=0;
    score.losses=0;
    score.ties=0;
    updateScore();
    localStorage.removeItem('score');
    document.querySelector('.confirm-button').innerHTML='';
  });
  document.querySelector('.no-button').addEventListener('click',()=>{
    document.querySelector('.confirm-button').innerHTML='';
  });
});
document.body.addEventListener('keydown',(event)=>{
  if((event.key==='a')||(event.key==='A')){
    if(document.querySelector('.auto-button').innerHTML==='Auto Play'){
      document.querySelector('.auto-button').innerHTML='Stop Playing';
    }
    else{
      document.querySelector('.auto-button').innerHTML='Auto Play';
    }
    autoPlay();
  }
});
document.querySelector('.auto-button').addEventListener('click',()=>{
  if(document.querySelector('.auto-button').innerHTML==='Auto Play'){
    document.querySelector('.auto-button').innerHTML='Stop Playing';
  }
  else{
    document.querySelector('.auto-button').innerHTML='Auto Play';
  }
  autoPlay();
});
document.body.addEventListener('keydown',(event)=>{
  if(event.key==='Backspace'){
    score.wins=0;
    score.losses=0;
    score.ties=0;
    updateScore();
    localStorage.removeItem('score');
  }

})
document.body.addEventListener('keydown',(event)=>{
  if((event.key==='r')||(event.key==='R')){
    compMove=pickCompMove();
    resultMove('Rock');
  }
  else if((event.key==='P')||(event.key==='p')){
    compMove=pickCompMove();
    resultMove('Paper');
  }
  else if((event.key==='s')||(event.key==='S')){
    compMove=pickCompMove();
    resultMove('Scissors');
  }
});
document.querySelector('.rock-button').addEventListener('click',()=>{
    compMove=pickCompMove();
    resultMove('Rock');
});
document.querySelector('.paper-button').addEventListener('click',()=>{
  compMove=pickCompMove();
  resultMove('Paper');
});
document.querySelector('.scissors-button').addEventListener('click',()=>{
  compMove=pickCompMove();
  resultMove('Scissors');
});
function pickCompMove(){
  let randNum=Math.random();
  let compMove='';
  if(randNum>=0 && randNum<1/3){
    compMove='Rock';
  }
  else if(randNum>=1/3 && randNum<2/3){
    compMove='Paper';
  }
  else if(randNum>=2/3 && randNum<1){
    compMove='Scissors';
  }
  return compMove;
}
function updateScore(){
  document.querySelector('.js-score')
  .innerHTML=`Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}
function resultMove(myMove){
  if(myMove==='Scissors'){
    if(compMove==='Rock'){
    result='You Lose.';
    }
    else if(compMove==='Paper'){
      result='You Win.';
    }
    else if(compMove==='Scissors'){
      result='Tie.';
    }
  }else if(myMove==='Paper'){
    if(compMove==='Rock'){
      result='You Win.';
    }
    else if(compMove==='Paper'){
      result='Tie.';
    }
    else if(compMove==='Scissors'){
      result='You Lose.';
    }
  }else if(myMove==='Rock'){
    if(compMove==='Rock'){
      result='Tie.';
    }
    else if(compMove==='Paper'){
      result='You Lose.';
    }
    else if(compMove==='Scissors'){
      result='You Win.';
    }
  }
  if(result==='You Win.'){
    score.wins++;
  }
  else if(result==='You Lose.'){
    score.losses++;
  }
  else if(result==='Tie.'){
    score.ties++;
  }
  localStorage.setItem('score',JSON.stringify(score));
  document.querySelector('.endresult').innerHTML=`${result}`;
  document.querySelector('.moves').innerHTML=`You <img class="moveimage" src="IMAGES/${myMove}-emoji.png"> <img class="moveimage" src="IMAGES/${compMove}-emoji.png"> Computer`;
  /*alert(`You picked ${myMove}.Computer picked ${compMove}.${result}
Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`);
  */
  updateScore();
  return;
}