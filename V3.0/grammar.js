//Flattening arrays
function flatten(arr) {
  return arr.reduce(function (flat, toFlatten) {
    return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
  }, []);
}

class Grammar {
  constructor(decorators) 
  {
   	this.grammar = []
   	var this_p = this;
  	decorators.forEach(function(stub)
  	{
  		this_p.grammar.push(stub["aliasList"])
  	});
  	this.grammar=flatten(this.grammar)
		this.grammar.sort(function(a, b) {return b.length - a.length || a.localeCompare(b);});
  }



  simpleGrammar() {
  //PEG.JS will use first word, so it have to be sorted array.
   return ` 
Text
  	 =       
     NumberDecorators
     /CommaSeparated*
     /_ RangeFrom _ (nr1:NumberDecorators) _ RangeTo _ nr2:NumberDecorators {return{FROM: nr1, TO:nr2}}

     


  NumberDecorators
 	 = 
 	  		_ d1:Decorator _ nr:Number _ d2:Decorator _	{return {value:nr, decorators:[d1,d2]}}	//k2euro
  		/ 	_ nr:Number _ d1:Decorator _ d2:Decorator _	{return {value:nr, decorators:[d1,d2]}} //2kzł
  		/ 	_ d1:Decorator _ d2:Decorator _ nr:Number _ {return {value:nr, decorators:[d1,d2]}} //M $5
    	/ 	_ nr:Number _ d1:Decorator _ {return {value:nr, decorators:[d1]}}		//5M , 5zł
      / 	_ d1:Decorator _ nr:Number _	{return {value:nr, decorators:[d1]}}	//D7
      / 	_ d1:Decorator _	{return {value:"", decorators:[d1]}}

		CommaSeparated
        	= _ w:(RangeTo/RangeFrom/NumberDecorators/Range)+ _ c:"," {return {value:w, decorators:"AND"}}
            / _ w:(RangeTo/RangeFrom/NumberDecorators/Range)+ _	{return {value:w, decorators:"END"}}
   
   
        Number
                = d:Digit+ ("."/",") d2:Digit+ {return d.join("")+"."+d2.join("")}
                / d:Digit+ {return d.join("")}

        Digit
                = [0-9]

        _ "whitespace"
                = [ \\r\\n\\t]* {return null}

  Decorator
			= deco:(\'`+this.grammar.join('\'/\'')+`\') {return deco}

      RangeTo
         	= 	"to"	{return {range: "TO"}}
            	/"do"	{return {range: "TO"}}

         RangeFrom
         	= 	"from" {return {range: "FROM"}}
            	/"od"  {return {range: "FROM"}}
            

            
         Range 
         	= "nie mniej"	{return ">="}
            /"nie mniej niż"{return ">="}
            /"min."	{return ">="}
            /"max."	{return "<="}
            /"min"	{return ">="}
            /"max"	{return "<="}


`

//End
  }
}

module.exports = Grammar;