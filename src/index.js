import  ScComposer from './sc-composer.js';
const chooseBtn = document.getElementById('choose');
let obj = undefined,
    lines = [], // список всех линий
    svg = document.querySelector('.svg'),
    rect = { // объект с данными о перемещаемом квадрате
        rect : document.createElementNS('http://www.w3.org/2000/svg', 'rect'),
        cnt : 0,
    };

    // создание квадратной области
    rect.rect.setAttribute('x','15')
    rect.rect.setAttribute('y','34')
    rect.rect.setAttribute('width','240')
    rect.rect.setAttribute('height','170')
    rect.rect.setAttribute('stroke','black')
    rect.rect.setAttribute('stroke-width','2')
    rect.rect.setAttribute('stroke-dasharray','5,5')
    rect.rect.setAttribute('fill','transparent')
    rect.rect.classList.add('.movable')
    rect.rect.onmouseenter = ()=> {
        rect.rect.style.cursor = 'grab'
    }

function uploadFile(files,cb) { // функця обработки информации о загружаемом файле
    if(!files[0]) {
      return console.log('nothing to upload.');
    }
    const reader = new FileReader();
    reader.onload = cb
    reader.readAsText(files[0])
  }

function unParse(data){ // создание линий на основе данных с загруженного файла
    let line = document.createElementNS('http://www.w3.org/2000/svg', 'line');

    svg.textContent = '' // очистка области отрисовки линий
    line.setAttribute('stroke','blue')
    line.setAttribute('stroke-width','2')

    data.forEach(function(item,i){
        if(item){
            let b = item.split(';');
            b = [...b[0].split(','),...b[1].split(',')]
            if(b.length == 4){ // проверка, что введены все координаты для точки
                let arCheck = b.find((item,i)=>{ // проверка, что координаты могут быть применены
                    if(isNaN(item)) return i
                })
                if(!arCheck){
                    line.setAttribute('x1',b[0])
                    line.setAttribute('y1',b[1])
                    line.setAttribute('x2',b[2])
                    line.setAttribute('y2',b[3])
                    svg.appendChild(line.cloneNode(true))
                }
            }
            
        }
    })
    svg.appendChild(rect.rect)
    lines = document.querySelectorAll('line')
    document.getElementById('all').textContent = lines.length
    check()
}

chooseBtn.onchange = ()=>{ // обработчик события выбора файла
   uploadFile(chooseBtn.files,(data)=>{
       let dt = (data.currentTarget.result).split('\r\n');
       if (dt.length > 1) unParse(dt)
   })
}

    
function check(){ // функция проверки условия наложения/пересечения квадрата и линии
    rect.x = parseInt(rect.rect.getAttribute('x')) // левая сторона квадрата
    rect.y = parseInt(rect.rect.getAttribute('y')) // верхняя сторона квадрата
    rect.x1 = rect.x + parseInt(rect.rect.getAttribute('width')) // правая сторона квадрата
    rect.y1 = rect.y + parseInt(rect.rect.getAttribute('height')); // нижняя сторона квадрата
    rect.cnt = 0;

    function getCross(args){ // функция вычисления наложения/пересечения векторным способом
        /*
        args должн содержать 8 элементов в виде массива следующего формата:
        0: координата x 1 точки 1 линии
        1: координата y 1 точки 1 линии
        2: координата x 2 точки 1 линии
        3: координата y 2 точки 1 линии
        4: координата x 1 точки 2 линии
        5: координата y 1 точки 2 линии
        6: координата x 1 точки 2 линии
        7: координата y 2 точки 2 линии
        */
        let v, border_1, border_2;

        // определение вектора пересечения линий
        v = (args[2] - args[0]) * (args[7] - args[5]) - (args[6] - args[4]) * (args[3] - args[1]);

        if (v == 0) return // линии не пересекаются

        border_1 = ((args[7] - args[5]) * (args[6] - args[0]) + (args[4] - args[6]) * (args[7] - args[1])) / v;
        border_2 = ((args[1] - args[3]) * (args[6] - args[0]) + (args[2] - args[0]) * (args[7] - args[1])) / v;
              
        if((0 < border_1 && border_1 <= 1) && (0 < border_2 && border_2 <= 1)){ // проверка пересечения в определенных границах
            rect.cnt++
            return true
        }
    }
        
    lines.forEach(function(item,i){ 
        // координаты точек линии
        let x1 = parseInt(item.getAttribute('x1')),
            x2 = parseInt(item.getAttribute('x2')),
            y1 = parseInt(item.getAttribute('y1')),
            y2 = parseInt(item.getAttribute('y2'));
            
        switch(true){
            // проверка, что линия внутри квадрата и н соприкасается с границами
            case (rect.x <= x1 && rect.x1 >= x1 && rect.y1 >= y1 && rect.y <= y1):
                item.setAttribute('stroke','red')
                rect.cnt++
                break;
                // проверка соприкосновения с вехней линией квадрата
            case (getCross([x1,y1,x2,y2,rect.x,rect.y,rect.x1,rect.y])):
                item.setAttribute('stroke','red')
                break;
                // проверка соприкосновения с левой стороной квадрата
            case (getCross([x1,y1,x2,y2,rect.x,rect.y,rect.x,rect.y1])):
                item.setAttribute('stroke','red')
                break;
                // проврка соприкосновения с правой стороной квадрата
            case (getCross([x1,y1,x2,y2,rect.x1,rect.y,rect.x1,rect.y1])):
                item.setAttribute('stroke','red')
                break;
                // проверка соприкосновения с нижней стороной квадрата
            case (getCross([x1,y1,x2,y2,rect.x,rect.y1,rect.x1,rect.y1])):
                item.setAttribute('stroke','red')
                break;
            default:
                item.setAttribute('stroke','black')
        }
    })
    document.getElementById('cnt').textContent = rect.cnt
}

// обработчики событий нажатия мыши для перемещения квадратной области
document.addEventListener('mousedown',(e)=>{
    if(e.target.classList.contains('.movable')) {
        obj = new ScComposer(e,true);
        rect.rect.style.cursor = 'grabbing'
    }
})

document.addEventListener('mouseup',(e)=>{
    if(obj) {
        obj.end()
        obj = undefined
        rect.rect.style.cursor = 'grab'
        check()
    }
})


