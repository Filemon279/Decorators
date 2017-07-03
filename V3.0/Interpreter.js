var Grammar = require('./grammar.js');
var peg = require("pegjs");


class FieldParser {
  constructor(decoratorsDefiniArray) {
    let grama = new Grammar(decoratorsDefiniArray);
    grama.generateGrammar();
    this.parser = peg.generate(grama.generateGrammar());
  }

  

  parseField(fieldValue) {
        try {
        console.log(this.parser.parse(fieldValue))
        } catch(parseError) {
        console.log(parseError) //console.log("Error while parsing: \'",fieldValue,"\'")
        }
    
  }
}


//Required to import this class
module.exports = FieldParser;