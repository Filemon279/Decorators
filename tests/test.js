var expect = require('chai').expect
var equal = require('chai').equale
var myCode = require('../main')
let chai = require('chai');
let should = chai.should();


describe('test', function(){

//Declare input and expected values
	var tests = 
	[
	{arg: "00.100%"					,value: "00.100",	decorators:["iri6"]}, //
	{arg: "200 zł"					,value: "200",		decorators:["iri129"]},
	{arg: "400 zł"					,value: "400",		decorators:["iri129"]},
	{arg: "1 kEUR"					,value: "1",		decorators:["iri2","iri112"]},
	{arg: "5M"						,value: "5",		decorators:["iri12"]},
	{arg: "7D"						,value: "7",		decorators:["iri10"]},
	{arg: "M $5"					,value: "5",		decorators:["iri3","iri140"]},
	{arg: "bez ograniczeń"			,value: "inf",		decorators:["iri8"]},
	{arg: "-"						,value: "-",		decorators:["iri9"]},
	{arg: "$7k"						,value: "7",		decorators:["iri2","iri140"]},
	{arg: "3,5%"					,value: "3.5",		decorators:["iri6"]},
	{arg: "0,1‰"					,value: "0.1",		decorators:["iri7"]},
	{arg: "kwota 234.45 złotych"	,value: "",			decorators:[]},
	{arg: "od 5 do 7 zł"			,value: "",			decorators:[]},
	{arg: "0.1%, nie mniej niż 5 zł",value: "",			decorators:[]},
	{arg: "2%, min. $1"				,value: "",			decorators:[]},
	{arg: "12 zł *)"				,value: "",			decorators:[]},
	];



    describe('Testing enrichValueWithDecorators(value)', function(){
    tests.forEach(function(test)
    {
        it('Correct output for ' +test.arg, function(){
            output =myCode.enrichValueWithDecorators(test.arg)
            output.should.be.a('Object')
            output.should.have.property("value").eql(test.value)
            output.should.have.property("decorators")
            for (a in test.decorators) output["decorators"].should.be.a("array").that.includes(test.decorators[a])
        })
    });

    })
})



