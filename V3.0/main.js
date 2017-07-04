//FieldParser import
var FieldParser = require('./interpreter.js');
//Data as example
var currency = require("./Decorators_Currency.json");
var scalar = require("./Decorators_Scalar.json");
var time = require("./Decorators_Time.json");
var all = lower(currency.concat(scalar).concat(time))




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

//Nowa gramatyka + "decorator finder"
let fieldParser = new FieldParser(stubData(all));


//Dealing with Up & Low Case
function lower(obj) {
  for (var prop in obj) {
  if (typeof obj[prop] === 'string') {
    obj[prop] = obj[prop].toLowerCase();
  }
  if (typeof obj[prop] === 'object') {
    lower(obj[prop]);
    }
  }
  return obj;
}

enrichValueWithDecorators("599 k eur")


//Main function
function enrichValueWithDecorators(value)
{
var TextToParse = "3,5%"
return fieldParser.parseField(value.toLowerCase())
}


//Mocha
if(typeof exports !== 'undefined') {
    exports.enrichValueWithDecorators = enrichValueWithDecorators;
}

