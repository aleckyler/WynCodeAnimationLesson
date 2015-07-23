/*
 * Do yourselves a favor, comment the shit out of your code
 * Leave yourself notes, reminders, to-do's and keep it clear.
 * No developer I have met has ever complained about someone
 * providing GOOD documentation to their code and approach to a problem.
 *
 * (And later when you come back to your code you will thank yourself.)
 *
 * I always start out my projects with comment that outline the structure
 * i'm about to implement
 * */

Demo  = function(){

    // ===================================================
    // First make references to the libs we want to use:
    // try to be self-explanatory when you name your variables ppl, it only takes a second...
    // do me a favor, don't be lazy. There is nothing worse than coming behind someone only to find a variable
    // named 'j' on line 2376 of someone 2 million+ line code base, and you have no idea what j is used for.
    // have fun tracking that developer down on a kill bill mission.

    this.timeLine = new TimelineLite({onComplete:null});
    this.panel = $(".panel");
    this.header = $(".panel header");
    this.content = $(".panel.content");
    this.video = $(".panel .content video");
    this.canvas = $(".panel .content canvas");
    this.footer = $(".panel footer");
    this.button = $(".panel footer button");
    this.title = $(".panel h3");


    // Create an init to kick off and setup the app
    this.init = function(){
        // We Init the app with the panel hidden
        this.panel.hide();

    }

    // open the panel
    this.openPanel = function(){
        // grab a locally scope reference to the timeline;
        var tl = this.timeLine;

        // show the panel: this essentially sets css ::> display:block
        this.panel.show();

        /*
        * animate the the panel into view::
        * The following is a programatically controlled animation sequence
        * */

        tl.from(this.panel,.45,{ scale:.7, opacity:0, ease:Quad.easeInOut})
            .from(this.header,.25,{width: 0, ease:Quad.easeInOut})
            .from(this.video,.25,{width:0,height:0,rotationY: 180,rotationX:20, ease:Quad.easeInOut})
            .from(this.canvas,.25,{width:0,height:0,rotationY: 180,rotationX:20, ease:Quad.easeInOut})
            .from(this.footer,.25,{opacity:0,width: 0, ease:Bounce.easeInOut})
            .from(this.button,.25,{opacity:0,width: 0, ease:Bounce.easeInOut})
            .from(this.title,.5,{opacity:0, ease:Bounce.easeInOut})
    }


    this.init();
}


demo = new Demo()

