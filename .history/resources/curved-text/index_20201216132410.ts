// TODO 3 typescript doesn't like this file much; do we need to do something with tsconfig.json?
//@ts-nocheck
import { me as device } from "device"

const construct = el => {
  const textEl = el.getElementById('text')
  const myTextEl = el.getElementById('myText')  // TODO 3 do we need both textEl and myTextEl? 

  // No, I think we should adress them by the <use>´s ID
  //myText was just the ID of my play text so it should be replaced with individula text ID´s 
  

  const positionEl = el.getElementById('position')
  const charGroupEl = el.getElementById('charGroup')
  let radius = positionEl.r
  let textAnchor = textEl.textAnchor

  // TODO 3 implement setters for all settings
  // TODO 3 how do we change font-family, font-size, fill, etc?

  // Would be great to have a "line-up" in app/index similar to how fitfont does
  // like this:
  // const timeLabel = new FitFont({ id:'timeLabel', font:'Bebas_Neue_110',halign: "middle", valign: "top", letterspacing:-1});
  // and then add rotating properties.
  // or we could only have rotating settings and font-style would have to be set manually in css or svg


  // I see that arr[i] always executes everything i times 
  // is there a way to let it process i, i++,... without going back through all each step?

  // I absolutely don´t understand, how your uses get rotated 
  // without being grouped in the index.view :))))


  //Text settings
  let rotateText: number = 0      //angle to rotate whole text from its beginning
  let letterSpacing: number = 10
  let modus: string = "auto";     // auto: automatic, fix: rotate fix angle each

  /*Rotate fix angle*/
  let charAngle: number = 10;//angle each char

  console.log(`text=${textEl.text} anchor=${textEl.textAnchor} r=${positionEl.r}`)

  // Below, we add members to el, effectively giving it an additional interface:
  el.redraw = () => {
    //VARIABLES
    /*CENTER OF ROTATION*/

    charGroupEl.x = positionEl.cx - device.screen.width / 2; // -half width. why is me.screen.width / 2 not working??? Permission?
    charGroupEl.y = positionEl.cy - device.screen.height / 2;

    //PREVENT MIRRORING
    charAngle = charAngle * (radius < 0 ? -1 : 1);

    /*ASSIGN CHARS*/
    let chars = (textEl.text.split("")); // array of char set of text to curve
    let char  = el.getElementsByClassName("char") as TextElement[];// single char textElements

    let width0: number = char[0].getBBox().width;   //first char to calc. text-alignment
    //let prevWidth = char[0].getBBox().width;        // TODO 3 is this needed?

    /*CALCULATE PROPERTIES OF CHARS*/
    let i;
    let numChars = chars.length
    console.log(`numChars=${numChars}`)
    for (i = 0; i < numChars ; i++) {

        char[i].text = chars[i];// assign chars to the single textElements
        char[i].y = radius < 0 ? - radius : - radius + char[0].getBBox().height / 2;//move text it´s height downwards

        /*FOR AUTO MODUS*/
        if (modus == "auto") {

          const circ = 2 * radius * Math.PI;
          let degreePx = 360 / circ;
          let charWidth = char[i].getBBox().width;
          let widths = i < numChars ? char.map(c => c.getBBox().width) : "", sum: number;

          //@ts-ignore
          let cumWidths =  widths.map((elem: number) => i >= numChars ? sum = 0 : sum = (sum || 0) + elem); // sums up widths
          let textWidth = (myTextEl as TextElement).getBBox().width; // width original text
          console.log("width myTextEl "+textWidth)
          let textWidth2 = (textEl as TextElement).getBBox().width; // width original text
          console.log("width textEl"+ textWidth2 )

          
          let w: number;
            for (w = 1; w < numChars + 1; w++) {
              // width of the previous char
              let nextWidth = char[w].getBBox().width;
              let halfNext = nextWidth / 2;


              //calculates rotation angle for each char
              //to define distance : half width previous char + half width current char + half letterspacing
              (char[i].parent as GroupElement).groupTransform.rotate.angle =
              (cumWidths[i]  - charWidth / 2 + halfNext  + (i-1/2) * letterSpacing)  * degreePx;

              let prevWidth = nextWidth;
            }

            /*TEXT-ANCHOR and ROTATION*/
            (char[i].parent.parent as GroupElement).groupTransform.rotate.angle = rotateText

                    -  (textAnchor === "middle" ? (textWidth + 2*width0  + (i - 1 ) * letterSpacing )  * degreePx / 2
                  :    textAnchor === "start" ? - (width0 + letterSpacing * 1/2)/2
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
  }

  return el
}

export default () => {
  return {
    name: 'curvedText',
    construct: construct
  }
}