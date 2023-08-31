(function () {
    "use strict";
    window.addEventListener('load', ()=> {
        const canvas = document.querySelector(".canvas");
        const ctx = canvas.getContext("2d");

        const canvasText = document.querySelector(".canvas-text");
        const ctxText = canvasText.getContext("2d");

        const canvasBg = document.querySelector(".canvas-bg");
        const ctxBg = canvasBg.getContext("2d");

        //text variables
        var line1 = '';
        var line2 = '';
        var line3 = '';
        var line4 = '';
        var line5 = '';
        var charCount = 0;

        //message count variable
        var cloneCount = 0;

        //resizing canvas
        resizeCanvas(canvas);
        resizeCanvas(canvasBg);
        resizeCanvas(canvasText);
        drawBg();
        const pixel = canvas.width / 256;
    
        function resizeCanvas(cv){
            cv.height = window.innerHeight * 0.35;
            cv.width = window.innerWidth * 0.68;
        }

        function clearCorners(cv) {
            const pixel = canvas.width / 256;
            //clearing the corners
            //top left corner
            cv.clearRect(0, 0, 3 * pixel, pixel);
            cv.clearRect(0, pixel, 2 * pixel, pixel);
            cv.clearRect(0, 2 * pixel, pixel, pixel);

            //bottom left corner
            cv.clearRect(0, canvas.height - pixel, 3 * pixel, pixel);
            cv.clearRect(0, canvas.height - (2 * pixel), 2 * pixel, pixel);
            cv.clearRect(0, canvas.height - (3 * pixel), pixel, pixel);

            //top right corner
            cv.clearRect(canvas.width - (3 * pixel), 0, 3 * pixel, pixel);
            cv.clearRect(canvas.width - (2 * pixel), pixel, 2 * pixel, pixel);
            cv.clearRect(canvas.width - pixel, 2 * pixel, pixel, pixel);

            //bottom right corner
            cv.clearRect(canvas.width - (3 * pixel), canvas.height - pixel, 3 * pixel, pixel);
            cv.clearRect(canvas.width - (2 * pixel), canvas.height - (2 * pixel), 2 * pixel, pixel);
            cv.clearRect(canvas.width - pixel, canvas.height - (3 * pixel), pixel, pixel);

        }

        function drawBg(){
            ctxBg.fillStyle = "white";
            ctxBg.fillRect(0, 0, canvas.width, canvas.height);
            ctxBg.fillStyle = "#B9B8F1";
            const pixel = canvas.width / 256;
            ctxBg.fillRect(62 * pixel, canvas.height / 5 - pixel, canvas.width - (64 * pixel), pixel);
            ctxBg.fillRect(2 * pixel, 2 * (canvas.height / 5) - pixel, canvas.width - (4 * pixel), pixel);
            ctxBg.fillRect(2 * pixel, 3 * (canvas.height / 5) - pixel, canvas.width - (4 * pixel), pixel);
            ctxBg.fillRect(2 * pixel, 4 * (canvas.height / 5) - pixel, canvas.width - (4 * pixel), pixel);

            //clearing the corners
            clearCorners(ctxBg);

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
    
        

        const font = new FontFace('pictochat', 'url(../fonts/pictochat.ttf)');
        font.load().then((loadedFont) => {
            document.fonts.add(loadedFont);
            ctx.font = "8vh pictochat";
            drawNameTag();
        }).catch((error) => {
            console.error('Font could not be loaded:', error);
        });

        ctx.lineWidth = 10;
    
        function drawNameTag(){
            // const pixel = canvas.width / 256;
            var eraseModeOn = false;
            //switches to draw mode if erase mode was on
            if(ctx.globalCompositeOperation == 'destination-out'){
                eraseModeOn = true;
                ctx.globalCompositeOperation = 'source-over';
            }

            //redraws the nametag rectangle
            ctx.fillStyle = "#B9B8F1";

            ctx.fillRect(0, 0, canvas.width / 4 - pixel, canvas.height / 5 - (2 * pixel));
            ctx.fillRect(0, 0, canvas.width / 4 - (3 * pixel), canvas.height / 5);

            //drawing borders of canvas
            ctx.fillStyle = "#1E1E7D";
            ctx.fillRect(3 * pixel, 0, canvas.width - (6 * pixel), pixel); //top
            ctx.fillRect(3 * pixel, canvas.height - pixel, canvas.width - (6 * pixel), pixel); //bottom
            ctx.fillRect(0, 3 * pixel, pixel, canvas.height - (6 * pixel)); //left
            ctx.fillRect(canvas.width - pixel, 3 * pixel, pixel, canvas.height - (6 * pixel)); //right
            //top left corner
            ctx.fillRect(2 * pixel, pixel, pixel, pixel);
            ctx.fillRect(pixel, 2 * pixel, pixel, pixel);
            //top right corner
            ctx.fillRect(canvas.width - (3 * pixel), pixel, pixel, pixel);
            ctx.fillRect(canvas.width - (2 * pixel), 2 * pixel, pixel, pixel);
            //bottom left corner
            ctx.fillRect(pixel, canvas.height - (3 * pixel), pixel, pixel);
            ctx.fillRect(2 * pixel, canvas.height - (2 * pixel), pixel, pixel);
            //bottom right corner
            ctx.fillRect(canvas.width - (2 * pixel), canvas.height - (3 * pixel), pixel, pixel);
            ctx.fillRect(canvas.width - (3 * pixel), canvas.height - (2 * pixel), pixel, pixel);

            //drawing borders of nametag 
            ctx.fillRect(canvas.width/4 - pixel, pixel, pixel, canvas.height / 5 - (4 * pixel));
            ctx.fillRect(canvas.width/4 - (2 * pixel), canvas.height / 5 - (3 * pixel), pixel, pixel);
            ctx.fillRect(canvas.width/4 - (3 * pixel), canvas.height / 5 - (2 * pixel), pixel, pixel);
            ctx.fillRect(pixel, canvas.height / 5 - pixel, canvas.width/4 - (4 * pixel), pixel);

            ctx.fillText(userName, 4 * pixel, 11.5 * pixel, 57 * pixel);

            clearCorners(ctx);

            //restores back to erase mode if erase mode was on
            if(eraseModeOn){
                ctx.globalCompositeOperation = 'destination-out';
            }
        }
        
        function draw(e){
            if(!drawing) return;
            ctx.lineCap = 'round';
            ctx.lineTo(e.offsetX, e.offsetY);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(e.offsetX, e.offsetY);
            drawNameTag();
        }
    
        canvas.addEventListener('mousedown', startPos);
        canvas.addEventListener('mouseup', endPos);
        canvas.addEventListener('mousemove', draw);
    
        function erase(){
            ctx.globalCompositeOperation = 'destination-out';
        }
    
        const eraseBtn = document.querySelector('.erase');
        eraseBtn.addEventListener('click', erase);
    
        function drawBtnClicked(){
            ctx.globalCompositeOperation = 'source-over';
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
            ctxText.clearRect(0, 0, canvas.width, canvas.height);
            ctx.clearRect(0,0, canvas.width, canvas.height);
            drawNameTag();
            charCount = 0;
            line1 = '';
            line2 = '';
            line3 = '';
            line4 = '';
            line5 = '';
        }
        
        const clearBtn = document.querySelector('.clear');
        clearBtn.addEventListener('click', clear);

        function clone(){
            cloneCount++;
            const cloneCanvas = document.createElement("canvas");
            cloneCanvas.classList.add("clone-canvas");
            const chatMessages = document.querySelector('.chat-messages');
            chatMessages.appendChild(cloneCanvas);
            resizeCanvas(cloneCanvas);
            var destCtx = cloneCanvas.getContext('2d');
            destCtx.fillStyle = "white";
            destCtx.fillRect(0, 0, canvas.width, canvas.height);
            clearCorners(destCtx);
            destCtx.drawImage(canvas, 0, 0);
            destCtx.fillStyle = "black";
            destCtx.font = "8vh pictochat";
            destCtx.fillText(line5, 4 * pixel, ((canvas.height / 5) * 5) - (2 * pixel));
            destCtx.fillText(line4, 4 * pixel, ((canvas.height / 5) * 4) - (2 * pixel));
            destCtx.fillText(line3, 4 * pixel, ((canvas.height / 5) * 3) - (2 * pixel));
            destCtx.fillText(line2, 4 * pixel, ((canvas.height / 5) * 2) - (2 * pixel));
            destCtx.fillText(line1, canvas.width / 4 + (2 * pixel), (canvas.height / 5) - (2 * pixel));
            cloneCanvas.style.marginTop = cloneCanvas.height;
            chatMessages.scrollTop = chatMessages.scrollHeight;
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

        const urlParams = new URLSearchParams(window.location.search);
        const userName= urlParams.get("message");

        // const userName = document.createElement("p");
        // userName.innerText = receivedData;
        // document.body.appendChild(userName);

        window.addEventListener("keydown", function(e) {
            ctxText.font = "8vh pictochat";
            ctxText.fillStyle = "black";
            charCount++;
            if(e.key === "Backspace" || e.key === "Delete"){
                charCount = charCount - 1;
                if (charCount >= 151) {
                    ctxText.clearRect(3 * pixel, ((canvas.height / 5) * 4) + pixel, canvas.width - (6 * pixel), canvas.height / 5);
                    line5 = line5.slice(0, -1);
                    ctxText.fillText(line5, 4 * pixel, ((canvas.height / 5) * 5) - (2 * pixel));
                    charCount = charCount - 1;
                }
                else if (charCount >= 111) {
                    ctxText.clearRect(3 * pixel, ((canvas.height / 5) * 3) + pixel, canvas.width - (6 * pixel), canvas.height / 5);
                    ctxText.fillText(line4, 4 * pixel, ((canvas.height / 5) * 4) - (2 * pixel));
                    charCount = charCount - 1;
                }
                else if (charCount >= 71) {
                    ctxText.clearRect(3 * pixel, ((canvas.height / 5) * 2) + pixel, canvas.width - (6 * pixel), canvas.height / 5);
                    line3 = line3.slice(0, -1);
                    ctxText.fillText(line3, 4 * pixel, ((canvas.height / 5) * 3) - (2 * pixel));
                    charCount = charCount - 1;
                }
                else if (charCount >= 31) {
                    ctxText.clearRect(3 * pixel, (canvas.height / 5) + pixel, canvas.width - (6 * pixel), canvas.height / 5);
                    line2 = line2.slice(0, -1);
                    ctxText.fillText(line2, 4 * pixel, ((canvas.height / 5) * 2) - (2 * pixel));
                    charCount = charCount - 1;
                }
                else if(charCount < 31) {
                    ctxText.clearRect(canvas.width / 4 + pixel, 3 * pixel, (canvas.width / 4) * 3 - (4 * pixel), canvas.height);
                    line1 = line1.slice(0, -1);
                    ctxText.fillText(line1, canvas.width / 4 + (2 * pixel), (canvas.height / 5) - (2 * pixel));
                    if(charCount - 1 >= 0){
                        charCount = charCount - 1;
                    }
                }
            }
            else if(charCount >= 191){
                charCount--;
                //full
            }
            else if(charCount >= 151){
                ctxText.clearRect(3 * pixel, ((canvas.height / 5) * 4) + pixel, canvas.width - (6 * pixel), canvas.height / 5);
                line5 = line5 + e.key;
                ctxText.fillText(line5, 4 * pixel, ((canvas.height / 5) * 5) - (2 * pixel));
            }
            else if(charCount >= 111){
                ctxText.clearRect(3 * pixel, ((canvas.height / 5) * 3) + pixel, canvas.width - (6 * pixel), canvas.height / 5);
                line4 = line4 + e.key;
                ctxText.fillText(line4, 4 * pixel, ((canvas.height / 5) * 4) - (2 * pixel));
            }
            else if (charCount >= 71){
                ctxText.clearRect(3 * pixel, ((canvas.height / 5) * 2) + pixel, canvas.width - (6 * pixel), canvas.height / 5);
                line3 = line3 + e.key;
                ctxText.fillText(line3, 4 * pixel, ((canvas.height / 5) * 3) - (2 * pixel));
            }
            else if (charCount >= 31){
                ctxText.clearRect(3 * pixel, (canvas.height / 5) + pixel, canvas.width - (6 * pixel), canvas.height / 5);
                line2 = line2 + e.key;
                ctxText.fillText(line2, 4 * pixel, ((canvas.height / 5) * 2) - (2 * pixel));
            }
            else if (charCount < 31){
                ctxText.clearRect(canvas.width / 4 + pixel, 3 * pixel, (canvas.width / 4) * 3 - (4 * pixel), canvas.height / 5);
                line1 = line1 + e.key;
                ctxText.fillText(line1, canvas.width / 4 + (2 * pixel), (canvas.height / 5) - (2 * pixel));
            }
        });
    
    })
    
}())