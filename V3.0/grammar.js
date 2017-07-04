//Flattening arrays
function flatten(arr) {
  return arr.reduce(function (flat, toFlatten) {
    return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
  }, []);
}

class Grammar {
  constructor(decorators) 
  {
  	this.decorators = decorators
   	this.grammar = []
   	var this_p = this;
  	this.decorators.forEach(function(stub)
  	{
  		this_p.grammar.push(stub["aliasList"])
  	});
  	this.grammar=flatten(this.grammar)
		this.grammar.sort(function(a, b) {return b.length - a.length || a.localeCompare(b);});
		this.test()
  }

  getIRI(decorator)
  {
  	//ForEach in this case will be to slower, since it wont break
  	
  	for(var i=0;i<this.decorators.length;i++) {if(this.decorators[i]["aliasList"].indexOf(decorator)>-1) return this.decorators[i]["decoratorIRI"]}
  }



  test()
  {
  	this.stubs=""
  	var parent = this
  	this.grammar.forEach(function(item)
  	{
  		if(parent.stubs=="") parent.stubs+="'"+item+"' {return '"+parent.getIRI(item)+"'}\n"
  		else parent.stubs+="/'"+item+"' {return '"+parent.getIRI(item)+"'}\n"

  	})
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
				= `+this.stubs+`


`

//End
  }


  complexGrammar()
  {
  	return `

		Text
				=   
				Comment
				/c:CommaSeparated* {return c[0]}
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
				/ _ w:(RangeTo/RangeFrom/Range/SingleNumber/SimpleDecorators/Number/NumberDecorators/Comment)+ _	{return w}

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
				= `+this.stubs+`

		RangeTo
				= 	"to"	{return {range: "TO"}}
				/"do"	{return {range: "TO"}}

		EOF
				=
				!.

		RangeFrom
				= 	"from" {return {range: "FROM"}}
				/"od"  {return {range: "FROM"}}

    SingleNumber
				=
				__ nr:Number __ d1:Decorator EOF  {return {value:nr, decorators:[d1]}}		//5M , 5zł
				/__ nr:Number __ d1:Decorator __  {return {value:nr, decorators:[d1]}}		//5M , 5zł
				/	__ d1:Decorator __ nr:Number __	{return {value:nr, decorators:[d1]}}	//D7
				/__ nr:(Number)+ __ {return {value: nr.join("")}}


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