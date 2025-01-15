
var Grid;
var row = 100;
var col = 100;

var Life;
var lifeNum;

function Setup(wipe, type) {
	
	if (wipe == 1) {
	
		Grid = new Array(row);
		
		for (var i = 0; i < row; i++) {
			Grid[i] = new Array(col);
			for (var j = 0; j < col; j++) {
				Grid[i][j] = {
					lifeform: 0,
					lifeform_next: 0,
					steps_renewed: 1,
					steps_gathered: 0
				};
				document.getElementById("cell" + i + "x" + j).style.backgroundColor = "White";
			}
		}
	
		if (document.getElementById("LU").value == null || document.getElementById("LU").value == "" ) {
			document.getElementById("LU").value = 2;
			document.getElementById("LO").value = 3;
			document.getElementById("DU").value = 3;
			document.getElementById("DO").value = 3;
			document.getElementById("AE").value = 1;
			document.getElementById("NS").value = 1;
		}
	}
	
	var AE = document.getElementById("AE").value;
	var NE = 0;
	
	if (type == 1){
		for (var i = 0; i < 1000 * Math.floor(Math.pow(AE, 0.5)); i++){
			var x = Math.floor(Math.random()*row);
			var y = Math.floor(Math.random()*col);
			Grid[x][y].lifeform = 1;
			document.getElementById("cell" + x + "x" + y).style.backgroundColor = "Black";
			NE++;
		}
	}
	else if (type == 2) {
		var x = 50, y = 50;
		var temp;
		
		for (var i = 0; i < 40 * AE; i++) {
			temp = Math.floor(Math.random()*4);
			
			if (temp == 0)		x++;
			if (temp == 1)		x--;
			if (temp == 2)		y++;
			if (temp == 3)		y--;
			
			Grid[x][y].lifeform = 1;
			document.getElementById("cell" + x + "x" + y).style.backgroundColor = "Black";
			NE++;
		}
	}
	else if (type == 3) {
		
		var rand = Math.floor(Math.random()*10);
		var temp;
		
		for (var i = 15 - rand; i < row - 15 + rand; i++) {
			temp = 15 - rand;
			Grid[i][temp].lifeform = 1;
			document.getElementById("cell" + i + "x" + temp).style.backgroundColor = "Black";
			for (var d = 1; d < AE; d++) {
				temp++;
				Grid[i][temp].lifeform = 1;
				document.getElementById("cell" + i + "x" + temp).style.backgroundColor = "Black";
			}
			
			temp = col - 16 + rand;
			Grid[i][temp].lifeform = 1;
			document.getElementById("cell" + i + "x" + temp).style.backgroundColor = "Black";
			for (var d = 1; d < AE; d++) {
				temp--;
				Grid[i][temp].lifeform = 1;
				document.getElementById("cell" + i + "x" + temp).style.backgroundColor = "Black";
			}
		}
		
		for (var j = 15 - rand; j < col - 15 + rand; j++) {
			temp = 15 - rand;
			Grid[temp][j].lifeform = 1;
			document.getElementById("cell" + temp + "x" + j).style.backgroundColor = "Black";
			for (var d = 1; d < AE; d++) {
				temp++;
				Grid[temp][j].lifeform = 1;
				document.getElementById("cell" + temp + "x" + j).style.backgroundColor = "Black";
			}
			
			temp = row - 16 + rand;
			Grid[temp][j].lifeform = 1;
			document.getElementById("cell" + temp + "x" + j).style.backgroundColor = "Black";
			for (var d = 1; d < AE; d++) {
				temp--;
				Grid[temp][j].lifeform = 1;
				document.getElementById("cell" + temp + "x" + j).style.backgroundColor = "Black";
			}
		}
	}
	else if (type == 4) {
		
		var rand = Math.floor(Math.random()*10);
		
		for (var i = 15 - rand; i < row - 15 + rand; i++) {
			for (var j = 15 - rand; j < col - 15 + rand; j++) {
				Grid[i][j].lifeform = 1;
				document.getElementById("cell" + i + "x" + j).style.backgroundColor = "Black";
			}
		}
	}
}

