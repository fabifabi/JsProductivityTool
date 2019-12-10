(function () {
    /*
    if (debug !== true)
        return;
    // interception d'event auto
    function callFun(str, fun, that) {
        return function () {
            console.log("event:", str, that);
            fun.bind(that)();
        }
    }

    function MyaddEventListener(str, fun, x, y) {
        console.log("add event", str);
        this.addEventListener2(str, callFun(str, fun, this), x, y);
    }

    EventTarget.prototype.addEventListener2 = EventTarget.prototype.addEventListener;
    EventTarget.prototype.addEventListener = MyaddEventListener;
*/
    (function (global) {
        Object.defineProperty(global, '__stack__', {
            get: function () {
                var orig = Error.prepareStackTrace;
                if (orig === undefined)
                    return undefined;
                Error.prepareStackTrace = function (_, stack) { return stack; };
                var err = new Error;
                Error.captureStackTrace(err, arguments.callee);
                var stack = err.stack;
                Error.prepareStackTrace = orig;
                return stack;
            }
        });

        Object.defineProperty(global, '__line__', {
            get: function () {
                var err = new Error();/*
                if (err.prepareStackTrace !== undefined) {
                    err.prepareStackTrace();
                    console.log(err);
                    return err.stack[2].getLineNumber();
                }*/
                var s = err.stack;
                var l = s.split("\n");
                var line = l[0].includes(":") ? l[1] : l[2]; // chrome put "error" on first line
                var t = line.split(":");
                var res = t[t.length - 2];
                return res;
            }
        });
    })(this);

    window.log = function () {
        {
            var err = new Error();
            var s = err.stack;
            var l = s.split("\n");
            var line = l[0].includes(":") ? l[1] : l[2]; // chrome put "error" on first line
            var myarg = Array.prototype.slice.call(arguments);
            console.log(line.trim());
            for (var i = 0; i < myarg.length; i++) {
                console.table(myarg[i]);
            }
        }
    }

    /*
        var cons = window.console;
        log = cons.log.bind(cons, "%s");
    
        log("hop");
    */
    var o = { a: 1, b: 2, c: { e: 3, k: 5 } };
    log("hop", o);
    console.log(__line__, "http:\\\\www.google.com", o);

    // console.log("test");

})();
