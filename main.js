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
