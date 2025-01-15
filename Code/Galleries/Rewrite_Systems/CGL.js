var Grid;
var row = 100;
var col = 100;

function Run() {
	
	Grid = new Array(row);

	for (var i = 0; i < row; i++) {

		Grid[i] = new Array(col);

		for (var j = 0; j < col; j++) {
			Grid[i][j] = 0;
			document.getElementById("cell" + i + "x" + j).style.backgroundColor = "White";
		}
	}

	var init_string = document.getElementById("init").value;

	for (var i = 0; i < init_string.length; i++)
	{
		document.getElementById("cell0x" + i).style.backgroundColor = getColor(init_string.charAt(i));
		Grid[0][i] = init_string.charAt(i);
	}
	
	ASYNC_Step(document.getElementById("NS").value, 100)
}

function ASYNC_Step(NS, Delay) {
	Step(NS);
	NS--;
	
	if (NS > 0){
		console.log("ASYNC_Step: returning with " + NS);
		window.setTimeout(function(){ASYNC_Step(NS, Delay)}, Delay); 
	}
}

function Step(NS){

	//Tracks current row
	var current = document.getElementById("NS").value - NS;
	
	console.log("Initiating Step " + current + "...");
	
	//Tracks column of current row
	var j = 0;

	//Tracks column of output row
	var j_out = 0;

	//If the current cell is live and in bounds
	while(Grid[current][j] != 0 && j < col && j_out < col)
	{
		var ruleFound = 0;
		var r = 1;

		//Iterate over all rules to see if one applies
		while (ruleFound == 0 && r < 6)
		{
			console.log("Testing rule " + r);
			//Check if rule r is present 
			var eq = 1;

			//Get rule r
			rule_in = document.getElementById("R" + r + "_in").value;
			rule_out = document.getElementById("R" + r + "_out").value;

			//If rules r exists
			if (rule_in && rule_out)
			{	
				//If length of rule r does not extend past boundary
				if (j + rule_in.length < col)
				{
					for (var l = 0; l < rule_in.length; l++)
					{
						if (Grid[current][j + l] != rule_in.charAt(l))
							eq = 0;
					}

					//if so, add rule r output to next string
					if (eq == 1)
					{
						console.log("Rule " + r + " matches.")
						for (var l = 0; l < rule_out.length; l++)
						{
							if (j_out < col)
							{
								document.getElementById("cell" + (current + 1) + "x" + j_out).style.backgroundColor = getColor(rule_out.charAt(l));

								Grid[current + 1][j_out] = rule_out.charAt(l);

								j_out++;
							}
						}

						eq = 0;
						j += rule_in.length;
						ruleFound = 1;
					} 
				} 
			} 

			//iterate rule number
			r++;
		} 

		if (ruleFound == 0 && j < col && j_out < col && _grid[current][j] != 0)
		{
			//Set grid cell to resulting value
			Grid[current + 1][j_out] = _grid[current][j];

			//Set color
			document.getElementById("cell" + (current + 1) + "x" + j_out).style.backgroundColor = document.getElementById("cell" + current + "x" + j).style.backgroundColor;

			//Iterate both output row and input row by 1
			j++;
			j_out++;
		}
	}
	
	console.log("Step: returning...");
}	


function getColor(value)
{
	if (value == 'r')
		return "Red";
	if (value == 'b')
		return "Blue";
	if (value == 'g')
		return "Green";
	if (value == 'y')
		return "Yellow";
	if (value == 'p')
		return "Purple";
	if (value == 't')
		return "Teal"
	if (value == 'o')
		return "Orange"
	if (value == 'w')
		return "Brown"
	if (value == 'a')
		return "Gray"
	
	return "Black"
}
