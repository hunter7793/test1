
//Модуль перемещения объектов

// если созданный объект больше ненужен, то обязательно нужно вызвать функцию end. она затрет все информацию о старом объекте
// если зажать shift и перемещать объект стрелками, то перемещаться он будет намного быстрее


 export default class ScComposer {
    
    constructor(event, svg) {
        
        this.target = event.target;
        this.event = event;
        this.svg = svg;

        let objForMove = {
            cursorStartPositionX : undefined,
            cursorStartPositionY : undefined,
            object : undefined,
            target : document,
            mouse : undefined,
            zPos : undefined,
            movingSpeed : 1,
            shift : undefined

        },
        
        funcKeyUp = (event) => {
            if (event.key == 'Shift') {
                objForMove.shift = false;
                objForMove.movingSpeed = 1;
            }

        },

        functMoveControlFigure = (event) => {
            let x = event.x - objForMove.cursorStartPositionX,
                y = event.y - objForMove.cursorStartPositionY;
            if (this.event.target.nodeName == 'rect') {
            let xF = parseInt(this.target.getAttribute('x')),
                yF = parseInt(this.target.getAttribute('y'));
                xF = xF + x;
                yF = yF + y;
                xF += 'px';
                yF += 'px';

            this.target.setAttribute('x', xF);
            this.target.setAttribute('y', yF);
            }

            if (this.event.target.nodeName == 'circle' || this.event.target.nodeName == 'ellipse') {
            let xF = parseInt(this.target.getAttribute('cx')),
                yF = parseInt(this.target.getAttribute('cy'));
                
            xF = xF + x;
            yF = yF + y;
            xF += 'px';
            yF += 'px';

            this.target.setAttribute('cx', xF);
            this.target.setAttribute('cy', yF);
            }

            if (this.event.target.nodeName == 'line') {
            let x1 = parseInt(this.target.getAttribute('x1')),
                y1 = parseInt(this.target.getAttribute('y1')),
                x2 = parseInt(this.target.getAttribute('x2')),
                y2 = parseInt(this.target.getAttribute('y2'));
                    
            x1 = x1 + x;
            y1 = y1 + y;
            x2 = x2 + x;
            y2 = y2 + y;
            x1 += 'px';
            y1 += 'px';
            x2 += 'px';
            y2 += 'px';
    
            this.target.setAttribute('x1', x1);
            this.target.setAttribute('y1', y1);
            this.target.setAttribute('x2', x2);
            this.target.setAttribute('y2', y2);
            }


            if (this.event.target.nodeName == 'polygon' || this.event.target.nodeName == 'polyline') {
            let points = this.target.getAttribute('points'),
                array = points.split(' '),
                newArray = '',
                str = '';
                
                array.forEach(function(item,i) {
                    let subArray = array[i].split(',');
                    subArray[0] = parseInt(subArray[0]) + x;
                    subArray[1] = parseInt(subArray[1]) + y;
                    newArray += str + subArray[0] + ',' + subArray[1];
                    str = ' ';
                })

                this.target.setAttribute('points', newArray);
            }

            objForMove.cursorStartPositionX = event.x;
            objForMove.cursorStartPositionY = event.y;            
        },

        funcPositionByKeyFigure = (event) => {
            if (!objForMove.shift && event.key =='Shift') {
                objForMove.shift = true;
                objForMove.movingSpeed = 15;
            }


            if (event.key == 'ArrowDown') {
                event.preventDefault();
                
                if (this.event.target.nodeName == 'rect') {
                    let yF = parseInt(this.target.getAttribute('y'));
                        
                        yF = yF + objForMove.movingSpeed;
                        yF += 'px';
        
                    this.target.setAttribute('y', yF);
                    }
        
                    if (this.event.target.nodeName == 'circle' || this.event.target.nodeName == 'ellipse') {
                    let yF = parseInt(this.target.getAttribute('cy'));
                        
                    yF = yF + objForMove.movingSpeed;
                    yF += 'px';
        
                    this.target.setAttribute('cy', yF);
                    }
        
                    if (this.event.target.nodeName == 'line') {
                    let y1 = parseInt(this.target.getAttribute('y1')),
                        y2 = parseInt(this.target.getAttribute('y2'));
                            
                    y1 = y1 + objForMove.movingSpeed;
                    y2 = y2 + objForMove.movingSpeed;
                    y1 += 'px';
                    y2 += 'px';
            
                    this.target.setAttribute('y1', y1);
                    this.target.setAttribute('y2', y2);
                    }
        
                    if (this.event.target.nodeName == 'polygon' || this.event.target.nodeName == 'polyline') {
                    let points = this.target.getAttribute('points'),
                        array = points.split(' '),
                        newArray = '',
                        str = '';
                        
                        array.forEach(function(item,i) {
                            let subArray = array[i].split(',');
                            subArray[1] = parseInt(subArray[1]) + objForMove.movingSpeed;
                            newArray += str + parseInt(subArray[0]) + ',' + subArray[1];
                            str = ' ';
                        })
        
                        this.target.setAttribute('points', newArray);
                    }
            }
        
            if (event.key == 'ArrowUp') {
                event.preventDefault();

                if (this.event.target.nodeName == 'rect') {
                    let yF = parseInt(this.target.getAttribute('y'));
                        
                        yF = yF - objForMove.movingSpeed;
                        yF += 'xp';
        
                    this.target.setAttribute('y', yF);
                    }
        
                    if (this.event.target.nodeName == 'circle' || this.event.target.nodeName == 'ellipse') {
                    let yF = parseInt(this.target.getAttribute('cy'));
                        
                    yF = yF - objForMove.movingSpeed;
                    yF += 'px';
        
                    this.target.setAttribute('cy', yF);
                    }
        
                    if (this.event.target.nodeName == 'line') {
                    let y1 = parseInt(this.target.getAttribute('y1')),
                        y2 = parseInt(this.target.getAttribute('y2'));
                            
                    y1 = y1 - objForMove.movingSpeed;
                    y2 = y2 - objForMove.movingSpeed;
                    y1 += 'px';
                    y2 += 'px';
            
                    this.target.setAttribute('y1', y1);
                    this.target.setAttribute('y2', y2);
                    }
        
                    if (this.event.target.nodeName == 'polygon' || this.event.target.nodeName == 'polyline') {
                    let points = this.target.getAttribute('points'),
                        array = points.split(' '),
                        newArray = '',
                        str = '';
                        
                        array.forEach(function(item,i) {
                            let subArray = array[i].split(',');
                            subArray[1] = parseInt(subArray[1]) - objForMove.movingSpeed;
                            newArray += str + parseInt(subArray[0]) + ',' + parseInt(subArray[1]);
                            str = ' ';
                        })
        
                        this.target.setAttribute('points', newArray);
                    }
               
            }
        
            if (event.key == 'ArrowRight') {
                event.preventDefault();
                if (this.event.target.nodeName == 'rect') {
                    let xF = +this.target.getAttribute('x');
                        
                        xF = xF + objForMove.movingSpeed;
                        xF += '';
        
                    this.target.setAttribute('x', xF);
                    }
        
                    if (this.event.target.nodeName == 'circle' || this.event.target.nodeName == 'ellipse') {
                    let xF = +this.target.getAttribute('cx');
                        
                    xF = xF + objForMove.movingSpeed;
                    xF += '';
        
                    this.target.setAttribute('cx', xF);
                    }
        
                    if (this.event.target.nodeName == 'line') {
                    let x1 = +this.target.getAttribute('x1'),
                        x2 = +this.target.getAttribute('x2');
                            
                    x1 = x1 + objForMove.movingSpeed;
                    x2 = x2 + objForMove.movingSpeed;
                    x1 += '';
                    x2 += '';
            
                    this.target.setAttribute('x1', x1);
                    this.target.setAttribute('x2', x2);
                    }
        
        
                    if (this.event.target.nodeName == 'polygon' || this.event.target.nodeName == 'polyline') {
                    let points = this.target.getAttribute('points'),
                        array = points.split(' '),
                        newArray = '',
                        str = '';
                        
                        array.forEach(function(item,i) {
                            let subArray = array[i].split(',');
                            subArray[0] = +subArray[0] + objForMove.movingSpeed;
                            newArray += str + subArray[0] + ',' + subArray[1];
                            str = ' ';
                        })
        
                        this.target.setAttribute('points', newArray);        
                    }
            }
        
            if (event.key == 'ArrowLeft') {
                event.preventDefault();
                if (this.event.target.nodeName == 'rect') {
                    let xF = +this.target.getAttribute('x');
                        
                        xF = xF - objForMove.movingSpeed;
                        xF += '';
        
                    this.target.setAttribute('x', xF);
                    }
        
                    if (this.event.target.nodeName == 'circle' || this.event.target.nodeName == 'ellipse') {
                    let xF = +this.target.getAttribute('cx');
                        
                    xF = xF - objForMove.movingSpeed;
                    xF += '';
        
                    this.target.setAttribute('cx', xF);
                    }
        
                    if (this.event.target.nodeName == 'line') {
                    let x1 = +this.target.getAttribute('x1'),
                        x2 = +this.target.getAttribute('x2');
                            
                    x1 = x1 - objForMove.movingSpeed;
                    x2 = x2 - objForMove.movingSpeed;
                    x1 += '';
                    x2 += '';
            
                    this.target.setAttribute('x1', x1);
                    this.target.setAttribute('x2', x2);
                    }
        
        
                if (this.event.target.nodeName == 'polygon' || this.event.target.nodeName == 'polyline') {
                let points = this.target.getAttribute('points'),
                    array = points.split(' '),
                    newArray = '',
                    str = '';
                        
                    array.forEach(function(item,i) {
                        let subArray = array[i].split(',');
                         subArray[0] = +subArray[0] - objForMove.movingSpeed;
                         newArray += str + subArray[0] + ',' + subArray[1];
                        str = ' ';
                    })
        
                this.target.setAttribute('points', newArray);
                    }
            }
        },

        funcStopMovingFigure = () => {
            objForMove.mouse = false;
            objForMove.target.removeEventListener('mousemove', functMoveControlFigure);
            objForMove.target.removeEventListener('mouseup', funcStopMovingFigure);
        },





        funcMoveFigure = () => {

            objForMove.cursorStartPositionX = this.event.x;
            objForMove.cursorStartPositionY = this.event.y;
            this.target.style.outline = 'solid 3px rgb(255,0,0,0.2)';
            objForMove.mouse = true;
            objForMove.target.addEventListener('mousemove', functMoveControlFigure);
            objForMove.target.addEventListener('mouseup', funcStopMovingFigure);
            objForMove.target.addEventListener('keydown', funcPositionByKeyFigure)
            objForMove.target.addEventListener('keyup', funcKeyUp)

        },

         funcPositionByKey = (event) => {

            if (!objForMove.shift && event.key =='Shift') {
                objForMove.shift = true;
                objForMove.movingSpeed = 15;
            }


            if (event.key == 'ArrowDown') {
                event.preventDefault();
                let pos = 0,
                    par = getComputedStyle(this.target.parentNode),
                    tar = getComputedStyle(this.target);

                if ( parseInt(tar.top) + objForMove.movingSpeed >= (parseInt(par.height) - parseInt(tar.height)) ){
                    pos = parseInt(par.height) - parseInt(tar.height);
                } else {
                    pos = parseInt( tar.top ) + objForMove.movingSpeed;
                }

                pos += 'px';

                this.target.style.top = pos;
            }
        
            if (event.key == 'ArrowUp') {
                event.preventDefault();
                let pos = 0,
                    tar = getComputedStyle(this.target);

                if ( parseInt(tar.top) - objForMove.movingSpeed <= 0 ){
                    pos = 0;
                } else {
                    pos = parseInt( tar.top ) - objForMove.movingSpeed;
                }

                pos += 'px';

                this.target.style.top = pos;
            }
        
            if (event.key == 'ArrowRight') {
                event.preventDefault();
                let pos = 0,
                    par = getComputedStyle(this.target.parentNode),
                    tar = getComputedStyle(this.target);

                if ( parseInt(tar.left) + objForMove.movingSpeed >= (parseInt(par.width) - parseInt(tar.width)) ){
                    pos = parseInt(par.width) - parseInt(tar.width);
                } else {
                    pos = parseInt( tar.left ) + objForMove.movingSpeed;
                }

                pos += 'px';

                this.target.style.left = pos;
            }
        
            if (event.key == 'ArrowLeft') {
                event.preventDefault();
                let pos = 0,
                    tar = getComputedStyle(this.target);

                if ( parseInt(tar.left) - objForMove.movingSpeed <= 0 ){
                    pos = 0;
                } else {
                    pos = parseInt( tar.left ) - objForMove.movingSpeed;
                }

                pos += 'px';

                this.target.style.left = pos;
            }
        },

        funcStartPositionByKey =  () => {
        objForMove.target.addEventListener('keydown', funcPositionByKey);
        objForMove.target.addEventListener('keyup' , funcKeyUp);
        },

        funcStopPositionByKey =  () => {
        objForMove.target.removeEventListener('keydown', funcPositionByKey);
        objForMove.target.removeEventListener('keyup' , funcKeyUp);
        },

        funcMoveElement =  (event) => {
           
            let x = event.x - objForMove.cursorStartPositionX,
                y = event.y - objForMove.cursorStartPositionY,
                xF = getComputedStyle(this.target).left,
                yF = getComputedStyle(this.target).top,
                xOffset = this.target.offsetLeft,
                yOffset = this.target.offsetTop;

                if (isNaN(xF) || isNaN(yF) ) {
                    xF = this.target.offsetLeft;
                    yF = this.target.offsetTop
                }

                xF = parseInt(xF);
                yF = parseInt(yF);
                xOffset = parseInt(xOffset);
                yOffset = parseInt(yOffset);

                xF = xF + x;
                yF = yF + y;


                if (xF < 0) {
                xF = 0;
                }

                if (yF < 0) {
                yF = 0;
                }

                if (xF > (parseInt(objForMove.parent.width) - parseInt(getComputedStyle(this.target).width) ) )  {
                    xF = parseInt(objForMove.parent.width) - parseInt(getComputedStyle(this.target).width);
                }

                if (yF > (parseInt(objForMove.parent.height) - parseInt(getComputedStyle(this.target).height) ) ) {
                    yF = parseInt(objForMove.parent.height) - parseInt(getComputedStyle(this.target).height);
                }

                switch (true) {

                case (event.x <= objForMove.parentLeft):
                funcStopMoveControl();
                break;

                case (event.y <= objForMove.parentTop):
                funcStopMoveControl();
                break;

                case (event.x >= objForMove.parentRight):
                funcStopMoveControl();
                break;

                case (event.y >= objForMove.parentBottom):
                funcStopMoveControl();
                break;
                
                }
                

                xF += 'px'
                yF += 'px'

                this.target.style.left = xF;
                this.target.style.top = yF;

                objForMove.cursorStartPositionX = event.x;
                objForMove.cursorStartPositionY = event.y;
                
        },
    
        funcStartMoveControl = () => {
        objForMove.target.addEventListener('mousemove',funcMoveElement);
        this.target.addEventListener('mouseup' , funcStopMoveControl);
        },

        funcStopMoveControl =  () => {
            objForMove.mouse = false;
            objForMove.target.removeEventListener('mousemove', funcMoveElement);
            this.target.removeEventListener('mouseup' , funcStopMoveControl);
        },
    
        funcControlCursor =  (event) => {
        objForMove.cursorStartPositionX = this.event.x;
        objForMove.cursorStartPositionY = this.event.y;
        this.target.style.transition = '0s';

            if (!this.svg) {
        this.target.style.zIndex = 100;
        this.target.style.outline = 'solid 3px rgb(255,0,0,0.2)';
        objForMove.mouse = true;
        objForMove.parent = getComputedStyle(this.target.parentNode);
        objForMove.parentLeft = parseInt(objForMove.parent.left);
        objForMove.parentRight = parseInt(objForMove.parent.left) + parseInt(objForMove.parent.width);
        objForMove.parentTop = parseInt(objForMove.parent.top);
        objForMove.parentBottom = parseInt(objForMove.parent.top) + parseInt(objForMove.parent.height);
        funcStartPositionByKey();
        funcStartMoveControl();
        
            } else {
                funcMoveFigure();
                
            }
        };

        objForMove.zPos = getComputedStyle(this.target).zIndex;
        objForMove.transit = ((getComputedStyle(this.target).transition).split(' ')[1])
        
        funcControlCursor(this.target,this.event);

        this.end = () => {
            if (!this.svg) {
            this.target.style.zIndex = objForMove.zPos;
            this.target.style.outline = '';
            this.target.style.transition = objForMove.transit;
            funcStopMoveControl();
            funcStopPositionByKey();
            } else {
            this.target.style.outline = '';
            objForMove.target.removeEventListener('keydown', funcPositionByKeyFigure);
            objForMove.target.removeEventListener('mousemove', functMoveControlFigure);
            objForMove.target.removeEventListener('mouseup', funcStopMovingFigure);
            objForMove.target.removeEventListener('keyup', funcKeyUp)
            }
        }        
        };

    };

    // export {ScComposer};
