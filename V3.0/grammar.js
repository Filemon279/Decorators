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




		NumberDecorators
				= 
				_ d1:Decorator _ nr:Number _ d2:Decorator _	{return {value:nr, decorators:[d1,d2]}}	//k2euro
				/ 	_ nr:Number _ d1:Decorator _ d2:Decorator _	{return {value:nr, decorators:[d1,d2]}} //2kzł
				/ 	_ d1:Decorator _ d2:Decorator _ nr:Number _ {return {value:nr, decorators:[d1,d2]}} //M $5
				/ 	_ nr:Number _ d1:Decorator _ {return {value:nr, decorators:[d1]}}		//5M , 5zł
				/ 	_ d1:Decorator _ nr:Number _	{return {value:nr, decorators:[d1]}}	//D7
				/ 	_ d1:Decorator _	{return {value:"", decorators:[d1]}}



		Number
				= d:Digit+ ("."/",") d2:Digit+ {return d.join("")+"."+d2.join("")}
				/ d:Digit+ {return d.join("")}

		Digit
				= [0-9]

		_ "whitespace"
				= [ \\r\\n\\t]* {return null}

		Decorator
				= deco:(\'`+this.grammar.join('\'/\'')+`\') {return deco}


`

//End
  }


  complexGrammar()
  {
  	return `

		Text
				=   
				Comment
				/CommaSeparated* 
				/NumberDecorators
			
		SimpleDecorators
				=
				_ d1:Decorator _ d2:Decorator _ nr:Number _ {return {value:nr, decorators:[d1,d2]}} //M $5
				/ 	_ nr:Number _ d1:Decorator _ {return {value:nr, decorators:[d1]}}		//5M , 5zł
				/ 	_ d1:Decorator _ nr:Number _	{return {value:nr, decorators:[d1]}}	//D7
				/ 	_ d1:Decorator _	{return {value:"", decorators:[d1]}}

		NumberDecorators
				= 
				_ d1:Decorator _ nr:Number _ d2:Decorator _	{return {value:nr, decorators:[d1,d2]}}	//k2euro
				/ 	_ nr:Number _ d1:Decorator _ d2:Decorator _	{return {value:nr, decorators:[d1,d2]}} //2kzł
				/ 	_ d1:Decorator _ d2:Decorator _ nr:Number _ {return {value:nr, decorators:[d1,d2]}} //M $5
				/ 	_ nr:Number _ d1:Decorator _ {return {value:nr, decorators:[d1]}}		//5M , 5zł
				/ 	_ d1:Decorator _ nr:Number _	{return {value:nr, decorators:[d1]}}	//D7
				/ 	_ d1:Decorator _	{return {value:"", decorators:[d1]}}

		CommaSeparated
				= _ w:(RangeTo/RangeFrom/Range/SingleNumber/SimpleDecorators/Number/NumberDecorators/Comment)+ _ "," {return {value:w, decorators:"AND"}}
				/ _ w:(RangeTo/RangeFrom/Range/SingleNumber/SimpleDecorators/Number/NumberDecorators/Comment)+ _	{return {value:w}}

		Number
				= d:Digit+ ("."/",") d2:Digit+ {return d.join("")+"."+d2.join("")}
				/ d:Digit+ {return d.join("")}

		Digit
				= [0-9]

		_ "whitespace"
				= [ \\r\\n\\t]* {return null}

		__ "whitespace must be"
				= [ \\r\\n\\t] {return null}         

		Decorator
				= deco:(\'`+this.grammar.join('\'/\'')+`\') {return deco}  

		RangeTo
				= 	"to"	{return {range: "TO"}}
				/"do"	{return {range: "TO"}}

		RangeFrom
				= 	"from" {return {range: "FROM"}}
				/"od"  {return {range: "FROM"}}

		SingleNumber
				= __ nr:(Number)+ __ {return nr.join("")}


		Comment
				= "("_ txt:[a-zA-Z0-9  \\r\\n\\tZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]+ _")" {return {comment: txt.join("")}}
				/ _ "+" _ txt:[a-zA-Z0-9  \\r\\n\\tZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]+ {return {comment: "+ " + txt.join("")}}

		Range 
				= 
				"nie mniej niż"{return {operand:">="}}
				/"nie więcej niż"{return {operand:"<="}}
				/"nie mniej"	{return {operand:">="}}
				/"min."	{return {operand:">="}}
				/"max."	{return {operand:"<="}}
				/"min"	{return {operand:">="}}
				/"max"	{return {operand:"<="}}    
  	`
  }
}

module.exports = Grammar;