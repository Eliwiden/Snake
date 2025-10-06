const STEP = 0.4;

let nStepX = STEP;
let nStepY = 0;

function Move(){//Начало функции Move с параметром id типа string
    const domSnakeHead = document.getElementById('svg-container')!;//Получаем элемент с id 'svg-container'
    const rect = domSnakeHead!.getBoundingClientRect();//Получаем текущую позицию слева у элемента относительно окна
    const domBorder = document.getElementById('field');//Получаем элемент с ид поля
    const oRect = domBorder!.getBoundingClientRect();//Получаем размер и позицию границы поля относительно окна
    if(rect.right + nStepX <= oRect.right && rect.bottom + nStepY <= oRect.bottom &&
        rect.left + nStepX >= oRect.left && rect.top + nStepY >= oRect.top){
            domSnakeHead.style.left = (rect.left + nStepX) + 'px';
            domSnakeHead.style.top = (rect.top + nStepY) + 'px';
        }
}

setInterval(Move, STEP*10);

function ChangeDirect(direct:'right'|'left'){
    if(direct == "right"){
        if(nStepX>0){
            nStepX = 0;
            nStepY = STEP;
        }else if(nStepX<0){
            nStepX=0;
            nStepY = -STEP;
        }else if(nStepY>0){
            nStepX = -STEP;
            nStepY = 0;
        }else{
            nStepX = STEP;
            nStepY = 0;
        }
    }else{
        if(nStepX>0){
            nStepX = 0;
            nStepY = -STEP;
        }else if(nStepX<0){
            nStepX=0;
            nStepY = STEP;
        }else if(nStepY>0){
            nStepX = STEP;
            nStepY = 0;
        }else{
            nStepX = -STEP;
            nStepY = 0;
        }
    }
}

const ravSvg = `<svg viewBox="0 0 100 100">
                    <rect x="0" y="0" width="100" height="100" 
                        fill="red" stroke="black" stroke-width="2" />
                </svg>`

function CreateSnakeSegment(x: number, y: number, size: number){
    const dom = document.createElement('div');
    dom.className = 'snake_segment';
    dom.style.top = y + 'px';
    dom.style.left = x + 'px';
    dom.style.height = size + 'px';
    dom.style.width = size + 'px';
    dom.innerHTML = ravSvg;
    document.body.append(dom);
    return dom;
}

const head = CreateSnakeSegment(100, 100, 100);

head.id = 'svg-container';

CreateSnakeSegment(0, 100, 50);
CreateSnakeSegment(40, 100, 50);
CreateSnakeSegment(80, 100, 50);