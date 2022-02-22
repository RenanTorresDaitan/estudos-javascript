console.log("\nProject: A Programming Language\n");

/*
do(define(x, 10),
   if(>(x, 5),
      print("large"),
      print("small")))
*/

function parseExpression(program) {
  program = skipSpace(program);
  let match, expr;
  if ((match = /^"([^"]*)"/.exec(program))) {
    expr = { type: "value", value: match[1] };
  } else if ((match = /^\d+\b/.exec(program))) {
    expr = { type: "value", value: Number(match[0]) };
  } else if ((match = /^[^\s(),#"]+/.exec(program))) {
    expr = { type: "word", name: match[0] };
  } else {
    throw new SyntaxError("Unexpected syntax: " + program);
  }

  return parseApply(expr, program.slice(match[0].length));
}

function parseApply(expr, program) {
  program = skipSpace(program);
  if (program[0] != "(") {
    return { expr: expr, rest: program };
  }

  program = skipSpace(program.slice(1));
  expr = { type: "apply", operator: expr, args: [] };
  while (program[0] != ")") {
    let arg = parseExpression(program);
    expr.args.push(arg.expr);
    program = skipSpace(arg.rest);
    if (program[0] == ",") {
      program = skipSpace(program.slice(1));
    } else if (program[0] != ")") {
      throw new SyntaxError("Expected ',' or ')'");
    }
  }
  return parseApply(expr, program.slice(1));
}

function parse(program) {
  let { expr, rest } = parseExpression(program);
  if (skipSpace(rest).length > 0) {
    throw new SyntaxError("Unexpected text after program");
  }
  return expr;
}

const specialForms = Object.create(null);

function evaluate(expr, scope) {
  if (expr.type == "value") {
    return expr.value;
  } else if (expr.type == "word") {
    if (expr.name in scope) {
      return scope[expr.name];
    } else {
      throw new ReferenceError(`Undefined binding: ${expr.name}`);
    }
  } else if (expr.type == "apply") {
    let { operator, args } = expr;
    if (operator.type == "word" && operator.name in specialForms) {
      return specialForms[operator.name](expr.args, scope);
    } else {
      let op = evaluate(operator, scope);
      if (typeof op == "function") {
        return op(...args.map((arg) => evaluate(arg, scope)));
      } else {
        throw new TypeError("Applying a non-function.");
      }
    }
  }
}

specialForms.if = (args, scope) => {
  if (args.length != 3) {
    throw new SyntaxError("Wrong number of args to if");
  } else if (evaluate(args[0], scope) !== false) {
    return evaluate(args[1], scope);
  } else {
    return evaluate(args[2], scope);
  }
};

specialForms.while = (args, scope) => {
  if (args.length != 2) {
    throw new SyntaxError("Wrong number of args to while");
  }
  while (evaluate(args[0], scope) !== false) {
    evaluate(args[1], scope);
  }

  // Since undefined does not exist in Egg, we return false,
  // for lack of a meaningful result.
  return false;
};

specialForms.do = (args, scope) => {
  let value = false;
  for (let arg of args) {
    value = evaluate(arg, scope);
  }
  return value;
};

specialForms.define = (args, scope) => {
  if (args.length != 2 || args[0].type != "word") {
    throw new SyntaxError("Incorrect use of define");
  }
  let value = evaluate(args[1], scope);
  scope[args[0].name] = value;
  return value;
};

const topScope = Object.create(null);
topScope.true = true;
topScope.false = false;

for (let op of ["+", "-", "*", "/", "==", "<", ">"]) {
  topScope[op] = Function("a, b", `return a ${op} b;`);
}

topScope.print = (value) => {
  console.log(value);
  return value;
};

function run(program) {
  return evaluate(parse(program), Object.create(topScope));
}

specialForms.fun = (args, scope) => {
    if (!args.length) {
      throw new SyntaxError("Functions need a body");
    }
    let body = args[args.length - 1];
    let params = args.slice(0, args.length - 1).map(expr => {
      if (expr.type != "word") {
        throw new SyntaxError("Parameter names must be words");
      }
      return expr.name;
    });
  
    return function() {
      if (arguments.length != params.length) {
        throw new TypeError("Wrong number of arguments");
      }
      let localScope = Object.create(scope);
      for (let i = 0; i < arguments.length; i++) {
        localScope[params[i]] = arguments[i];
      }
      return evaluate(body, localScope);
    };
  };

console.log("\nExercises\n")
console.log("\tArrays\n")

/*Add support for arrays to Egg by adding the following three functions 
to the top scope: array(...values) to construct an array containing the 
argument values, length(array) to get an array’s length, and 
element(array, n) to fetch the nth element from an array.*/

// Modify these definitions...

topScope.array = (...values) => [...values];

topScope.length = arr => arr.length;

topScope.element = (arr, element) => arr[element];

run(`
do(define(sum, fun(array,
    do(define(i, 0),
    define(sum, 0),
    while(<(i, length(array)),
    do(define(sum, +(sum, element(array, i))),
    define(i, +(i, 1)))),
    sum))),
    print(sum(array(1, 2, 3))))
    `);
// → 6

console.log("\tClosure\n")
/*The way we have defined fun allows functions in Egg to reference the 
surrounding scope, allowing the function’s body to use local values 
that were visible at the time the function was defined, just like 
JavaScript functions do.

The following program illustrates this: function f returns a function 
that adds its argument to f’s argument, meaning that it needs access 
to the local scope inside f to be able to use binding a.*/

run(`
do(define(f, fun(a, fun(b, +(a, b)))),
print(f(4)(5)))
`);
// → 9
/*Go back to the definition of the fun form and explain which mechanism 
causes this to work.*/

console.log("\tComments\n")

/*It would be nice if we could write comments in Egg. For example, whenever 
we find a hash sign (#), we could treat the rest of the line as a comment 
and ignore it, similar to // in JavaScript.

We do not have to make any big changes to the parser to support this. 
We can simply change skipSpace to skip comments as if they are whitespace 
so that all the points where skipSpace is called will now also skip comments. 
Make this change.*/

// This is the old skipSpace. Modify it...
function skipSpace(string) {
  let first = string.search(/\S/);
  if (first == -1) return "";
  string = string.slice(first);
  let comment = (/#\s.+\n/).exec(string);
  if (comment !== null) {
   string = string.replace(comment[0],"")
  }
  return string;
}

console.log(parse("# hello\nx"));
// → {type: "word", name: "x"}

console.log(parse("a # one\n   # two\n()"));
// → {type: "apply",
//    operator: {type: "word", name: "a"},
//    args: []}