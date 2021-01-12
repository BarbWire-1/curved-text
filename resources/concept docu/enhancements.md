better support for animation

getWidgetsByClassName(): getElementsById() will only pick up widgets that have already been constructed via getWidgetById. Could rework factory for more flexibility. class can't be applied directly to \<use\> so may need to move class around within each widget when they're constructed, which need to be prior to getWidgetById().

initialise all widget settings via a ts object (like fitfont)

