var grid = document.getElementById("grid");
var minigrid = document.getElementById("minigrid");

for(let i = 1; i<= 200; i++){
    var box = document.createElement("div");
    box.id = 'square'+i;
   
    grid.appendChild(box);
}

for(let i = 1; i<= 10; i++){
    var box = document.createElement("div");
    box.classList.add("bottom");
    grid.appendChild(box);
}

for(let i = 1; i<= 16; i++){
    var box = document.createElement("div");
    minigrid.appendChild(box);
}

console.log(grid);
document.addEventListener('DOMContentLoaded', () => {
    const gird = document.querySelector('.gridstyle');
    let gridSquares = Array.from(document.querySelectorAll(".gridstyle div"));
    const displayBlocks = document.querySelectorAll('.minigridstyle div');
    const width = 10;
    const displayWidth = 4;
    var displayIndex = 0;
    var score = 0;

    

    const LShape = [        //adding in some shapes and there roations
        [1,width+1,width*2+1,2],        //other shapes can be added but its a tetius process and not nessesary 
        [width,width+1,width+2,width*2+2],
        [1,width+1,width*2+1,width*2],  
        [width,width*2, width*2+1, width*2+2] 
    ]

    const tShape = [
        [1,width,width+1,width+2],
        [1,width+1,width+2,width*2+1],
        [width,width+1,width+2,width*2+1],
        [1,width,width+1,width*2+1]
    ]

    const zShape = [
        [0,width,width+1,width*2+1],
        [width+1, width+2,width*2,width*2+1],
        [0,width,width+1,width*2+1],
        [width+1, width+2,width*2,width*2+1]
    ]

    const NextShape = [
        [1, displayWidth+1, displayWidth*2+1, 2], 
        [0, displayWidth, displayWidth+1, displayWidth*2+1], 
        [1, displayWidth, displayWidth+1, displayWidth+2],
        [0, 1, displayWidth, displayWidth+1], 
        [1, displayWidth+1, displayWidth*2+1, displayWidth*3+1] 
      ]
    
    const scoreD = document.getElementById('score');
    const ActiveButton = document.getElementById('activation');

    const Shapes = [LShape,zShape,tShape];
       
    //positioning 
  
    var CurrentRoation = 0;
    var currentPosition = 4;
    var block = Shapes[0][0];
    let random;
    let nextRandom;

    timerId = setInterval(Down,500);
    document.addEventListener('keyup',control);

    function control(event) {
        if (event.keyCode === 37) {
            moveLeft();
        } else if (event.keyCode === 38) {
            Rotate();
        } else if (event.keyCode === 39) {
            moveRight();
        }else if (event.keyCode === 40) {
            moveDown();
        }
    }
     
    
    random = Math.floor(Math.random()*Shapes.length);
    nextRandom  = Math.floor(Math.random()*Shapes.length); 
   
    displayNextShape();
    Random();

    function Random(){  
        currentPosition = 4;
        random = nextRandom;
        nextRandom = Math.floor(Math.random()*Shapes.length);
      
        block = Shapes[random][CurrentRoation];
        draw();
        displayNextShape();
        addScore();
        gameOver();
    
    }


    function draw() {
        block.forEach(index => {
            gridSquares[currentPosition+index].classList.add("shape");
        })
    }


    function undraw() {
        block.forEach(index => {
            gridSquares[currentPosition+index].classList.remove('shape');
        })
    }


    


    function Down(){
        undraw();
        currentPosition += width;
        draw();
        ReachedBottom();
    }

    function ReachedBottom( ) {
        if(block.some(index => gridSquares[currentPosition + index + width].classList.contains("bottom"))){
            block.forEach(index=> gridSquares[currentPosition + index].classList.add("bottom"));
            Random();
        }
           
    }

    function moveLeft() {
        undraw();
        const leftEdge = block.some(index => (currentPosition + index) % width === 0);  
        if(!leftEdge) {
            currentPosition -=1;
        }

        if(block.some(index => gridSquares[currentPosition + index + width].classList.contains("bottom"))){
            currentPosition+=1;
        }
        draw();
    }
    

    function moveRight() {
        undraw();
        const rightEdge = block.some(index => (currentPosition + index) % width === width -1);
        if(!rightEdge) {
            currentPosition +=1;
        }

        if(block.some(index => gridSquares[currentPosition + index + width].classList.contains("bottom"))){
            currentPosition -=1;
        }
        draw();
    }

    function Rotate(){
        undraw();
        CurrentRoation++;

        if(CurrentRoation === block.length) {
            CurrentRoation = 0;
        }
        block = Shapes[random][CurrentRoation];
        draw();
    }

    
   function displayNextShape() {
        displayBlocks.forEach(block => {
            block.classList.remove("mini-shape"); // Fix the class name here
        });

        NextShape[nextRandom].forEach(index => {
            displayBlocks[displayIndex + index].classList.add("mini-shape"); // Fix the class name here
        });
   }
    
   ActiveButton.addEventListener('click', () =>  {
    if(timerId) {
        clearInterval(timerId);
        timerId = null;
    } else {
        draw();
        timerId = setInterval(Down, 500);
        displayNextShape();
   }
});

function addScore() {
    for (let i = 0; i < 199; i +=width) {
      const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9];

      if(row.every(index => gridSquares[index].classList.contains('bottom'))) {
        score +=10;
        scoreD.innerHTML = score;
        row.forEach(index => {
            gridSquares[index].classList.remove("bottom");
            gridSquares[index].classList.remove("shape");
            gridSquares[index].style.backgroundColor = '';
        })
        const squaresRemoved = gridSquares.splice(i, width);
        gridSquares = squaresRemoved.concat(gridSquares);
        gridSquares.forEach(cell => grid.appendChild(cell));
      }
    }
  }


   function gameOver() {
    if(block.some(index => gridSquares[currentPosition + index].classList.contains('bottom'))) {
      scoreD.innerHTML = 'end'
      clearInterval(timerId)
    }
  }





});


    