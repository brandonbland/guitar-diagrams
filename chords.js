
//define canvas
const c = document.getElementById("canvas");
const ctx = c.getContext("2d");

//settings
let
  canvasWidth = 300,
  canvasHeight = 350,
  marginLeft = canvasWidth * .17,
  marginRight = canvasWidth * .9,
  marginTop = canvasHeight * .3,
  marginBottom = canvasHeight * .9,
  numberHorzontalLines = 5,
  numberVerticalLines = 6,
  lineWidth = 2,
  // topNut = true, //not needed because functions will draw nuts
  leftNut = false,
  nutWidth = lineWidth * 4,
  lineCap = 'round',
  nutLineCap = 'round',
  bodyBackgroundColor = 'white',
  canvasBackground = 'white',
  canvasBorderColor = 'black',
  canvasBorderWidth = '0px',
  mode = 'draw',
  circleSizePercentage = .35,
  guitarWidth = marginRight - marginLeft,
  guitarHeight = marginBottom - marginTop,
  distanceBetweenVerticalLines = guitarWidth/(numberVerticalLines - 1),
  distanceBetweenHorizontalLines = guitarHeight/(numberHorzontalLines - 1),
  markerX = new Array(),
  markerY = new Array(),
  rect = canvas.getBoundingClientRect()
  whiteRectangleWidth = distanceBetweenVerticalLines *.9,
  whiteRectangleHeight = distanceBetweenHorizontalLines * .65,
  openWhiteRectangleWidth = distanceBetweenVerticalLines * .7,
  openWhiteRectangleHeight = distanceBetweenHorizontalLines * .6,
  aboveTopNutYRectPosition = marginTop * .65,
  blackRectangleWidth = distanceBetweenVerticalLines *.7,
  blackRectangleHeight = distanceBetweenHorizontalLines * .6,
  fontSizeForOpenShapes = '27', //in pixels
  fontForOpenShapes = 'Arial'
  fontSizeForTitle = aboveTopNutYRectPosition * .8, //in pixels
  fontForTitle = 'Times',
  leftSideTextMarker = marginLeft/3, //adjust as needed for text on left side
  singleDigitNoteTextSize = (distanceBetweenVerticalLines * circleSizePercentage) *2,
  doubleDigitNoteTextSize = singleDigitNoteTextSize * .7,
  fontForFrets = 'Times'
  title = '',
  brand = 'GuitarLearningTools.com',
  fontForBrand = 'Verdana',
  fontSizeForBrand = 16
  ;//end settings


//Note object prototype
function Note(x, y, state) {
  this.x = x;
  this.y = y;
  this.state = '';
  this.xClickableLeft = this.x - (distanceBetweenVerticalLines * .3);
  this.xClickableRight = this.x + (distanceBetweenVerticalLines * .3);
  this.yClickableBottom = this.y - (distanceBetweenVerticalLines * .3);
  this.yClickableTop = this.y + (distanceBetweenVerticalLines * .3);
}

//set markerX array positions
//first vertical line is iteration 1 and increases to the right
//left most vertical line is markerX[1], 2nd line is markerX[2], etc
//markerX[0] will be used for left side text
for (i = 0; i <= numberVerticalLines; i++) {
  if (i === 0) {
    markerX[i] = leftSideTextMarker;
  }
  else if (i === 1) {
    markerX[i] = marginLeft;
  }
  else {
    markerX[i] = marginLeft + distanceBetweenVerticalLines * (i-1);
  }
}

//setMarkerY array positions
//open string position is markerY[0]
//first markerY[1] is halfway between horizontal line 1 and 2
for (i = 0; i <= numberHorzontalLines -1; i++) {
  if (i === 0) {
    markerY[i] = marginTop;
  }
  else if (i === 1) {
    markerY[i] = marginTop + (distanceBetweenHorizontalLines/2);
  }
  else {
    markerY[i] = marginTop + (distanceBetweenHorizontalLines/2) + (distanceBetweenHorizontalLines * (i-1));
  }
}

//create objects for notes
//supports 8 strings, up to 6 horizontal lines
//x0s
let x0y0 = new Note(markerX[0], markerY[0], '');
let x0y1 = new Note(markerX[0], markerY[1], '');
let x0y2 = new Note(markerX[0], markerY[2], '');
let x0y3 = new Note(markerX[0], markerY[3], '');
let x0y4 = new Note(markerX[0], markerY[4], '');
let x0y5 = new Note(markerX[0], markerY[5], '');
let x0y6 = new Note(markerX[0], markerY[6], '');

//x1s
let x1y0 = new Note(markerX[1], markerY[0], '');
let x1y1 = new Note(markerX[1], markerY[1], '');
let x1y2 = new Note(markerX[1], markerY[2], '');
let x1y3 = new Note(markerX[1], markerY[3], '');
let x1y4 = new Note(markerX[1], markerY[4], '');
let x1y5 = new Note(markerX[1], markerY[5], '');
let x1y6 = new Note(markerX[1], markerY[6], '');

