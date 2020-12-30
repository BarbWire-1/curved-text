Resolve questions:
-
TODO M 5.1 Discuss Barb's "not sure about font.properties settings via css, js or svg".\
TODO M 5.2 Discuss Barb's "playing with different animations and transformations, I think implementing them needs a very strict plan for their accessability".\
~~TODO M 10.1 Discuss: for management, use git project, this file, or something else.~~\
~~TODO M 10.2 Discuss: how stable should the 'base' code be before attempting to widget it (especially re animations). Discuss whether current code is there yet.~~\
TODO M 20.3 Discuss: how robust do we want this to be if users use bad settings (eg, text too long)?\

TODO M 20 Widget the current code.\
TODO M 21 Discuss whether only allow integer to rotateText?\
TODO M 22 Discuss about renaming to fitbit-simple-curved-text\
TODO M 23 Discuss: ts and js version? eventually sdk?\
TODO M 24 Discuss: add outer group to use to set not text-related attributes in css. If so in symbol, or in use?

Interface:
-
~~TODO M 20.4 Discuss: convert interface.odt to .md, so git can track changes. Do so if 'yes'.~~\
~~TODO M 25.1 Add column(s) for CSS in interface spec.~~\
TODO M 25.2 Decide how to indicate priorities in interface spec (eg, essential, desirable, luxury, dream).\
TODO M 25.3 Discuss: having another interface spec (desirable at A but transformable at B)\
TODO M 30 Flesh out interface spec (non-animations).\
TODO M 35 Flesh out interface spec (animations).\
TODO M 40 Implement all essential interface capabilities.

Publishing:
-
TODO M 800.1 Purge non-widget code and files to avoid confusing users when it goes public.\
TODO M 800.2 User documentation (readme.md?).\
TODO M 850 Approach others to try it and provide feedback?

 Go public:
 -
TODO M 900 Ask Fitbit to put it in OSS apps.\
~~TODO M 1 build a wf for testing. discuss whether one textElement or rather multiple.(evtl build <use>s of myText and test how to manipulate settings in the non-widget part)~~

comments/opinions on TODO´s
-

Barb
-
* 5.2   animation should not be a defined part of the widget. evtl. show up some possibilities in a docu or examples later.
        (would be part of the user´s responsility to not over-use the system)
* 10.1  use this for now, til I got used to .md
* 10.2  ready to take off (forget about implementing animations in the widget)

* 20.3  it seems to be stable. we probabely could implement a log for bad settings
* 20.4  done 
* 25.1  done 
* 25.2  I would suuggest essential => doable => desirable (exclude luxury => dream for now, thinking the construction might be consistant enough to do so later "if board")
* 1     skipped

PS: I would rather keep all TODO´s here and crossout the obsolete ones, til the project is close to nearly "done".
ok, maybe not really AL but the code relevants.