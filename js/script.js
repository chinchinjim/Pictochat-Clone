window.addEventListener('load', ()=> {
    const canvas = document.querySelector(".canvas");
    const ctx = canvas.getContext("2d");

    //resizing canvas
    resizeCanvas(canvas);

    window.addEventListener('resize', resizeCanvas);

    function resizeCanvas(cv){
        cv.height = window.innerHeight * 0.8;
        cv.width = window.innerWidth * 0.9;
    }

    let drawing = false;

    function startPos(e){
        drawing = true;
        draw(e);
    }

    function endPos(){
        drawing = false;
        ctx.beginPath();
    }

    ctx.lineWidth = 10;

    function draw(e){
        if(!drawing) return;
        ctx.lineCap = 'round';
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(e.offsetX, e.offsetY);
    }

    canvas.addEventListener('mousedown', startPos);
    canvas.addEventListener('mouseup', endPos);
    canvas.addEventListener('mousemove', draw);

    function erase(){
        ctx.strokeStyle = 'white';
    }

    const eraseBtn = document.querySelector('.erase');
    eraseBtn.addEventListener('click', erase);

    function drawBtnClicked(){
        ctx.strokeStyle = 'black';
    }
    
    const drawBtn = document.querySelector('.draw');
    drawBtn.addEventListener('click', drawBtnClicked);

    function drawSize1(){
        ctx.lineWidth = 5;
    }
    
    const drawSize1Btn = document.querySelector('.draw-size-1');
    drawSize1Btn.addEventListener('click', drawSize1);

    function drawSize2(){
        ctx.lineWidth = 10;
    }
    
    const drawSize2Btn = document.querySelector('.draw-size-2');
    drawSize2Btn.addEventListener('click', drawSize2);

    function drawSize3(){
        ctx.lineWidth = 15;
    }
    
    const drawSize3Btn = document.querySelector('.draw-size-3');
    drawSize3Btn.addEventListener('click', drawSize3);

    function clear(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    
    const clearBtn = document.querySelector('.clear');
    clearBtn.addEventListener('click', clear);

    function clone(){
        const cloneCanvas = document.createElement("canvas");
        document.body.appendChild(cloneCanvas);
        resizeCanvas(cloneCanvas);
        var destCtx = cloneCanvas.getContext('2d');
        destCtx.drawImage(canvas, 0, 0);
    }
    
    const cloneBtn = document.querySelector('.clone');
    cloneBtn.addEventListener('click', clone);

    // function copy(){
    //     const cloneCanvas = document.createElement("canvas");
    //     document.body.appendChild(cloneCanvas);
    //     resizeCanvas(cloneCanvas);
    //     var destCtx = cloneCanvas.getContext('2d');
    //     destCtx.drawImage(canvas, 0, 0);
    // }
    
    // const copyBtn = document.querySelector('.clone');
    // cloneBtn.addEventListener('click', clone);

})