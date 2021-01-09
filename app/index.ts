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

let myText = document.getElementById("myText") as TextElement;
let position = document.getElementById("position") as GroupElement;
let alignRotate = document.getElementById("alignRotate") as GroupElement;

const classx = (document as any).getWidgetById('classxId')
const classy = (document as any).getWidgetById('classyId')
//classx.style.display = 'inline'
//classy.anchorAngle = 0
const classxWidgets = document.getElementsByClassName('classx');
const classyWidgets = document.getElementsByClassName('classy'); // TODO G 3 This will only pick up widgets that have already been constructed via getWidgetById. Could rework factory for more flexibility.

//const classxId = (document as any).getWidgetById('classxId');
//classyWidgets.forEach(el => console.log(`found el with class='${el.class}'`)) // if you could call by class only, could fix texts just be written in css/svg ?
//classxWidgets.forEach(el => console.log(`found el with class='${el.class}'`))
classxWidgets.forEach(el => (el as TextElement).text="class.text")
classx.text = "id.text"; //TODO G 1 only gets applied if processed AFTER the class, else gets over-riden by class.text
// TODO B 1 ^ Expected behaviour. You're not applying a CSS .id rule here. You're using ts to over-ride anything previously set via CSS. ts trumps CSS.
classx.y = 250
classxWidgets.forEach(el => (el as TextElement).style.fontFamily="Tungsten-Medium")
//classx.style.fontFamily = "Tungsten-Medium"; //TODO G 1 only gets applied if processed AF
// TODO B 1 ^ not implemented, because it would be rarely used and would require redoing the widget layout. Okay?
classy.startAngle = 135
// Everything below is from curved-one-of-the-final-cuts/Rotation-II
/*YOUR SETTINGS---------------------------------------------------------------------------------------------------------------*/
myText.text = "I am not a widget"// enter text ar data here MiW!MiW!MiW!M

let mode: number = 0; // 0: automatic, 1: rotate fix angle each
//console.log("mode: "+ (mode == 0 ? "auto" : "fix"));
//CIRCLE
let radius: number = 100;//if negative, text is bottom curve
let centerX: number = 168;
//console.log("center: x "+centerX);
let centerY: number = 168; // center of the circle
//console.log("center: y " + centerY)

//TEXT
let textAnchor: number = 0; //0: middle, 1: start,  2: end at 0° //
let letterSpacing: number = 10;
let rotateText: number = 0;//angle to rotate whole text from it´s beginning
//console.log("rotate text: "+ rotateText + "°");
//console.log("textAnchor: "+ (textAnchor == 0 ? "0 (middle)" : textAnchor == 1 ? "1 (start)" : "2 (end)"));
//ANGLE FOR FIX ROTATION
let charAngle: number = 10;//angle each char, chars are stacked at 0° if no setting
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
  //console.log(`textAnchor=${textAnchor} cumWidth=${cumWidth} num=${numChars} spacing=${letterSpacing} degPx=${degreePx}`)
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
  const firstChar = char[0].getBBox().width;
  switch(textAnchor) {
    case 0:
      stringAngle -= ((numChars -1)  * ((charAngle / 2) ?? 0 )) + firstChar / 2 * degreePx;//ok
      break
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
//console.log("stringAngle "+stringAngle)