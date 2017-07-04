var Grammar = require('./grammar.js');
var peg = require("pegjs");

function flatten(arr) {
  return arr.reduce(function (flat, toFlatten) {
    return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
  }, []);
}



class FieldParser {
  constructor(decoratorsDefiniArray) {
    let grama = new Grammar(decoratorsDefiniArray);
    this.parserComplex = peg.generate(grama.complexGrammar());  
    this.parser = peg.generate(grama.simpleGrammar());

  }

  parseComplexField(fieldValue) {
        try {
        console.log(this.parserComplex.parse(fieldValue))
        return this.parserComplex.parse(fieldValue)
        } catch(parseError) {
        //console.log(parseError) //console.log("Error while parsing: \'",fieldValue,"\'")
        return []
        }
  } 

  parseField(fieldValue) {
        try {
        console.log(this.parser.parse(fieldValue))
        return this.parser.parse(fieldValue)
        } catch(parseError) {
        return this.parseComplexField(fieldValue)
        //console.log(parseError) //console.log("Error while parsing: \'",fieldValue,"\'")
        }
  }


}


//Required to import this class
module.exports = FieldParser;