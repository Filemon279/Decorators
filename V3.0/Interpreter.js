class FieldParser {
  constructor(decoratorsDefiniArray) {
    this.decoratorArray = decoratorsDefiniArray;
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
    return { unaryValue : { value : this.decoratorArray, decorators : [ "iriTest"] } }
  }
}


//Required to import this class
module.exports = FieldParser;