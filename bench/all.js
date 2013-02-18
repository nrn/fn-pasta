var benchmark = require('benchmark')
  , p = require('../fn-pasta')()

var bench = new benchmark.Suite

var add = p.op('+')
  , sum = p.all(add)
  , manSum = function (a, b, c, d) {
    return add(a, add(b, add(c, d)))
  }

bench.add('All', function () {
  sum(1, 2, 3, 4)
}).add('Direct', function () {
  manSum(1, 2, 3, 4)
}).on('cycle', function (e) {
  console.log(e.target.count + ' ' + e.target.name)
}).on('complete', function () {
  console.log('Fastest is ' + this.filter('fastest').pluck('name'))
}).run({ async: true })

