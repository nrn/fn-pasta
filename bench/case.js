var benchmark = require('benchmark')
  , p = require('../fn-pasta')()

var bench = new benchmark.Suite

var opts =
  { 1: 1
  , 2: 2
  , 3: 3
  , 4: 4
  , 5: 5
  , 6: 6
  , 7: 7
  , 8: 8
  , 9: 9
  , 10: 10
  , default: 100
  }

var obj =
  { 1: 1
  , 2: 2
  , 3: 3
  , 4: 4
  , 5: 5
  , 6: 6
  , 7: 7
  , 8: 8
  , 9: 9
  , 10: 10
  , 11: 100
  }

var getNum = p.casify(opts)

bench.add('Casify', function () {
  var num = 0
  for(var i = 1; i<12; i++) {
    num += getNum(i)
  }
  if (debug) console.log('asdf')
}).add('Switch Statement', function () {
  var num = 0
  for(var i = 1; i<12; i++) {
    switch (i) {
      case 1:
        num += 1
        break
      case 2:
        num += 2
        break
      case 3:
        num += 3
        break
      case 4:
        num += 4
        break
      case 5:
        num += 5
        break
      case 6:
        num += 6
        break
      case 7:
        num += 7
        break
      case 8:
        num += 8
        break
      case 9:
        num += 9
        break
      case 10:
        num += 10
        break
      default:
        num += 100
        break
    }
  }
}).add('Direct property access', function () {
  var num = 0
  for(var i = 1; i<12; i++) {
    num += obj[i]
  }
}).on('cycle', function (e) {
  console.log(e.target.count + ' ' + e.target.name)
}).on('complete', function () {
  console.log('Fastest is ' + this.filter('fastest').pluck('name'))
}).run({ async: true })

