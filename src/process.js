import tokenizer from 'js-tokenizer';

module.exports = function process(str) {
  // an example of what this function works with:
  // > tokenize('a.b.push(c, "d\")')
  // [ 'a', '.', 'b', '.', 'push', '(', 'c', ',', ' ', '"d"', ')' ]
  var tokens = tokenizer(str);

  // the chain of property access
  var propertyAccess = [];

  // the command typically ends with a method call or an assignment
  var isInFunctionArguments = false;
  var method = null;
  var methodArguments = [];

  var isInAssignment = false;
  var assignmentOperator = null;
  var assignmentArgument = null;


  const SKIP_TOKENS = ['', '.', '[', ']', '(', ')'];

  // += is two tokens, so we only list the first
  const ASSIGNMENT_OPERATORS = ['=', '+', '*', '-', '/'];

  for (var i=0; i<tokens.length; i++) {
    var current = tokens[i].trim();
    var next = tokens[i+1] !== undefined && tokens[i+1].trim();

    if (SKIP_TOKENS.indexOf(current) !== -1) {
      continue;
    }

    if (next === '(') {
      isInFunctionArguments = true;
      method = current;
      continue;
    }

    if (isInFunctionArguments) {
      methodArguments.push(current);
      continue;
    }

    if (ASSIGNMENT_OPERATORS.indexOf(current) !== -1) {
      if (isInAssignment) {
        assignmentOperator += current;
      }
      else {
        isInAssignment = true;
        assignmentOperator = current;
      }
      continue;
    }

    if (isInAssignment) {
      assignmentArgument = current;
      break;
    }

    if (!isInFunctionArguments && !isInAssignment) {
      propertyAccess.push(current);
    }
  }

  var result = {propertyAccess};
  if (assignmentOperator) {
    result.type = 'set';
    result.operator = assignmentOperator;
    result.value = assignmentArgument;
  }
  else if (method) {
    result.type = 'call';
    result.method = method;
    result.methodArguments = methodArguments;
  }
  return result;
}

