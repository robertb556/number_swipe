'use strict';


//##############################################
//-----------------ANIMATION--------------------
//##############################################
var Animations = function(){
	var me = {};

	me.animations = [];

	me.add = function(obj){
		me.animations.push(obj);
		return obj;
	};

	me.removeDead = function(){
		var i = 0;
		while(i < me.animations.length){
			if(me.animations[i].age >= me.animations[i].maxAge){
				me.animations[i].onFinish();
				me.animations.splice(i, 1);
			}
			else{
				i++;
			}
		}
	};

	me.draw = function(ctx, isTop){
		//draw animations
		for(var i=0; i<me.animations.length; i++){
			me.animations[i].draw(ctx, isTop);
		}

		//remove expired animations
		me.removeDead();
	};

	return me;
};

var Animation = function(){
	var me = {};
	
	animations.add(me);
	
	me.x = 0;
	me.y = 0;
	me.w = 0;
	me.h = 0;

	me.drawTop = true;
	me.startTime = null;
	me.age = 0;
	me.maxAge = 0;
	me.percentAge = 0;

	me.onFinish = function(){}; //child can implement

	me.draw = function(ctx, isTop){
		if(isTop !== me.drawTop) return;

		if(me.startTime === null) me.startTime = Date.now();
		me.age = Date.now() - me.startTime;
		me.percentAge = me.age / me.maxAge;

		me.onDraw(ctx);
	};

	//child implements
	me.onDraw = function(ctx){};

	
	return me;
};

var RippleAnimation = function(x, y){
	var me = Animation();

	me.x = x;
	me.y = y;
	me.drawTop = false;
	me.maxAge = 2000;

	me.onDraw = function(ctx){
		var w = me.percentAge*162;
		var h = me.percentAge*96;
		var x = me.x-Math.floor(w/2);
		var y = me.y-Math.floor(h/2);
		var qty = Math.round((1 - me.percentAge) * 10);
		for(var i=0; i<qty; i++) ctx.drawImage(IMG["ripple"], x+17, y+23, w, h);
	};

	return me;
};


var SpriteAnimation = function(x, y, spriteSheet, frames, columns, frameDuration, frameWidth, frameHeight, drawWidth, drawHeight){
	var me = Animation();

	me.x = x;
	me.y = y;
	me.spriteSheet = spriteSheet;
	me.maxFrame = frames;
	me.columns = columns;
	me.frameDuration = frameDuration;
	me.frameWidth = frameWidth;
	me.frameHeight = frameHeight;
	me.drawWidth = drawWidth;
	me.drawHeight = drawHeight;
	me.maxAge = me.maxFrame * me.frameDuration;

	me.onDraw = function(ctx){
		var frame = Math.floor(me.age / me.frameDuration);
		var column = frame % me.columns;
		var row = Math.floor(frame / me.columns);
		if(me.age > me.maxAge){
			column = me.columns-1;
			row = (me.maxFrame-1) % column;
		}
		var sx = column * me.frameWidth;
		var sy = row * me.frameHeight;
		var sw = me.frameWidth;
		var sh = me.frameHeight;
		var x = me.x;
		var y = me.y;
		console.log("rc["+me.age+"]["+me.maxAge+"]["+column+"]["+row+"]");

		ctx.drawImage(me.spriteSheet, sx, sy, sw, sh, x, y, drawWidth, drawHeight);
	};

	return me;
};

/*
var CharacterTextAnimation = function(cell, text){
	var me = Animation();
	
	me.x = cell.x + Math.floor(CELL_HEIGHT*0.5);
	me.y = cell.y + Math.floor(CELL_HEIGHT*0.5);
	me.maxAge = 800;
	
	me.onDraw = function(ctx){
		var x = me.x;
		var y = me.y - (me.percentAge*20);
		
		ctx.font = "24px Arial";
		ctx.textAlign = "center";
		ctx.fillStyle = "black";
		ctx.fillText(text, x-1, y-1);
		ctx.fillText(text, x+1, y+1);
		ctx.fillText(text, x-1, y+1);
		ctx.fillText(text, x+1, y-1);
		ctx.fillStyle = "gold";
		ctx.fillText(text, x, y);
	};
	
	return me;
};

var MoveAnimation = function(characterImg, startCell, endCell){
	var me = Animation();
	
	me.x = 0;
	me.y = 0;
	me.img = characterImg;
	me.maxAge = 800;
	
	me.onDraw = function(ctx){
		var x = startCell.x*(1-me.percentAge) + endCell.x*me.percentAge;
		var y = startCell.y*(1-me.percentAge) + endCell.y*me.percentAge;
		
		ctx.drawImage(me.img, x, y);
	};
	
	return me;
};
*/
