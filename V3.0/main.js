//FieldParser import
var FieldParser = require('./interpreter.js');
var Grammar = require('./grammar.js');

//Data as example
var currency = require("./Decorators_Currency.json");
var scalar = require("./Decorators_Scalar.json");
var time = require("./Decorators_Time.json");
//Peg.js
var peg = require("pegjs");


let parse = new FieldParser();
let grama = new Grammar(stubData(time));
	grama.printList()


var parser = peg.generate(grama.generateGrammar());


//Returning stubData
function stubData(source)
{
	var stub=[]
	var array = []
	source.map(function(item)
	{
		array = JSON.parse(item["alias"]);
		stub.push({decoratorIRI: item["owlIRI"], aliasList:array})	
	});
	return stub
}

//console.log()
//console.log(parser.parse("   56456"))