function Run() {
	console.log("Initiating Run...");
	
	var NS = document.getElementById("NS").value;
	ASYNC_Step(NS, 100); 

	console.log("Run: Returning");
}

function ASYNC_Step(NS, Delay) {
	Step();
	NS--;
	
	if (NS > 0){
		console.log("ASYNC_Step: returning with " + NS);
		window.setTimeout(function(){ASYNC_Step(NS, Delay)}, Delay); 
	}
}

function Step(){
	//console.log("Initiating Step...");
	var neighbors;
	
	var AE = Number(document.getElementById("AE").value);
	
	var LU = Math.floor(Number(document.getElementById("LU").value) * (Math.pow(3 + (AE - 1) * 2, 2) - 1) / 8);
	var LO = Math.floor(Number(document.getElementById("LO").value) * (Math.pow(3 + (AE - 1) * 2, 2) - 1) / 8);
	var DU = Math.floor(Number(document.getElementById("DU").value) * (Math.pow(3 + (AE - 1) * 2, 2) - 1) / 8);
	var DO = Math.floor(Number(document.getElementById("DO").value) * (Math.pow(3 + (AE - 1) * 2, 2) - 1) / 8);
	
	for (var i = 0; i < row; i++){
		for (var j = 0; j < col; j++) {
			neighbors = Number(countNeighbors(i, j, AE));
			
			if (Grid[i][j].lifeform == 0){
				if ((neighbors >= DU) && (neighbors <= DO)) {
					Grid[i][j].lifeform_next = 1;
					Grid[i][j].steps_renewed = 1;
				} else {
					Grid[i][j].lifeform_next = 0;
					Grid[i][j].steps_renewed += Math.floor(Math.pow(Grid[i][j].steps_renewed, .5));
				}
			}
			
			if (Grid[i][j].lifeform == 1 ) {
				if ((neighbors >= LU) && (neighbors <= LO)) {
					Grid[i][j].lifeform_next = 1;
					Grid[i][j].steps_gathered += 1;
				} else {
					Grid[i][j].lifeform_next = 0;
					Grid[i][j].steps_gathered = 0;
				}
			}
		}
	}
	
	for (var i = 0; i < row; i++){
		for (var j = 0; j < col; j++) {
			Grid[i][j].lifeform = Grid[i][j].lifeform_next;
			Grid[i][j].lifeform_next = 0;
			
			if (Grid[i][j].lifeform == 1) {
				document.getElementById("cell" + i + "x" + j).style.backgroundColor = "Black";
			} else {
				document.getElementById("cell" + i + "x" + j).style.backgroundColor = "White";
			}
		}
	}
	
	//console.log("Step: returning...");
}	

function countNeighbors(i, j, AE)
{
	var i_upper_bound, i_lower_bound;
	var j_upper_bound, j_lower_bound;
	var neighbors = 0;
	
	AE = Number(AE);
	i = Number(i);
	j = Number(j);
	
	//Ensures bounds respect edges of table given Area of Effect
	if 	(i - AE < 0)	{i_lower_bound = 0;}
	else 				{i_lower_bound = i - AE;}
	if 	(j - AE < 0) 	{j_lower_bound = 0;}
	else 				{j_lower_bound = j - AE;}
	if 	(i + AE >= row) {i_upper_bound = row - 1;}
	else 				{i_upper_bound = i + AE;}
	if 	(j + AE >= col) {j_upper_bound = col - 1;}
	else 				{j_upper_bound = j + AE;}
	
	//Counts Neighbors
	for (var k = i_lower_bound; k <= i_upper_bound; k++) {
		for (var l = j_lower_bound; l <= j_upper_bound; l++) {
			if ((Grid[k][l].lifeform == 1) && ((k != i) || (l != j))) {
				neighbors++;
			}
		}
	}
	
	//alert("(" + row + ", " + col + ") " + AE + ": cell " + i + "x" + j + ": " + neighbors + "\nBounds: " + i_lower_bound + ", " + i_upper_bound + ", " + j_lower_bound + ", " + j_upper_bound);
	
	return neighbors;
}

