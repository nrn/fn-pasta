var benchmark = require('benchmark')
  , p = require('../fn-pasta')()

var bench = new benchmark.Suite

var add = p.op('+')
  , num = p.op('u+')
  , composed = p.comp([num, JSON.stringify, parseInt, String, add])
  , normal = function (a, b) {
      return num(JSON.stringify(parseInt(String(add(a, b)))))
  }


bench.add('Composed', function () {
  composed(1, 2)
}).add('Normal calls', function () {
  normal(1, 2)
}).on('cycle', function (e) {
  console.log(e.target.count + ' ' + e.target.name)
}).on('complete', function () {
  console.log('Fastest is ' + this.filter('fastest').pluck('name'))
}).run({ async: true })

