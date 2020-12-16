import document from "document"
import {me} from "appbit"
import { user } from "user-profile"
import { me as device } from "device"
import widgetFactory from '../resources/widget-factory'
import curvedText from '../resources/curved-text'

/*---------------------------------------------------------------------------------------------------------------------------------*/
//Initialise widget system
const widgets = widgetFactory([curvedText])
widgets.registerContainer(document)
const curvedTextWidget1 = (document as any).getWidgetById('curvedText1')  // 'as any' is a horrible kludge; we should define an interface 'WidgetSearch'
curvedTextWidget1.rotateText = 10
curvedTextWidget1.redraw()
const curvedTextWidget2 = (document as any).getWidgetById('curvedText2')  // 'as any' is a horrible kludge; we should define an interface 'WidgetSearch'
curvedTextWidget2.redraw()


let myText = document.getElementById("myText");
let position = document.getElementById("position") as ContainerElement;



//YOUR SETTINGS---------------------------------------------------------------------------------------------------------------
//control panel in index.ts
let textID = document.getElementsByClassName("textID");
//let ID = myText
//Circle
let radius: number = 120;//if negative, text is bottom curve
let centerX: number = 168; //moves the centerpoint of the circle
let centerY: number = 168;
//text
let rotateText: number = 0;//angle to rotate whole text from it´s beginning
let letterSpacing: number = 10;
let textAnchor: string = "middle"; //start, middle,  end at 0°
let modus: string = "auto"; // auto: automatic, fix: rotate fix angle each


//Rotate fix angle
let charAngle: number = 10;//angle each char
//-----------------------------------------------------------------------------------------------------------------------------







//FIRST STEP DONE

let t: number;
//textID[t].id;
for (t = 0; t < textID.length; t++) {
console.log("all texts ID "+textID[t].id);
let content = textID ;
console.log("all texts by ID " + content[t].text)

//content[0].text = "0.0.0.0.0.0.0.0.0"// enter text ar data here MiW!MiW!MiW!M

}
//---------------------------------------------------------------------------------------------------------------------------------
//VARIABLES
//CENTER OF ROTATION

position.x = centerX - device.screen.width / 2; // -half width. why is me.screen.width / 2 not working??? Permission?
position.y = centerY - device.screen.height / 2;

//PREVENT MIRRORING
charAngle = charAngle * (radius < 0 ? -1 : 1);

//ASSIGN CHARS
let chars = (myText.text.split("")); // array of char set of text to curve
let char  = document.getElementsByClassName("char") as TextElement[];// single char textElements

let width0: number = char[0].getBBox().width;//first char to calc. text-alignment
/////let prevWidth = char[0].getBBox().width; // TODO 3 unnecessary?

//CALCULATE PROPERTIES OF CHARS
let i;
let numChars = chars.length
for (i = 0; i < numChars ; i++) {

    char[i].text = chars[i];// assign chars to the single textElements
    char[i].y = radius < 0 ? - radius : - radius + char[0].getBBox().height / 2;//move text it´s height downwards

    //FOR AUTO MODUS
    if (modus == "auto") {

      const circ = 2 * radius * Math.PI;
      let degreePx = 360 / circ;
      let charWidth = char[i].getBBox().width;
      let widths = i < numChars ? char.map(c => c.getBBox().width) : "", sum: number;

      //@ts-ignore
      let cumWidths =  widths.map((elem: number) => i >= numChars ? sum = 0 : sum = (sum || 0) + elem); // sums up widths
      let textWidth = (myText as TextElement).getBBox().width; // width original text

      let w: number;
        for (w = 1; w < numChars + 1; w++) {
          // width of the previous char
          let nextWidth = char[w].getBBox().width;
          let halfNext = nextWidth / 2;


          //calculates rotation angle for each char
          //to define distance : half width previous char + half width current char + half letterspacing
          (char[i].parent as GroupElement).groupTransform.rotate.angle =
          (cumWidths[i]  - charWidth / 2 + halfNext  + (i-1/2) * letterSpacing)  * degreePx;

          /////prevWidth = nextWidth; // TODO 3 unnecessary?
        }

        //TEXT-ANCHOR and ROTATION
        (char[i].parent.parent as GroupElement).groupTransform.rotate.angle = rotateText

                -  (textAnchor == "middle" ? (textWidth + 2*width0  + (i - 1 ) * letterSpacing )  * degreePx / 2
              :    textAnchor == "start" ? - (width0 + letterSpacing * 1/2)/2
              : +  (textWidth + (i -1/2) * letterSpacing + width0 / 2 ) * degreePx);

    }else{

      //ROTATION PER CHAR
      (char[i].parent as GroupElement).groupTransform.rotate.angle = i > 0 ? i * charAngle : 0;

      //TEXT-ANCHOR
      (char[i].parent.parent as GroupElement).groupTransform.rotate.angle = rotateText

           - (textAnchor == "middle" ? (numChars - 1)* charAngle / 2
         :   textAnchor == "start" ?  - (charAngle / 2)
         : + (numChars - (numChars % 2 == 0 ? 0.5 : 1)) * charAngle);

    };

 };




