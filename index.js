//Import file reader
var fs = require('fs');

main();
//Read file
function main(){
	fs.readFile("./mydata.csv", afterFile);
}


//Runs after file is read
function afterFile(error, result){
	var output = csvToJson(result);
	console.log(prettify(output));
}

function csvToJson(input){
	var returnMe = [];
	var lines = input.toString().split("\n");
	var headingsLine = lines[0].split(",");

	//For every line in file
	for (i in lines){
		if (parseInt(i) === 0 || nullsExist(lines[i])){
			//Do nothing, ignore the header line
		} 
		else{
			var pushMeObj = {};
			var itemsInLine = lines[i].split(",");

			for (j in headingsLine){
				pushMeObj[headingsLine[j].replace("\r", "")] = itemsInLine[j].replace("\r", "");
			}
			returnMe.push(pushMeObj);
		}	
	}

	return returnMe;
}


function nullsExist(input){
	switch (input){
		case "":
		case null:
		case undefined:
			return true;
			break;
		default: 
			return false;
	}
}

function prettify(input){
	return JSON.stringify(input, null, 4);
}