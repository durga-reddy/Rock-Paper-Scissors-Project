let score =JSON.parse(localStorage.getItem('score')) ||{
  wins:0,
  losses: 0,
  ties:0
  };
  updateScoreElement();

let  isAutoPlaying=false;
let intervalid;


  function autoPlay(){
    if(!isAutoPlaying){
      intervalid= setInterval(()=>{
      const playerMove= pickComputerMove();
    playGame(playerMove);
    },1000);
    isAutoPlaying=true
  }else{
    clearInterval(intervalid);
    isAutoPlaying=false;
  }

  }
  
  document.querySelector('.js-rock-button')
  .addEventListener('click', ()=>{
    playGame('rock')
  });

  document.querySelector('.js-paper-button')
  .addEventListener('click', ()=>{
    playGame('paper')
  });

  document.querySelector('.js-scissors-button')
  .addEventListener('click', ()=>{
    playGame('scissors')
  });

  document.body.addEventListener('keydown',(event)=>{
    if(event.key=== 'r' || event.key=== 'R'){
      playGame('rock');
    }else if(event.key==='p' || event.key=== 'P'){
      playGame('paper');
    }else if(event.key === 's' || event.key=== 'S'){
      playGame('scissors')
    }
  });
    

function playGame(playerMove){
  const computerMove= pickComputerMove();
  let result='';


   if(playerMove === 'rock' ){
    if(computerMove === 'rock'){
      result='tie';
    }else if (computerMove === 'paper'){
      result='You lose'
    }else if( computerMove ==='scissors'){
      result='You win'
    }
  }else if(playerMove === 'paper'){
    if(computerMove === 'rock'){
      result='You win';
    }else if (computerMove === 'paper'){
      result='tie'
    }else if( computerMove ==='scissors'){
      result='You lose'
    }
  }else if(playerMove === 'scissors'){
    if(computerMove === 'rock'){
      result='You lose';
    }else if (computerMove === 'paper'){
      result='You win'
    }else if( computerMove ==='scissors'){
      result='tie'
    }
  }

  if(result ==='You win'){
    score.wins +=1;
  }else if(result ==='You lose'){
    score.losses +=1;
  }else if(result ==='tie'){
    score.ties +=1;
  }

  
  localStorage.setItem('score', JSON.stringify(score));


  updateScoreElement();
 document.querySelector('.js-result').innerHTML=result;
 document.querySelector('.js-moves').innerHTML=`You <img src="images/${playerMove}-emoji.png" class="move-icon">
 <img src="images/${computerMove}-emoji.png" class="move-icon"> computer `;
     

}

 function updateScoreElement(){
  document.querySelector('.js-score')
  .innerHTML=`Wins ${score.wins}, Losses ${score.losses}, Ties ${score.ties}`;
 }

 
function pickComputerMove(){
const randomNumber = Math.random();
let computerMove='';
if(randomNumber >=0 && randomNumber <= 1/3){
  computerMove='rock';
}else if(randomNumber >= 1/3 && randomNumber <= 2/3){
  computerMove='paper';
}else if(randomNumber >= 2/3 && randomNumber <= 1){
  computerMove='scissors';
}
return computerMove;
}