var poseNet;

// const canvas = {
//     w: 550,
//     h: 500
// }
const canvas = {}

const sqr = {
    s: 100,
}

function preload() {
    canvas.top = document.querySelector("#header").clientHeight + 30;
    canvas.w = windowWidth / 2;
    canvas.h = windowHeight - canvas.top;
    if (canvas.h > canvas.w) {
        canvas.h = canvas.w;
    }
    sqr.x = canvas.w / 2;
    sqr.y = canvas.h / 2;
}

function setup() {
    var video = createCapture(VIDEO);
    // video.size(canvas.w, canvas.w * 3 / 4);
    video.size(canvas.w, canvas.h);
    video.position(0, canvas.top);

    var cnv = createCanvas(canvas.w, canvas.h);
    cnv.position(canvas.w, canvas.top);

    poseNet = ml5.poseNet(video, modelLoaded);
}
//Hoje
function draw() {
    background('#05a4fa');
    fill('#D7EBBA');
    rectMode(CENTER);
    square(sqr.x, sqr.y, sqr.s);
    //plano de fundo, preenchimento, centralizar modo, posição do quadrado
}

function modelLoaded() {
    console.log("poseNet is up!"); // carregar modelo
    poseNet.on('pose', gotPoses); //ligar 
}

function gotPoses(results) {
    //passar os modelo para o console

    if(results.length > 0){
        sqr.x = results[0].pose.nose.x;
        sqr.y = results[0].pose.nose.y;

        //pulsoDireita
        const pulsoD = {};
        pulsoD.x = results[0].pose.rightWrist.x;
        pulsoD.y = results[0].pose.rightWrist.y;
        //console.log(pulsoD);

        //pulsoEsquerda
        const pulsoE = {};
        pulsoE.x = results[0].pose.leftWrist.x;
        pulsoE.y = results[0].pose.leftWrist.y;
        //console.log(pulsoE);

        //aumentar e diminuir de acordo com a distancia dos pulsos
        const pulsoX = Math.abs(pulsoD.x - pulsoE.x);
        const pulsoY = Math.abs(pulsoD.y - pulsoE.y);


        if (pulsoX > pulsoY) {
            sqr.s = pulsoX;
        } else {
            sqr.s = pulsoY;
        }



    }



}