//x2s
let x2y0 = new Note(markerX[2], markerY[0], '');
let x2y1 = new Note(markerX[2], markerY[1], '');
let x2y2 = new Note(markerX[2], markerY[2], '');
let x2y3 = new Note(markerX[2], markerY[3], '');
let x2y4 = new Note(markerX[2], markerY[4], '');
let x2y5 = new Note(markerX[2], markerY[5], '');
let x2y6 = new Note(markerX[2], markerY[6], '');

//x3s
let x3y0 = new Note(markerX[3], markerY[0], '');
let x3y1 = new Note(markerX[3], markerY[1], '');
let x3y2 = new Note(markerX[3], markerY[2], '');
let x3y3 = new Note(markerX[3], markerY[3], '');
let x3y4 = new Note(markerX[3], markerY[4], '');
let x3y5 = new Note(markerX[3], markerY[5], '');
let x3y6 = new Note(markerX[3], markerY[6], '');

//x4s
let x4y0 = new Note(markerX[4], markerY[0], '');
let x4y1 = new Note(markerX[4], markerY[1], '');
let x4y2 = new Note(markerX[4], markerY[2], '');
let x4y3 = new Note(markerX[4], markerY[3], '');
let x4y4 = new Note(markerX[4], markerY[4], '');
let x4y5 = new Note(markerX[4], markerY[5], '');
let x4y6 = new Note(markerX[4], markerY[6], '');

//x5s
let x5y0 = new Note(markerX[5], markerY[0], '');
let x5y1 = new Note(markerX[5], markerY[1], '');
let x5y2 = new Note(markerX[5], markerY[2], '');
let x5y3 = new Note(markerX[5], markerY[3], '');
let x5y4 = new Note(markerX[5], markerY[4], '');
let x5y5 = new Note(markerX[5], markerY[5], '');
let x5y6 = new Note(markerX[5], markerY[6], '');

//x6s
let x6y0 = new Note(markerX[6], markerY[0], '');
let x6y1 = new Note(markerX[6], markerY[1], '');
let x6y2 = new Note(markerX[6], markerY[2], '');
let x6y3 = new Note(markerX[6], markerY[3], '');
let x6y4 = new Note(markerX[6], markerY[4], '');
let x6y5 = new Note(markerX[6], markerY[5], '');
let x6y6 = new Note(markerX[6], markerY[6], '');

//x7s for 7 string guitar
let x7y0 = new Note(markerX[7], markerY[0], '');
let x7y1 = new Note(markerX[7], markerY[1], '');
let x7y2 = new Note(markerX[7], markerY[2], '');
let x7y3 = new Note(markerX[7], markerY[3], '');
let x7y4 = new Note(markerX[7], markerY[4], '');
let x7y5 = new Note(markerX[7], markerY[5], '');
let x7y6 = new Note(markerX[7], markerY[6], '');

//x8s for 8 string guitar
let x8y0 = new Note(markerX[8], markerY[0], '');
let x8y1 = new Note(markerX[8], markerY[1], '');
let x8y2 = new Note(markerX[8], markerY[2], '');
let x8y3 = new Note(markerX[8], markerY[3], '');
let x8y4 = new Note(markerX[8], markerY[4], '');
let x8y5 = new Note(markerX[8], markerY[5], '');
let x8y6 = new Note(markerX[8], markerY[6], '');



  //set HTML body styles
  $('body').css({
    'background-color': bodyBackgroundColor
  });

  //reset canvas button
  $('#reset').click(function(){
    location.reload();
  });

  //button group to switch modes
  $('#drawButton').click(function(){
    $('#drawLI').toggleClass('active');
    $('#textLI').toggleClass('active');
    mode = 'draw';
  });

  $('#textButton').click(function(){
    $('#drawLI').toggleClass('active');
    $('#textLI').toggleClass('active');
    mode = 'text';
  });


  //set canvas HTML attributes
  $('#canvas').attr({
    'width': canvasWidth,
    'height': canvasHeight
  });

  //set canvas styles
  $('#canvas').css({
    'background-color': canvasBackground,
    'border-color' : canvasBorderColor,
    'border-style' : 'solid',
    'border-width' : canvasBorderWidth
  });




//download function
function download() {
  var dt = c.toDataURL('image/jpeg');
  this.href = dt;
};
document.getElementById("downloadLink").addEventListener('click', download, false);


let x = marginLeft;
let y = marginTop;

//draw white rectangle behind guitar
ctx.beginPath();
ctx.fillStyle = 'black';
ctx.rect(0, 0, canvasWidth, canvasHeight);
ctx.fill();
ctx.closePath();

//draw white rectangle behind guitar
ctx.beginPath();
ctx.fillStyle = 'white';
ctx.rect(1, 1, canvasWidth-2, canvasHeight-2);
ctx.fill();
ctx.closePath();


//draw vertical lines
for (i = 1; i <= numberVerticalLines; i++) {
  ctx.beginPath();
  ctx.lineCap = lineCap;
  ctx.lineWidth = lineWidth;
  ctx.moveTo(x, marginTop);
  ctx.lineTo(x, marginBottom);
  ctx.stroke();
  ctx.closePath();
  x += distanceBetweenVerticalLines;
}

