var util = require('../lib/util');
var test = require('tap').test;



test('trivial', function(t){
  t.plan(1);
  t.notOk(false, "false should not be ok")
  t.end()
})

  

/*
test('oneCallback', function (t) {
  t.plan(1);

  var cb = function (er, data) {
    t.ok(data);
  }
  var one = util.oneCallback(cb)
  one(null, 'test');
  one(new Error('NEVER CALL !! ERROR'));
});

test('allCallback', function (t) {
  t.plan(1);

  var cb = function (er, len) {
    t.equal(len, 4);
  }
  var all = util.allCallback(cb);

  function doWork (cb) {
    setTimeout(function () {
      cb()
    }, 100);
  }
  doWork(all());
  doWork(all());
  doWork(all());
  doWork(all());
});
*/