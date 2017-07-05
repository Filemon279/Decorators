var Grammar = require('./grammar.js');
var peg = require("pegjs");

////////////////////////////////////
//        Flattening array        //
////////////////////////////////////
function flatten(arr) {
  return arr.reduce(function (flat, toFlatten) {
    return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
  }, []);
}


/////////     PROTOTYPE   //////////
////////////////////////////////////
//  Cut Begining and Check again  //
////////////////////////////////////
function lookForGramma(input)
{
return (input.indexOf(" ")>-1)?input.slice(input.indexOf(" ")+1):"!end!"
}



////////////////////////////////////
//         Parsing Class          //
////////////////////////////////////
class FieldParser {
  constructor(decoratorsDefiniArray) {
    this.grama = new Grammar(decoratorsDefiniArray);    //let
    this.parserComplex = peg.generate(this.grama.complexGrammar());  
    this.parser = peg.generate(this.grama.simpleGrammar());

  }


  //////////////////////////////////////////////////////
  //  Parsing Comples Fields - when parseField fails  //
  //////////////////////////////////////////////////////
  parseComplexField(fieldValue) {
      try {
      return this.parserComplex.parse(fieldValue)
      } catch(parseError) {
      if(fieldValue!="!end!") return this.parseField(lookForGramma(fieldValue))
      return []
      }
  } 

  ////////////////////////////////////
  //         Simple Parsing         //
  ////////////////////////////////////
  parseField(fieldValue) {
      try {
      return this.parser.parse(fieldValue)
      } catch(parseError) {
      //console.log(parseError)
      return this.parseComplexField(fieldValue)
      
      }
  }


}


//Required to import this class
module.exports = FieldParser;