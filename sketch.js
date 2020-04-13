//-----------------------------------------declaration of global variables--------------------------------
let trackAMT;
let cnv;
let r; //radius of circles
let buttonCenters;
let beatLength;
let cellWidth;
let cellHeight;
let trackListeners;
var indexClicked;
var trackClicked;
let h1Phrase, sn1Phrase, sn2Phrase, shPhrase, k1Pharse, bPhrase; //hnstrument phrase. Defines how the pattern is interpreted
let hh1, sn1, sn2, shaker, kick1, bass;
let h1Pat, sn1Pat, k1Pat, bPat, sn2Pat, shPat; //instrument pattern. Array of numbers that we can manipulate to make patterns
let drums; //Part. We will attach the phrase to the part, which will serve as our transport to drive the phrase

//-------------------------------------------setup function extends until draw function------------------------
function setup() {
  cnv = createCanvas(1600, 600);
  cnv.mousePressed(canvasPressed);
  background('grey');

  //---------------------------------------------------load sounds-----------------------------------------
  hh1 = loadSound('assets/hh.wav', () => {});
  sn1 = loadSound('assets/snare1.wav', () => {});
  sn2 = loadSound('assets/snare2.wav', () => {});
  shaker = loadSound('assets/shaker.wav', () => {});
  kick1 = loadSound('assets/kick.wav', () => {});
  bass = loadSound('assets/bass.wav', () => {});

  //---------------------------------------create pattens-----------------------------------------------
  h1Pat = [1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1];
  sn1Pat = [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0];
  sn2Pat = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1];
  shPat = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  k1Pat = [1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0];
  bPat = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0];
  stepPat = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32];

  //---------------------------------------add patterns to phrases------------------------------------------
  //add patterns to phrases

  h1Phrase = new p5.Phrase('hh1', (time) => {
    hh1.play(time)
  }, h1Pat);
  sn1Phrase = new p5.Phrase('sn1', (time) => {
    sn1.play(time)
  }, sn1Pat);
  sn2Phrase = new p5.Phrase('sn2', (time) => {
    sn2.play(time)
  }, sn2Pat);
  shPhrase = new p5.Phrase('shaker', (time) => {
    shaker.play(time)
  }, shPat);
  k1Pharse = new p5.Phrase('kick1', (time) => {
    kick1.play(time)
  }, k1Pat);
  bPharse = new p5.Phrase('bass', (time) => {
    bass.play(time)
  }, bPat);

  //--------------------------------------instantiate drums Part and connect phrases------------------------------------

  drums = new p5.Part();
  drums.addPhrase(h1Phrase);
  drums.addPhrase(sn1Phrase);
  drums.addPhrase(sn2Phrase);
  drums.addPhrase(shPhrase);
  drums.addPhrase(k1Pharse);
  drums.addPhrase(bPharse);
  //stepper phrase
  drums.addPhrase('seq', sequence, stepPat);
  //-------------------------------------------declare important variables------------------------------
  trackAMT = 6;
  beatLength = 32;
  r = 20;
  indexClicked = 0;
  trackClicked = 0;
  cellWidth = width / beatLength;
  cellHeight = height / trackAMT;
  buttonCenters = [];
  //--------------------------------------------array of track listener functions ------------------------------//
  //-------------------------------------calculate indexClicked and hard code trackClicked-----------------------//
  trackListeners = [
    function track1Listener(x1, y1, x2, y2) {
      let d = dist(x1, y1, x2, y2);
      if (d < r) {
        indexClicked = floor(beatLength * mouseX / width);
        trackClicked = 1;
      }
    },
    function track2Listener(x1, y1, x2, y2) {
      let d = dist(x1, y1, x2, y2);
      if (d < r) {
        indexClicked = floor(beatLength * mouseX / width);
        trackClicked = 2;
      }
    },
    function track3Listener(x1, y1, x2, y2) {
      let d = dist(x1, y1, x2, y2);
      if (d < r) {
        indexClicked = floor(beatLength * mouseX / width);
        trackClicked = 3;
      }
    },
    function track4Listener(x1, y1, x2, y2) {
      let d = dist(x1, y1, x2, y2);
      if (d < r) {
        indexClicked = floor(beatLength * mouseX / width);
        trackClicked = 4;
      }
    },
    function track5Listener(x1, y1, x2, y2) {
      let d = dist(x1, y1, x2, y2);
      if (d < r) {
        indexClicked = floor(beatLength * mouseX / width);
        trackClicked = 5;
      }
    },
    function track6Listener(x1, y1, x2, y2) {
      let d = dist(x1, y1, x2, y2);
      if (d < r) {
        indexClicked = floor(beatLength * mouseX / width);
        trackClicked = 6;
      }
    },
  ];

  //------------------------------------------------------bpm control slider--------------------------------------
  bpmCTRL = createSlider(80, 170, 60, 1);
  bpmCTRL.position(10, 150)
  bpmCTRL.input(() => {
    drums.setBPM(bpmCTRL.value());
  });
  drums.setBPM('80');

}
//---------------------------------------draw function!!!-------------------------------------------------//

