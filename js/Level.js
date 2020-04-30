'use strict';


//##############################################
//-----------------LEVEL------------------------
//##############################################
var Level = function(plan, index, duration, difficulty, xpRequirement, includeSubmitButton){
	var me = UiObject();
	me.x = 0;
	me.y = 0;
	me.w = SCREEN_WIDTH;
	me.h = SCREEN_HEIGHT;
	me.xOffset = MAP_X_OFFSET;
	me.yOffset = MAP_Y_OFFSET;
	me.gWidth = 5;
	me.gHeight = 7;
	
	me.index = index;
	me.duration = duration;
	me.difficulty = difficulty;
	me.xpRequirement = xpRequirement;
	me.lastXp = 0;
	me.currentXp = 0;
	me.bestPerfectChain = 0;
	me.nextLevel = null;
	me.plan = plan;
	me.grid = null;
	me.nodes = null;
	me.hoverNode = null;
	me.lastNode = null;

	me.hideTimer = true;

	if(includeSubmitButton) me.addChild(SubmitButton());

	me.init = function(){
		me.grid = [];
		me.nodes = [];


		//create grid
		for(var i=0; i<me.gWidth; i++){
			me.grid[i] = new Array();
			for(var j=0; j<me.gHeight; j++){
				var n = Node(i, j, me.gridToX(i,j), me.gridToY(i,j), me.nodes.length);
				me.nodes.push(n);
				me.addChild(n);
				me.grid[i][j] = n;
			}
		}
		
		
		//init neighbors
		for(var i=0; i<me.gWidth; i++){
			for(var j=0; j<me.gHeight; j++){
				var n = me.grid[i][j];

				n.neighbors[0] = null;
				n.neighbors[1] = null;
				n.neighbors[2] = null;
				n.neighbors[3] = null;
				n.neighbors[4] = null;
				n.neighbors[5] = null;
				n.neighbors[6] = null;
				n.neighbors[7] = null;
			}
		}


		//create the neighbor links
		for(var i=0; i<me.nodes.length; i++){
			var n = me.nodes[i];
			var gx = n.gx;
			var gy = n.gy;
			
			if(me.isValid(gx+1,gy)){
				var f = me.grid[gx+1][gy];
				n.neighbors[0] = f;
			}
			if(me.isValid(gx+1,gy+1)){
				var f = me.grid[gx+1][gy+1];
				n.neighbors[1] = f;
			}
			if(me.isValid(gx,gy+1)){
				var f = me.grid[gx][gy+1];
				n.neighbors[2] = f;
			}
			if(me.isValid(gx-1,gy+1)){
				var f = me.grid[gx-1][gy+1];
				n.neighbors[3] = f;
			}
			if(me.isValid(gx-1,gy)){
				var f = me.grid[gx-1][gy];
				n.neighbors[4] = f;
			}
			if(me.isValid(gx-1,gy-1)){
				var f = me.grid[gx-1][gy-1];
				n.neighbors[5] = f;
			}
			if(me.isValid(gx,gy-1)){
				var f = me.grid[gx][gy-1];
				n.neighbors[6] = f;
			}
			if(me.isValid(gx+1,gy-1)){
				var f = me.grid[gx+1][gy-1];
				n.neighbors[7] = f;
			}
		}


		//chain level
		//if(level % 2 === 1) me.makeChainLevel();

		me.randomizeBoard();
	};

	me.randomizeBoard = function(){
		me.hoverNode = null;
		me.lastNode = null;
		
		for(var i=0; i<me.plan.length; i++){
			var p = me.plan[i];
			var gx = p[0];
			var gy = p[1];
			var n = me.grid[gx][gy];
			var v = p[2];
			if(v === 'x') v = Math.floor(Math.random()*10);
			n.value = parseInt(v);
		}
	};



	me.add = function(x, y, value, opt_link1, opt_link2, opt_link3, opt_link4, opt_link5, opt_link6, opt_link7, opt_link8){
		me.plan.push([x, y, value, opt_link1, opt_link2, opt_link3, opt_link4, opt_link5, opt_link6, opt_link7, opt_link8]);
	};

	me.makeChainLevel = function(){
		var qty = 0;
		for(var i=0; i<me.nodes.length; i++){
			if(me.nodes[i].isActive()) qty++;
		}

		var done = false;
		var failCount = 0;
		while(!done){
			//refresh
			for(var i=0; i<me.nodes.length; i++) me.nodes[i].chainLevelVisited = false;

			//create array of random numbers of right length
			var chain = [];
			for(var i=0; i<qty; i++) chain.push(Math.floor(Math.random()*10));

			//sort array
			chain.sort();

			//choose a random starting point
			var current = null;
			while(current === null){
				var startIndex = Math.floor(Math.random()*me.nodes.length);
				if(me.nodes[startIndex].isActive()) current = me.nodes[startIndex];
			}

			//traverse grid till exausing array
			for(var i=0; i<chain.length; i++){
				//set it's value
				current.value = chain[i];

				//visited
				current.chainLevelVisited = true;

				//SUCCESS CASE (reached the end of the chain)
				if(i === chain.length-1){
					done = true;
				}
				else{
					//copy list of neighbors
					var nrand = [];
					for(var j=0; j<current.neighbors.length; j++){
						//get unvisited & active neighbors only
						if(current.neighbors[j] !== null && current.neighbors[j].isActive() && !current.neighbors[j].chainLevelVisited) nrand.push(current.neighbors[j]);
					}

					//FAIL CASE (if we are stuck in a corner cause there are no valid neighbors to go to)
					if(nrand.length === 0) break;

					//randomly choose a neighbor to go to next
					current = nrand[Math.floor(Math.random()*nrand.length)];
				}
			}

			failCount++;
			if(failCount > 200) break;
		}
		console.log("attemps["+failCount+"]");
	};
	

	me.onMouseDown = function(){
		//console.log("-down");
		me.setMouseNode();

		if(me.lastNode === null && me.hoverNode !== null){
			//start new path
			if(path.length === 0){
				path.push(me.hoverNode);
			}

			//or remove last node
			else if(me.hoverNode === path[path.length-1]){
				path.pop();
			}

			//or add additional node
			else{
				me.hoverNode.tryAddPath();
			}
		}
	};

	me.onMouseUp = function(){
		//console.log("-up");
		me.lastNode = null;
		me.hoverNode = null;
	};

	me.onMouseMove = function(){
		//console.log("-move");
		if(mouse.isDown) me.setMouseNode();

		if(me.lastNode === null && me.hoverNode !== null){
			//start new path
			if(path.length === 0){
				path.push(me.hoverNode);
			}

			//or add additional node
			else if(me.hoverNode !== path[path.length-1]){
				me.hoverNode.tryAddPath();
			}
		}
	};

	me.setMouseNode = function(){
		me.lastNode = me.hoverNode;
		me.hoverNode = null;
		for(var i=0; i<me.nodes.length; i++){
			var node = me.nodes[i];
			if(node.isActive() && node.contains(mouse.x, mouse.y)){
				me.hoverNode = node;
				break;
			}
		}
	};


	me.onDraw = function(ctx){
		//background
		//ctx.fillStyle = "#300";
		//ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

		//best path
		if(roundOver && path.length !== currentMax){
			var best = bestPath;
			if(best.length > 0){
				ctx.beginPath();
				ctx.save();
				ctx.translate(20,20);


				ctx.lineWidth = 13;
				ctx.strokeStyle = "#666";
				var n = me.nodes[best[0]];
				ctx.moveTo(n.x, n.y);
				for(var i=1; i<best.length; i++){
					n = me.nodes[best[i]];
					ctx.lineTo(n.x, n.y);
				}
				ctx.stroke();

				ctx.restore();
			}
		}

		//path
		if(path.length > 0){
			ctx.lineWidth = 5;
			ctx.strokeStyle = "white";
			ctx.beginPath();
			ctx.save();
			ctx.translate(20,20);
			ctx.moveTo(path[0].x, path[0].y);
			for(var i=1; i<path.length; i++){
				ctx.lineTo(path[i].x, path[i].y);
			}
			ctx.restore();
			if(mouse.isDown && mouse.y < 470) ctx.lineTo(mouse.x, mouse.y);
			ctx.stroke();
		}

		//timer
		if(!me.hideTimer && !roundOver){
			var timeRemaining = getTimeRemaining();
			ctx.font = "36px Arial";
			ctx.textAlign = "left";
			ctx.fillStyle = "#555";
			ctx.fillText(""+timeRemaining, 12, SCREEN_HEIGHT-50);
		}
	};

	me.isLocked = function(){
		if(me.currentXp < me.xpRequirement) return true;
		else return false;
	};

	me.gridToX = function(gx, gy){
		return gx*CELL_SPACING + me.xOffset;
	};

	me.gridToY = function(gx, gy){
		return gy*CELL_SPACING + me.yOffset;
	};
	
	
	me.isValid = function(gx, gy){
		if(gx >= 0 && gx < me.gWidth && gy >= 0 && gy < me.gHeight && me.grid[gx][gy] !== null){
			return true;
		}else{
			return false;
		}
	};

	me.init();
	return me;
};

