var Grammar = require('./grammar.js');
var peg = require("pegjs");


class FieldParser {
  constructor(decoratorsDefiniArray) {
    let grama = new Grammar(decoratorsDefiniArray);
    this.parser = peg.generate(grama.simpleGrammar());
  }

  

  parseField(fieldValue) {
        try {
        console.log(this.parser.parse(fieldValue))
        return this.parser.parse(fieldValue)
        } catch(parseError) {
          return []
        //console.log(parseError) //console.log("Error while parsing: \'",fieldValue,"\'")
        }
  }
}


//Required to import this class
module.exports = FieldParser;