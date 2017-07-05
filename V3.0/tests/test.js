var expect = require('chai').expect
var equal = require('chai').equale
var myCode = require('../main')
let chai = require('chai');
let should = chai.should();
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

// Then either:
var expect = chai.expect;
// or:
var assert = chai.assert;

describe('test', function(){

//Declare input and expected values
	var tests = 
	[
	//Those one are parsed by SimpleGramma
	{arg: "00.100%"									,output: [{ value: '00.100', decorators: [ 'iri6' ] }]}, //
	{arg: "200 zł"									,output: [{ value: '200', decorators: [ 'iri129' ] }]},
	{arg: "400 zł"									,output: [{ value: '400', decorators: [ 'iri129' ] }]},
	{arg: "1 kEUR"									,output: [{ value: '1', decorators: [ 'iri2','iri112' ] }]},
	{arg: "5M"											,output: [{ value: '5', decorators: [ 'iri3/iri12' ] }]},
	{arg: "7D"											,output: [{ value: '7', decorators: [ 'iri10' ] }]},
	{arg: "M $5"										,output: [{ value: '5', decorators: [ 'iri3/iri12','iri140',] }]},
	{arg: "bez ograniczeń"					,output: [{ value: '', decorators: [ 'iri8' ] }]},
	{arg: "-"												,output: [{ value: '', decorators: [ 'iri9' ] }]},
	{arg: "$7k"											,output: [{ value: '7', decorators: [ 'iri140','iri2' ] }]},
	{arg: "3,5%"										,output: [{ value: '3.5', decorators: [ 'iri6' ] }]},
	{arg: "0,1‰"										,output: [{ value: '0.1', decorators: [ 'iri7' ] }]},

	//Those can't be parsed by SimpleGramma so are parsed by ComplexGramma (with comments, from, to, min. max. etc.) if not found return "[]"
	{arg: "kwota 234.45 złotych"		,output: [{beforeComment: "kwota", value:"234.45", decorators: ['iri129']}]},	//Here, I would rather choose word cuting to get 234.45 złotych then making special grammar.
	{arg: "from 5 to 7 zł"					,output: [{range: "FROM" },{ value: "5" }, { range: "TO" }, { value: "7", decorators: [ "iri129" ]}]},

	{arg: "0.1%, nie mniej niż 5 zł",output: [{ value: [{value: "0.1",decorators: ["iri6"]}],decorators: "AND"},{value: [{operand: ">="},{decorators: ["iri140"], value: "5"}]}]},
	{arg: "2%, min. $1"							,output: [{ value: [{value: "2",decorators: ["iri6"]}],decorators: "AND"},{value: [{operand: ">="},{decorators: ["iri140"], value: "1"}]}]},
	{arg: "12 zł *)"								,output: [[]]},	//Here, I would rather choose word cuting to get 234.45 złotych then making special grammar.
	{arg: "2% (dla kart w PLN), 3% (dla kart w EUR i USD)",output: [{ value: [ { value: "2", decorators: [ "iri6" ] }, { comment: "dla kart w pln" } ], decorators: "AND" }, { value: [ { value: "3", decorators: [ "iri6" ] }, { comment: "dla kart w eur i usd" }] }]},	//Here, I would rather choose word cuting to get 234.45 złotych then making special grammar. AND for many more examples
	{arg: "50 zł + koszty innych bankw"										,output: [ { value: "50", decorators: [ "iri129" ] }, { comment: "+ koszty innych bankw" } ]},

	//"według kosztów rzeczywistych (od 175 do 250 USD)" <- Same as two tests with output [] <- function to get "od 175 do 250 USD" and use rest as comment
	];



    describe('Testing enrichValueWithDecorators(value)', function(){
    tests.forEach(function(test)
    {
        it('Test passed: ' +test.arg, function(){
            output=myCode.enrichValueWithDecorators(test.arg)
            //console.log(output," : ",test.output[0])
						if(output.length>=1) output[0].should.eql(test.output[0])
						else output.should.eql(test.output[0])	
        })
    });

    })
})



