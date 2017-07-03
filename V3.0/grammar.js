
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
		= _? Number _? Decorator?
	    
	Number 	
		= Digit+
	    
	Digit
		= [0-9]
	    
	_ "whitespace"
		= [ \\n\\t]+ {return "space"}

	Decorator
		= deco:\'`+flatten(this.grammar).join('\'/\'')+`\'+  {return deco.join("")}

`//End
  }
}

module.exports = Grammar;