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
	{arg: "00.100%"					,output: [{token: 'number', value: 0.1},{decoratorIRI: 'iri6'}]}, //
	{arg: "200 zł"					,output: [{token: 'number', value: "200"},{decoratorIRI: 'iri129'}]},
	{arg: "400 zł"					,output: [{token: 'number', value: "400"},{decoratorIRI: 'iri129'}]},
	{arg: "1 kEUR"					,output: [{token: 'number', value: '1' },{decoratorIRI: 'iri2'},{decoratorIRI: 'iri135'} ]},
	{arg: "5M"						,output: [{token: 'number', value: '5' },{decoratorIRI: 'iri3'},{token: 'number', value: '5' },{decoratorIRI: 'iri12'}]},
	{arg: "7D"						,output: [{token: 'number', value: '7' },{decoratorIRI: 'iri10'}]},
	{arg: "M $5"					,output: [{decoratorIRI: 'iri3'},{decoratorIRI: 'iri140'},{token: 'number', value: '5' },{decoratorIRI: 'iri12'},{decoratorIRI: 'iri140'},{token: 'number', value: '5' }]},
	{arg: "bez ograniczeń"			,output: [{decoratorIRI: 'iri8'}]},
	{arg: "-"						,output: [{decoratorIRI: 'iri9'}]},
	{arg: "$7k"						,output: [{decoratorIRI: 'iri140'},{token: 'number', value: '7' },{decoratorIRI: 'iri2'} ]},
	{arg: "3,5%"					,output: [{token: 'number', value: 3.5},{decoratorIRI: 'iri6'}]},
	{arg: "0,1‰"					,output: [{token: 'number', value: 0.1 },{decoratorIRI: 'iri7'}]},
	{arg: "kwota 234.45 złotych"	,output: [{token: 'string', value: 'kwota' },{token: 'number', value: 234.45 },{decoratorIRI: 'iri129'}]},
	{arg: "od 5 do 7 zł"			,output: [{token: 'range', value: 'od' },{token: 'number', value: '5' },{token: 'range', value: 'do' },{token: 'number', value: '7' },{decoratorIRI: 'iri129'}]},
	{arg: "0.1%, nie mniej niż 5 zł",output: [{token: 'number', value: ""},{decoratorIRI: 'iri6'}]},
	{arg: "2%, min. $1"				,output: [{token: 'number', value: ""},{decoratorIRI: 'iri6'}]},
	{arg: "12 zł *)"				,output: [{token: 'number', value: ""},{decoratorIRI: 'iri6'}]},
	];



    describe('Testing enrichValueWithDecorators(value)', function(){
    tests.forEach(function(test)
    {
        it('Correct output for ' +test.arg, function(){
            output =myCode.enrichValueWithDecorators(test.arg)
            for(a in output) output[a].should.includes(test.output[a])
        })
    });

    })
})



