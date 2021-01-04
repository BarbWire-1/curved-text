import document from "document"
import {me} from "appbit"
import { user } from "user-profile"
import { me as device } from "device"
import widgetFactory from './widgets/widget-factory'
import curvedText from './widgets/curved-text'
import clock from "clock"



/*---------------------------------------------------------------------------------------------------------------------------------*/
//Initialise widget system
const widgets = widgetFactory([curvedText])
widgets.registerContainer(document)
const curvedTextWidget1 = (document as any).getWidgetById('curvedText1')  // 'as any' is a horrible kludge; we should define an interface 'WidgetSearch'
curvedTextWidget1.text = 'Dynamic text';
curvedTextWidget1.style.fill = 'lightblue';
curvedTextWidget1.style.opacity = 1;
curvedTextWidget1.style.display = 'none';
let angle = 0
setInterval(()=>{
  curvedTextWidget1.startAngle = angle
  // Barb: Instead of, or in addition to, .startAngle, I'm happy to implement .rotateText and/or .anchorAngle.
  // My preference is to have .startAngle (for consistency with SVG and CSS) and .anchorAngle (because it's the most natural term).
  // Having two functions that do identical things is a bit weird, but might be optimal given constraints. :)
  // I totally agree! Yes, it´s weird, and yes, it would make using it mor "intuitive"
  // and yes, this little bug was a beutiful idea :)))) my face hurts!
  angle = (angle + 2) % 360
},50)
//curvedTextWidget1.startAngle = 180  // not implemented yet
const curvedTextWidget2 = (document as any).getWidgetById('curvedText2')  // 'as any' is a horrible kludge; we should define an interface 'WidgetSearch'
curvedTextWidget2.text = '123456789ABCDEFG'
//curvedTextWidget2.charAngle = 45  // NOT IMPLEMENTED; specify exactly how many degrees per character, instead of modus==="auto"
//curvedTextWidget2.x = 168;
//curvedTextWidget2.y = 168;
//curvedTextWidget2.letterSpacing = 3;
let myText = document.getElementById("myText") as TextElement;
let position = document.getElementById("position") as GroupElement;
let alignRotate = document.getElementById("alignRotate") as GroupElement;
let myOtherWidget = (document as any).getWidgetById("myOtherWidget");
myOtherWidget.text = "kidding me?"
// Everything below if from curved-one-of-the-final-cuts/Rotation-II
/*YOUR SETTINGS---------------------------------------------------------------------------------------------------------------*/
myText.text = "WWWWW"// enter text ar data here MiW!MiW!MiW!M

let mode: number = 0; // 0: automatic, 1: rotate fix angle each
//console.log("mode: "+ (mode == 0 ? "auto" : "fix"));
//CIRCLE
let radius: number = 100;//if negative, text is bottom curve
let centerX: number = 168;
//console.log("center: x "+centerX);
let centerY: number = 168; // center of the circle
//console.log("center: y " + centerY)

//TEXT
let textAnchor: number = 2; //0: middle, 1: start,  2: end at 0° //
let letterSpacing: number = 10;
let rotateText: number = 90;//angle to rotate whole text from it´s beginning
//console.log("rotate text: "+ rotateText + "°");
//console.log("textAnchor: "+ (textAnchor == 0 ? "0 (middle)" : textAnchor == 1 ? "1 (start)" : "2 (end)"));
//ANGLE FOR FIX ROTATION
let charAngle: number = 25;//angle each char, chars are stacked at 0° if no setting
//-----------------------------------------------------------------------------------------------------------------------------

//VARIABLES
//ASSIGN CHARS
let chars = (myText.text.split("")); // array of char set of text to curve
let char  = document.getElementsByClassName("char") as TextElement[];// single char textElements

//CENTER CIRCLE
position.groupTransform.translate.x = centerX ;
position.groupTransform.translate.y = centerY ;


//CIRCUMFERENCE FOR AUTO
const circ = 2 * radius * Math.PI;
const degreePx = 360 / circ;

//PREVENT MIRRORING
charAngle = charAngle * (radius < 0 ? -1 : 1);

//CALCULATE POSITION
let numChars = chars.length


char[0].text = chars[0];
let y = radius < 0 ? -radius : -radius + char[0].getBBox().height / 2;  //define y of text, based on radius
let stringAngle = rotateText;

