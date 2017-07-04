var Grammar = require('./grammar.js');
var peg = require("pegjs");

function flatten(arr) {
  return arr.reduce(function (flat, toFlatten) {
    return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
  }, []);
}



class FieldParser {
  constructor(decoratorsDefiniArray) {
    this.grama = new Grammar(decoratorsDefiniArray);    //let
    this.parserComplex = peg.generate(this.grama.complexGrammar());  
    this.parser = peg.generate(this.grama.simpleGrammar());

  }






  parseComplexField(fieldValue) {
      try {
      //console.log(this.parserComplex.parse(fieldValue))
      this.parserComplex.parse(fieldValue)
      return this.parserComplex.parse(fieldValue)
      } catch(parseError) {
      //console.log(parseError) //console.log("Error while parsing: \'",fieldValue,"\'")
      return []
      }
  } 

  parseField(fieldValue) {
      try {
      //console.log(this.parser.parse(fieldValue))
      this.parserComplex.parse(fieldValue)
      return this.parser.parse(fieldValue)
      } catch(parseError) {
      //console.log(parseError) //console.log("Error while parsing: \'",fieldValue,"\'")
      return this.parseComplexField(fieldValue)
      
      }
  }


}


//Required to import this class
module.exports = FieldParser;