'use strict';


//##############################################
//-----------------ui elements------------------
//##############################################
var MouseUpListener = function(onMouseUp){
	var me = UiObject();
	me.w = SCREEN_WIDTH;
	me.h = SCREEN_HEIGHT;

	me.onMouseUp = onMouseUp;

	return me;
};



var PathScreen = function(){
	var me = UiObject();

	me.addChild(ViewScoreButton());

	me.onDraw = function(ctx){

	};

	return me;
};

var LevelSelectScreen = function(){
	var me = UiObject();

	me.w = SCREEN_WIDTH;
	me.h = SCREEN_HEIGHT;


	me.init = function(){
		var x = 0;
		var y = 0;
		var x0 = 25;
		var y0 = 60;
		var xs = 70;
		var ys = 70;
		for(var i=0; i<levels.length; i++){
			me.addChild(LevelButton(x0+x*xs, y0+y*ys, levels[i]));
			x++;
			if(x > 4){
				x = 0;
				y++;
			}
		}
	};

	me.onDraw = function(ctx){
		//bg
		ctx.fillStyle = "#333";
		ctx.fillRect(me.x, me.y, me.w, me.h);

		//choose a level
		ctx.font = "bold 36px Arial";
		ctx.fillStyle = "#ececec";
		ctx.textAlign = "left";
		ctx.fillText("Choose a level", 24, 40);
	};

	me.init();
	return me;
};



