const boxes=document.querySelectorAll(".box");
const gameInfo=document.querySelector(".game-info");
const newGameBtn=document.querySelector(".btn");

//Variables
let currentPlayer;
let gameGrid;
const winningPositions=[
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

//Intialise the game

function initGame(){
  currentPlayer="X";
  gameGrid=["","","","","","","","",""];
  boxes.forEach((box,index)=>{
    box.innerText="";
    box.style.pointerEvents="all";
    box.classList=`box box${index+1}`;
  });
  newGameBtn.classList.remove("active");
  gameInfo.innerText=`Current Player - ${currentPlayer}`;
}


initGame();

function swapTurn(){
  if(currentPlayer === "X"){
    currentPlayer="O";
  }
  else if(currentPlayer==="O"){
    currentPlayer="X";
  }
  //ui update
  gameInfo.innerText=`Current Player - ${currentPlayer}`;
}

function checkGameOver(){
  let answer="";
  winningPositions.forEach((position)=>{
    if((gameGrid[position[0]]!=="" || gameGrid[position[1]]!== "" ||gameGrid[position[2]]!=="")
    &&(gameGrid[position[0]]===gameGrid[position[1]]) && (gameGrid[position[1]]===gameGrid[position[2]])){

      //check if x is winner or o
      if(gameGrid[position[0]]==="X")
        answer="X";
      else
        answer="O";

      //disable pointer events
      boxes.forEach((box)=>{
        box.style.pointerEvents="none";
      })
      //now we know the winner
      boxes[position[0]].classList.add("win");
      boxes[position[1]].classList.add("win");
      boxes[position[2]].classList.add("win");
    }
  });

  //It means we have a winner
  if(answer!==""){
    //show status of winner 
    gameInfo.innerText=`Winner Player -${answer}`;
    //make new button active
    newGameBtn.classList.add("active");
    return;
  }

  //lets check when there is tie 
  let fillCount=0;
  gameGrid.forEach((box)=>{
    if(box!=="")
      fillCount++;
  });

  //board is filled
  if(fillCount===9){
    gameInfo.innerText="Game Tied";
    newGameBtn.classList.add("active");
  }

}

newGameBtn.addEventListener("click",initGame);
function handleClick(index){
  if(gameGrid[index]===""){
    //update on ui
    boxes[index].innerText=currentPlayer;
    //update in back
    gameGrid[index]=currentPlayer;
    boxes[index].style.pointerEvents="none";
    //swap turn
    swapTurn();
    //Check for win
    checkGameOver();
  }
  else{
    return;
  }
}

boxes.forEach((box,index)=>{
  box.addEventListener("click",()=>{
    handleClick(index);
  })
});