//draw horizontal lines
for (i = 1; i <= numberHorzontalLines; i++) {
  ctx.beginPath();
  ctx.lineCap = lineCap;
  ctx.lineWidth = lineWidth;
  ctx.moveTo(marginLeft, y);
  ctx.lineTo(marginRight, y);
  ctx.stroke();
  ctx.closePath();
  y += distanceBetweenHorizontalLines
}

//write branding
ctx.beginPath();
ctx.fillStyle = 'grey';
ctx.font = fontSizeForBrand + 'px ' + fontForBrand;
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';
ctx.fillText(brand, canvasWidth/2, canvasHeight-15, canvasWidth);
ctx.closePath();



//draw nut (if needed)
function drawTopNut() {
  //if (topNut) {
    ctx.beginPath();
    ctx.lineCap = nutLineCap;
    ctx.lineWidth = nutWidth;
    ctx.moveTo(marginLeft, marginTop);
    ctx.lineTo(marginRight, marginTop);
    ctx.stroke();
    ctx.closePath();
  //}
}

//draw nut on left side (if needed)
if (leftNut) {
  ctx.beginPath();
  ctx.lineCap = nutLineCap;
  ctx.lineWidth = nutWidth;
  ctx.moveTo(marginLeft, marginTop);
  ctx.lineTo(marginLeft, marginBottom);
  ctx.stroke();
  ctx.closePath();
}

//set all states to blank for reset function
//x0s
x0y1.state = '';
x0y2.state = '';
x0y3.state = '';
x0y4.state = '';
x0y5.state = '';
x0y6.state = '';

//x1s
x1y1.state = '';
x1y2.state = '';
x1y3.state = '';
x1y4.state = '';
x1y5.state = '';
x1y6.state = '';

//x2s
x2y1.state = '';
x2y2.state = '';
x2y3.state = '';
x2y4.state = '';
x2y5.state = '';
x2y6.state = '';

//x3s
x3y1.state = '';
x3y2.state = '';
x3y3.state = '';
x3y4.state = '';
x3y5.state = '';
x3y6.state = '';

//x4s
x4y1.state = '';
x4y2.state = '';
x4y3.state = '';
x4y4.state = '';
x4y5.state = '';
x4y6.state = '';

//x5s
x5y1.state = '';
x5y2.state = '';
x5y3.state = '';
x5y4.state = '';
x5y5.state = '';
x5y6.state = '';

//x6s
x6y1.state = '';
x6y2.state = '';
x6y3.state = '';
x6y4.state = '';
x6y5.state = '';
x6y6.state = '';

//x7s
x7y1.state = '';
x7y2.state = '';
x7y3.state = '';
x7y4.state = '';
x7y5.state = '';
x7y6.state = '';

//x8s
x8y1.state = '';
x8y2.state = '';
x8y3.state = '';
x8y4.state = '';
x8y5.state = '';
x8y6.state = '';


//returns mouse position
function getMousePos(canvas, e) {
  var rect = canvas.getBoundingClientRect();
    return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top
  };
}


  //displays mouse position
  // $('#canvas').mousemove(function(e){
  //   var mousePos = getMousePos(c, e);
  //   x = mousePos.x;
  //   y = mousePos.y;
  //   $('#scroll').html('mousemove: ' + x + ',' + y);
  // });

  //determines what to do when canvas is clicked
  $('#canvas').mousedown(function(e){
    var mousePos = getMousePos(c, e);
    x = mousePos.x;
    y = mousePos.y;
    determineActionNeeded(x,y);
  });

  $('#chordTitleButton').click(function(){
    title = $('#chordTitle').val();
    printTitle(title);
  });

  $('#chordTitle').keypress(function(e){
    if (e.which == 13) {
      title = $('#chordTitle').val();
      printTitle(title);
      return false;
    }
  });

  $('#chordClearTitleButton').click(function(){
    clearTitle();
  });

  $('#drawNut').click(function(){
    drawTopNut();
  });


  //listen for clicks on save button
  $('#downloadLink').click(function(){
    document.getElementById("downloadLink").download = title + '-chord.jpg';
  });

//title functions
function printTitle(t) {


  ctx.beginPath();
  ctx.fillStyle = 'white';
  ctx.rect(1, 1, canvasWidth-2, aboveTopNutYRectPosition);
  ctx.fill();
  ctx.closePath();

  ctx.beginPath();
  ctx.fillStyle = 'black';
  ctx.font = fontSizeForTitle + 'px ' + fontForTitle;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(t, canvasWidth/2, aboveTopNutYRectPosition/2, canvasWidth);
  ctx.closePath();

  $('#chordTitle').val('').blur();
  
}

function clearTitle() {
  ctx.beginPath();
  ctx.fillStyle = 'white';
  ctx.rect(1, 1, canvasWidth-2, aboveTopNutYRectPosition);
  ctx.fill();
  ctx.closePath();
  title = '';

  $('#chordTitle').val('').focus();
}