var ScoreScreen = function(){
	var me = UiObject();

	me.frameCount = 0;


	me.addChild(ContinueButton());
	me.addChild(ChangeLevelButton());
	me.addChild(ViewPathButton());

	me.onFocus = function(){
		me.frameCount = 0;
	};

	me.onDraw = function(ctx){
		me.frameCount++;

		
		var puzzleDifficulty = getPuzzleDifficulty();
		var pathLength = path.length;
		var maxLength = currentMax;
		var percentComplete = getPercentComplete();
		var tempScore = score;
		if(tempScore > me.frameCount) tempScore = me.frameCount;
		var currentXp = 0;
		var xpRequired = 0;
		if(currentLevel.nextLevel){
			currentXp = currentLevel.nextLevel.lastXp + tempScore;
			xpRequired = currentLevel.nextLevel.xpRequirement;
		}
		if(currentXp > xpRequired) currentXp = xpRequired;
		var percentProgress = currentXp / xpRequired;
		var isPerfect = false;
		if(pathLength === maxLength) isPerfect = true;
		var timeBonus = Math.round(getTimeBonus()*10)/10;
		
		
		var y1 = Math.floor(SCREEN_HEIGHT / 2);
		var x1 = Math.floor(SCREEN_WIDTH / 2);
		var x2 = x1-120;
		var x3 = x1+125;


		//animation background
		var ds = (me.frameCount);
		if(ds > 15) ds = 15;
		graphics.mapCtx.canvas.style.filter = "blur("+1*ds+"px)";
		graphics.mapCtx.canvas.style.opacity = ""+1-(ds/30);
		//for(var i=0; i<ds; i++) ctx.drawImage(IMG['dimscreen'], me.x-50, me.y-50);

		
		//font
		ctx.font = "54px Arial";
		ctx.textAlign = "center";
		ctx.fillStyle = "#ececec";


		//path vs max path
		var pathText = pathLength+"/"+maxLength;
		if(isPerfect) pathText = "Perfect! "+pathText;
		ctx.fillText(pathText, x1, 75);


		ctx.font = "bold 28px Arial";

		//perfect chain
		if(perfectChain > 0){
			ctx.textAlign = "left";
			ctx.fillText("Perfect chain:", x2, 105);
			ctx.textAlign = "right";
			ctx.fillText(""+perfectChain, x3, 105);
		}



		if(xpRequired > 0){
			//next level: 100/200
			ctx.textAlign = "center";
			ctx.fillText("Next Level:  "+currentXp+"/"+xpRequired, x1, 140);


			//progress bar
			var x4 = 40;
			var y4 = 150;
			var wm = 300;
			var w = Math.floor(wm * percentProgress);
			var h = 32;
			//ctx.fillStyle = "#333";
			//ctx.fillRect(x4, y4, wm, h);
			//ctx.fillStyle = "#ececec";
			//ctx.strokeStyle = "#ececec";
			//ctx.lineWidth = 2;
			//ctx.strokeRect(x4, y4, wm, h);
			//ctx.fillRect(x4, y4, w, h);
			ctx.drawImage(IMG["bgbar"], x4, y4, wm, h);
			ctx.drawImage(IMG["bgbarcap2"], x4-32, y4);
			ctx.drawImage(IMG["bgbarcap"], x4+wm, y4);

			ctx.drawImage(IMG["bar"], x4, y4, w, h);
			ctx.drawImage(IMG["barcap2"], x4-32, y4);
			ctx.drawImage(IMG["barcap"], x4+w, y4);


			//Level unlocked
			if(currentLevel.nextLevel.lastXp < currentLevel.nextLevel.xpRequirement && currentLevel.nextLevel.currentXp >= currentLevel.nextLevel.xpRequirement){
				ctx.textAlign = "left";
				ctx.fillText("Level unlocked!", x2, 210+(5*Math.sin(me.frameCount/15)));
			}
		}
		




		if(isPerfect){
			if(getTimeRemaining() > 0){
				//time bonus
				ctx.textAlign = "left";
				ctx.fillText("Time bonus:", x2, 250);
				ctx.textAlign = "right";
				ctx.fillText(""+timeBonus+"x", x3+16, 250);
			}
		}
		else{
			//percent complete
			ctx.textAlign = "left";
			ctx.fillText("Complete:", x2, 250);
			ctx.textAlign = "right";
			ctx.fillText(""+percentComplete+"%", x3+24, 250);
		}

		


		//puzzle difficulty
		ctx.textAlign = "left";
		ctx.fillText("Difficulty:", x2, 290);
		ctx.textAlign = "right";
		ctx.fillText(""+puzzleDifficulty, x3, 290);

		//score
		ctx.textAlign = "left";
		ctx.fillText("Score:", x2, 330);
		ctx.textAlign = "right";
		ctx.fillText(""+tempScore, x3, 330);




		/*
		var text = "Score is blah";
		ctx.font = "48px Arial";
		ctx.textAlign = "center";
		ctx.fillStyle = "black";
		var x = Math.floor(SCREEN_WIDTH/2);
		var y = 90;
		ctx.fillText(text, x+1, y+1);
		ctx.fillText(text, x+1, y-1);
		ctx.fillText(text, x-1, y+1);
		ctx.fillText(text, x-1, y-1);

		ctx.fillStyle = "white";
		ctx.fillText(text, x, y);
		*/
	};

	return me;
};


var LevelButton = function(x, y, level){
	var me = UiObject();

	me.w = 50;
	me.h = 50;
	me.x = x;
	me.y = y;
	
	me.level = level;

	me.onDraw = function(ctx){
		var scale = 1;
		if(me.contains(mouse.x, mouse.y)){
			if(mouse.isDown){
				scale = .9;
			}
			else{
				scale = 1.05;
			}
		}
		
		var w = Math.round(me.w*scale);
		var h = Math.round(me.h*scale);
		var x = me.x + Math.round((me.w-w)/2);
		var y = me.y + Math.round((me.h-h)/2);

		//icon
		var img = IMG['cube'];
		if(me.level.bestPerfectChain >= 2) img = IMG['sstar'];
		if(me.level.bestPerfectChain >= 5) img = IMG['gstar'];
		ctx.drawImage(img, x, y, w, h);

		//lock
		if(me.level.isLocked()){
			ctx.drawImage(IMG['lock'], x, y, w, h);
		}

		//level number
		else{
			ctx.font = "bold 32px Arial";
			ctx.textAlign = "center";
			var xt = x + Math.round((w)/2);
			var yt = 12 + y + Math.round((h)/2);
			ctx.fillStyle = "black";
			ctx.fillText(""+me.level.index, xt+1, yt+1);
			ctx.fillText(""+me.level.index, xt+1, yt-1);
			ctx.fillText(""+me.level.index, xt-1, yt+1);
			ctx.fillText(""+me.level.index, xt-1, yt-1);
			ctx.fillStyle = "#ececec";
			ctx.fillText(""+me.level.index, xt, yt);
		}

		//check mark
		if(me.level.bestPerfectChain > 0) ctx.drawImage(IMG['check'], x, y, w, h);
	};

	me.onMouseUp = function(){
		if(!me.level.isLocked()){
			nextRound(me.level);
		}
	};

	return me;
};


