var p = require('../fn-pasta')()
  , test = require('tape')

test('General', function (t) {
  var obj =
      { foo: 'bar'
      , asdf: 42
      , default: 'blah'
      }
    , strDef =
      { foo: 'bar'
      , asdf: 42
      , _default: 'asdf'
      }
    , caseObj = p.casify(obj)
    , strDefCas = p.casify(strDef)
    , otherCase = p.casify(obj, function () {return 'doh'})
    , add = p.op('+')
    , sum = p.all(p.op('+'))

  t.equal(p.d('asdf'), 'asdf', 'Ident function')

  t.equal(caseObj('foo'), 'bar', 'Existing case')
  t.equal(strDefCas('n/a'), 42, 'Default property')
  t.equal(caseObj('weeeeee'), 'blah', 'Default value')
  t.equal(otherCase('notThere'), 'doh', 'Default function')

  t.equal(p.one(add)('a', 'b'), 'aundefined', 'One uses only the first arg')
  t.equal(p.args(4)(sum)(1, 2, 3, 4, 5, 6)
      , 10
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

  t.equal(p.curry(add)(1)(1), 2, 'Curry default')
  t.equal(p.curry(sum, 5)(1)(2)(3)(4)(5), 15, 'Curry 5 times')

  var called = 0
  var memoAdd = p.memo(function (a, b) {
    called++
    t.same(called, 1, 'Only called once')
    return add(a, b)
  })
  var memoSum = p.memo(sum, { '["broken",2]': 'Surprise!' })

  t.same(memoAdd(1, 2), 3, 'First memo call')
  t.same(memoAdd(1, 2), 3, 'Second memo call')
  t.same(memoAdd(1, 2), 3, 'Third memo call')
  t.same(memoSum('broken', 2), 'Surprise!', 'Provided cache object')
  t.same(memoSum(1, 1), 2, 'Avoid cache object')
  t.same(memoSum._cache, { '["broken",2]': 'Surprise!', '[1,1]': 2 }, 'Check cache')

  t.end()
})
