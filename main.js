var poseNet;

const canvas = {
    w: 550,
    h: 500
}

const square = {
    side: 200
}

function setup () {
    var video = createCapture(VIDEO);
    video.size(canvas.w, canvas.w * 3 / 4);
    video.position(0, 160);


    var cnv = createCanvas(canvas.w,canvas.h);
    cnv.position(canvas.w, 160);

    poseNet = ml5.poseNet(video, modelLoaded);
}

function draw() {
    background('#05a4fa');

}

function modelLoaded() {
    console.log("poseNet is up!");
    poseNet.on('pose', gotPoses);
}

function gotPoses(results) {
    console.log(results);
}