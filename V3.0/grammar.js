
//Flattening arrays
function flatten(arr) {
  return arr.reduce(function (flat, toFlatten) {
    return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
  }, []);
}

class Grammar {
  constructor(decorators) {
   	this.grammar = []
   	var this_p = this;
  	decorators.forEach(function(stub)
  	{
  		this_p.grammar.push(stub["aliasList"])
  	});


  }

  generateGrammar() {
   return ` 
  Text
                = 
                _? nr:Number _? d1:Decorator _? d2:Decorator _? 		{return {value:nr, decorators:[d1,d2]}}
                / _? d1:Decorator _? nr:Number _? d2:Decorator _?		{return {value:nr, decorators:[d1,d2]}}
                / _? d1:Decorator (_? nr:Number)? _?	{return {value:nr, decorators:[d1]}}			
                / _? nr:Number _? d1:Decorator _?		{return {value:nr, decorators:[d1]}}


   
        Number
                = d:Digit+ ("."/",") d2:Digit+ {return d.join("")+"."+d2.join("")}
                / d:Digit+ {return d.join("")}

        Digit
                = [0-9]

        _ "whitespace"
                = [ \\r\\n\\t]+ {return null}

        Decorator
								= deco:(\'`+flatten(this.grammar).join('\'/\'')+`\') {return deco}

         From
         	= 	"from" {return "from"}
            	/"od"  {return "from"}
            
         To
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