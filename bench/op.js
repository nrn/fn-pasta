var benchmark = require('benchmark')
  , p = require('../fn-pasta')()

var bench = new benchmark.Suite

var add = p.op('+')

bench.add('op', function () {
  var num = 0
  for(var i = 1; i<12; i++) {
    num = add(num, i)
  }
}).add('+', function () {
  var num = 0
  for(var i = 1; i<12; i++) {
    num = num + i
  }
}).on('cycle', function (e) {
  console.log(e.target.count + ' ' + e.target.name)
}).on('complete', function () {
  console.log('Fastest is ' + this.filter('fastest').pluck('name'))
}).run({ async: true })

