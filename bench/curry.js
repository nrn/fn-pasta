var benchmark = require('benchmark')
  , p = require('../fn-pasta')()

var bench = new benchmark.Suite

var sum = p.all(p.op('+'))

bench.add('curry', function () {
  p.curry(sum)(1)(2)
}).add('partial', function () {
  p.partial(sum, undefined, 2)(1)
}).add('bind', function () {
  sum.bind(null, 1)(2)
}).on('cycle', function (e) {
  console.log(e.target.count + ' ' + e.target.name)
}).on('complete', function () {
  console.log('Fastest is ' + this.filter('fastest').pluck('name'))
}).run({ async: true })

