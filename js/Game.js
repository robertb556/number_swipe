'use strict';


//##############################################
//-----------------CONSTANTS--------------------
//##############################################
//UI
var SCREEN_WIDTH = 378; //960;
var SCREEN_HEIGHT = 612;
var CELL_SIZE = 38;
var CELL_SPACING = 70;
var MAP_X_OFFSET = 30;
var MAP_Y_OFFSET = 25;
var BUTTON_W = 250;
var BUTTON_H = 50;
var BUTTON_X = Math.floor( (SCREEN_WIDTH/2) - (BUTTON_W/2) )+4;
var BUTTON_Y_OFFSET = 385;
var BUTTON_Y1 = BUTTON_Y_OFFSET + 0;
var BUTTON_Y2 = BUTTON_Y_OFFSET + 70;
var BUTTON_Y3 = BUTTON_Y_OFFSET + 140;



//##############################################
//-----------------VARS-------------------------
//##############################################
var graphics;
var currentLevel;
var levels;
var scoreScreen;
var pathScreen;
var levelSelectScreen;
var mouse;
var activeElement = null;

var path = [];
var bestPath = null;
var currentTime = null;
var startTime = null;
var perfectChain = 0;
var score = 0;
var currentMax = 0;
var roundOver = true;



window.onload = function(){
	//INIT
	graphics = Graphics();
	levels = buildLevels(PUZZLE_TEXT);
	currentLevel = levels[0];
	mouse = Mouse();
	scoreScreen = ScoreScreen();
	pathScreen = PathScreen();
	levelSelectScreen = LevelSelectScreen();
	
	
	//background
	graphics.start();

	//start
	startGame();
};

function startGame(){
	score = 0;

	//setActiveElement(levelSelectScreen);
	nextRound(Tutorial());
	//nextRound(levels[0]);
	tickStep();
}

function tickStep(){
	if(!roundOver) currentTime = Date.now();
	//if(!roundOver && getTimeRemaining() <= 0) endRound();

	setTimeout(tickStep, 15);
}

function buildLevels(text){
	var tempLevels = [];
	var trimed = text.trim();
	var pzls = trimed.split(/\#\d+/);
	
	for(var i=1; i<pzls.length; i++){
		var p = pzls[i];
		p = p.trim();
		var lines = p.split(/\s+/);

		var toks = lines[0].split(/,/);

		//index
		var index = i;

		//timer length
		var seconds = parseInt(toks[0]);

		//difficulty
		var difficulty = parseInt(toks[1]);

		//xp requirement
		var xpRequirement = parseInt(toks[2]);

		//layout
		var plan = [];
		for(var j=1; j<8; j++){
			var line = lines[j];

			var chars = line.split("");
			for(var k=0; k<5; k++){
				var c = chars[k];
				if(c !== '-'){
					p = [];
					p[0] = k;
					p[1] = j-1;
					p[2] = c;
					plan.push(p);
				}
			}
		}

		//add level
		tempLevels.push(Level(plan, index, seconds, difficulty, xpRequirement, true));
	}

	//set next level references
	for(var i=0; i<tempLevels.length-1; i++){
		tempLevels[i].nextLevel = tempLevels[i+1];
	}

	return tempLevels;
}

function endRound(){
	//end round
	roundOver = true;

	//score
	score = getRoundScore();
	if(currentLevel.nextLevel){
		var n = currentLevel.nextLevel;
		n.lastXp = n.currentXp;
		n.currentXp += score;
		if(n.currentXp > n.xpRequirement) n.currentXp = n.xpRequirement;
	}

	//perfect chain
	if(isPerfectScore()){
		perfectChain++;
		if(perfectChain > currentLevel.bestPerfectChain){
			currentLevel.bestPerfectChain = perfectChain;
		}
	}
	else{
		perfectChain = 0;
	}
	
	//focus
	if(isPerfectScore()) setActiveElement(scoreScreen);
	else setActiveElement(pathScreen);
}

function nextRound(level){
	if(level !== currentLevel){
		perfectChain = 0;
	}
	path = [];
	mouse.refresh();
	currentLevel = level;
	setActiveElement(currentLevel);

	var validLevel = false;
	while(!validLevel){
		currentLevel.randomizeBoard();
		bestPath = getBestPath();
		currentMax = bestPath.length;
		//if(currentMax > 2 || currentLevel.nodes < 6){
			validLevel = true;
		//}
		//else console.log("FYI: map was rejected for having no good paths.");
	}

	roundOver = false;
	startTime = Date.now();
}

function getTimeRemaining(){
	var sec = currentLevel.duration - Math.floor((currentTime - startTime)/1000);
	var timeRemaining = sec;
	return timeRemaining;
}

function getRoundScore(){
	var score = 0;

	if(isPerfectScore()){
		if(getTimeRemaining() > 0){
			score = Math.round(getPuzzleDifficulty() * getTimeBonus());
		}
		else{
			score = getPuzzleDifficulty();
		}
	}
	else{
		score = Math.round(getPuzzleDifficulty() * getPercentComplete() /100);
	}

	return score;
}

function isPerfectScore(){
	if(path.length === currentMax) return true;
	else return false;
}

function getPuzzleDifficulty(){
	return currentLevel.difficulty;
}

function getPercentComplete(){
	return Math.round(path.length * 100 / currentMax);
}

function getTimeBonus(){
	var modifier = currentLevel.duration/2;
	return (modifier + getTimeRemaining()) / modifier;
}


function getBestPath(){
	var longest = [];
	for(var i=0; i<currentLevel.nodes.length; i++){
		var c = currentLevel.nodes[i];
		if(c.isActive()){
			var p = c.getBestPath([]);
			if(p.length > longest.length){
				longest = p;
			}
		}
	}
	return longest;
}

function setActiveElement(element){
	activeElement = element;
	element.focus();
}





