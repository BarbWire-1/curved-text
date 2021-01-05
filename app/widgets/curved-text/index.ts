const construct = el => {
  const textEl = el.getElementById('text')
  const positionEl = el.getElementById('position')
  const orientationEl = el.getElementById('orientation')
  const containerEl = el.getElementById('container')
  const alignRotate = el.getElementById('alignRotate') as GroupElement;

  // INITIALISE SETTINGS FROM SVG or CSS
  //containerEl.groupTransform.translate.x = centerX ;
  //containerEl.groupTransform.translate.y = centerY ;
  if (textEl.class) console.log(`textEl.class='${textEl.class}'`)
  console.log(`class before=${el.class}`)
  //el.class = 'curvedText classy'
  //console.log(`class after=${el.class}`)
  if (textEl.class) el.class = el.class + ' ' + textEl.class
  console.log(`class after=${el.class}`)

  containerEl.x = positionEl.cx;
  containerEl.y = positionEl.cy;
  //alignRotate.groupTransform.translate.x =  0;
  //alignRotate.groupTransform.translate.y =  0 ;
  let radius = positionEl.r   //if negative, text is bottom curve
  // TODO G 3 how to behave if radius isn't set?
  let textAnchor: string = textEl.textAnchor; //0: middle, 1: start,  2: end at 0°
  let letterSpacing: number = textEl.letterSpacing ?? 0;
  let charAngle: number = orientationEl.sweepAngle ?? 0; //"fix" mode angle of each char, chars are stacked at 0° if no setting. If undefined, "auto" mode.
  if (radius < 0) charAngle = -charAngle;   //PREVENT MIRRORING
  let rotateText: number = orientationEl.startAngle ?? 0;  //angle to rotate anchor point for whole text
  let stringAngle: number = 0;  // angle by which whole string should be rotated to comply with anchor, excluding rotateText adjustment of anchor

  const setRotateText = newValue => {
    rotateText = newValue
    alignRotate.groupTransform.rotate.angle = rotateText + stringAngle
  }

  // ADD PROPERTIES TO SVG ELEMENT OBJECT:
  Object.defineProperty(el, 'text', {
    set: function(newValue) {
      textEl.text = newValue
      el.redraw()
    }
  })

  Object.defineProperty(el, 'startAngle', {
    set: function(newValue) {setRotateText(newValue)}
  })

  Object.defineProperty(el, 'anchorAngle', {
    set: function(newValue) {setRotateText(newValue)}
  })

  el.redraw = (initFont:boolean) => {   // TODO G 4 does redraw() need to be public?
    // initFont: whether to apply fontSize and fontFamily to all char[].

    /*YOUR SETTINGS---------------------------------------------------------------------------------------------------------------*/
    //textEl.text = "widget"// enter text ar data here MiW!MiW!MiW!M
    // centerX is now taken from positionEl.cx
    // centerY is now taken from positionEl.cy

    //let mode: number = 1; // 0: automatic, 1: rotate fix angle each // no longer used; mode is determined from charAngle (since mode can't be set in SVG)
    //console.log("mode: "+ (mode == 0 ? "auto" : "fix"));
    //CIRCLE
    //let radius: number = 50;//if negative, text is bottom curve
    //let centerX: number = 250;
    //console.log("center: x "+centerX);
    //let centerY: number = 250; // center of the circle
    //console.log("center: y " + centerY)

    //TEXT
    //let rotateText: number = 0;//angle to rotate whole text from it´s beginning
    //console.log("rotate text: "+ rotateText + "°");
    //console.log("textAnchor: "+ textAnchor);
    //ANGLE FOR FIX ROTATION
    //let charAngle: number = 25;//angle each char, chars are stacked at 0° if no setting
    //-----------------------------------------------------------------------------------------------------------------------------

    //VARIABLES
    //ASSIGN CHARS
    let chars = (textEl.text.split("")); // array of char set of text to curve
    let char  = el.getElementsByClassName("char") as TextElement[];// single char textElements
    const numChars = chars.length

    //APPLY FONT FAMILY AND SIZE
    if (initFont) {   // might want to break this into initFontSize and initFontFamily if those can be changed separately at run-time
      const fontSize = el.style.fontSize
      console.log(`font-size: el.style.fontSize=${el.style.fontSize} textEl.style.fontSize=${textEl.style.fontSize}`)
      if (fontSize > 0)
        for (let i = 0; i < char.length; i++) char[i].style.fontSize = fontSize
      const fontFamily = textEl.style.fontFamily
      for (let i = 0; i < char.length; i++) char[i].style.fontFamily = fontFamily
    }

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
    //charAngle = charAngle * (radius < 0 ? -1 : 1);  // moved out of redraw() so charAngle doesn't get negated repeatedly

    char[0].text = chars[0];
    let y = radius < 0 ? -radius : -radius + char[0].getBBox().height / 2;  //define y of text, based on radius
    stringAngle = 0;

    //INITIALISE char[]
    for (let i: number = 0; i < numChars ; i++) {
      //apply text and y
      char[i].text = chars[i];// assign chars to the single textElements
      char[i].style.display = 'inherit';
      char[i].y = y
    }

    if (!charAngle) {   // charAngle wasn't specified, so do mode=0 (auto)

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
          stringAngle = - (cumWidth + ((numChars -1) * letterSpacing)) * degreePx / 2;//ok
          break;
        case 'end':
          //stringAngle = -(stringAngle -= (cumWidth + (numChars - 1 ) * letterSpacing  ) * degreePx);// NOT ok
          stringAngle = - (cumWidth + (numChars - 1 ) * letterSpacing  ) * degreePx
          break;
      }
    } else {    // charAngle is non-zero, so do mode=1 (fix)

      //FIX MODE

      for (let i: number = 0; i < numChars ; i++) {
        //ROTATION PER CHAR
        (char[i].parent as GroupElement).groupTransform.rotate.angle = i * charAngle;
      } // end of char loop

      //TEXT-ANCHOR MODE FIX
      const firstChar = char[0].getBBox().width;
      switch(textAnchor) {
        case 'middle':
          stringAngle = - ((numChars -1)  * ((charAngle / 2) ?? 0 )) + firstChar / 2 * degreePx;//ok
          break;
        case 'start':
          stringAngle = firstChar / 2 * degreePx ;//ok
          break;
        case 'end':
          const lastChar = char[numChars-1].getBBox().width;
          stringAngle = (numChars - 1 ) * - charAngle - lastChar / 2 * degreePx;
          break;
      }
    };

    alignRotate.groupTransform.rotate.angle = rotateText + stringAngle;
  }

  el.redraw(true)

  return el
}

export default () => {
  return {
    name: 'curvedText',
    construct: construct
  }
}