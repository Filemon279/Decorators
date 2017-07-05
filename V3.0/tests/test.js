var expect = require('chai').expect
var equal = require('chai').equale
var myCode = require('../main')
let chai = require('chai');
let should = chai.should();
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

function flatten(arr) {
  return arr.reduce(function (flat, toFlatten) {
    return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
  }, []);
}


function deepEqual(a, b) {
    try {
      assert.deepEqual(a, b);
    } catch (error) {
      if (error.name === "AssertionError") return false;

      throw error;
    }
    return true;
};


// Then either:
var expect = chai.expect;
// or:
var assert = chai.assert;

describe('test', function(){

//Declare input and expected values
	var tests = 
	[
	//Those one are parsed by SimpleGramma
	{arg: "00.100%"									,output: [{ value: 0.100, decorators: [ 'iri6' ] }]}, //
	{arg: "200 zł"									,output: [{ value: 200, decorators: [ 'iri129' ] }]},
	{arg: "400 zł"									,output: [{ value: 400, decorators: [ 'iri129' ] }]},
	{arg: "1 kEUR"									,output: [{ value: 1, decorators: [ 'iri2','iri112' ] }]},
	{arg: "5M"											,output: [{ value: 5, decorators: [ 'iri3/iri12' ] }]},
	{arg: "7D"											,output: [{ value: 7, decorators: [ 'iri10' ] }]},
	{arg: "M $5"										,output: [{ value: 5, decorators: [ 'iri3/iri12','iri140',] }]},
	{arg: "bez ograniczeń"					,output: [{ value: '', decorators: [ 'iri8' ] }]},
	{arg: "-"												,output: [{ value: '', decorators: [ 'iri9' ] }]},
	{arg: "$7k"											,output: [{ value: 7, decorators: [ 'iri140','iri2' ] }]},
	{arg: "3,5%"										,output: [{ value: 3.5, decorators: [ 'iri6' ] }]},
	{arg: "0,1‰"										,output: [{ value: 0.1, decorators: [ 'iri7' ] }]},

	//Those can't be parsed by SimpleGramma so are parsed by ComplexGramma (with comments, from, to, min. max. etc.) if not found return "[]"
	{arg: "kwota 234.45 złotych"		,output: [{value:234.45, decorators: ['iri129']},{beforeComment: "kwota"},]},	//Here, I would rather choose word cuting to get 234.45 złotych then making special grammar.
	{arg: "from 5 to 7 zł"					,output: [{range: "FROM" },{ value: 5 }, { range: "TO" }, { value: 7, decorators: [ "iri129" ]}]},
	{arg: "0.1%, nie mniej niż 5 zł",output: [{ value: [{value: 0.1,decorators: ["iri6"]}],decorators: ","},{operand: ">="},{value: 5,decorators: ["iri129"]}]},
	{arg: "2%, min. $1"							,output: [{ value: [{value: 2,decorators: ["iri6"]}],decorators: ","},{operand: ">="},{decorators: ["iri140"], value: 1}]},
	{arg: "12 zł *)"								,output: [[]]},	
	{arg: "2% (dla kart w PLN), 3% (dla kart w EUR i USD)"	,output: [{ value: [ { value: 2, decorators: [ "iri6" ] }, { comment: "dla kart w pln" } ], decorators: "," }, { value: 3, decorators: [ "iri6" ] }, { comment: "dla kart w eur i usd" }]},	//Here, I would rather choose word cuting to get 234.45 złotych then making special grammar. AND for many more examples
	{arg: "50 zł + koszty innych banków"										,output: [{ value: 50, decorators: [ "iri129" ] }, { comment: "+ koszty innych banków" } ]},
	{arg: "według kosztów rzeczywistych (od 175 do 250 USD)",output: [{comment: "od 175 do 250 usd" }]},
	{arg: "W Polsce 20 tysięcy zł (w USA 7 500 Dolarów)"		,output: [{ value: 20, decorators: [ 'iri2', 'iri129' ] },{ comment: 'w usa 7 500 dolarów' }]},
	{arg: "Przykładowy nic nie znaczacy tekst"							,output: [[]]},
	{arg: "Na chwilę obecną oprocentowanie wynosi nie mniej niż 3%, nie więcej niż 5% (tylko w Frankach)"			,output: [{ value: [{operand: ">="},{value: 3,decorators: ["iri6"]}],decorators: ","},{operand: "<="},{decorators: ["iri6"], value: 5},{comment: "tylko w frankach"}]},
	{arg: "4 000 000 zł"										,output: [{ value: 4000000, decorators: [ 'iri129' ] }]},
	{arg: "200 000.34 k euro"										,output: [{ value: 200000.34, decorators: [ 'iri2', 'iri112' ] }]},


	];



    describe('Testing enrichValueWithDecorators(value)', function(){
    tests.forEach(function(test)
    {
        it('Test passed: ' +test.arg, function(){
            output=myCode.enrichValueWithDecorators(test.arg)
            //console.log(output," : ",flatten(test.output))
						if(output.length>=1) flatten(output).should.eql(flatten(test.output))//," |",output," : ",test.output).should.eql(true)//console.log(test.output.some(function(item){console.log("O: ",output.some(function(i){true}))}))
						else output.should.eql(test.output[0])	
        })
    });

    })
})



//{ value: 20, decorators: [ 'iri2', 'iri129' ] },{ comment: 'w usa 7 500 dolarów' },{ beforeComment: 'w polsce' }
//{ value: 20, decorators: [ 'iri2', 'iri129' ] },{ comment: 'w usa 7 500 dolarów' },{ beforeComment: 'w polsce' }