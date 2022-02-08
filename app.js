const canvas=document.getElementById("jsCanvas");

let painting=false;//그림그리기 기본값:false

function stopPainting(){ //그림멈추기=false
    painting=false;
}

function onMouseMove(
event){
    const x=event.offsetX;//offsetX: canvas에서 마우스 x위치값
    const y=event.offsetY;//offsetY: canvas에서 마우스 y위치값
    
}

function onMouseDown(event){ //mousedown시 그림그리기O
    painting=true;
}

function onMouseUp(event){ //mouseup시 그림그리기X
    stopPainting();
}


if(canvas){
    canvas.addEventListener("mousemove",onMouseMove);//mousemove: 마우스움직일때
    canvas.addEventListener("mousedown",onMouseDown);//mousedown: 마우스클릭했을때
    canvas.addEventListener("mouseup",onMouseUp);//mouseup: 마우스 뗄때(<->mousedown)
    canvas.addEventListener("mouseleave",stopPainting);//mouseleave: 마우스가 밖으로 이동시
}