//AUTO MODE
if (mode === 0) {
  let cumWidth: number = 0;
  for (let i: number = 0; i < numChars ; i++) {
    //apply text and y
    char[i].text = chars[i];// assign chars to the single textElements
    char[i].y = y

    //Variables for positioning chars
    let charWidth = char[i].getBBox().width;
    cumWidth += charWidth;  //  (thank you, Peter for this neat example of simplifying and efficiency!)


    //ROTATION PER CHAR
    (char[i].parent as GroupElement).groupTransform.rotate.angle =
    (cumWidth  - charWidth / 2 +  (i) * letterSpacing )  * degreePx;


  } // end of char loop

  //TEXT-ANCHOR MODE AUTO
   switch(textAnchor) {
    case 0:
      stringAngle -= (cumWidth + ((numChars -1) * letterSpacing)) * degreePx / 2;//ok
      break;
    case 2:
      //stringAngle -= stringAngle += (cumWidth + (numChars - 1 ) * letterSpacing  ) * degreePx;//ok
      stringAngle -= (cumWidth + (numChars - 1 ) * letterSpacing  ) * degreePx
      break;
  }
} else if (mode === 1) {

  for (let i: number = 0; i < numChars ; i++) {
    //apply text and y
    char[i].text = chars[i];  // assign chars to the single textElements
    char[i].y = y;  //define y of text, based on radius

    //ROTATION PER CHAR
    (char[i].parent as GroupElement).groupTransform.rotate.angle = i * charAngle  ;



  } // end of char loop

    //TEXT-ANCHOR MODE FIX
  switch(textAnchor) {
    case 0:
      const firstChar = char[0].getBBox().width;
      stringAngle -= ((numChars -1)  * ((charAngle / 2) ?? 0 )) + firstChar / 2 * degreePx;//ok
    case 1:
      //const firstChar = char[0].getBBox().width;
      stringAngle += firstChar / 2 * degreePx ;//ok
      break;
    case 2:
      const lastChar = char[numChars-1].getBBox().width;
      stringAngle += (numChars - 1 ) * - charAngle - lastChar / 2 * degreePx;
      break;
  }

alignRotate.groupTransform.rotate.angle = stringAngle;
//console.log("stringAngle "+stringAngle)

};

// SETTINGS TEST WIDGETS ----------------------------------------------------------------------------------------------------------------------------------------------------

let settingsInSet = (document as any).getWidgetById("settingsInSet");
settingsInSet.text = "try all in <set>";

let settingsInUse = (document as any).getWidgetById("settingsInUse");
settingsInUse.text = "try all in <use>-line";

let settingsInCSS = (document as any).getWidgetById("settingsInCSS");
settingsInCSS.text = "try all in CSS";

let settingsInline = (document as any).getWidgetById("settingsInline");
settingsInline.text = "try all inline";

// SETTINGS INLINE ----------------------------------------------------------------------------------------------------------------------------------------------------

settingsInline.style.display = "inline"
settingsInline.x = 168;
settingsInline.y = 268;

settingsInline.textBuffer = "try all inline"; // not sure, if it gets applied or even syntax is correct
settingsInline.text = "try all inline";
settingsInline.style.font = "Colfax-Regular";
settingsInline.style.fontSize = 35;

settingsInline.style.fill = "magenta";
settingsInline.style.opacity = 1;
settingsInline.startAngle = 0;


//not working, but no error
//settingsInline.style.letterSpacing = 0;
//settingsInline.r = 10; 
//settingsInline.textAnchor = "end";
//settingsInline.sweepAngle = 100;



clock.granularity = "seconds";

clock.addEventListener("tick", (evt) => {
  
});
function switchSetting() {
  let now = new Date();
  let secs = now.getSeconds();

  settingsInSet.style.opacity = secs % 2 == 0 ? 1 : 0.5;
  settingsInUse.style.opacity = secs % 2 == 0 ? 1 : 0.5;
  settingsInCSS.style.opacity = secs % 2 == 0 ? 1 : 0.5;
  settingsInline.style.opacity = secs % 2 == 0 ? 1 : 0.5;
  
}
clock.addEventListener("tick", switchSetting);