function Testing_Suite() {
	console.log("Initiating Testing_Suite...");
	var trials = 5;
	
	var LU, LO, DU, DO, AE, NS;
	
	if (document.getElementById("LU").value == null || document.getElementById("LU").value == "") {
		LU = Math.floor(Math.random() * 6) + 1;
		LO = Math.floor(Math.random() * (8 - LU)) + LU;
		DU = Math.floor(Math.random() * 6) + 1;
		DO = Math.floor(Math.random() * (8 - DU)) + DU;
		AE = 1;
		
		document.getElementById("LU").value = LU;
		document.getElementById("LO").value = LO;
		document.getElementById("DU").value = DU;
		document.getElementById("DO").value = DO;
		document.getElementById("AE").value = AE;
	} else {
		LU = document.getElementById("LU").value;
		LO = document.getElementById("LO").value;
		DU = document.getElementById("DU").value;
		DO = document.getElementById("DO").value;
		AE = document.getElementById("AE").value;
	}
	
	NS = 100;
	document.getElementById("NS").value = NS;
	
	for (var n = 1; n <= 4; n++) {
		console.log("Setup " + n + ": Initiating...");
		for (var t = 0; t < trials; t++) {
			console.log("Setup " + n + ": Trial " + t);
			Setup(1, n);
			
			for (var s = 0; s < NS; s++) {
				Step();
			}
		
		}
		console.log("Setup " + n + ": Complete.");
		
		Output(n, trials, OM, OG, NE);
	}
}

function Output(n, trials, OM, OG, NE) {
	
	console.log("Generating output...");
	var LU = document.getElementById("LU").value;
	var LO = document.getElementById("LO").value;
	var DU = document.getElementById("DU").value;
	var DO = document.getElementById("DO").value;
	var AE = document.getElementById("AE").value;
	var NS = document.getElementById("NS").value;
	
}

function Commit ()
{
	console.log("Committing...");
	var WL = document.getElementById("WL").value;
	var _LU = document.getElementById("LU").value;
	var _LO = document.getElementById("LO").value;
	var _DU = document.getElementById("DU").value;
	var _DO = document.getElementById("DO").value;
	var _AE = document.getElementById("AE").value;
	var _color = getColor(WL);
	
	if (Life == null || lifeNum == 0) {
		lifeNum = 1;
		Life = new Array(lifeNum);
		Life[0] = {
			LU: _LU,
			LO: _LO,
			DU: _DU,
			DO: _DO,
			AE: _AE,
			color: _color
		};
	}else{
		var Temp = new Array(lifeNum);
		
		for (var i = 0; i < lifeNum; i++) {
			Temp[i] = {
				LU: Life[i].LU,
				LO: Life[i].LO,
				DU: Life[i].DU,
				DO: Life[i].DO,
				AE: Life[i].AE,
				color: Life[i].color
			};
		}
		
		lifeNum++;
		var Life = new Array(lifeNum);
		
		for (var i = 0; i < lifeNum - 1; i++) {
			Life[i] = {
				LU: Temp[i].LU,
				LO: Temp[i].LO,
				DU: Temp[i].DU,
				DO: Temp[i].DO,
				AE: Temp[i].AE,
				color: Temp[i].color
			};
		}
		
		Life[lifeNum - 1] = {
			LU: _LU,
			LO: _LO,
			DU: _DU,
			DO: _DO,
			AE: _AE,
			color: _color
		};
	}
}

function Retrieve()
{
	console.log("Retrieving...");
	var WL = document.getElementById("WL").value;
	
	if (WL > lifeNum)
		return;
	
	document.getElementById("LU").value = Life[WL - 1].LU;
	document.getElementById("LO").value = Life[WL - 1].LO;
	document.getElementById("DU").value = Life[WL - 1].DU;
	document.getElementById("DO").value = Life[WL - 1].DO;
	document.getElementById("AE").value = Life[WL - 1].AE;
}	

function Clear()
{
	Life = null;
	lifeNum = 0;
}

function getColor(value)
{
	if (value == 1)
		return "red";
	if (value == 2)
		return "blue";
	if (value == 3)
		return "green";
	if (value == 4)
		return "yellow";
	if (value == 5)
		return "purple";
	if (value == 6)
		return "teal"
	if (value == 7)
		return "orange"
	if (value == 8)
		return "brown"
	if (value == 9)
		return "gray"
	
	return "black"
}
