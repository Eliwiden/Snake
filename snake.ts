class CTurnPoint{
    nX: number;
    nY: number;
    nStepX: number;
    nStepY: number;
    constructor(x: number, y: number, stepX: number, stepY: number){
        this.nStepX = stepX 
        this.nStepY = stepY
        this.nX = x;
        this.nY = y;
    }
}
const aTurnPoints: CTurnPoint[]=[]
class CSegment{
    nStepX = STEP;//Кол-во пикселей смещения по оси X для движения сегмента
    nStepY = 0;//Кол-во пикселей смещения по оси Y для движения сегмента
    dom:HTMLDivElement;
    nX: number; 
    nY: number; 
    nSize: number;
    constructor(x: number, y: number, size: number){
        this.dom = CreateSnakeSegment(x, y, size);
        this.nX = x;
        this.nY = y;
        this.nSize = size;
    }
    Move(){
        this.nX += this.nStepX;
        this.nY += this.nStepY;
        this.dom.style.left = (this.nX-this.nSize/2) + 'px';
        this.dom.style.top = (this.nY-this.nSize/2) + 'px';
        for(const tp of aTurnPoints){
            if(Math.abs(this.nX-tp.nX) <= 5 && Math.abs(this.nY-tp.nY) <= 5){
                this.nStepX = tp.nStepX;
                this.nStepY = tp.nStepY;
                break;
            }
        }
    }
}

const STEP = 0.4;//Фиксированный шаг движения

let nStepX = STEP;//Текущее смещение по оси X для змейки
let nStepY = 0;//Текущее смещение по оси Y, изначально отсутствует

function Move(){//Начало функции Move с параметром id типа string
    if(!aSnake || !aSnake.length){//Если массив пуст или undefined
        return;//Перестаём работу
    }
    const rect = aSnake[0].dom.getBoundingClientRect();//Получаем текущую позицию слева у элемента относительно окна
    const oRect = document.getElementById('field')!.getBoundingClientRect();//Получаем размер и позицию границы поля относительно окна
    if(rect.right + nStepX <= oRect.right && rect.bottom + nStepY <= oRect.bottom &&
        rect.left + nStepX >= oRect.left && rect.top + nStepY >= oRect.top){
        for(const segment of aSnake){//Для каждого сегмента змейки
            segment.Move()
        }
    }
}
//Запускаем функцию чтобы змейка ползла каждые 10мс
setInterval(Move, STEP*10);

function ChangeDirect(direct:'right'|'left'){//Если меняем направление
    if(direct == "right"){
        if(nStepX>0){//Если поварачиваем направо
            nStepX = 0;//Сбрасываем координаты по X
            nStepY = STEP;//Меняем направление на вниз
        }else if(nStepX<0){//Если движение влево
            nStepX=0;
            nStepY = -STEP;//Меняем направление на вверх
        }else if(nStepY>0){//Если движение вниз
            nStepX = -STEP;//Меняемм направление на влево
            nStepY = 0;
        }else{//Иначе движение вверх
            nStepX = STEP;//Меняем направление направо
            nStepY = 0;
        }
    }else{
        if(nStepX>0){//Если направление вправо
            nStepX = 0;
            nStepY = -STEP;//Меняем направление на вверх
        }else if(nStepX<0){//Если движение влево
            nStepX=0;
            nStepY = STEP;//Меняем направление на вниз
        }else if(nStepY>0){//Если движение вниз
            nStepX = STEP;//Меняем на вправо
            nStepY = 0;
        }else{//Если движение вверх
            nStepX = -STEP;//Меняем на влево
            nStepY = 0;
        }
    }
    aTurnPoints.push(new CTurnPoint(aSnake[0].nX, aSnake[0].nY, nStepX, nStepY));
    const domPoint = document.createElement('div');
    domPoint.style = 'position: absolute; top: '+aSnake[0].nY+'px; left: '+aSnake[0].nX+'px; height: 3px; width: 3px; border: solid;';
    document.body.append(domPoint)
}

const ravSvg = `<svg viewBox="0 0 100 100">
                    <rect x="0" y="0" width="100" height="100" 
                        fill="red" stroke="black" stroke-width="2" />
                </svg>`

function CreateSnakeSegment(x: number, y: number, size: number){//Создаём сегмент змейки
    const dom = document.createElement('div');//Создаём контейнер div
    dom.className = 'snake_segment';//Присваиваем класс для стилей
    dom.style.top = (y - size/2) + 'px';//Позиция по вертикали
    dom.style.left = (x - size/2) + 'px';//Позиция по горизонтали
    dom.style.height = size + 'px';//Задаём высоту
    dom.style.width = size + 'px';//Задаём ширину
    dom.innerHTML = ravSvg;//Вставляем внутрь SVG
    document.body.append(dom);//Добавляем сегмент в тело документа
    return dom;//Возвращаем созданный элемент
}

const aSnake: CSegment[]=[];//Создаём массив для хранения сегментов змейки

function CreateSnake(nSegment: number, x: number, y: number){//Создаёт змейку из нескольких сегментов
    aSnake.push(new CSegment(x, y, 100));//Создаём голову змейки побольше размером
    for(let i=0; i<nSegment;i++){
        aSnake.push(new CSegment(x-(i+1)*25, y, 30));//Создаём сегменты по меньше и сдвигаем по X
    }
}
CreateSnake(5, 500, 200)//Создаём змейку из 6 сегментов