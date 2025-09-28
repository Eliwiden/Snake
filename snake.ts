function Move(id:string){
    const domSnakeHead = document.getElementById('svg-container');
    const nLeft = domSnakeHead!.getBoundingClientRect().left;
    const domBorder = document.getElementById('field');
    const oRect = domBorder!.getBoundingClientRect();
    if(id == "left" && nLeft>10){
        domSnakeHead!.style.left = (nLeft - 10)+'px';
    }else if(nLeft + 100 + 10 < oRect.right){
        domSnakeHead!.style.left = (nLeft + 10)+'px';
    }
}