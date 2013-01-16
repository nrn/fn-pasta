// pasta.js
var p = require('gen-pasta')()

function fnPasta (opts) {
  function comp (args) {
    if (!Array.isArray(args)) args = p.arrify(arguments)
    return function (input) {
      return args.reduceRight(function (last, cur) {
        return cur(last)
      }, input)
    }
  }

  function partial (fn) {
    var args = p.arrify(arguments)
    args.shift() // remove the function
    return function () {
      var innerArgs = p.arrify(arguments)
      return fn.apply(this, args.map(function (arg) {
          if (arg == null) return innerArgs.shift()
          return arg
        }).concat(innerArgs)
      )
    }
  }

  var numOfArgs =
    { '1': function (fn) { return function (arg) { return fn(arg) } }
    , '2': function (fn) { return function (a, b) { return fn(a, b) } }
    , '3': function (fn) { return function (a, b, c) { return fn(a, b, c) } }
    }

  function limit (num) {
    return function (fn) {
      return function () {
        return fn.apply(null, p.arrify(arguments).slice(0, num))
      }
    }
  }

  var args = casify(numOfArgs, limit)

  function casify (obj, def) {
    return function (cas) {
      var val = obj[cas]
      if (typeof val === 'undefined') {
        if (typeof def !== 'undefined') val = def(cas)
        else if (typeof obj._default !== 'undefined') val = obj._default
        else val = obj['default']
      }
      return val
    }
  }

  // Idea taken from Eloquent JavaScript
  var operators =
    // Comparison
    { '==': function (a, b) { return a == b }
    , '!=': function (a, b) { return a != b }
    , '===': function (a, b) { return a === b }
    , '!==': function (a, b) { return a !== b }
    , '>': function (a, b) { return a > b }
    , '>=': function (a, b) { return a >= b }
    , '<': function (a, b) { return a < b }
    , '<=': function (a, b) { return a <= b }
    // Math
    , '+': function (a, b) { return a + b }
    , '-': function (a, b) { return a - b }
    , '*': function (a, b) { return a * b }
    , '/': function (a, b) { return a / b }
    , '%': function (a, b) { return a % b }
    // Unary
    , 'u-': function (a) { return -a }
    , 'u+': function (a) { return +a }
    // Turnary
    , '?:': function (a, b, c) { return a ? b : c }
    // Logical
    , '&&': function (a, b) { return a && b }
    , '||': function (a, b) { return a || b }
    , '!': function (a) { return !a }
    // Identity
    , '': function (a) { return a }
    }

  var op = casify(operators)

  var d = op('')

  function get (key) {
    return function (obj) {
      return obj[key]
    }
  }

  return { get: get
    , casify: casify
    , d: d
    , comp: comp
    , one: args(1)
    , args: args
    , op: op
    , partial: partial
    }

}

if (module && module.exports) module.exports = fnPasta

