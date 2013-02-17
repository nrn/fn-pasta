var benchmark = require('benchmark')
  , p = require('../fn-pasta')()

var bench = new benchmark.Suite

var sum = p.all(p.op('+'))
  , three = p.args(3)(sum)
  , four = p.args(4)(sum)

bench.add('limit 3', function () {
  three(1, 2, 3)
}).add('limit 4', function () {
  four(1, 2, 3)
}).add('direct', function () {
  sum(1, 2, 3)
}).on('cycle', function (e) {
  console.log(e.target.count + ' ' + e.target.name)
}).on('complete', function () {
  console.log('Fastest is ' + this.filter('fastest').pluck('name'))
}).run({ async: true })

