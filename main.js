var currency = require("./Decorators_Currency.json");
var scalar = require("./Decorators_Scalar.json");
var time = require("./Decorators_Time.json");
var all = currency.concat(scalar).concat(time)


//Function to fiter float (with dots)
var filterFloat = function(value) {
    if (/^(\-|\+)?([0-9]+?(\.)?(\.[0-9]+)?|)$/
      .test(value))
      return Number(value);
  return NaN;
}



//Function to look up for currency / scalars and time decorators
function lookInJSON(value,source,h)
{
	//Removing whitespaces
	if(value.endsWith(' ')) value = value.substring(0, value.length-1);
	if(value.startsWith(' ')) value = value.substring(1,value.length);

	//loop over given JSON
	for(var i=0;i<source.length;i++)
	{
		//Creating Array from JSON "alias"
		var array = JSON.parse(source[i]["alias"]);
		//Loop over alias array
		for(var j=0;j<array.length;j++)
		{
			// If value and array item match...
			if(value==array[j])
			{	
				return [-1,array[j],source[i]]	//...send detected item and reset iterator.

			}
		}
	}
	return [h]	//If nothing was found return given inerator and 
}



//Function to look for numbers in text
function lookingForNumber(value)
{
	//Replacing commas to dots 
	var value = value.replace(',', '.');
	numberIn = null
	//Loop over value - looking for number
	for(var i=0; i<value.length;i++)
	{
		//If number was found...
		if((/^(\-|\+)?([0-9]+?(\.)?(\.[0-9]+)?|)$/.test(value[i])))
		{
			//...see how long it is.
			for(var j=i;j<=value.length;j++)
			{
				if(filterFloat(value.slice(i,j)))
				{
					//Save number to variable
					numberIn=value.slice(i,j)
				}
			}
		//Return number
		return numberIn
		}
	}
	return null	//Retur null if nothing was found.
}



//Look if there are any chars left (like. "kwota", "lub więcej" etc.)
function lookForRestovers(value,number,decorators)
{
	//remove number and white spaces
	value = value.replace(',', '.');
	value = value.replace(number,"");

	//remove found decorators
	for(a in decorators) 
		{
			value = value.replace(decorators[a], "") 
			value = value.replace(/\s+/, "") 
		}
	//return whats left
	return value;
}



//We have Milion and Months saved as decorator "M"
//so we have to use Milion only to currency - if any currency was detected then it is milion, otherwise it is Month
function exceptions(list)
{
	for(var i=0; i<list.length;i++)
	{
		if(list[i]["owlIRI"]=="iri3")
		{
			for(var i=0; i<list.length;i++)
			{
				if(list[i]["DecoratorSet"]=="CurrencySet")	return [0]
			}
			for(var i=0; i<time.length;i++)
			{
				if(time[i]["owlIRI"]=="iri12")
				{
					return [i,time[i]]
				}
			}
		}
	}
	return [0]
}


//Looking for decorators in given string
function decoratorsMatching(value)
{
	//variable initialization
	decorators = []
	valuesFound = []
	var i=0
	//Slice text by one on every loop iteration
	for(;i<value.length; i++)
	{
		
		//See if there was any response
		odp=lookInJSON(value.slice(i),all,i)
		//If response was found we receive [-1,found_decorator,JSON_decorator_information] and ...
		if(odp[0]==-1) 
		{
			i=odp[0] 	//...reset iterator
			valuesFound.push(odp[1])
			value=value.replace(odp[1],"")	//remove decorator found
			decorators.push(odp[2])			//save decorator info to array
			if(value.endsWith(' ')) value = value.substring(0, value.length-1);	//remove whitespaces
			if(value.startsWith(' ')) value = value.substring(1,value.length);	//remove whitespaces
		}
	}
	return [decorators,valuesFound]

}


//Function return value and decorators of given string
function enrichValueWithDecorators(value)
{
	//Find number
	number = lookingForNumber(value)
	value = value.replace(number," ")
	//Find decorators
	response = decoratorsMatching(value)
	//Look for exceptions
	changes = exceptions(response[0])
	//If there are any exceptions, act
	if(changes.length>1) response[0][changes[0]-2]=changes[1]
	//decorators initialization
	decorators = []
	
	if(lookForRestovers(value,number,response[1]).length==0){
		//Punt only "owlIRI" into decorators
		for(var i=0; i<response[0].length;i++) decorators.push(response[0][i]["owlIRI"])
		//If there was no number given look for substituteValue
		if(!number && response[0].length>0) number = response[0][0]["substituteValue"]
		//return output	
		return {'value': number, 'decorators': decorators}
		}
	//return output
	else return {'value': "", 'decorators': decorators}

}




//Mocha
if(typeof exports !== 'undefined') {
    exports.lookingForNumber = lookingForNumber;
    exports.enrichValueWithDecorators = enrichValueWithDecorators;
}





