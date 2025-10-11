class CSegment extends HTMLDivElement{
    nStepX = 0;
    nStepY = 0;

    Move(x: number, y: number, stepX: number, stepY: number){
        const rect = this.getBoundingClientRect();
        if(rect.left == x && rect.top == y){
            this.nStepX = stepX;
            this.nStepY = stepY;
        }
        this.style.left = (rect.left + nStepX) + 'px';
        this.style.top = (rect.top + nStepY) + 'px';
    }
}

const STEP = 0.4;

let nStepX = STEP;
let nStepY = 0;

function Move(){//Начало функции Move с параметром id типа string
    if(!aSnake || !aSnake.length){
        return;
    }
    const rect = aSnake[0].getBoundingClientRect();//Получаем текущую позицию слева у элемента относительно окна
    const oRect = document.getElementById('field')!.getBoundingClientRect();//Получаем размер и позицию границы поля относительно окна
    if(rect.right + nStepX <= oRect.right && rect.bottom + nStepY <= oRect.bottom &&
        rect.left + nStepX >= oRect.left && rect.top + nStepY >= oRect.top){
        for(const segment of aSnake){
            const oSegRect = segment.getBoundingClientRect();
            segment.style.left = (oSegRect.left + nStepX) + 'px';
            segment.style.top = (oSegRect.top + nStepY) + 'px';
        }
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

const aSnake: HTMLDivElement[]=[];

function CreateSnake(nSegment: number, x: number, y: number){
    aSnake.push(CreateSnakeSegment(x, y, 100));
    for(let i=0; i<nSegment;i++){
        aSnake.push(CreateSnakeSegment(x-(i+1)*25, y, 30));
    }
}
CreateSnake(5, 500, 200)