/*설명
canvas는 html의 요소로써 context를 가짐
context란 이 요소 안에서 픽셀에 접근할수 있는 방법

하는법
1.html에 canvas를 만듬  <canvas id="jsCanvas" class="canvas"></canvas>
2.js에서 html의 canvas를 불러오고 변수canvas 만듬 const canvas=document.getElementById("jsCanvas");
3.js에서 canvas의 context를 불러오고 변수ctx 만듬 const ctx = canvas.getContext("2d");
4.js에서 canvas의 높이,너비 지정(css에 지정해놓은 canvas크기와 같게) canvas.width=800; canvas.height=500;
그리고 하고싶은거 하면됨
*/

const canvas=document.getElementById("jsCanvas");//1. 변수canvas를 만듬: html의 요소인 canvas가져옴
const ctx = canvas.getContext("2d");//2. 변수 ctx를 만듬: canvas의 context가져옴 2d로
const colors=document.getElementsByClassName("jsColor");
const range= document.getElementById("jsRange");
const mode=document.getElementById("jsMode");
const reset=document.getElementById("jsReset");//지우기
const save=document.getElementById("jsSave");//저장

//반복적인거 쓸때 변수이름은 대문자로
const INITIAL_COLOR="#2c2c2c";

//3. 꼭 canvas의 높이,너비 지정하기!
canvas.width=800;
canvas.height=500;

/*캔버스 디폴트 배경색 지정
ctx.fillStyle="white";
ctx.fillRect(0,0,canvas.width,canvas.height);
*/

ctx.strokeStyle=INITIAL_COLOR;//strokeStyle 선색
ctx.fillStyle=INITIAL_COLOR;//fillStyle 면색
ctx.lineWidth=2.5;//lineWidth 선너비


let painting=false;//그림그리기 기본값:false
let filling=false;//전체채우기 기본값:false

function stopPainting(){ //그림멈추기=false
    painting=false;
}

function startPainting(){ //그림시작=true
    painting=true;
}

function onMouseMove(event){
    const x=event.offsetX;//offsetX: canvas에서 마우스 x위치값
    const y=event.offsetY;//offsetY: canvas에서 마우스 y위치값
    
    if(!painting){      //painting 안할때: 선 시작->선이 마우스 따라 움직임
        ctx.beginPath(); //beginPath 선 시작
        ctx.moveTo(x,y); //moveTo(x,y) path를 마우스 x,y좌표로 옮김
    }else{              //painting 할때-마우스 움직이는 내내 발생!! : 점의 시작,끝으로 선만듬->선긋기
        ctx.lineTo(x,y);//lineTo(x,y) path의 이전위치에서 지금위치까지 선을 만듬
        ctx.stroke();   //stroke() 선을 긋는다
    }
    
}

function handleColorClick(event){
    const color=event.target.style.backgroundColor;//event.target : event가 발생한 객체
    ctx.strokeStyle=color;
    ctx.fillStyle=color;
}

function handleRangeChange(event){//선굵기 사이즈조절
    const size=event.target.value;
    ctx.lineWidth=size;
}

function handleModeClick(){
    if(filling===true){ //filling이 true일때 클릭하면->false로 바꾸고 버튼이름Fill
        filling=false;
        mode.innerText="Fill";
    }else{ //filling이 아닐때 클릭하면->true로 바꾸고 버튼이름 Paint
        filling=true;
        mode.innerText="Paint";
        
    }
}

function handleCanvasClick(){
    if(filling){
        ctx.fillRect(0,0,canvas.width,canvas.height);
    }
}

function handleResetClick(){
   
        ctx.clearRect(0,0,canvas.width,canvas.height);//clearRect 지우기
    
}

function handleCM(event){
    event.preventDefault();//마우스 우클릭 막음
}

function handleSaveClick(){
    const image=canvas.toDataURL();
    const link=document.createElement("a");
    
    link.href=image;
    link.download="PaintJS[🎨]";//download: 다운로드시 파일 이름
    link.click();
}

if(canvas){
    canvas.addEventListener("mousemove",onMouseMove);//mousemove: 마우스움직일때
    canvas.addEventListener("mousedown",startPainting);//mousedown: 마우스클릭했을때
    canvas.addEventListener("mouseup",stopPainting);//mouseup: 마우스 뗄때(<->mousedown)
    canvas.addEventListener("mouseleave",stopPainting);//mouseleave: 마우스가 캔버스밖으로 이동시
    canvas.addEventListener("click",handleCanvasClick);
    canvas.addEventListener("contextmenu",handleCM);//contextmenu: 마우스 우클릭할때 메뉴들
}

Array.from(colors).forEach(colorr=> colorr.addEventListener("click",handleColorClick));
//Array.from(colors): colors로부터 배열만듬
//.forEach: 배열요소 각자 실행

if(range){
    range.addEventListener("input", handleRangeChange);
}

if(mode){
    mode.addEventListener("click", handleModeClick);
}

if(reset){
    reset.addEventListener("click",handleResetClick);
}

if(save){
    save.addEventListener("click",handleSaveClick);
}