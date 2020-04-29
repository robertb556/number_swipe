'use strict';


//##############################################
//-----------------GRAPHICS---------------------
//##############################################
var Graphics = function(){
	var me = Object.create(null);
	
	//Canvas's
	me.canvases = [];
	me.contexts = [];
	me.topCanvas;
	
	me.screenWidth = SCREEN_WIDTH;
	me.screenHeight = SCREEN_HEIGHT;
	me.scale = 2;
	me.windowSizer; 
	me.xoffset = 0;
	
	//Contexts
	me.blackBackgroundCtx;
	me.mapCtx;
	me.menuCtx;
	
	me.frameCount = 0;

	
	me.initialize = function(){
		me.windowSizer 	= document.getElementById("windowSize");
		
		//Set up Contexts
		me.blackBackgroundCtx	= me.newCanvas(1, null,  "black").getContext("2d");
		me.mapCtx				= me.newCanvas(1, null,  null).getContext("2d");
		me.menuCtx				= me.newCanvas(2, null,  null).getContext("2d");

		//Prevent default right click menu so we can use right clicks for input
		document.addEventListener("contextmenu", function(e){ e.preventDefault(); }, false);
	};
	
	me.newCanvas = function(zIndex, opacity, color){
		var canvas					= document.createElement("canvas");
		canvas.width				= me.screenWidth;
		canvas.height				= me.screenHeight;
		canvas.style.border			= '0px solid black';
		canvas.style.padding		= "0px 0px 0px 0px";
		canvas.style.margin			= "0px 0px 0px 0px";
		canvas.style.position		= 'absolute';
		canvas.style.top			= '0px';
		canvas.style.left			= '0px';
		canvas.style.zIndex			= zIndex;
		if(color !== null)		canvas.style.backgroundColor = color;
		if(opacity !== null)	canvas.style.opacity = opacity;
		document.getElementById("main").appendChild(canvas);
		
		if(me.topCanvas === undefined || zIndex > me.topCanvas.style.zIndex) me.topCanvas = canvas;

		var ctx = canvas.getContext("2d");
		ctx.save(); //initially save context cause we're going to restore it next. (probably not nessisary, but just in case).

		me.canvases.push(canvas);
		me.contexts.push(ctx);
		return canvas;
	};

	
	//DRAW METHODS
	me.start = function(){
		me.rescale();
		me.frame();
	};
	
	me.frame = function(){
		requestAnimationFrame(me.frame);
		me.frameCount++;
		
		//DRAW FRAME (redraw constantly for stuff like UI responsiveness)
		me.clearContext(me.mapCtx);
		me.clearContext(me.menuCtx);
		var ctx = me.menuCtx;

		//prepare
		me.preDraw();

		//blur
		if(activeElement !== currentLevel){
			currentLevel.draw(me.mapCtx);
		}

		//main draw
		if(activeElement) activeElement.draw(ctx);

		//restore
		me.postDraw();
	};

	me.preDraw = function(){
		for(var i=0; i<me.contexts.length; i++){
			var ctx = me.contexts[i];
			
			//center all content on screen (use hoizontal offset)
			ctx.save();
			ctx.translate(me.xoffset,0);
		}
	};

	me.postDraw = function(){
		for(var i=0; i<me.contexts.length; i++){
			var ctx = me.contexts[i];

			//restore
			ctx.restore();
		}
	};

	me.clearContext = function(ctx){
		ctx.clearRect(0, 0, me.screenWidth, me.screenHeight);
	};
	
	me.rescale = function(){
		//get window width & height
		var w = me.windowSizer.offsetWidth;
		var h = me.windowSizer.offsetHeight;

		//determine limiting axis (width or height)
		var wratio = w / me.screenWidth;
		var hratio = h / me.screenHeight;
		
		if(hratio < wratio) me.scale = hratio;
		else me.scale = wratio;
		
		//rescale
		for(var i=0; i<me.canvases.length; i++){
			var c = me.canvases[i];
			
			if(hratio < wratio){
				me.screenWidth = Math.floor(w/me.scale);
				c.width = me.screenWidth;
			}else{
				me.screenHeight = Math.floor(h/me.scale);
				c.height = me.screenHeight;
			}
			
			
			c.style.width = Math.floor(me.screenWidth * me.scale);
			c.style.height = Math.floor(me.screenHeight * me.scale);
			
		}
		me.xoffset = Math.floor((me.screenWidth - SCREEN_WIDTH)/2);
	};
	
	me.getTopCanvas = function(){
		return me.topCanvas;
	};
	
	me.initialize();
	return me;
};