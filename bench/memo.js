var benchmark = require('benchmark')
  , p = require('../fn-pasta')()

var bench = new benchmark.Suite

function fib (x) {
  if (x < 2) return 1
  else return fib(x-1) + fib(x-2)
}

/* * * memoize.js
 * * by @philogb and @addyosmani
 * * with further optimizations by @mathias
 * * and @DmitryBaranovsk
 * * perf tests: http://bit.ly/q3zpG3
 * * Released under an MIT license.
 * */
function memoize( fn ) {
  return function () {
    var args = Array.prototype.slice.call(arguments),
      hash = "",
      i = args.length;
    currentArg = null;
    while (i--) {
      currentArg = args[i];
      hash += (currentArg === Object(currentArg)) ?
      JSON.stringify(currentArg) : currentArg;
      fn.memoize || (fn.memoize = {});
    }
    return (hash in fn.memoize) ? fn.memoize[hash] :
      fn.memoize[hash] = fn.apply(this, args);
  };
}

bench.add('My Memo', function () {
  p.memo(fib)(20)
}).add('Fast Memo', function () {
  memoize(fib)(20)
}).on('cycle', function (e) {
  console.log(e.target.count + ' ' + e.target.name)
}).on('complete', function () {
  console.log('Fastest is ' + this.filter('fastest').pluck('name'))
}).run({ async: true })
