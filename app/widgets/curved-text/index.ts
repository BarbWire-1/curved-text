// TODO P 3 typescript doesn't like this file much; do we need to do something with tsconfig.json?
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

  // TODO P 3 implement setters for all settings

  // Would be great to have a "line-up" in app/index similar to how fitfont does
  // like this:
  // const timeLabel = new FitFont({ id:'timeLabel', font:'Bebas_Neue_110',halign: "middle", valign: "top", letterspacing:-1});


  // I see that arr[i] always executes everything i times
  // is there a way to let it process i, i++,... without going back through all each step?




  //Text settings
  const startAngle = el.getElementById('orientation').startAngle    // read value (if any) from SVG
  let rotateText: number = startAngle ? startAngle : 0      //angle to rotate whole text from its beginning
  let letterSpacing: number = 10
  //let modus: string = "auto";     // auto: automatic, fix: rotate fix angle each
  // modus deprecated: use _charAngle instead. If _charAngle is undefined, behave as per modus==="auto".

                                                                              // OH!!!! you use MODUS for letter-alignment? it´s thought for alignment of the whole textElement
                                                                              // letters have to be fix "middle" to rotate them nicely
                                                                              // It changes the angle of the outer rotating group, depending on length of the text
                                                                              // That must be, where your alignment fights back

  /*Rotate fix angle*/
  let _charAngle: number;  //angle each char. Name changed from charAngle because charAngle is now the name of the property (setter).

  //console.log(`text=${textEl.text} anchor=${textEl.textAnchor} r=${positionEl.r}`)

  // Below, we add members to el, effectively giving it an additional interface:

  Object.defineProperty(el, 'text', {
    set: function(newValue) {
      textEl.text = newValue
      el.redraw()
    }
  })

  Object.defineProperty(el, 'startAngle', {  // This isn't the ideal name, but it's consistent with the equivalent attribute in the <arc>
    set: function(newValue) {
      rotateText = newValue
      el.redraw()   // TODO P 4 This is inefficient, because it lays out every character again. It shouldn't be used for animation, but would be okay for config changes.
    }
  })

  Object.defineProperty(el, 'charAngle', {  // This isn't the ideal name, but it's consistent with the equivalent attribute in the <arc>
    set: function(newValue) {
      _charAngle = newValue
      el.redraw()
    }
  })

  el.redraw = () => {   // TODO P 3 does redraw() need to be public? NO! It shouldn´t at all in case you are asking me, haha. I remember your TODO´s were for you not meant to be answered?
    //VARIABLES
    /*CENTER OF ROTATION*/
    // isn´t cx,cy misleading? as in fact it is not, but the center of rotation
    charGroupEl.x = positionEl.cx - device.screen.width / 2; // -half width. why is me.screen.width / 2 not working??? Permission?
    charGroupEl.y = positionEl.cy - device.screen.height / 2;

    //PREVENT MIRRORING
    _charAngle = _charAngle * (radius < 0 ? -1 : 1);  // TODO P 2 we need to discuss this. If radius<0, widget will swap the sign of _charAngle every time it's called. Is it ever legitimate for angle to be <0?

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


    /*CALCULATE PROPERTIES OF CHARS*/
    for (i = 0; i < numChars ; i++) {

        char[i].text = chars[i];// assign chars to the single textElements
        char[i].y = radius < 0 ? - radius : - radius + char[0].getBBox().height / 2;//move text it´s height downwards

        /*FOR AUTO MODUS*/
        if (! _charAngle) {   // _charAngle unspecified, so behave like modus==="auto"; ie, work out char angles automatically

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
            let last = numChars -1;
            let lastChar = last - 1;
            let firstChar = cumWidths[0];


            (char[i].parent.parent as GroupElement).groupTransform.rotate.angle =

            rotateText
                -  (textAnchor == "middle" ? (textWidth +  (i - 1) * letterSpacing )  * degreePx / 2
              :    textAnchor == "start" ?  (letterSpacing - firstChar) / 2  * degreePx
              : +  (textWidth + (i - 3/2 ) * letterSpacing + lastChar  / 2 ) * degreePx);


        }else{  // _charAngle is defined, so use it to rotate each character (like modus==='fix')

          //ROTATION PER CHAR
          (char[i].parent as GroupElement).groupTransform.rotate.angle =  i * _charAngle; // TODO P 3 this could probably be simplified: don't need the i>0
                                                                                                     //hahaha. what did I think??? just shouldn´t look that easy ;)
          //TEXT-ANCHOR
          (char[i].parent.parent as GroupElement).groupTransform.rotate.angle = rotateText

              - (textAnchor == "middle" ? (numChars - 1)* _charAngle / 2
            :   textAnchor == "start" ?  - (_charAngle / 2)
            : + (numChars - (numChars % 2 == 0 ? 0.5 : 1)) * _charAngle);

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