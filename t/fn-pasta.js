var p = require('../fn-pasta')()
  , test = require('tape')

test('General', function (t) {
  var obj =
      { foo: 'bar'
      , asdf: 42
      , _default: 'blah'
      }
    , caseObj = p.casify(obj)
    , otherCase = p.casify(obj, function () {return 'doh'})

  function add (a, b) {
    return a + b
  }

  t.equal(p.d('asdf'), 'asdf', 'Ident function')

  t.equal(caseObj('foo'), 'bar', 'Existing case')
  t.equal(caseObj('weeeeee'), 'blah', 'Non-extant case')
  t.equal(otherCase('notThere'), 'doh', 'Non-extant explicit default')

  t.equal(p.one(add)('a', 'b'), 'aundefined', 'One uses only the first arg')
  t.equal(p.args(4)(function (a, b, c, d, e) { return e })(1, 2, 3, 4, 5, 6)
      , undefined
      , 'Arg limit using default/limit fn')

  var argComped = p.comp(JSON.stringify, Math.sqrt, parseInt)
  t.equal(argComped('25asdf'), '5', 'arguments Composed functions')

  var arrComped = p.comp([JSON.stringify, Math.sqrt,  parseInt])
  t.equal(arrComped('25asdf'), '5', 'array Composed functions')

  t.equal(p.get('foo')(obj), 'bar', 'Get property')

  t.equal([0,1,2,3].reduce(p.op('+')), 6, 'math operators')
  t.equal(p.op('<=')(1, 2), true, 'equality operators')
  t.equal(p.op('u+')('6'), 6, 'unary operators')
  t.equal(p.op('!')(true), false, 'logic operators')
  t.equal(p.op('')(12), 12, 'identity operator')

  t.equal(p.partial(add, undefined, 'b')('c'), 'cb','Partial application')
  t.end()

})
