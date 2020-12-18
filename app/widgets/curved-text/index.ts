// TODO 3 typescript doesn't like this file much; do we need to do something with tsconfig.json?
import { me as device } from "device"

const construct = el => {
  const textEl = el.getElementById('text')
  //const myTextEl = el.getElementById('myText')  // we don't need both textEl and myTextEl

  // No, I think we should adress them by the <use>´s ID
  //myText was just the ID of my play text so it should be replaced with individula text ID´s
  // but I´m not sure, what to change in the code in this case. so it looks so "simple-fitbit"
  // it´s rather complex to me

  const positionEl = el.getElementById('position')
  const charGroupEl = el.getElementById('charGroup')
  let radius = positionEl.r
  let textAnchor = textEl.textAnchor

  // TODO 3 implement setters for all settings

  // Would be great to have a "line-up" in app/index similar to how fitfont does
  // like this:
  // const timeLabel = new FitFont({ id:'timeLabel', font:'Bebas_Neue_110',halign: "middle", valign: "top", letterspacing:-1});
  // and then add rotating properties.
  // or we could only have rotating settings and font-style would have to be set manually in css or svg
  // I think, I prefer the latter version to not overload it


  // I see that arr[i] always executes everything i times
  // is there a way to let it process i, i++,... without going back through all each step?

  // I absolutely don´t understand, how your uses get rotated
  // without being grouped in the index.view :))))
  // OH, got it! In the sub-index.view, where your symbol is defined!
  // I think, I begin to understand, what you did!!! very, very nice!


  //Text settings
  let rotateText: number = 0      //angle to rotate whole text from its beginning
  let letterSpacing: number = 10
  let modus: string = "auto";     // auto: automatic, fix: rotate fix angle each

  /*Rotate fix angle*/
  let charAngle: number = 10;//angle each char

  //console.log(`text=${textEl.text} anchor=${textEl.textAnchor} r=${positionEl.r}`)

  // Below, we add members to el, effectively giving it an additional interface:

  Object.defineProperty(el, 'text', {  // It may be dangerous to use the property name 'value' because it's already defined on GraphicsElement.
    set: function(newValue) {
      textEl.text = newValue
      el.redraw()
    }
  })

  el.redraw = () => {   // TODO 3 does redraw() need to be public? NO! It shouldn´t at all in case you are asking me, haha. I remember your TODO´s were for you not meant to be answered?
    //VARIABLES
    /*CENTER OF ROTATION*/
    // isn´t cx,cy misleading? as in fact it is not, but the center of rotation
    charGroupEl.x = positionEl.cx - device.screen.width / 2; // -half width. why is me.screen.width / 2 not working??? Permission?
    charGroupEl.y = positionEl.cy - device.screen.height / 2;

    //PREVENT MIRRORING
    charAngle = charAngle * (radius < 0 ? -1 : 1);

    /*ASSIGN CHARS*/
    let chars = (textEl.text.split("")); // array of char set of text to curve
    let char  = el.getElementsByClassName("char") as TextElement[];// single char textElements

    //APPLY FONT FAMILY AND SIZE
    const numChars = chars.length
    const fontSize = textEl.style.fontSize
    let i;
    if (fontSize > 0)
      for (i = 0; i < numChars; i++) char[i].style.fontSize = fontSize
    const fontFamily = textEl.style.fontFamily
    for (i = 0; i < numChars; i++) char[i].style.fontFamily = fontFamily

    let width0: number = char[0].getBBox().width;   //first char to calc. text-alignment // TODO 1 this worries me because char[0].text hasn't been set yet
    //char[] has been set in line 68 and width0 is only kind of command on char[] which I execute per calling char[i].parent.parent later
    //to get a handle on the textElement

    width0 = 0  // kludge to keep width0 at 0, in case char[0] had something in it from a previous call
    // TODO 1 I don't think width0 is necessary: its value is always 0. Please check all usage of it!
    

    /*CALCULATE PROPERTIES OF CHARS*/
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
          let textWidth = (textEl as TextElement).getBBox().width; // width original text
          //console.log("width myTextEl "+textWidth)
          //let textWidth2 = (textEl as TextElement).getBBox().width; // width original text
          //console.log("width textEl"+ textWidth2 )


          let w: number;
            for (w = 1; w < numChars + 1; w++) {
              // width of the previous char
              let nextWidth = char[w].getBBox().width;
              let halfNext = nextWidth / 2;

              //calculates rotation angle for each char
              //to define distance : half width previous char + half width current char + half letterspacing
              (char[i].parent as GroupElement).groupTransform.rotate.angle =
              (cumWidths[i]  - charWidth / 2 + halfNext  + (i-1/2) * letterSpacing)  * degreePx;

              //let prevWidth = nextWidth;  // not used
            }


            //TEXT-ANCHOR and ROTATION
            (char[i].parent.parent as GroupElement).groupTransform.rotate.angle = rotateText
                       
                    
                    -  (textAnchor === "middle" ? (textWidth + 2*width0  + (i - 1 ) * letterSpacing )  * degreePx / 2
                  :    textAnchor === "start" ? - (width0 + letterSpacing * 1/2)/2
                  : +  (textWidth + (i -1/2) * letterSpacing + width0 / 2 ) * degreePx);


/*

            let alignAdjust = (char[i].parent.parent as GroupElement).groupTransform.rotate.angle 
            
              if (textAnchor ==="middle") {
                alignAdjust = rotateText - (textWidth + 2*width0  + (i - 1 ) * letterSpacing )  * degreePx / 2 ;
                console.log(alignAdjust+"1");
                alignAdjust = rotateText - (textWidth  + (i - 1 ) * letterSpacing )  * degreePx / 2 ;
                console.log(alignAdjust+"2");
              } else if (textAnchor === "start"){
                
                alignAdjust = rotateText -  - (width0 + letterSpacing * 1/2)/2;
                console.log(alignAdjust+"1");
                alignAdjust = rotateText -  - (letterSpacing * 1/2)/2;
                console.log(alignAdjust+"2");
              } else {
                //(textAnchor === "end")
                alignAdjust = rotateText - +  (textWidth + (i -1/2) * letterSpacing + width0 / 2 ) * degreePx;  
                console.log(alignAdjust+"1");
                alignAdjust = rotateText - +  (textWidth + (i -1/2) * letterSpacing ) * degreePx;
                console.log(alignAdjust+"2");
              };

*/



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