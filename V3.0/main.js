//FieldParser import
var FieldParser = require('./interpreter.js');
//Data as example
var currency = require("./Decorators_Currency.json");
var scalar = require("./Decorators_Scalar.json");
var time = require("./Decorators_Time.json");
var all = lower(currency.concat(scalar).concat(time))


////////////////////////////////////
//   		  mock up stubData	    	//
////////////////////////////////////
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


////////////////////////////////////
//     Recursion all lowerCase    //
////////////////////////////////////
function lower(obj) 
{
  for (var a in obj) 
  {
  if (typeof obj[a] === 'string') obj[a] = obj[a].toLowerCase();
  if (typeof obj[a] === 'object') lower(obj[a]);
  }
  return obj;
}



let fieldParser = new FieldParser(stubData(all));
////////////////////////////////////
//  				Main Function 				//
////////////////////////////////////
function enrichValueWithDecorators(value)
{
return fieldParser.parseField(value.toLowerCase())
}


////////////////////////////////////
//  	Export for MOCHA TESTS  		//
////////////////////////////////////
if(typeof exports !== 'undefined') {
    exports.enrichValueWithDecorators = enrichValueWithDecorators;
}



/*
UWAGI/PYTANIA:

1. Zapis kwot: 1.000 zł to nie to samo co 1,000zł - Przecinek interpretujemy jako grosze | kropke jako nieznaczący dekorator (pojawiający się przy tysiącach, milionach, miliardach)?
1. Występują przypadki separowania groszy przecinkiem oraz kropką (WORD - DOLAR)

2. "-" przed Kwotą, stosuje się jako swoiste rozpoczęcie i tutaj pytanie "Uwzgledniamy wartosci ujemne?", jesli tak to "-" jest rozporzęciem czy minusem?

3. Komentarz ("comment: 'od 5 do 20 euro' ") <- może być poddany osobnemu parsowaniu


-£127.54 
-127,54 F
kr-127,54
€ 127,54-
($127.54)

*/