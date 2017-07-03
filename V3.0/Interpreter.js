var Grammar = require('./grammar.js');
var peg = require("pegjs");


class FieldParser {
  constructor(decoratorsDefiniArray) {
    let grama = new Grammar(decoratorsDefiniArray);
    grama.generateGrammar();
    this.parser = peg.generate(grama.generateGrammar());
  }

  // in : string with field value
  // out : {
  //   unaryValue { value : number, decorators : ... }
  //   binaryExpression: { leftValue : number, leftDecorators : ..., operand : string, rightValue : number, rightDecorators : ... }
  //   complexExpression : [ token, token, ...]
  // }

  // token :
  // simple numerical value { value : number, decorators : [ decoratorIRI1, decoratorIRI2, ... ] }
  // plus infinity numerical value { value : Inf, decorators : [ decoratorIRI1, decoratorIRI2, ... ] }
  // no value  ...

  parseField(fieldValue) {
    console.log(this.parser.parse(fieldValue))
  }
}


//Required to import this class
module.exports = FieldParser;