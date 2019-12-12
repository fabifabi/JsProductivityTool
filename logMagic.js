; (function () {
    if (debug === undefined || debug === false) {
        window.log = function () { };
        return;
    }
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
})();

var o = { a: 1, b: 2, c: { e: 3, k: 5 } };
log("hop", o);