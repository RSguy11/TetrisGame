var grid = document.getElementById("grid");

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

document.addEventListener('DOMContentLoaded', () => {
    const gird = document.querySelector('.gridstyle');
    let gridSquares = Array.from(document.querySelectorAll(".gridstyle div"));
    const width = 10;

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
    
    const scoreD = document.getElementById('score');
    const ActiveButton = document.getElementById('activation');

    const Shapes = [LShape,zShape,tShape];
       
    //positioning 
    var currentPosition = 4;
    var CurrentRoation = 0;

    let random = Math.floor(Math.random()*Shapes.length);

    var block = Shapes[random][CurrentRoation];

    function draw() {
        block.forEach(index => {
            gridSquares[currentPosition+index].classList.add("shape");
        })
    }

    draw();

    function undraw() {
        block.forEach(index => {
            gridSquares[currentPosition+index].classList.remove("shape");
        })
    }


    timerId = setInterval(Down,1000);

    function test(){
        console.log("hello");
    }
    function Down(){
        undraw();
        currentPosition += width;
        draw();
    }

    function shtopppp( ) {
        if(block.some(index => shapes[currentPosition + index + width].classList.contains("bottom")));
            block.forEach(index=> shapes[currentPosition + index].classList.add("buttom"))
    }


    

});