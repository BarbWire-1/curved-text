
export interface CurvedTextWidget extends GraphicsElement {
  text: string;
  startAngle: Number;
  anchorAngle: Number;
  redraw(): void;
}

// @ts-ignore
const construct: CurvedTextWidget = (el:GraphicsElement) => {
  // TODO G 0 can't call .getWidgetById on an element twice
  const textEl = el.getElementById('text') as TextElement;
  const radiusEl = el.getElementById('radius') as CircleElement;

  const layoutEl = el.getElementById('layout') as ArcElement;
  const alignRotate = el.getElementById('alignRotate') as GroupElement;

  // INITIALISE SETTINGS FROM SVG or CSS
  /* These attributes can't be specified in <use>: r, start-angle, sweep-angle, text-anchor, letter-spacing, text, text-buffer.
     Therefore, we pick these up from hidden elements within the widget. */

  if (textEl.class) {
    el.class = el.class + ' ' + textEl.class;   // TODO G 1 does this need to be done BEFORE accessing radiusEl, and giving the system time to apply the CSS?
    textEl.class = '';   // prevent textEl from being picked up by document.getElementsByClassName()
  } else
    el.class = el.class; // This shouldn't do anything, but seems to cause CSS rules to be reapplied. Without it, CSS selectors such as "#id #radius" don't work.

  let radius = radiusEl.r ?? 100;  //if negative, text is bottom curve

  let textAnchor: string;
  try {     // textEl.textAnchor throws an error if textAnchor not defined
    textAnchor = textEl.textAnchor;   //0: middle, 1: start,  2: end at 0°
  } catch(e) {
    textAnchor = 'middle';
  }
  //console.log(`textAnchor=${textAnchor}`)

  //let textAnchor: string = textEl.textAnchor; //0: middle, 1: start,  2: end at 0°
  let letterSpacing: number = textEl.letterSpacing ?? 0;
  let sweepAngle: number = layoutEl.sweepAngle ?? 0; //"fix" mode angle of each char, chars are stacked at 0° if no setting. If undefined, "auto" mode. // former charAngle
  if (radius < 0) sweepAngle = -sweepAngle;   //PREVENT MIRRORING
  let startAngle: number = layoutEl.startAngle ?? 0;  //angle to rotate anchor point for whole text // former startAngle


  // INITIALISE LOCAL VARIABLES
  let anchorAngle: number = 0;  // angle by which whole string should be rotated to comply with anchor, excluding startAngle adjustment of anchor // former stringAngle


  // PRIVATE FUNCTIONS:
  const setStartAngle = newValue => {
    startAngle = newValue;
    alignRotate.groupTransform.rotate.angle = startAngle + anchorAngle;
  }

  // ADD PROPERTIES TO SVG ELEMENT OBJECT:
  Object.defineProperty(el, 'text', {
    set: function(newValue) {
      textEl.text = newValue;
      (el as CurvedTextWidget).redraw();
    }
  });

  Object.defineProperty(el, 'startAngle', {
    set: function(newValue) {setStartAngle(newValue);}
  });

  Object.defineProperty(el, 'anchorAngle', {
    set: function(newValue) {setStartAngle(newValue);}
  });

  (el as CurvedTextWidget).redraw = () => {   // redraw() doesn't really need to be public, except to cover unforeseen cases


    //-----------------------------------------------------------------------------------------------------------------------------

    //VARIABLES
    //ASSIGN CHARS
    let chars = (textEl.text.split("")); // array of char set of text to curve
    let char  = el.getElementsByClassName("char") as TextElement[];// single char textElements
    const numChars = chars.length;


    //REMOVE ANY CHARS THAT ARE NO LONGER NEEDED
    // There's no need to do this initially. It could be done only when text is changed, but that would complicate the code there.
    for (let i=numChars; i<char.length; i++)
      char[i].style.display = 'none';

    //IF NO TEXT, RETURN
    if (!numChars) return;

    //CIRCUMFERENCE FOR AUTO
    const circ = 2 * radius * Math.PI;
    const degreePx = 360 / circ;

    //PREVENT MIRRORING
    char[0].text = chars[0];
    let y = radius < 0 ? -radius : -radius + char[0].getBBox().height / 2;  //define y of text, based on radius
    anchorAngle = 0;

    //INITIALISE char[]
    for (let i: number = 0; i < numChars ; i++) {
      //apply text and y
      char[i].text = chars[i];// assign chars to the single textElements
      char[i].style.display = 'inherit';
      char[i].y = y;
    }

    if (!sweepAngle) {   // sweepAngle wasn't specified, so do mode=0 (auto)

      //AUTO MODE

      let cumWidth: number = 0;
      for (let i: number = 0; i < numChars ; i++) {
        //Variables for positioning chars
        let charWidth = char[i].getBBox().width;
        cumWidth += charWidth;  //  (thank you, Peter for this neat example of simplifying and efficiency!)

        //ROTATION PER CHAR
        (char[i].parent as GroupElement).groupTransform.rotate.angle =
        (cumWidth  - charWidth / 2 +  (i) * letterSpacing )  * degreePx;
      } // end of char loop

      //TEXT-ANCHOR MODE AUTO
      switch(textAnchor) {
        case 'middle':
          anchorAngle = - (cumWidth + ((numChars -1) * letterSpacing)) * degreePx / 2;//ok
          break;
        case 'end':
          //anchorAngle = -(anchorAngle -= (cumWidth + (numChars - 1 ) * letterSpacing  ) * degreePx);// NOT ok
          anchorAngle = - (cumWidth + (numChars - 1 ) * letterSpacing  ) * degreePx;
          break;
      }
    } else {    // sweepAngle is non-zero, so do mode=1 (fix)

      //FIX MODE

      for (let i: number = 0; i < numChars ; i++) {
        //ROTATION PER CHAR
        (char[i].parent as GroupElement).groupTransform.rotate.angle = i * sweepAngle;
      } // end of char loop

      //TEXT-ANCHOR MODE FIX
      const firstChar = char[0].getBBox().width;
      const lastChar = char[numChars-1].getBBox().width;
      switch(textAnchor) {
        case 'middle':
          anchorAngle -= (((numChars-1) * sweepAngle) + (lastChar - firstChar) / 2 * degreePx) / 2;
          //anchorAngle = (1 - numChars)  * sweepAngle / 2 // start at middle 0/180 - exactly by angle only!
          break;
        case 'start':
          anchorAngle = firstChar / 2 * degreePx;
          //anchorAngle = 0; //centers at o/180 exactly by angle only!
          break;
        case 'end':
          anchorAngle = (numChars - 1 ) * - sweepAngle - lastChar / 2 * degreePx;
          //anchorAngle = - (numChars - 1 ) * sweepAngle; // end at middle 0/180 - exactly by angle only!
          break;
      }
    };

    alignRotate.groupTransform.rotate.angle = startAngle + anchorAngle;
  }

  (el as CurvedTextWidget).redraw();

  return el as CurvedTextWidget;
}

/*export default () => {
  return {
    name: 'curvedText',
    construct: construct
  }
}*/

export const curvedText = () => {
  return {
    name: 'curvedText',
    construct: construct
  }
}