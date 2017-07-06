var expect = require('chai').expect
var equal = require('chai').equale
var myCode = require('../main')
let chai = require('chai');
let should = chai.should();

function flatten(arr) {
	if(Array.isArray(arr)){
  return arr.reduce(function (flat, toFlatten) {
    return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
  }, []);
	}
	else return arr
}


var expect = chai.expect;
var assert = chai.assert;

describe('test', function(){


		it('Test for: 00.100%', function(){
		    var output=flatten(myCode.enrichValueWithDecorators(" 00.100%"))
		    expect(output).to.have.own.property("value")
		    expect(output.value).to.eql(0.1)
		    expect(output).to.have.own.property("decorators")
		    expect(output.decorators).to.include("iri6")
		})

		it('Test for: 200 zł', function(){
		    var output=flatten(myCode.enrichValueWithDecorators("200 zł"))
		    expect(output).to.have.own.property("value")
		    expect(output.value).to.eql(200)
		    expect(output).to.have.own.property("decorators")
		    expect(output.decorators).to.include("iri129")
		})

		it('Test for: 400 zł', function(){
		    var output=flatten(myCode.enrichValueWithDecorators("400 zł"))
		    expect(output).to.have.own.property("value")
		    expect(output.value).to.eql(400)
		    expect(output).to.have.own.property("decorators")
		    expect(output.decorators).to.include("iri129")
		})

		it('Test for: 1 kEUR', function(){
		    var output=flatten(myCode.enrichValueWithDecorators("1 kEUR"))
		    expect(output).to.have.own.property("value")
		    expect(output.value).to.eql(1)
		    expect(output).to.have.own.property("decorators")
		    expect(output.decorators).to.include("iri2")
		    expect(output.decorators).to.include("iri112")
		})

		it('Test for: 5M', function(){
		    var output=flatten(myCode.enrichValueWithDecorators("5M"))
		    expect(output).to.have.own.property("value")
		    expect(output.value).to.eql(5)
		    expect(output).to.have.own.property("decorators")
		    expect(output.decorators).to.include("iri3/iri12")
		})

		it('Test for: 7D', function(){
		    var output=flatten(myCode.enrichValueWithDecorators("7D"))
		    expect(output).to.have.own.property("value")
		    expect(output.value).to.eql(7)
		    expect(output).to.have.own.property("decorators")
		    expect(output.decorators).to.include("iri10")
		})

		it('Test for: M $5', function(){
		    var output=flatten(myCode.enrichValueWithDecorators("M $5"))
		    expect(output).to.have.own.property("value")
		    expect(output.value).to.eql(5)
		    expect(output).to.have.own.property("decorators")
		    expect(output.decorators).to.include("iri3/iri12")
		    expect(output.decorators).to.include("iri140")
		})

		it('Test for: bez ograniczeń', function(){
		    var output=flatten(myCode.enrichValueWithDecorators("bez ograniczeń"))
		    expect(output).to.have.own.property("value")
		    expect(output.value).to.eql('')
		    expect(output).to.have.own.property("decorators")
		    expect(output.decorators).to.include("iri8")
		})

		it('Test for: -', function(){
		    var output=flatten(myCode.enrichValueWithDecorators("-"))
		    expect(output).to.have.own.property("value")
		    expect(output.value).to.eql('')
		    expect(output).to.have.own.property("decorators")
		    expect(output.decorators).to.include("iri9")
		})

		it('Test for: $7k', function(){
		    var output=flatten(myCode.enrichValueWithDecorators("$7k"))
		    expect(output).to.have.own.property("value")
		    expect(output.value).to.eql(7)
		    expect(output).to.have.own.property("decorators")
		    expect(output.decorators).to.include("iri140")
		    expect(output.decorators).to.include("iri2")
		})

		it('Test for: 3,5%', function(){
		    var output=flatten(myCode.enrichValueWithDecorators("3,5%"))
		    expect(output).to.have.own.property("value")
		    expect(output.value).to.eql(3.5)
		    expect(output).to.have.own.property("decorators")
		    expect(output.decorators).to.include("iri6")
		})

		it('Test for: 0,1%', function(){
		    var output=flatten(myCode.enrichValueWithDecorators("0,1%"))
		    expect(output).to.have.own.property("value")
		    expect(output.value).to.eql(0.1)
		    expect(output).to.have.own.property("decorators")
		    expect(output.decorators).to.include("iri6")
		})

		it('Test for: kwota 234.45 złotych', function(){
		    var output=flatten(myCode.enrichValueWithDecorators("kwota 234.45 złotych"))
		    expect(output).to.have.own.property("value")
		    expect(output.value).to.eql(234.45)
		    expect(output).to.have.own.property("decorators")
		    expect(output.decorators).to.include("iri129")
		})

		it('Test for: from 5 to 7 zł', function(){
		    var output=flatten(myCode.enrichValueWithDecorators("from 5 to 7 zł"))
		    expect(output).to.be.an("Array")
		    expect(output).to.deep.include({range: 'FROM'})
		    expect(output).to.deep.include({value: 5})
		    expect(output).to.deep.include({range: 'TO'})
		    expect(output).to.deep.include({value: 7, decorators: ["iri129"]})
		})

		it('Test for: 0.1%, nie mniej niż 5 zł', function(){
		    var output=flatten(myCode.enrichValueWithDecorators("0.1%, nie mniej niż 5 zł"))
		    expect(output).to.be.an("Array")
		    
		    expect(output).to.deep.include({value: [{value: 0.1, decorators: ["iri6"]}],decorators: ','})
		    expect(output).to.deep.include({operand: '>='})
		    expect(output).to.deep.include({value: 5, decorators: ["iri129"]})
		})

		it('2%, min. $1', function(){
		    var output=flatten(myCode.enrichValueWithDecorators("2%, min. $1"))
		    expect(output).to.be.an("Array")
		    expect(output).to.deep.include({value: [{value: 2, decorators: ["iri6"]}],decorators: ','})
		    expect(output).to.deep.include({operand: '>='})
		    expect(output).to.deep.include({value: 1, decorators: ["iri140"]})
		})

		it('12 zł *)', function(){
		    var output=flatten(myCode.enrichValueWithDecorators("12 zł *)"))
		    expect(output).to.be.eql([])
		})

		it('2% (dla kart w PLN), 3% (dla kart w EUR i USD)', function(){
		    var output=flatten(myCode.enrichValueWithDecorators("2% (dla kart w PLN), 3% (dla kart w EUR i USD)"))
		    expect(output).to.be.an("Array")
		    expect(output).to.deep.include(({value: [{value: 2, decorators: ["iri6"]}, {comment: "dla kart w pln"} ],decorators: ','}))
		    expect(output).to.deep.include(({value: 3, decorators: ["iri6"]}, {comment: "dla kart w eur i usd"}))
		})

		it('50 zł + koszty innych banków', function(){
		    var output=flatten(myCode.enrichValueWithDecorators("50 zł + koszty innych banków"))
		    expect(output).to.be.an("Array")
		    expect(output).to.deep.include(({value: 50, decorators: ["iri129"]}, {comment: "+ koszty innych banków"}))
		})

		it('według kosztów rzeczywistych (od 175 do 250 USD)', function(){
		    var output=flatten(myCode.enrichValueWithDecorators("według kosztów rzeczywistych (od 175 do 250 USD)"))
		    expect(output).to.be.eql({comment: "od 175 do 250 usd"})
		})

		it('W Polsce 20 tysięcy zł (w USA 7 500 Dolarów)', function(){
		    var output=flatten(myCode.enrichValueWithDecorators("W Polsce 20 tysięcy zł (w USA 7 500 Dolarów)"))
		    expect(output).to.be.an("Array")
		    expect(output).to.deep.include(({value: 20, decorators: ["iri2","iri129"]}, {comment: "w usa 7 500 dolarów"}))
		})

		it('Przykładowy nic nie znaczacy tekst', function(){
		    var output=flatten(myCode.enrichValueWithDecorators("Przykładowy nic nie znaczacy tekst"))
		    expect(output).to.be.eql([])
		})

		it('Na chwilę obecną oprocentowanie wynosi nie mniej niż 3%, nie więcej niż 5% (tylko w Frankach)', function(){
		    var output=flatten(myCode.enrichValueWithDecorators("Na chwilę obecną oprocentowanie wynosi nie mniej niż 3%, nie więcej niż 5% (tylko w Frankach)"))
		    expect(output).to.be.an("Array")
		    expect(output).to.deep.include(({value: [{operand: ">="},{value: 3, decorators: ["iri6"]}], decorators: ","}))
		    expect(output).to.deep.include(({operand: "<="},{value: 5, decorators: ["iri6"]},{comment:"tylko w frankach"}))
		})

		it('4 000 000 zł', function(){
		    var output=flatten(myCode.enrichValueWithDecorators("4 000 000 zł"))  
		    expect(output).to.have.own.property("value")
		    expect(output.value).to.eql(4000000)
		    expect(output).to.have.own.property("decorators")
		    expect(output.decorators).to.include("iri129")
		})

		it('200 000.34 k euro', function(){
		    var output=flatten(myCode.enrichValueWithDecorators("200 000.34 k euro"))  
		    expect(output).to.have.own.property("value")
		    expect(output.value).to.eql(200000.34)
		    expect(output).to.have.own.property("decorators")
		    expect(output.decorators).to.include("iri112")
		    expect(output.decorators).to.include("iri2")
		})

})
