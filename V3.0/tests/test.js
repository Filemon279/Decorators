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
	{arg: "00.100%"	,output: [{ value: '00.100', decorators: [ '%' ] }]}, //
	{arg: "200 zł"	,output: [{ value: '200', decorators: [ 'zł' ] }]},
	{arg: "400 zł"	,output: [{ value: '400', decorators: [ 'zł' ] }]},
	{arg: "1 kEUR"	,output: [{ value: '1', decorators: [ 'k','eur' ] }]},
	{arg: "5M"			,output: [{ value: '5', decorators: [ 'm' ] }]},
	{arg: "7D"			,output: [{ value: '7', decorators: [ 'd' ] }]},
	{arg: "M $5"		,output: [{ value: '5', decorators: [ 'm','$' ] }]},
	{arg: "bez ograniczeń"	,output: [{ value: '', decorators: [ 'bez ograniczeń' ] }]},
	{arg: "-"				,output: [{ value: '', decorators: [ '-' ] }]},
	{arg: "$7k"			,output: [{ value: '7', decorators: [ '$','k' ] }]},
	{arg: "3,5%"		,output: [{ value: '3.5', decorators: [ '%' ] }]},
	{arg: "0,1‰"					,output: [{value: '0.1', decorators: [ '‰' ] }]},
	{arg: "kwota 234.45 złotych"		,output: [[]]},
	{arg: "od 5 do 7 zł"						,output: [[]]},
	{arg: "0.1%, nie mniej niż 5 zł",output: [[]]},
	{arg: "2%, min. $1"							,output: [[]]},
	{arg: "12 zł *)"								,output: [[]]},
	];



    describe('Testing enrichValueWithDecorators(value)', function(){
    tests.forEach(function(test)
    {
        it('Correct output for ' +test.arg, function(){
            output=myCode.enrichValueWithDecorators(test.arg)
            console.log(output," : ",test.output[0])
            output.should.eql(test.output[0])

        })
    });

    })
})