//draw shapes
function drawShapes(x,y,state) {
  if (state === '') {
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.rect(x - (whiteRectangleWidth/2), y -(whiteRectangleHeight/2), whiteRectangleWidth, whiteRectangleHeight);
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.arc(x,y,(distanceBetweenVerticalLines * circleSizePercentage),0,2*Math.PI);
    ctx.fill();
    ctx.closePath();
    return "circle";
  }

  //rectangle functionality commented out intentionally
  /************************************************************/
  // if (state === "circle") {
  //   ctx.beginPath();
  //   ctx.fillStyle = "white";
  //   ctx.rect(x - (whiteRectangleWidth/2), y -(whiteRectangleHeight/2), whiteRectangleWidth, whiteRectangleHeight);
  //   ctx.fill();
  //   ctx.closePath();
  //
  //   ctx.beginPath();
  //   ctx.fillStyle = "black";
  //   ctx.rect(x - (blackRectangleWidth/2), y -(blackRectangleHeight/2), blackRectangleWidth, blackRectangleHeight);
  //   // ctx.arc(x,y,(distanceBetweenVerticalLines * circleSizePercentage),0,2*Math.PI);
  //   ctx.fill();
  //   ctx.closePath();
  //   return "square";
  // }
  /************************************************************/

  if (state === "circle") {
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.rect(x - (whiteRectangleWidth/2), y -(whiteRectangleHeight/2), whiteRectangleWidth, whiteRectangleHeight);
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.lineCap = lineCap;
    ctx.lineWidth = lineWidth;
    ctx.moveTo(x, (y + (distanceBetweenHorizontalLines/2)));
    ctx.lineTo(x, (y - (distanceBetweenHorizontalLines/2)));
    ctx.stroke();
    ctx.closePath();
    return '';
  }
}

//draw shapes above nut
function drawOpenShapesAboveNut(x,y,state) {

  if (state === ''){
    ctx.beginPath();
    ctx.fillStyle = 'white';
    ctx.rect(x - (openWhiteRectangleWidth/2), aboveTopNutYRectPosition, openWhiteRectangleWidth, openWhiteRectangleHeight);
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.fillStyle = 'black';
    ctx.font = fontSizeForOpenShapes + 'px ' + fontForOpenShapes;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('o', x, aboveTopNutYRectPosition + (openWhiteRectangleHeight/2));
    ctx.closePath();
    return 'circle';
  }

  else if (state === 'circle'){
    ctx.beginPath();
    ctx.fillStyle = 'white';
    ctx.rect(x - (openWhiteRectangleWidth/2), aboveTopNutYRectPosition, openWhiteRectangleWidth, openWhiteRectangleHeight);
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.fillStyle = 'black';
    ctx.font = fontSizeForOpenShapes + 'px ' + fontForOpenShapes;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('x', x, aboveTopNutYRectPosition + (openWhiteRectangleHeight/2));
    ctx.closePath();
    return 'x';
  }

  else if (state === 'x'){
    ctx.beginPath();
    ctx.fillStyle = 'white';
    ctx.rect(x - (openWhiteRectangleWidth/2), aboveTopNutYRectPosition, openWhiteRectangleWidth, openWhiteRectangleHeight);
    ctx.fill();
    ctx.closePath();

    return '';
  }
}

function leftSideNumber(x,y, state) {
  if (state === '') {
    bootbox.prompt({
      size: 'small',
      title: 'Enter number...',
      inputType: 'number',
      backdrop: true,
      onEscape: true,
      callback: function(result){
        let num = result;

        if (num !== null) {
          if (num.length <= 2) {
            ctx.beginPath();
            ctx.fillStyle = 'white';
            ctx.rect(x - (openWhiteRectangleWidth/2), y - (openWhiteRectangleHeight/2), openWhiteRectangleWidth, openWhiteRectangleHeight);
            ctx.fill();
            ctx.closePath();
  
            ctx.beginPath();
            ctx.fillStyle = 'black';
            ctx.font = fontSizeForOpenShapes + 'px ' + fontForOpenShapes;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(num, x, y);
            ctx.closePath();
            }
            else {
              this.modal('hide');
              bootbox.alert({
                size: 'small',
                backdrop: true,
                onEscape: true,
                message: 'Number of characters must be 2 or less.',
              });
            }
        }
        return 'filled';
      },
    });
  }

  if (state !== '') {
    ctx.beginPath();
    ctx.fillStyle = 'white';
    ctx.rect(x - (openWhiteRectangleWidth/2), y - (openWhiteRectangleHeight/2), openWhiteRectangleWidth, openWhiteRectangleHeight);
    ctx.fill();
    ctx.closePath();

    return '';
  }
}

function writeText(x,y) {
  bootbox.prompt({
    size: 'small',
    title: 'Enter text...',
    backdrop: true,
    onEscape: true,
    callback: function(result){
      let entry = result;
      ctx.textAlign = "center";
      ctx.textBaseline = 'middle';

      if (entry !== null) {
        if (entry.length  === 1) {
          drawShapes(x,y,'');
          ctx.fillStyle = "white";
          ctx.font = singleDigitNoteTextSize + 'px ' + fontForFrets;
          ctx.fillText(entry, x, y);
        }
        else if (entry.length === 2){
          drawShapes(x,y,'');
          ctx.fillStyle = "white";
          ctx.font = doubleDigitNoteTextSize + 'px ' + fontForFrets;
          ctx.fillText(entry, x, y);
        }
        else if (entry > 2) {
          this.modal('hide');
          bootbox.alert({
            size: 'small',
            backdrop: true,
            onEscape: true,
            message: 'Number of characters must be 2 or less.',
          });
        }
        // return 'filled';
      }
    }
  });

}



