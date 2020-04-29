'use strict';


//##############################################
//-----------------tutorial---------------------
//##############################################
var Tutorial = function(){
	var me = Level([], 0, 0, 0, 0, false);
	me.plan.push([1,2,1]);
	me.plan.push([2,2,1]);

	//me.addChild(TutorialMessage("Rule #1", 24, 20, 60));
	me.addChild(TutorialMessage("Connect the dots.", 24, 20, 90));
	me.addChild(TutorialMessage("(swipe from one to the other)", 18, 20, 120));
	
	me.addChild(MouseUpListener(function(){
		if(path.length === 2){
			nextRound(Tutorial2());
		}
		else{
			path.length = 0;
		}
	}));

	return me;
};


var Tutorial2 = function(){
	var me = Level([], 0, 0, 0, 0, false);
	me.plan.push([1,2,1]);
	me.plan.push([2,2,1]);
	me.plan.push([3,2,1]);
	me.plan.push([3,3,1]);
	me.plan.push([1,4,1]);
	me.plan.push([2,4,1]);
	me.plan.push([3,4,1]);

	//me.addChild(TutorialMessage("Rule #2", 24, 20, 60));
	me.addChild(TutorialMessage("Connect ALL the dots.", 24, 20, 90));
	me.addChild(TutorialMessage("(one long swipe)", 18, 20, 120));

	me.addChild(MouseUpListener(function(){
		if(path.length === 7){
			nextRound(Tutorial3());
		}
		else{
			path.length = 0;
		}
	}));

	return me;
};


var Tutorial3 = function(){
	var me = Level([], 0, 0, 0, 0, false);
	me.plan.push([1,2,2]);
	me.plan.push([2,2,1]);
	me.plan.push([3,2,1]);


	//me.addChild(TutorialMessage("Rule #3", 24, 20, 60));
	me.addChild(TutorialMessage("You can only connect dots of", 24, 20, 90));
	me.addChild(TutorialMessage("equal or higher value.", 24, 20, 120));
	me.addChild(TutorialMessage("(connect all the dots)", 18, 20, 150));
	

	me.addChild(MouseUpListener(function(){
		if(path.length === 3){
			nextRound(Tutorial4());
		}
		else{
			path.length = 0;
		}
	}));

	return me;
};

var Tutorial4 = function(){
	var me = Level([], 0, 0, 0, 0, false);
	me.plan.push([1,2,1]);
	me.plan.push([2,2,1]);
	me.plan.push([3,2,2]);
	me.plan.push([3,3,2]);
	me.plan.push([3,4,2]);
	me.plan.push([2,4,3]);
	me.plan.push([1,4,7]);
	me.plan.push([1,5,8]);
	me.plan.push([1,6,9]);
	me.plan.push([2,6,9]);
	me.plan.push([3,6,9]);


	//me.addChild(TutorialMessage("Rule #4", 24, 20, 60));
	me.addChild(TutorialMessage("There may be repeats, or", 24, 20, 90));
	me.addChild(TutorialMessage("gaps in the sequence.", 24, 20, 120));
	//me.addChild(TutorialMessage("(connect all the dots)", 18, 20, 150));
	
	me.addChild(MouseUpListener(function(){
		if(path.length === 11){
			nextRound(Tutorial5());
		}
		else{
			path.length = 0;
		}
	}));

	return me;
};

var Tutorial5 = function(){
	var me = Level([], 0, 0, 0, 0, false);
	me.plan.push([1,2,1]);
	me.plan.push([2,2,3]);
	me.plan.push([1,3,4]);
	me.plan.push([2,3,2]);
	

	//me.addChild(TutorialMessage("Rule #4", 24, 20, 60));
	me.addChild(TutorialMessage("Can you solve this one?", 24, 20, 90));
	//me.addChild(TutorialMessage("equal or higher value.", 24, 20, 120));
	//me.addChild(TutorialMessage("(connect all the dots)", 18, 20, 150));
	
	me.addChild(MouseUpListener(function(){
		if(path.length === 4){
			nextRound(Tutorial6());
		}
		else{
			path.length = 0;
		}
	}));

	return me;
};


var Tutorial6 = function(){
	var me = Level([], 0, 0, 0, 0, false);
	me.plan.push([1,3,2]);
	me.plan.push([2,3,3]);
	me.plan.push([3,3,6]);
	me.plan.push([2,2,6]);
	me.plan.push([2,4,9]);


	//me.addChild(TutorialMessage("Rule #4", 24, 20, 60));
	me.addChild(TutorialMessage("Good. How about this one?", 24, 20, 90));
	//me.addChild(TutorialMessage("equal or higher value.", 24, 20, 120));
	//me.addChild(TutorialMessage("(connect all the dots)", 18, 20, 150));
	
	me.addChild(MouseUpListener(function(){
		if(path.length === 5){
			nextRound(Tutorial7());
		}
		else{
			path.length = 0;
		}
	}));

	return me;
};


var Tutorial7 = function(){
	var me = Level([], 0, 0, 0, 0, false);
	me.plan.push([0,3,2]);
	me.plan.push([1,3,3]);
	me.plan.push([2,3,6]);
	me.plan.push([3,3,6]);
	me.plan.push([4,3,6]);
	me.plan.push([0,4,6]);
	me.plan.push([1,4,2]);
	me.plan.push([2,4,3]);
	me.plan.push([3,4,7]);
	me.plan.push([4,4,8]);

	

	//me.addChild(TutorialMessage("Rule #4", 24, 20, 60));
	me.addChild(TutorialMessage("One last thing.", 24, 20, 90));
	me.addChild(TutorialMessage("Sometimes you can't get em all.", 24, 20, 120));
	me.addChild(TutorialMessage("(get the most that is possible)", 18, 20, 150));
	
	me.addChild(MouseUpListener(function(){
		if(path.length === 9){
			nextRound(Tutorial8());
		}
		else{
			path.length = 0;
		}
	}));

	return me;
};

var Tutorial8 = function(){
	var me = Level([], 0, 0, 0, 0, false);

	//me.addChild(TutorialMessage("Rule #4", 24, 20, 60));
	me.addChild(TutorialMessage("Gongratulations!.", 24, 20, 90));
	me.addChild(TutorialMessage("You passed the tutorial.", 24, 20, 120));
	//me.addChild(TutorialMessage("(get the most that is possible)", 18, 20, 150));

	me.addChild(EndTutorialButton());

	return me;
};

var EndTutorialButton = function(){
	var me = UiObject();

	me.w = BUTTON_W;
	me.h = BUTTON_H;
	me.x = BUTTON_X;
	me.y = BUTTON_Y3;
	

	me.onDraw = function(ctx){
		ctx.drawImage(IMG['great'], me.x, me.y);

		if(mouse.isDown && me.contains(mouse.x, mouse.y)) ctx.drawImage(IMG['continuedown'], me.x, me.y);
	};

	me.onMouseUp = function(){
		setActiveElement(levelSelectScreen);
	};

	return me;
};


var TutorialMessage = function(message, fontSize, x, y){
	var me = UiObject();

	me.x = x;
	me.y = y;
	me.fontSize = fontSize;
	me.message = message;

	me.onDraw = function(ctx){
		ctx.font = me.fontSize+"px Arial";
		ctx.fillStyle = "#ececec";
		ctx.textAlign = "left";
		ctx.fillText(me.message, me.x, me.y);
	};

	return me;
};

