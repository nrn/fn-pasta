// pasta.js
var p = require('gen-pasta')()

function fnPasta (opts) {
  function comp (args) {
    if (!Array.isArray(args)) args = p.slice(arguments)
    return function (input) {
      return args.reduceRight(function (last, cur) {
        return cur(last)
      }, input)
    }
  }

  function partial (fn) {
    var args = p.slice(arguments, 1)
    return function () {
      var innerArgs = p.slice(arguments)
      return fn.apply(this, args.map(function (arg) {
          if (typeof arg === 'undefined') return innerArgs.shift()
          return arg
        }).concat(innerArgs)
      )
    }
  }

  function curry (fn, times) {
    var self = this
    if (!(times >= 2)) times = 2
    return function currying (arg, args) {
      args || (args = [])
      args.push(arg)
      if (args.length === times) return fn.apply(self, args)
      return function (arg) {
        return currying(arg, args)
      }
    }
  }

  function memo (fn, cache) {
    function memoed () {
      fn._cache || (memoed.cache = fn._cache = cache || {})
      var args = JSON.stringify(p.slice(arguments))
      if (args in fn._cache) return fn._cache[args]
      return fn._cache[args] = fn.apply(this, arguments)
    }
    return memoed
  }

  var numOfArgs =
    { '1': function (fn) { return function (a) { return fn(a) } }
    , '2': function (fn) { return function (a, b) { return fn(a, b) } }
    , '3': function (fn) { return function (a, b, c) { return fn(a, b, c) } }
    }

  function limit (num) {
    return function (fn) {
      return function () {
        return fn.apply(null, p.slice(arguments, 0, num))
      }
    }
  }

  var args = casify(numOfArgs, limit)

  function casify (obj, def) {
    return function (cas) {
      var val = obj[cas]
      if (typeof val === 'undefined') {
        if (typeof def !== 'undefined') val = def(cas)
        else if (typeof obj._default === 'string') val = obj[obj._default]
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
    // Default
    , '_default': ''
    }

  var op = casify(operators)

  var d = op('')

  function all (fn) {
    fn = args(2)(fn)
    return function () {
      var args = p.slice(arguments)
      return args.reduce(fn)
    }
  }

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
    , curry: curry
    , all: all
    , memo: memo
    , memoize: memo
    }

}

if (module && module.exports) module.exports = fnPasta

