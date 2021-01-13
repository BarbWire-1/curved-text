import document from "document"
import {me} from "appbit"
import { user } from "user-profile"
import { me as device } from "device"
import widgetFactory from './widgets/widget-factory'
import { CurvedTextWidget, curvedText } from './widgets/curved-text'  // TODO G 3.0 update documentation re how to use ts interface
import clock from "clock"

/*---------------------------------------------------------------------------------------------------------------------------------*/
//Initialise widget system
const widgets = widgetFactory([curvedText]);
widgets.registerContainer(document);   // adds getWidgetById() to document



// TODO G 2.0 move ts interface and type definitions into widget-factory.ts

interface WidgetSearch {    // similar to ElementSearch
  getWidgetById(id:string): CurvedTextWidget; // TODO G 2.2 virtual base class for CurvedTextWidget?
}

type WidgetDocumentModule = typeof document & WidgetSearch;

type WidgetElementSearch = Element & WidgetSearch;

// TODO G 3.0  Put in ts doco.
let classx: CurvedTextWidget, classy: CurvedTextWidget;

classx = (document as WidgetDocumentModule).getWidgetById('classxId')
classy = (document as WidgetDocumentModule).getWidgetById('classyId')


/*// TS:We can avoid saying '(document as WidgetDocumentModule).getWidgetById' like this:
const widgetDocument = document as WidgetDocumentModule;
classx = widgetDocument.getWidgetById('classxId');
classy = widgetDocument.getWidgetById('classyId');
const myElement = widgetDocument.getElementsByClassName('sectionId');  // widgetDocument can be used wherever document can be used (maybe)
*/

/*// TS: Using getWidgetById on a non-document element:
const sectionEl = document.getElementById('sectionId') as WidgetElementSearch;
widgets.registerContainer(sectionEl);   // adds getWidgetById() to sectionEl
classx = sectionEl.getWidgetById('classxId');
classx.text = 'sect';
classy = sectionEl.getWidgetById('classyId');
*/



// The declarations below should work in vanilla js:
//const classx = document.getWidgetById('classxId')
//const classy = document.getWidgetById('classyId')
classy.anchorAngle = 0;
classy.text = 'W.W.W.W.W.W.i';  // interestingly, this is declared in the interface for Element
classy.style.fill = 'red'; // shows that members inherited via 'extends GraphicsElement' work
//classx.style.display = 'inline'
//classy.anchorAngle = 0
const classxWidgets = document.getElementsByClassName('classx');
const classyWidgets = document.getElementsByClassName('classy');

//const classxId = (document as WidgetDocumentModule).getWidgetById('classxId');
//classyWidgets.forEach(el => console.log(`found el with class='${el.class}'`)) // if you could call by class only, could fix texts just be written in css/svg ?
//classxWidgets.forEach(el => console.log(`found el with class='${el.class}'`))
//classxWidgets.forEach(el => (el as TextElement).text="class.text")
//classx.y = 250
//classxWidgets.forEach(el => (el as TextElement).style.fontFamily="Tungsten-Medium")
//classx.startAngle = 90;

//classy.startAngle = 135











// Everything below is from curved-one-of-the-final-cuts/Rotation-II

let myText = document.getElementById("myText") as TextElement;
let radius = document.getElementById("radius") as GroupElement;
let alignRotate = document.getElementById("alignRotate") as GroupElement;

/*YOUR SETTINGS---------------------------------------------------------------------------------------------------------------*/

myText.text = "I am not a widget"// enter text ar data here MiW!MiW!MiW!M

let mode: number = 0; // 0: automatic, 1: rotate fix angle each
//console.log("mode: "+ (mode == 0 ? "auto" : "fix"));
//CIRCLE
let myR: number = 100;//if negative, text is bottom curve
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
radius.groupTransform.translate.x = centerX ;
radius.groupTransform.translate.y = centerY ;


//CIRCUMFERENCE FOR AUTO
const circ = 2 * myR * Math.PI;
const degreePx = 360 / circ;

//PREVENT MIRRORING
charAngle = charAngle * (myR < 0 ? -1 : 1);

//CALCULATE POSITION
let numChars = chars.length


char[0].text = chars[0];
let y = myR < 0 ? -myR : -myR + char[0].getBBox().height / 2;  //define y of text, based on radius
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
  const lastChar = char[numChars-1].getBBox().width;
  switch(textAnchor) {
    case 0:
      stringAngle -= (((numChars - 1) * charAngle) + (lastChar - firstChar) / 2 * degreePx) / 2;
      //stringAngle = (1 - numChars)  * charAngle / 2 // start at middle 0/180 - positions exactly by angle only!
      break
    case 1:
      stringAngle += firstChar / 2 * degreePx;//ok
      //stringAngle = 0; //centers at 0/180 - positions exactly by angle only!
      break;
    case 2:
      stringAngle += (numChars - 1) * - charAngle - lastChar / 2 * degreePx;
      //stringAngle = - (numChars - 1 ) * charAngle; // end at middle 0/180 - positions exactly by angle only!
      break;
  }
};

alignRotate.groupTransform.rotate.angle = stringAngle;
//console.log("stringAngle "+stringAngle)