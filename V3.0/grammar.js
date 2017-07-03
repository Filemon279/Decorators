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
  }



  generateGrammar() {
  //PEG.JS will use first word, so it have to be sorted array.
	this.grammar=flatten(this.grammar)
	this.grammar.sort(function(a, b) {return b.length - a.length || a.localeCompare(b);});
   return ` 
  Text
  	 = NumberDecorators
     	/_? RangeFrom _? nr1:Number _? RangeTo _? nr2:NumberDecorators {return{FROM: {value:nr1, decorators:[]}, TO:nr2}}
     

  NumberDecorators
 	 = 
 	  _? d1:Decorator _? nr:Number _? d2:Decorator	{return {value:nr, decorators:[d1,d2]}}	//k2euro
 	 	/ _? d1:Decorator (_? nr:Number)?	{return {value:nr, decorators:[d1]}}	//D7
  	/ _? nr:Number _? d1:Decorator _? d2:Decorator	{return {value:nr, decorators:[d1,d2]}} //2kzł
    / _? nr:Number _? d1:Decorator {return {value:nr, decorators:[d1]}}		//5M , 5zł

   
   
   
        Number
                = d:Digit+ ("."/",") d2:Digit+ {return d.join("")+"."+d2.join("")}
                / d:Digit+ {return d.join("")}

        Digit
                = [0-9]

        _ "whitespace"
                = [ \\r\\n\\t]+ {return null}

        Decorator
								= deco:(\'`+this.grammar.join('\'/\'')+`\') {return deco}

         RangeFrom
         	= 	"from" {return "from"}
            	/"od"  {return "from"}
            
         RangeTo
         	= 	"to"	{return "to"}
            	/"do"	{return "to"}
            
         Range 
         	= "nie mniej"	{return ">="}
            /"nie mniej niż"{return ">="}
            /"min"	{return ">="}
            /"max"	{return "<="}
            /"min."	{return ">="}
            /"max."	{return "<="}
`//End
  }
}

module.exports = Grammar;