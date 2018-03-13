(function() {
  define(['observable', 'knockout'], function(Observable, ko) {
    return function(elem) {
      var a, dataO, f, functions, l, mutableContext, _i, _len, _results;
      l = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = arguments.length; _i < _len; _i++) {
          a = arguments[_i];
          _results.push(a);
        }
        return _results;
      }).apply(this, arguments);
      l.shift();
      functions = l;
      dataO = Observable.makeObservableArray(this.dataId);
      mutableContext = {};
      _results = [];
      for (_i = 0, _len = functions.length; _i < _len; _i++) {
        f = functions[_i];
        _results.push((f.f || f).call(this, dataO, elem, f.o, mutableContext));
      }
      return _results;
    };
  });

}).call(this);

//# sourceMappingURL=playground.js.map
