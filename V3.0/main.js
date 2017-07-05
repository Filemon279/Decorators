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

////////////////////////////////////
//  Cut Begining and Check again  //
////////////////////////////////////
function lookForGramma(input)
{
return [input[0]+=input[1].slice(0,input[1].indexOf(" ")+1),(input[1].indexOf(" ")>-1)?input[1].slice(input[1].indexOf(" ")+1):"end"]
}



let fieldParser = new FieldParser(stubData(all));
////////////////////////////////////
//  				Main Function 				//
////////////////////////////////////
function enrichValueWithDecorators(value)
{
var data = ["",value]
var out;
while((out = fieldParser.parseField(data[1].toLowerCase())).length==0 && data[1]!="end")	{data=lookForGramma(data);}
if(data[0]) out.beforeComment = data[0].replace(/\s+/, "") 
return out
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