console.log("\nExercises\n");
console.log("\tRegexp Golf\n");

/*Code golf is a term used for the game of trying to express a particular 
program in as few characters as possible. Similarly, regexp golf is the 
practice of writing as tiny a regular expression as possible to match a 
given pattern, and only that pattern.

For each of the following items, write a regular expression to test 
whether any of the given substrings occur in a string. The regular 
expression should match only strings containing one of the substrings 
described. Do not worry about word boundaries unless explicitly mentioned. 
When your expression works, see whether you can make it any smaller.


Refer to the table in the chapter summary for help. Test each solution with a few test strings.*/

// Fill in the regular expressions

// 1- car and cat
verify(/(ca)(r+?|t+?)/, ["my car", "bad cats"], ["camper", "high art"]);

// 2- pop and prop
verify(/(pr?op)/, ["pop culture", "mad props"], ["plop", "prrrop"]);

// 3- ferret, ferry, and ferrari
verify(
    /(ferr)(et|y|ari)/,
    ["ferret", "ferry", "ferrari"],
    ["ferrum", "transfer A"]
    );

    // 4- Any word ending in ious
    verify(
        /\b(.+?ious)\b/,
  ["how delicious", "spacious room"],
  ["ruinous", "consciousness"]
  );
  
// 5- A whitespace character followed by a period, comma, colon, or semicolon
verify(/\s\./, ["bad punctuation ."], ["escape the period"]);

// 6- A word longer than six letters
verify(
    /^\w{6,}$/,
    ["Siebentausenddreihundertzweiundzwanzig"],
    ["no", "three small words"]
    );
    
    // 7- A word without the letter e (or E)
    verify(
        /\b[^eE\s]+\b/,
        ["red platypus", "wobbling nest"],
        ["earth bed", "learning ape", "BEET"]
        );
        
        function verify(regexp, yes, no) {
            // Ignore unfinished exercises
            if (regexp.source == "...") return;
            for (let str of yes)
            if (!regexp.test(str)) {
                console.log(`Failure to match '${str}'`);
            }
            for (let str of no)
            if (regexp.test(str)) {
                console.log(`Unexpected match for '${str}'`);
            }
        }
        