var currency = require("./Decorators_Currency.json");
var scalar = require("./Decorators_Scalar.json");
var time = require("./Decorators_Time.json");
var nearley = require("nearley");
var grammar = require("./pattern.js");
var assert = require("assert");
var Out=[];	


//Comparing objects
function deepEqual(a, b) {
    try {
      assert.deepEqual(a, b);
    } catch (error) {
      if (error.name === "AssertionError") return false;

      throw error;
    }
    return true;
};

//Deleting duplicats generated by parser
function compareResults(results)
{
	alternative = []
	for(a in results)
	{
		if(!deepEqual(results[a], results[0])) 
		{
			if(alternative.length==0)alternative.push(a)
			else for(b in alternative) if(!deepEqual(results[a], results[alternative[b]])) alternative.push(a)
		}
	}	
return alternative
}

//Decoding JSON
function stubData(source)
{
	var stub=[]
	var array = []
	source.forEach(function(item)
	{
		array = JSON.parse(item["alias"]);
		stub.push({decoratorIRI: item["owlIRI"], aliasList:array})	
	});

	return stub
}

//Function to look up for currency / scalars and time decorators
function lookInJSON(value,source)
{
	//Get stub Data from JSON
	stub = stubData(source)
	//Search for match
	stub.forEach(function(record){
	record["aliasList"].forEach(function(match){
			//found
			if(value==match) output = record;

		});
	});
	return output
}

//Recurenction to eliminate copy (in parser) and to show all posibilites
function returnObjects(itemIn)
{
	itemIn.forEach(function(item)
	{
		if(item)
		{
			if((item["token"])) 
			{
				if(item["token"]=="string")Out.push(item)
				if(item["token"]=="range")Out.push(item)
				if(item["token"]=="number")Out.push(item)
				if(item["token"]=="currency")Out.push(lookInJSON(item["value"],currency))
				if(item["token"]=="time")Out.push(lookInJSON(item["value"],time))
				if(item["token"]=="scalar")Out.push(lookInJSON(item["value"],scalar))
				//return (item);
			}
			else return returnObjects(item)
		}
	})
	return 0;
}

//enrichValueWithDecorators("kwota 234.45 złotych") //<--Testing output in run

function enrichValueWithDecorators(value)
{
	Out=[]
	var a=[]
	try {
		var p = new nearley.Parser(grammar.ParserRules, grammar.ParserStart);
	    p.feed(value);
	    results=[p.results[0]]
		alternative = compareResults(p.results)
		alternative.forEach(function(a)
		{
			results.push(p.results[a])
		})
		returnObjects(results)
		//console.log(Out)
		return Out;
	} catch(parseError) {
	    return []
	}
}

//Mocha
if(typeof exports !== 'undefined') {
    exports.enrichValueWithDecorators = enrichValueWithDecorators;
}

