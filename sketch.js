// webcam variables
let capture; // our webcam
let captureEvent; // callback when webcam is ready

// **NEW**: A state variable to toggle the background
let showVideoBackground = false;

/* - - Setup - - */
function setup() {
  createCanvas(windowWidth, windowHeight);
  captureWebcam(); // launch webcam
  // styling
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(20);
  fill('white');
}

/* - - Draw - - */
function draw() {

  // **MODIFIED**: Toggle between video and solid color background
  if (showVideoBackground) {
    // If true, draw the mirrored webcam feed
    push();
    centerOurStuff(); // center the webcam
    scale(-1, 1); // mirror webcam
    image(capture, -capture.scaledWidth, 0, capture.scaledWidth, capture.scaledHeight); // draw webcam
    pop();
  } else {
    // If false, draw a solid black background
    background(0);
  }


  /* TRACKING */
  // This part remains unchanged and will draw on top of the selected background
  if (mediaPipe.landmarks[0]) { // is hand tracking ready?

    // index finger
    let wristX = map(mediaPipe.landmarks[0][0].x, 1, 0, 0, capture.scaledWidth);
    let wristY = map(mediaPipe.landmarks[0][0].y, 0, 1, 0, capture.scaledHeight);
    let thumbCMCX = map(mediaPipe.landmarks[0][1].x, 1, 0, 0, capture.scaledWidth);
    let thumbCMCY = map(mediaPipe.landmarks[0][1].y, 0, 1, 0, capture.scaledHeight);

    let thumbMCPX = map(mediaPipe.landmarks[0][2].x, 1, 0, 0, capture.scaledWidth);
    let thumbMCPY = map(mediaPipe.landmarks[0][2].y, 0, 1, 0, capture.scaledHeight);

    let thumbIPX = map(mediaPipe.landmarks[0][3].x, 1, 0, 0, capture.scaledWidth);
    let thumbIPY = map(mediaPipe.landmarks[0][3].y, 0, 1, 0, capture.scaledHeight);

    let thumbTIPX = map(mediaPipe.landmarks[0][4].x, 1, 0, 0, capture.scaledWidth);
    let thumbTIPY = map(mediaPipe.landmarks[0][4].y, 0, 1, 0, capture.scaledHeight);

    let indexTIPX = map(mediaPipe.landmarks[0][8].x, 1, 0, 0, capture.scaledWidth);
    let indexTIPY = map(mediaPipe.landmarks[0][8].y, 0, 1, 0, capture.scaledHeight);

    let middleTIPX = map(mediaPipe.landmarks[0][12].x, 1, 0, 0, capture.scaledWidth);
    let middleTIPY = map(mediaPipe.landmarks[0][12].y, 0, 1, 0, capture.scaledHeight);

    let ringTIPX = map(mediaPipe.landmarks[0][16].x, 1, 0, 0, capture.scaledWidth);
    let ringTIPY = map(mediaPipe.landmarks[0][16].y, 0, 1, 0, capture.scaledHeight);

    let pinkMCPX = map(mediaPipe.landmarks[0][17].x, 1, 0, 0, capture.scaledWidth);
    let pinkMCPY = map(mediaPipe.landmarks[0][17].y, 0, 1, 0, capture.scaledHeight);

    let pinkPIPX = map(mediaPipe.landmarks[0][18].x, 1, 0, 0, capture.scaledWidth);
    let pinkPIPY = map(mediaPipe.landmarks[0][18].y, 0, 1, 0, capture.scaledHeight);

    let pinkDIPX = map(mediaPipe.landmarks[0][19].x, 1, 0, 0, capture.scaledWidth);
    let pinkDIPY = map(mediaPipe.landmarks[0][19].y, 0, 1, 0, capture.scaledHeight);

    let pinkTIPX = map(mediaPipe.landmarks[0][20].x, 1, 0, 0, capture.scaledWidth);
    let pinkTIPY = map(mediaPipe.landmarks[0][20].y, 0, 1, 0, capture.scaledHeight);

    // draw line
    push();
    centerOurStuff();
  
    let blue = dist(thumbTIPX, thumbTIPY, indexTIPX, indexTIPY);
    let red = dist(thumbTIPX, thumbTIPY, middleTIPX, middleTIPY);
    let green = dist(thumbTIPX, thumbTIPY, ringTIPX, ringTIPY);
    let alpha = dist(thumbTIPX, thumbTIPY, pinkTIPX, pinkTIPY);

    fill(red, green, blue, alpha);
    
    stroke('white');
    strokeWeight(alpha/10);

    strokeCap(ROUND);
    strokeJoin(ROUND);

    beginShape();
    vertex(wristX, wristY);
    vertex(thumbCMCX, thumbCMCY);
    vertex(thumbMCPX, thumbMCPY);
    vertex(thumbIPX, thumbIPY);
    vertex(thumbTIPX, thumbTIPY);
    vertex(indexTIPX, indexTIPY);
    vertex(middleTIPX, middleTIPY);
    vertex(ringTIPX, ringTIPY);
    vertex(pinkTIPX, pinkTIPY);
    vertex(pinkDIPX, pinkDIPY);
    vertex(pinkPIPX, pinkPIPY);
    vertex(pinkMCPX, pinkMCPY);
    endShape(CLOSE);
    pop();
  }
}

// **NEW**: Add a keyPressed function to handle the 'b' key
function keyPressed() {
  // Check if the key is 'b' (or 'B')
  if (key === 'b' || key === 'B') {
    // Flip the boolean variable
    showVideoBackground = !showVideoBackground;
    console.log(`Video background toggled. Show video: ${showVideoBackground}`);
  }
}

/* - - Helper functions - - */

// function: launch webcam
function captureWebcam() {
  capture = createCapture(
    {
      audio: false,
      video: {
        facingMode: "user",
      },
    },
    function (e) {
      captureEvent = e;
      console.log(captureEvent.getTracks()[0].getSettings());
      // do things when video ready
      // until then, the video element will have no dimensions, or default 640x480
      capture.srcObject = e;

      setCameraDimensions(capture);
      mediaPipe.predictWebcam(capture);
    }
  );
  capture.elt.setAttribute("playsinline", "");
  capture.hide();
}

// function: resize webcam depending on orientation
function setCameraDimensions(video) {
  if (!video.width || video.width <= 0) return; // Wait until video is ready

  const vidAspectRatio = video.width / video.height; // aspect ratio of the video
  const canvasAspectRatio = width / height; // aspect ratio of the canvas

  if (vidAspectRatio > canvasAspectRatio) {
    // Image is wider than canvas aspect ratio
    video.scaledHeight = height;
    video.scaledWidth = video.scaledHeight * vidAspectRatio;
  } else {
    // Image is taller than canvas aspect ratio
    video.scaledWidth = width;
    video.scaledHeight = video.scaledWidth / vidAspectRatio;
  }
}


// function: center our stuff
function centerOurStuff() {
  if (capture.scaledWidth) {
    translate(width / 2 - capture.scaledWidth / 2, height / 2 - capture.scaledHeight / 2); // center the webcam
  }
}

// function: window resize
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  setCameraDimensions(capture);
}