//determineActionNeeded function
function determineActionNeeded(x,y) {

  //if open string
  if (y > aboveTopNutYRectPosition && y < x1y0.y) {

    if (x > x1y0.xClickableLeft && x < x1y0.xClickableRight) {
      x1y0.state = drawOpenShapesAboveNut(x1y0.x, x1y0.y, x1y0.state)
    }
    else if (x > x2y0.xClickableLeft && x < x2y0.xClickableRight) {
      x2y0.state = drawOpenShapesAboveNut(x2y0.x, x2y0.y, x2y0.state)
    }
    else if (x > x3y0.xClickableLeft && x < x3y0.xClickableRight) {
      x3y0.state = drawOpenShapesAboveNut(x3y0.x, x3y0.y, x3y0.state)
    }
    else if (x > x4y0.xClickableLeft && x < x4y0.xClickableRight) {
      x4y0.state = drawOpenShapesAboveNut(x4y0.x, x4y0.y, x4y0.state)
    }
    else if (x > x5y0.xClickableLeft && x < x5y0.xClickableRight) {
      x5y0.state = drawOpenShapesAboveNut(x5y0.x, x5y0.y, x5y0.state)
    }
    else if (x > x6y0.xClickableLeft && x < x6y0.xClickableRight) {
      x6y0.state = drawOpenShapesAboveNut(x6y0.x, x6y0.y, x6y0.state)
    }
    else if (x > x7y0.xClickableLeft && x < x7y0.xClickableRight) {
      x7y0.state = drawOpenShapesAboveNut(x7y0.x, x7y0.y, x7y0.state)
    }
    else if (x > x8y0.xClickableLeft && x < x8y0.xClickableRight) {
      x8y0.state = drawOpenShapesAboveNut(x8y0.x, x8y0.y, x8y0.state)
    }
  }

  //if 1st horizontal line
  if (y > x1y1.yClickableBottom && y < x1y1.yClickableTop) {

    //if left side clicked for numbers, any mode
    if (x < x0y1.xClickableRight) {
      x0y1.state = leftSideNumber(x0y1.x, x0y1.y, x0y1.state);
    }
    //if spot on guitar is clicked
    else if (x > x1y1.xClickableLeft && x < x1y1.xClickableRight) {
      if (mode === 'draw') {
        x1y1.state = drawShapes(x1y1.x, x1y1.y, x1y1.state);
      }
      else if (mode === 'text' && x1y1.state !== '') {
        writeText(x1y1.x, x1y1.y);
      }
    }
    else if (x > x2y1.xClickableLeft && x < x2y1.xClickableRight) {
      if (mode === 'draw') {
        x2y1.state = drawShapes(x2y1.x, x2y1.y, x2y1.state);
      }
      else if (mode === 'text' && x2y1.state !== '') {
        writeText(x2y1.x, x2y1.y);
      }
    }
    else if (x > x3y1.xClickableLeft && x < x3y1.xClickableRight) {
      if (mode === 'draw') {
        x3y1.state = drawShapes(x3y1.x, x3y1.y, x3y1.state);
      }
      else if (mode === 'text' && x3y1.state !== '') {
        writeText(x3y1.x, x3y1.y);
      }
    }
    else if (x > x4y1.xClickableLeft && x < x4y1.xClickableRight) {
      if (mode === 'draw') {
        x4y1.state = drawShapes(x4y1.x, x4y1.y, x4y1.state);
      }
      else if (mode === 'text' && x4y1.state !== '') {
        writeText(x4y1.x, x4y1.y);
      }
    }
    else if (x > x5y1.xClickableLeft && x < x5y1.xClickableRight) {
      if (mode === 'draw') {
        x5y1.state = drawShapes(x5y1.x, x5y1.y, x5y1.state);
      }
      else if (mode === 'text' && x5y1.state !== '') {
        writeText(x5y1.x, x5y1.y);
      }
    }
    else if (x > x6y1.xClickableLeft && x < x6y1.xClickableRight) {
      if (mode === 'draw') {
        x6y1.state = drawShapes(x6y1.x, x6y1.y, x6y1.state);
      }
      else if (mode === 'text' && x6y1.state !== '') {
        writeText(x6y1.x, x6y1.y);
      }
    }
    else if (x > x7y1.xClickableLeft && x < x7y1.xClickableRight) {
      if (mode === 'draw') {
        x7y1.state = drawShapes(x7y1.x, x7y1.y, x7y1.state);
      }
      else if (mode === 'text' && x7y1.state !== '') {
        writeText(x7y1.x, x7y1.y);
      }
    }
    else if (x > x8y1.xClickableLeft && x < x8y1.xClickableRight) {
      if (mode === 'draw') {
        x8y1.state = drawShapes(x8y1.x, x8y1.y, x8y1.state);
      }
      else if (mode === 'text' && x8y1.state !== '') {
        writeText(x8y1.x, x8y1.y);
      }
    }
  }

  //if 2nd horizontal line
  if (y > x1y2.yClickableBottom && y < x1y2.yClickableTop) {

    //if left side clicked for numbers, any mode
    if (x < x0y2.xClickableRight) {
      x0y2.state = leftSideNumber(x0y2.x, x0y2.y, x0y2.state);
    }
    //if spot on guitar is clicked
    else if (x > x1y2.xClickableLeft && x < x1y2.xClickableRight) {
      if (mode === 'draw') {
        x1y2.state = drawShapes(x1y2.x, x1y2.y, x1y2.state);
      }
      else if (mode === 'text' && x1y2.state !== '') {
        writeText(x1y2.x, x1y2.y);
      }
    }
    else if (x > x2y2.xClickableLeft && x < x2y2.xClickableRight) {
      if (mode === 'draw') {
        x2y2.state = drawShapes(x2y2.x, x2y2.y, x2y2.state);
      }
      else if (mode === 'text' && x2y2.state !== '') {
        writeText(x2y2.x, x2y2.y);
      }
    }
    else if (x > x3y2.xClickableLeft && x < x3y2.xClickableRight) {
      if (mode === 'draw') {
        x3y2.state = drawShapes(x3y2.x, x3y2.y, x3y2.state);
      }
      else if (mode === 'text' && x3y2.state !== '') {
        writeText(x3y2.x, x3y2.y);
      }
    }
    else if (x > x4y2.xClickableLeft && x < x4y2.xClickableRight) {
      if (mode === 'draw') {
        x4y2.state = drawShapes(x4y2.x, x4y2.y, x4y2.state);
      }
      else if (mode === 'text' && x4y2.state !== '') {
        writeText(x4y2.x, x4y2.y);
      }
    }
    else if (x > x5y2.xClickableLeft && x < x5y2.xClickableRight) {
      if (mode === 'draw') {
        x5y2.state = drawShapes(x5y2.x, x5y2.y, x5y2.state);
      }
      else if (mode === 'text' && x5y2.state !== '') {
        writeText(x5y2.x, x5y2.y);
      }
    }
    else if (x > x6y2.xClickableLeft && x < x6y2.xClickableRight) {
      if (mode === 'draw') {
        x6y2.state = drawShapes(x6y2.x, x6y2.y, x6y2.state);
      }
      else if (mode === 'text' && x6y2.state !== '') {
        writeText(x6y2.x, x6y2.y);
      }
    }
    else if (x > x7y2.xClickableLeft && x < x7y2.xClickableRight) {
      if (mode === 'draw') {
        x7y2.state = drawShapes(x7y2.x, x7y2.y, x7y2.state);
      }
      else if (mode === 'text' && x7y2.state !== '') {
        writeText(x7y2.x, x7y2.y);
      }
    }
    else if (x > x8y2.xClickableLeft && x < x8y2.xClickableRight) {
      if (mode === 'draw') {
        x8y2.state = drawShapes(x8y2.x, x8y2.y, x8y2.state);
      }
      else if (mode === 'text' && x8y2.state !== '') {
        writeText(x8y2.x, x8y2.y);
      }
    }
  }

  //if 3rd horizontal line
  if (y > x1y3.yClickableBottom && y < x1y3.yClickableTop) {

    //if left side clicked for numbers, any mode
    if (x < x0y3.xClickableRight) {
      x0y3.state = leftSideNumber(x0y3.x, x0y3.y, x0y3.state);
    }
    //if spot on guitar is clicked
    else if (x > x1y3.xClickableLeft && x < x1y3.xClickableRight) {
      if (mode === 'draw') {
        x1y3.state = drawShapes(x1y3.x, x1y3.y, x1y3.state);
      }
      else if (mode === 'text' && x1y3.state !== '') {
        writeText(x1y3.x, x1y3.y);
      }
    }
    else if (x > x2y3.xClickableLeft && x < x2y3.xClickableRight) {
      if (mode === 'draw') {
        x2y3.state = drawShapes(x2y3.x, x2y3.y, x2y3.state);
      }
      else if (mode === 'text' && x2y3.state !== '') {
        writeText(x2y3.x, x2y3.y);
      }
    }
    else if (x > x3y3.xClickableLeft && x < x3y3.xClickableRight) {
      if (mode === 'draw') {
        x3y3.state = drawShapes(x3y3.x, x3y3.y, x3y3.state);
      }
      else if (mode === 'text' && x3y3.state !== '') {
        writeText(x3y3.x, x3y3.y);
      }
    }
    else if (x > x4y3.xClickableLeft && x < x4y3.xClickableRight) {
      if (mode === 'draw') {
        x4y3.state = drawShapes(x4y3.x, x4y3.y, x4y3.state);
      }
      else if (mode === 'text' && x4y3.state !== '') {
        writeText(x4y3.x, x4y3.y);
      }
    }
    else if (x > x5y3.xClickableLeft && x < x5y3.xClickableRight) {
      if (mode === 'draw') {
        x5y3.state = drawShapes(x5y3.x, x5y3.y, x5y3.state);
      }
      else if (mode === 'text' && x5y3.state !== '') {
        writeText(x5y3.x, x5y3.y);
      }
    }
    else if (x > x6y3.xClickableLeft && x < x6y3.xClickableRight) {
      if (mode === 'draw') {
        x6y3.state = drawShapes(x6y3.x, x6y3.y, x6y3.state);
      }
      else if (mode === 'text' && x6y3.state !== '') {
        writeText(x6y3.x, x6y3.y);
      }
    }
    else if (x > x7y3.xClickableLeft && x < x7y3.xClickableRight) {
      if (mode === 'draw') {
        x7y3.state = drawShapes(x7y3.x, x7y3.y, x7y3.state);
      }
      else if (mode === 'text' && x7y3.state !== '') {
        writeText(x7y3.x, x7y3.y);
      }
    }
    else if (x > x8y3.xClickableLeft && x < x8y3.xClickableRight) {
      if (mode === 'draw') {
        x8y3.state = drawShapes(x8y3.x, x8y3.y, x8y3.state);
      }
      else if (mode === 'text' && x8y3.state !== '') {
        writeText(x8y3.x, x8y3.y);
      }
    }
  }

  //if 4th horizontal line
  if (y > x1y4.yClickableBottom && y < x1y4.yClickableTop) {

    //if left side clicked for numbers, any mode
    if (x < x0y4.xClickableRight) {
      x0y4.state = leftSideNumber(x0y4.x, x0y4.y, x0y4.state);
    }
    //if spot on guitar is clicked
    else if (x > x1y4.xClickableLeft && x < x1y4.xClickableRight) {
      if (mode === 'draw') {
        x1y4.state = drawShapes(x1y4.x, x1y4.y, x1y4.state);
      }
      else if (mode === 'text' && x1y4.state !== '') {
        writeText(x1y4.x, x1y4.y);
      }
    }
    else if (x > x2y4.xClickableLeft && x < x2y4.xClickableRight) {
      if (mode === 'draw') {
        x2y4.state = drawShapes(x2y4.x, x2y4.y, x2y4.state);
      }
      else if (mode === 'text' && x2y4.state !== '') {
        writeText(x2y4.x, x2y4.y);
      }
    }
    else if (x > x3y4.xClickableLeft && x < x3y4.xClickableRight) {
      if (mode === 'draw') {
        x3y4.state = drawShapes(x3y4.x, x3y4.y, x3y4.state);
      }
      else if (mode === 'text' && x3y4.state !== '') {
        writeText(x3y4.x, x3y4.y);
      }
    }
    else if (x > x4y4.xClickableLeft && x < x4y4.xClickableRight) {
      if (mode === 'draw') {
        x4y4.state = drawShapes(x4y4.x, x4y4.y, x4y4.state);
      }
      else if (mode === 'text' && x4y4.state !== '') {
        writeText(x4y4.x, x4y4.y);
      }
    }
    else if (x > x5y4.xClickableLeft && x < x5y4.xClickableRight) {
      if (mode === 'draw') {
        x5y4.state = drawShapes(x5y4.x, x5y4.y, x5y4.state);
      }
      else if (mode === 'text' && x5y4.state !== '') {
        writeText(x5y4.x, x5y4.y);
      }
    }
    else if (x > x6y4.xClickableLeft && x < x6y4.xClickableRight) {
      if (mode === 'draw') {
        x6y4.state = drawShapes(x6y4.x, x6y4.y, x6y4.state);
      }
      else if (mode === 'text' && x6y4.state !== '') {
        writeText(x6y4.x, x6y4.y);
      }
    }
    else if (x > x7y4.xClickableLeft && x < x7y4.xClickableRight) {
      if (mode === 'draw') {
        x7y4.state = drawShapes(x7y4.x, x7y4.y, x7y4.state);
      }
      else if (mode === 'text' && x7y4.state !== '') {
        writeText(x7y4.x, x7y4.y);
      }
    }
    else if (x > x8y4.xClickableLeft && x < x8y4.xClickableRight) {
      if (mode === 'draw') {
        x8y4.state = drawShapes(x8y4.x, x8y4.y, x8y4.state);
      }
      else if (mode === 'text' && x8y4.state !== '') {
        writeText(x8y4.x, x8y4.y);
      }
    }
  }

  //if 5th horizontal line
  if (y > x1y5.yClickableBottom && y < x1y5.yClickableTop) {

    //if left side clicked for numbers, any mode
    if (x < x0y5.xClickableRight) {
      x0y5.state = leftSideNumber(x0y5.x, x0y5.y, x0y5.state);
    }
    //if spot on guitar is clicked
    else if (x > x1y5.xClickableLeft && x < x1y5.xClickableRight) {
      if (mode === 'draw') {
        x1y5.state = drawShapes(x1y5.x, x1y5.y, x1y5.state);
      }
      else if (mode === 'text' && x1y5.state !== '') {
        writeText(x1y5.x, x1y5.y);
      }
    }
    else if (x > x2y5.xClickableLeft && x < x2y5.xClickableRight) {
      if (mode === 'draw') {
        x2y5.state = drawShapes(x2y5.x, x2y5.y, x2y5.state);
      }
      else if (mode === 'text' && x2y5.state !== '') {
        writeText(x2y5.x, x2y5.y);
      }
    }
    else if (x > x3y5.xClickableLeft && x < x3y5.xClickableRight) {
      if (mode === 'draw') {
        x3y5.state = drawShapes(x3y5.x, x3y5.y, x3y5.state);
      }
      else if (mode === 'text' && x3y5.state !== '') {
        writeText(x3y5.x, x3y5.y);
      }
    }
    else if (x > x4y5.xClickableLeft && x < x4y5.xClickableRight) {
      if (mode === 'draw') {
        x4y5.state = drawShapes(x4y5.x, x4y5.y, x4y5.state);
      }
      else if (mode === 'text' && x4y5.state !== '') {
        writeText(x4y5.x, x4y5.y);
      }
    }
    else if (x > x5y5.xClickableLeft && x < x5y5.xClickableRight) {
      if (mode === 'draw') {
        x5y5.state = drawShapes(x5y5.x, x5y5.y, x5y5.state);
      }
      else if (mode === 'text' && x5y5.state !== '') {
        writeText(x5y5.x, x5y5.y);
      }
    }
    else if (x > x6y5.xClickableLeft && x < x6y5.xClickableRight) {
      if (mode === 'draw') {
        x6y5.state = drawShapes(x6y5.x, x6y5.y, x6y5.state);
      }
      else if (mode === 'text' && x6y5.state !== '') {
        writeText(x6y5.x, x6y5.y);
      }
    }
    else if (x > x7y5.xClickableLeft && x < x7y5.xClickableRight) {
      if (mode === 'draw') {
        x7y5.state = drawShapes(x7y5.x, x7y5.y, x7y5.state);
      }
      else if (mode === 'text' && x7y5.state !== '') {
        writeText(x7y5.x, x7y5.y);
      }
    }
    else if (x > x8y5.xClickableLeft && x < x8y5.xClickableRight) {
      if (mode === 'draw') {
        x8y5.state = drawShapes(x8y5.x, x8y5.y, x8y5.state);
      }
      else if (mode === 'text' && x8y5.state !== '') {
        writeText(x8y5.x, x8y5.y);
      }
    }
  }

  //if 6th horizontal line
  if (y > x1y6.yClickableBottom && y < x1y6.yClickableTop) {

    //if left side clicked for numbers, any mode
    if (x < x0y6.xClickableRight) {
      x0y6.state = leftSideNumber(x0y6.x, x0y6.y, x0y6.state);
    }
    //if spot on guitar is clicked
    else if (x > x1y6.xClickableLeft && x < x1y6.xClickableRight) {
      if (mode === 'draw') {
        x1y6.state = drawShapes(x1y6.x, x1y6.y, x1y6.state);
      }
      else if (mode === 'text' && x1y6.state !== '') {
        writeText(x1y6.x, x1y6.y);
      }
    }
    else if (x > x2y6.xClickableLeft && x < x2y6.xClickableRight) {
      if (mode === 'draw') {
        x2y6.state = drawShapes(x2y6.x, x2y6.y, x2y6.state);
      }
      else if (mode === 'text' && x2y6.state !== '') {
        writeText(x2y6.x, x2y6.y);
      }
    }
    else if (x > x3y6.xClickableLeft && x < x3y6.xClickableRight) {
      if (mode === 'draw') {
        x3y6.state = drawShapes(x3y6.x, x3y6.y, x3y6.state);
      }
      else if (mode === 'text' && x3y6.state !== '') {
        writeText(x3y6.x, x3y6.y);
      }
    }
    else if (x > x4y6.xClickableLeft && x < x4y6.xClickableRight) {
      if (mode === 'draw') {
        x4y6.state = drawShapes(x4y6.x, x4y6.y, x4y6.state);
      }
      else if (mode === 'text' && x4y6.state !== '') {
        writeText(x4y6.x, x4y6.y);
      }
    }
    else if (x > x5y6.xClickableLeft && x < x5y6.xClickableRight) {
      if (mode === 'draw') {
        x5y6.state = drawShapes(x5y6.x, x5y6.y, x5y6.state);
      }
      else if (mode === 'text' && x5y6.state !== '') {
        writeText(x5y6.x, x5y6.y);
      }
    }
    else if (x > x6y6.xClickableLeft && x < x6y6.xClickableRight) {
      if (mode === 'draw') {
        x6y6.state = drawShapes(x6y6.x, x6y6.y, x6y6.state);
      }
      else if (mode === 'text' && x6y6.state !== '') {
        writeText(x6y6.x, x6y6.y);
      }
    }
    else if (x > x7y6.xClickableLeft && x < x7y6.xClickableRight) {
      if (mode === 'draw') {
        x7y6.state = drawShapes(x7y6.x, x7y6.y, x7y6.state);
      }
      else if (mode === 'text' && x7y6.state !== '') {
        writeText(x7y6.x, x7y6.y);
      }
    }
    else if (x > x8y6.xClickableLeft && x < x8y6.xClickableRight) {
      if (mode === 'draw') {
        x8y6.state = drawShapes(x8y6.x, x8y6.y, x8y6.state);
      }
      else if (mode === 'text' && x8y6.state !== '') {
        writeText(x8y6.x, x8y6.y);
      }
    }
  }

}