//draw the grid at initialization
function draw() {
  ellipseMode(CENTER);
  drawTrack(h1Pat, whatY(1));
  drawTrack(sn1Pat, whatY(2));
  drawTrack(sn2Pat, whatY(3));
  drawTrack(shPat, whatY(4));
  drawTrack(k1Pat, whatY(5));
  drawTrack(bPat, whatY(6));
  getTrackCenters();
}

//-------------------------------------------------------logic for GUI--------------------------------------
//function to start and stop with the spacebar
function keyPressed() {
  if (key === " ") {
    if (hh1.isLoaded()) {
      if (!drums.isPlaying) {
        drums.metro.metroTicks = 0; //reset to 0 when started
        drums.loop();
      } else {
        drums.stop();
      }
    } else {
      console.log('oops audio hasnt loaded yet');
    }
  }
}

//function to make a step button
function makeButton(x, y) {
  ellipse(x, y, 40, 40);
}

//calculate the y axis point of the various tracks
function whatY(trackNum) {
  return (trackNum * cellHeight) - 40;

}

//draw a horizontal track given the track number and y axis point form the whatY function
function drawTrack(track, yCord) {
  for (var i = 0; i < beatLength; i++) {
    if (track[i] === 0) {
      noStroke();
      fill('rgba(255,101,80,0.2)');
      makeButton(i * cellWidth + 25, yCord);
    } else if (track[i] === 1) {
      noStroke();
      fill('rgba(0,255,0, 0.05)');
      makeButton(i * cellWidth + 25, yCord);
    }
  }
}


//calculates the x axis points of the various 16 step points
function getTrackCenters() {
  for (var i = 0; i < beatLength; i++) {
    buttonCenters.push(i * cellWidth + 25);
  }
}


//reset the index clicked and track clicked buttons to 0 so it only works if you hit a button
function reset() {
  indexClicked = 0;
  trackClicked = 0;
}

//attach the track listeners to the track buttons given the y axis coordinate and the corresponding listener function in the array
function attachTrackListener(y, listener) {
  for (var i = 0; i < beatLength; i++) {
    listener(mouseX, mouseY, buttonCenters[i], whatY(y));
  }
}

//////---------------------------------logic executed when the canvas is pressed----------------------//
function canvasPressed() {
  //attach track listeners
  attachTrackListener(1, trackListeners[0]);
  attachTrackListener(2, trackListeners[1]);
  attachTrackListener(3, trackListeners[2]);
  attachTrackListener(4, trackListeners[3]);
  attachTrackListener(5, trackListeners[4]);
  attachTrackListener(6, trackListeners[5]);
  console.log(indexClicked);
  console.log(trackClicked);
  if (trackClicked === 1) {
    if (h1Pat[indexClicked] === 0) {
      h1Pat[indexClicked] += 1;
    } else {
      h1Pat[indexClicked] += -1;
    }
    drawTrack(h1Pat, whatY(1));
    attachTrackListener(1, trackListeners[0]);

  } else if (trackClicked === 2) {
    if (sn1Pat[indexClicked] === 0) {
      sn1Pat[indexClicked] += 1;
    } else {
      sn1Pat[indexClicked] += -1;
    }
    drawTrack(sn1Pat, whatY(2));
    attachTrackListener(2, trackListeners[1]);
  } else if (trackClicked === 3) {
    if (sn2Pat[indexClicked] === 0) {
      sn2Pat[indexClicked] += 1;
    } else {
      sn2Pat[indexClicked] += -1;
    }
    drawTrack(sn2Pat, whatY(3));
    attachTrackListener(3, trackListeners[2]);
  } else if (trackClicked === 4) {
    if (shPat[indexClicked] === 0) {
      shPat[indexClicked] += 1;
    } else {
      shPat[indexClicked] += -1;
    }
    drawTrack(shPat, whatY(4));
    attachTrackListener(4, trackListeners[3]);
  } else if (trackClicked === 5) {
    if (k1Pat[indexClicked] === 0) {
      k1Pat[indexClicked] += 1;
    } else {
      k1Pat[indexClicked] += -1;
    }
    drawTrack(k1Pat, whatY(5));
    attachTrackListener(5, trackListeners[4]);
  } else if (trackClicked === 6) {
    if (bPat[indexClicked] === 0) {
      bPat[indexClicked] += 1;
    } else {
      bPat[indexClicked] += -1;
    }
    drawTrack(bPat, whatY(6));
    attachTrackListener(6, trackListeners[5]);
  }
  reset();
}

//playhead for step sequencer animation
function sequence(time, beatIndex) {
  setTimeout(() => {
    drawPlayhead(beatIndex);
  }, time * 1300);
}

function drawPlayhead(beatIndex) {
  for(var i = 0; i< trackAMT+1; i++){
    fill('blue');
    makeButton(buttonCenters[beatIndex], whatY(i));
  }
}