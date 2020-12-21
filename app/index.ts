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


let myText = document.getElementById("myText") as TextElement;
let myText2 = document.getElementById("myText2") as TextElement;
const position = document.getElementById("position") as ContainerElement; //x,y of SVG move center of circle
const rotate =document.getElementById("rotate") as GroupElement; // angle used for alignment + rotateText
let rotateText = document.getElementById("rotateText");
let charAngle = document.getElementById("charAngle") as unknown as Number
//YOUR SETTINGS---------------------------------------------------------------------------------------------------------------

//Circle
let radius: number = 120;//if negative, text is bottom curve
let centerX: number = 168; //moves the centerpoint of the circle
let centerY: number = 168;
//text
//@ts-ignore
rotateText = 0;//angle to rotate whole text from it´s beginning
let letterSpacing: number =0;
let textAnchor: string = "middle"; //start, middle,  end at 0°
let modus: string = "fix"; // auto: automatic, fix: rotate fix angle each


//Rotate fix angle
(charAngle as Number)= 30;//angle each char
//-----------------------------------------------------------------------------------------------------------------------------

myText.text = "000000000000" //"0.0.0.0.0.0.0.0.0"
myText2.text = "CHANGING"// enter text ar data here "MiMiMiMiMiMi"


//---------------------------------------------------------------------------------------------------------------------------------
//VARIABLES


//CENTER OF ROTATION
position.x = centerX //- device.screen.width / 2; // -half width
position.y = centerY //- device.screen.height / 2;

//PREVENT MIRRORING
//@ts-ignore
charAngle = charAngle * (radius < 0 ? -1 : 1);
console.log("charAngle "+charAngle)
//ASSIGN CHARS
let chars = (myText.text.split("")); // array of char set of text to curve
let char  = document.getElementsByClassName("char") as TextElement[];// single char textElements
let firstChar = document.getElementById("firstChar");



const circ = 2 * radius * Math.PI; // not ok. logs i times
//console.log ("circ "+circ)
const degreePx = 360 / circ;
//console.log("degreePy "+degreePx)
let textWidth = myText.getBBox().width;  //Better take textWidth, as it´s only one process??
      //console.log("textWidth "+textWidth);




//CALCULATE PROPERTIES OF CHARS
let i;
let numChars: number = chars.length
//console.log("numChars "+numChars)


for (i = 0; i < chars.length ; i++) {

   
    char[i].text = chars[i];// assign chars to the single textElements//OK
    //console.log(char[i].text);
    char[i].y = radius < 0 ? - radius : - radius + char[0].getBBox().height / 2;//move text it´s height downwards//OK
    //console.log(char[i].y);
    //@ts-ignore
    firstChar = char[0].getBBox().width;
    //console.log("firstChar "+firstChar);
   

    let charWidth = char[i].getBBox().width;
    let widths = i < numChars ? char.map(c => c.getBBox().width) : "", sum: number; // only chars for one text, only not empty possible?
    //console.log("widths "+widths)
      
    //@ts-ignore
    let cumWidths =  widths.map((elem: number) => i >= numChars ? sum = 0 : sum = (sum || 0) + elem); // sums up widths, runs through all chars, empty (I added very much)
    //console.log("cumWidths "+cumWidths);
      
      
/*     
      let w: number;
        for (w = 1; w < chars.length + 1; w++) {
          // width of the previous char
          let nextWidth = char[w].getBBox().width;
          console.log("nextWidth "+nextWidth);
          let halfNext = nextWidth / 2;
          console.log("halfNext "+halfNext);

          //calculates rotation angle for each char
          //to define distance : half width previous char + half width current char + half letterspacing
          (char[i].parent as GroupElement).groupTransform.rotate.angle =
          (cumWidths[i]  - charWidth / 2 + halfNext  + (i-1/2) * letterSpacing)  * degreePx;

          //prevWidth = nextWidth; // not used
        }

//TEST
let w: number;
        for (w = 1; w < chars.length + 1; w++) {
          // width of the previous char   // runs each time through the hole array,
          //let nextWidth = char[w].getBBox().width;
          //console.log("nextWidth "+nextWidth);
          //let halfNext = nextWidth / 2;
          //console.log("halfNext "+halfNext);

          //calculates rotation angle for each char
          //to define distance : half width previous char + half width current char + half letterspacing
          (char[i].parent as GroupElement).groupTransform.rotate.angle =
          (cumWidths[i]  - charWidth / 2 + (char[w].getBBox().width / 2) + (i-1/2) * letterSpacing)  * degreePx;
          console.log("a"+(char[3].parent as GroupElement).groupTransform.rotate.angle);
          

        }

//TEST    
*/        //RELATIVE ANGLE TO PREVIOUS CHAR
          //calculates rotation angle for each char
          //to define distance : half width previous char + half width current char + half letterspacing
    (char[i].parent as GroupElement).groupTransform.rotate.angle =
    (cumWidths[i]  - charWidth / 2 + (char[i+1].getBBox().width / 2) + (i-1/2) * letterSpacing)  * degreePx;
          //console.log("b"+(char[3].parent as GroupElement).groupTransform.rotate.angle);


          //TEXT-ANCHOR and ROTATION
      
            //let last = numChars -1; obsolete? firstChar is always the anchor. who cares for the last one?
            //let lastChar = last - 1;
            //let firstChar = cumWidths[0];
/*
            //ABSOLUTELY HANDS OFF!!!!!!
            (rotate as GroupElement).groupTransform.rotate.angle =
            rotateText
                -  (textAnchor == "middle" ? (textWidth +  (i - 1) * letterSpacing )  * degreePx / 2
              :    textAnchor == "start" ? - letterSpacing / 4
              : +  (textWidth + ((i - 1/2 ) * letterSpacing ) ) * degreePx);
              //console.log("rotateAngle per char"+(rotate as GroupElement).groupTransform.rotate.angle)
*/
 };
//TEST 
    //FOR AUTO MODUS
    if (modus == "auto") {

          //@ts-ignore                                                      
        (rotate as GroupElement).groupTransform.rotate.angle = rotateText
           
                -  (textAnchor == "middle" ? (textWidth +  (numChars -2) * letterSpacing )  * degreePx / 2
                  //@ts-ignore
              :    textAnchor == "start" ? -  letterSpacing / 4//HANDS OFF!!!
                  //@ts-ignore
              : +  (textWidth + ((numChars - 3/2 ) * letterSpacing ) ) * degreePx); //HANDS OFF!!
              console.log("auto rotate angle"+(rotate as GroupElement).groupTransform.rotate.angle)



    }else{

        //ROTATION PER CHAR
        (rotate as GroupElement).groupTransform.rotate.angle = i > 0 ? i * Number(charAngle) : 0;

        //TEXT-ANCHOR
            
        (rotate as GroupElement).groupTransform.rotate.angle = 
              //@ts-ignore
              rotateText
                - (textAnchor == "middle" ? (numChars - (numChars % 2 == 0 ? 0.5 : 1)) * Number(charAngle)
              :   textAnchor == "start" ?  0
              : + (numChars -1) * Number(charAngle)); // TODO B 1 this one doesn´t do nothing.

        //console.log("rotation "+(rotate as GroupElement).groupTransform.rotate.angle)
        //console.log("numChars "+numChars * charAngle);
    };


        //console.log("firstChar "+firstChar);


// TODO G 4.9 delete all unnecessary code (non-widget code, etc) from all files in this branch