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
//curvedTextWidget1.startAngle = 180  // not implemented yet
const curvedTextWidget2 = (document as any).getWidgetById('curvedText2')  // 'as any' is a horrible kludge; we should define an interface 'WidgetSearch'
curvedTextWidget2.text = '123456'
curvedTextWidget2.charAngle = 45  // specify exactly how many degrees per character, instead of modus==="auto"
//curvedTextWidget2.position.cx = 168; // when I tried this, it didn´t miove, but "myText" disappeared.
//curvedTextWidget2.position.cy = 168;

let myText = document.getElementById("myText") as TextElement;
let position = document.getElementById("position") as GroupElement;
let alignRotate = document.getElementById("alignRotate") as GroupElement;

// Everything below if from curved-one-of-the-final-cuts/Rotation-II
/*YOUR SETTINGS---------------------------------------------------------------------------------------------------------------*/
myText.text = "WWWWW"// enter text ar data here MiW!MiW!MiW!M

let mode: number = 0; // 0: automatic, 1: rotate fix angle each
console.log("mode: "+ (mode == 0 ? "auto" : "fix"));
//CIRCLE
let radius: number = 100;//if negative, text is bottom curve
let centerX: number = 168;
console.log("center: x "+centerX);
let centerY: number = 168; // center of the circle
console.log("center: y " + centerY)

//TEXT
let textAnchor: number = 2; //0: middle, 1: start,  2: end at 0° //
let letterSpacing: number = 1;
let rotateText: number = 0;//angle to rotate whole text from it´s beginning
console.log("rotate text: "+ rotateText + "°");
console.log("textAnchor: "+ (textAnchor == 0 ? "0 (middle)" : textAnchor == 1 ? "1 (start)" : "2 (end)"));
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
      stringAngle = -(stringAngle -= (cumWidth + (numChars - 1 ) * letterSpacing  ) * degreePx);//ok
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
};
alignRotate.groupTransform.rotate.angle = stringAngle;
console.log("stringAngle "+stringAngle)