var parse = require('pattern-parser');
 
// an array of patterns to match to, callbacks included
var patterns = [
    {
        pattern: 'Order {integer} rolls of toilet paper',
        callback: function (rolls)
        {
            console.log('I will order ' + rolls + ' of toilet paper');
        }
    },
    {
        pattern: 'Remind me to {string} tomorrow',
        callback: function (reminder)
        {
            console.log('I will remind you to ' + reminder + ' tomorrow at noon');
        }
    }
];
 
// a message you want to parse
var message = 'Remind me to pay the taxes tomorrow';
 
// parser stops after the first match is found, so the order of patterns is important.
// matching is case-insensitive
parse(message, patterns);
 
// what if no match is found?
parse('Order bazillion rolls of toilet paper', patterns, function(msg) { console.log('Sorry, could not understand what you meant by: ' + msg); });