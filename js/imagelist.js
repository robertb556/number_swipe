'use strict';


//##############################################
//-----------------IMAGES-----------------------
//##############################################
var IMG = {};

addImageFile("n",		"n.png");
addImageFile("np",		"np.png");
addImageFile("nh",		"nh.png");
addImageFile("nph",		"nph.png");

addImageFile("n0",		"n0.png");
addImageFile("n1",		"n1.png");
addImageFile("n2",		"n2.png");
addImageFile("n3",		"n3.png");
addImageFile("n4",		"n4.png");
addImageFile("n5",		"n5.png");
addImageFile("n6",		"n6.png");
addImageFile("n7",		"n7.png");
addImageFile("n8",		"n8.png");
addImageFile("n9",		"n9.png");

addImageFile("submit",		"submit.png");
addImageFile("great",		"great.png");
addImageFile("continue",		"continue.png");
addImageFile("continuedown",	"continuedown.png");
addImageFile("changelevel",		"changelevel.png");
addImageFile("score",		"score.png");
addImageFile("viewpath",		"viewpath.png");

addImageFile("bar",		"bar.png");
addImageFile("barcap",		"barcap.png");
addImageFile("barcap2",		"barcap2.png");
addImageFile("bgbar",		"bgbar.png");
addImageFile("bgbarcap",		"bgbarcap.png");
addImageFile("bgbarcap2",		"bgbarcap2.png");

addImageFile("cube",		"cube.png");
addImageFile("sstar",		"sstar.png");
addImageFile("gstar",		"gstar.png");
addImageFile("lock",		"lock.png");
addImageFile("check",		"check.png");

function addImageFile(name, fileName){
	IMG[name] = new Image();
	IMG[name].src = "img/"+fileName;
}





