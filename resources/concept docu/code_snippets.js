/*
//ANIMATION----------------------------------------------------------------------------------------------
let textChars = document.getElementById("textChars") as GroupElement;

// Rotate on time

const cos = (n) => {
n = Math.cos(n*Math.PI/180);
  return n;
}


const initRotation = () => {
const now = new Date();

  let angleSeconds = (now.getSeconds()* 6);
  let as = angleSeconds;
  let angleSmoothSeconds = (now.getSeconds() * 1000 + now.getMilliseconds()) * 6 / 1000;
  let ass = angleSmoothSeconds;
  //@ts-ignore
  curvedTextWidget2.startAngle = ass; // great, you introduced the arc :)
  //@ts-ignore
  textChars.style.opacity = Math.min(Math.max(cos(6*ass),0),1);// opacity inherited => chars
  // rotation in "auto" modus is understandably rather laggy. best to keep this for "fix"?
  //@ts-ignore
   myText2.style.fill = 256*256*Math.floor(255 *(360 - as)/360) + 256*Math.floor(255*as/360);
  requestAnimationFrame(initRotation);
}
requestAnimationFrame(initRotation);


clock.granularity = "seconds"

// Opacity
  clock.ontick = (evt) => {
  const now = new Date();
  let seconds = now.getSeconds();
  //flash on/off
  //@ts-ignore
  //curvedText2.opacity = (seconds % 2) = 0 ?  1 : 0; //cant reach curvedWidgetText2 from here

  //@ts-ignore
  textChars.style.opacity = (seconds % 2) == 0 ?  1 : 0;
  //console.log(textChars.style.opacity);
  curvedTextWidget1.startAngle = seconds*6;
  textChars.style.fill = "#18d6cd" ;// inherited => chars[i]

  //@ts-ignore
  //myText2.style.fill = 255*255*Math.floor((255 - 255)*seconds/60) + 255*Math.floor((0 + 255)*seconds/60) + Math.floor(255 - 255)*seconds/60;
};
// could also change colors, smooth or in ontick; font-size, I guess, position of the circle, radius.....
*/

/**INTERFACE
 * // INTERFACE FIRST APPROACH/TEST---------------------------------------------------------
  interface myCurvedText {
    r?: number;
    textAnchor?: string;
    letterSpacing?: number;
    class?: string;
    sweepAngle?: number;
}

  function createText(config: myCurvedText): {
    r: number;
    textAnchor: string;
    letterSpacing: number;
    class: string;
    sweepAngle: number;
  } {
  let newText = { r: 0, textAnchor: "middle", letterSpacing: 0, class: '', sweepAngle: 0 };
  if (config.r) {
    newText.r = config.r = radiusEl.r;
  }
  if (config.textAnchor) {
    newText.textAnchor = config.textAnchor = textEl.r;
  }
  if (config.letterSpacing) {
  newText.letterSpacing = config.letterSpacing = textEl.letterSpacing;
    }
  if (config.class) {
  newText.class = config.class = textEl.class;
    }
  if (config.sweepAngle) {
  newText.sweepAngle = config.sweepAngle = layoutEl.sweepAngle;
  }
  return newText;
}

  let myNewText = createText({ });
  console.log("myNewText.textAnchor: " + myNewText.textAnchor, "myNewText.r: " + myNewText.r)
  console.log("layoutEl.sweepAngle "+ layoutEl.sweepAngle)
  //pretty sure. this is total nonsens, as I might have to go on #radius, #text, #layout
  // with nested interfaces
  // END TEST INTERFACE----------------------------------------------------------
 */