var SubmitButton = function(){
	var me = UiObject();

	me.w = BUTTON_W;
	me.h = BUTTON_H;
	me.x = BUTTON_X;
	me.y = BUTTON_Y3;
	

	me.onDraw = function(ctx){
		ctx.drawImage(IMG['submit'], me.x, me.y);

		if(mouse.isDown && me.contains(mouse.x, mouse.y)) ctx.drawImage(IMG['continuedown'], me.x, me.y);
	};

	me.onMouseUp = function(){
		endRound();
	};

	return me;
};


var ContinueButton = function(){
	var me = UiObject();

	me.w = BUTTON_W;
	me.h = BUTTON_H;
	me.x = BUTTON_X;
	me.y = BUTTON_Y2;
	

	me.onDraw = function(ctx){
		ctx.drawImage(IMG['continue'], me.x, me.y);

		if(mouse.isDown && me.contains(mouse.x, mouse.y)) ctx.drawImage(IMG['continuedown'], me.x, me.y);
	};

	me.onMouseUp = function(){
		nextRound(currentLevel);
	};

	return me;
};


var ChangeLevelButton = function(){
	var me = UiObject();

	me.w = BUTTON_W;
	me.h = BUTTON_H;
	me.x = BUTTON_X;
	me.y = BUTTON_Y1;
	

	me.onDraw = function(ctx){
		ctx.drawImage(IMG['changelevel'], me.x, me.y);

		if(mouse.isDown && me.contains(mouse.x, mouse.y)) ctx.drawImage(IMG['continuedown'], me.x, me.y);
	};

	me.onMouseUp = function(){
		setActiveElement(levelSelectScreen);
	};

	return me;
};


var ViewPathButton = function(){
	var me = UiObject();

	me.w = BUTTON_W;
	me.h = BUTTON_H;
	me.x = BUTTON_X;
	me.y = BUTTON_Y3;
	

	me.onDraw = function(ctx){
		ctx.drawImage(IMG['viewpath'], me.x, me.y);

		if(mouse.isDown && me.contains(mouse.x, mouse.y)) ctx.drawImage(IMG['continuedown'], me.x, me.y);
	};

	me.onMouseUp = function(){
		setActiveElement(pathScreen);
	};

	return me;
};


var ViewScoreButton = function(){
	var me = UiObject();

	me.w = BUTTON_W;
	me.h = BUTTON_H;
	me.x = BUTTON_X;
	me.y = BUTTON_Y3;
	

	me.onDraw = function(ctx){
		graphics.mapCtx.canvas.style.filter = "blur(0px)";
		graphics.mapCtx.canvas.style.opacity = "1.0";

		ctx.drawImage(IMG['score'], me.x, me.y);

		if(mouse.isDown && me.contains(mouse.x, mouse.y)) ctx.drawImage(IMG['continuedown'], me.x, me.y);
	};

	me.onMouseUp = function(){
		setActiveElement(scoreScreen);
	};

	return me;
};

