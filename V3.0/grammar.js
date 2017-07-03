

class Grammar {
  constructor(decorators) {
   	this.grammar = []
   	var this_p = this;
  	decorators.forEach(function(stub)
  	{
  		this_p.grammar.push(stub["aliasList"])
  	});


  }

  printList()
  {
  	console.log(this.grammar)
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
		= deco:["zł","euro"]+ {return deco.join("")}

`//End
  }
}

module.exports = Grammar;