'use strict';


//##############################################
//-----------------NODE-------------------------
//##############################################
var Node = function(gx, gy, x, y, index){
	var me = UiObject();

	me.isNode = true;
	me.index = index;
	me.gx = gx;
	me.gy = gy;
	me.x = x;
	me.y = y;
	me.w = CELL_SIZE;
	me.h = CELL_SIZE;
	me.neighbors = [];

	me.value = -1;

	me.contains = function(x,y){
		if(!me.isActive()) return false;

		var cx = me.x + Math.round(me.w/2);
		var cy = me.y + Math.round(me.h/2);
		var dx = cx - x;
		var dy = cy - y;
		var radius = Math.round(me.w/2);
		var dist = Math.sqrt(dx*dx + dy*dy);
		if(x>me.x && x<me.x+me.w && y>me.y && y<me.y+me.h && dist < radius) return true;
		else return false;
	};

	me.isActive = function(){
		if(me.value < 0) return false;
		return true;
	};

	me.tryAddPath = function(){
		var last = path[path.length-1];
		if(me !== last && last.hasNeighbor(me) && me.value >= last.value && !me.isAlreadyInPath()){
			path.push(me);
		}
	};

	me.isAlreadyInPath = function(){
		for(var i=0; i<path.length; i++){
			if(path[i] === me) return true;
		}
		return false;
	};

	me.hasAnyPathOptions = function(){
		for(var i=0; i<me.neighbors.length; i++){
			var n = me.neighbors[i];
			if(n && !n.isAlreadyInPath() && n.value >= me.value) return true;
		}
		return false;
	}

	me.hasNeighbor = function(node){
		for(var i=0; i<me.neighbors.length; i++){
			if(me.neighbors[i] === node) return true;
		}
		return false;
	};

	me.isInPath = function(){
		for(var i=0; i<path.length; i++){
			if(path[i] === me) return true;
		}
		return false;
	};
	
	me.onDraw = function(ctx){
		if(!me.isActive()) return;

		var x = me.x-5;
		var y = me.y-5;


		if(activeElement === pathScreen){
			if(me.isInPath()){
				ctx.drawImage(IMG['nph'], x, y);
			}
			else{
				ctx.drawImage(IMG['n'], x, y);
			}
			ctx.drawImage(IMG['n'+me.value], x, y);
		}
		else if(me.isInPath()){
			ctx.fillStyle = "#fff";
			ctx.beginPath();
			ctx.arc(x+24, y+24, 10, 0, Math.PI*2);
			ctx.fill();
			//ctx.drawImage(IMG['np'], x, y);
		}
		else{
			if(!me.isTooLow()){
				//ctx.fillStyle = COLORS[me.value];
				//ctx.beginPath();
				//ctx.arc(x+24, y+24, 21, 0, Math.PI*2);
				//ctx.fill();
				ctx.drawImage(IMG['n'], x, y);
				//ctx.drawImage(IMG['n'+me.value], x, y);
			}
			else{
				ctx.fillStyle = "#333";
				ctx.beginPath();
				ctx.arc(x+24, y+24, 21, 0, Math.PI*2);
				ctx.fill();
				//ctx.drawImage(IMG['nd'], x, y);
			}
		}


		/*
		var img = IMG['n'];
		if(me.isInPath()) img = IMG['np'];
		if(currentLevel.hoverNode === me) img = IMG['nh'];
		if(me.isInPath() && currentLevel.hoverNode === me) img = IMG['nph'];

		ctx.drawImage(img, x, y);
		ctx.drawImage(IMG['n'+me.value], x, y);
		*/
	};

	me.isTooLow = function(){
		if(path.length > 0 && path[path.length-1].value > me.value) return true;
		else return false;
	};

	me.getBestPath = function(path){
		path.push(me.index);

		var longest = path.slice();
		for(var i=0; i<me.neighbors.length; i++){
			var n = me.neighbors[i];
			if(n && n.value >= me.value && !path.includes(n.index)){
				var p = n.getBestPath(path.slice());
				if(p.length > longest.length){
					longest = p;
				}
			}
		}
		return longest;
	};
	
	return me;
};






