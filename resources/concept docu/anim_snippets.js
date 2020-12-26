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