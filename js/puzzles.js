'use strict';


//##############################################
//-----------------PUZZLES----------------------
//##############################################
/*
PUZZLE FORMAT:
#[level number]
[duration of time bonus,[difficulty rating],[xp needed to unlock]
5x7 grid of the level( dash = no node; x = random 0-9; 0-9 for exact number.
*/

var PUZZLE_TEXT = `
#1
8,20,0
-----
-----
--x--
-xxx-
--x--
-----
-----

#2
10,25,50
-----
-----
--xx-
-xxx-
-xx--
-----
-----

#3
12,30,60
-----
-----
-xxx-
-xxx-
-xxx-
-----
-----

#4
15,35,75
-----
xxxx-
xxxx-
--xx-
--xx-
-----
-----

#5
15,40,100
-----
---xx
--xxx
-xxx-
xxx--
xx---
-----

#6
15,45,125
-----
-xxx-
-xxx-
-x-x-
-xxx-
-xxx-
-----

#7
18,50,150
-----
xxx--
xxx--
-xxx-
--xxx
--xxx
-----

#8
20,55,175
--xxx
--xxx
--xxx
xxx--
xxx--
xxx--
-----

#9
22,60,200
-----
xxxxx
x-x-x
xxxxx
x-x-x
xxxxx
-----

#10
30,65,250
xxxxx
xxxxx
xxxxx
xxxxx
xxxxx
xxxxx
xxxxx

`;


