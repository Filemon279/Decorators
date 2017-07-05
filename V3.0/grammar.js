//Flattening arrays
function flatten(arr) {
  return arr.reduce(function (flat, toFlatten) {
    return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
  }, []);
}


////////////////////////////////////
// 		Generating Grammar Class    //
////////////////////////////////////
class Grammar {
  constructor(decorators) 
  {
  	this.decorators = decorators
   	this.grammar = []
   	var this_p = this;

  	//Make stand-alone list of aliasList
  	this.decorators.forEach(function(stub){this_p.grammar.push(stub["aliasList"])})
  	//Make if flat (flat array in array)
  	this.grammar=flatten(this.grammar)
  	//Sort it LONGER -> SORTER - For PEG.js
		this.grammar.sort(function(a, b) {return b.length - a.length || a.localeCompare(b);});
		//Assign return to every alias
		this.GenerateReturns()
  }

  ////////////////////////////////////
	//     Match Decorator and IRI  	//
	////////////////////////////////////
  getIRI(decorator)
  {
  	var decorators=[]
  	this.decorators.forEach(function(item){ {if(item["aliasList"].indexOf(decorator)>-1) decorators.push(item["decoratorIRI"])}})
  	//If more then one match, point it out by "/" sign beetwen them.
  	return decorators.join("/")
  }



	/////////////////////////////////////////////////
	//  Generate part of grammar - alias & return  //
	/////////////////////////////////////////////////
  GenerateReturns()
  {
  	this.stubs=""
  	var parent = this
  	this.grammar.forEach(function(item)
  	{
  		if(parent.stubs=="") parent.stubs+="'"+item+"' {return '"+parent.getIRI(item)+"'}\n"
  		else parent.stubs+="/'"+item+"' {return '"+parent.getIRI(item)+"'}\n"
  	})
  }

  ////////////////////////////////////
	//    Returning Simple Grammar    //
	////////////////////////////////////
  simpleGrammar() {
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
				= d:Digit+ ("."/",") d2:Digit+ {return parseFloat(d.join("")+"."+d2.join(""))}
				/ d:Digit+ {return parseFloat(d.join(""))}

		Digit
				= [0-9]
				/ _ d:[0-9] {return d}

		_ "whitespace"
				= [ \\r\\n\\t]* {return null}

		Decorator
				= `+this.stubs+`


`}


  ////////////////////////////////////
	//    Returning Complex Grammar   //
	////////////////////////////////////
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
				= _ w:(RangeTo/RangeFrom/Range/SingleNumber/SimpleDecorators/Number/NumberDecorators/Comment)+ _ "," {return {value:w, decorators:","}}
				/ _ w:(RangeTo/RangeFrom/Range/SingleNumber/SimpleDecorators/Number/NumberDecorators/Comment)+ _	{return w}

		Number
				= d:Digit+ ("."/",") d2:Digit+ {return parseFloat(d.join("")+"."+d2.join(""))}
				/ d:Digit+ {return parseFloat(d.join(""))}

		Digit
				= [0-9]
				/ _ d:[0-9] {return d}

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