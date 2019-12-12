//; (function log() {
function initDebug() {
    if (debug !== true)
        return;
    // interception d'event auto
    function callFun(str, fun, that) {
        return function (arg) {
            console.log("event:", str, that);
            fun.bind(that)(arg);
        }
    }

    function MyaddEventListener(str, fun, x) {
        console.log("add event", str);
        this.addEventListener2(str, callFun(str, fun, this), x);
    }

    EventTarget.prototype.addEventListener2 = EventTarget.prototype.addEventListener;
    EventTarget.prototype.addEventListener = MyaddEventListener;
}

var log = function () {
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
    return log;

})();*/

initDebug();


var o = { a: 1, b: 2, c: { e: 3, k: 5 } };
log("hop", o);
console.log("http:\\\\www.google.com", o);
String.prototype.UpperFirstCase = function () {
    return this[0].toUpperCase() + this.substr(1);
}

function mySetTimeOut(fun, ms) {
    // 
    console.log("settimeout !");
    var arg = Array.prototype.slice.call(arguments);
    arg.unshift(window);
    setTimeout2.apply(arg);
}

Window.prototype.setTimeout2 = window.prototype.setTimeout;
Window.prototype.setTimeout = mySetTimeOut;

log("hop".UpperFirstCase());



setTimeout(function () { log("timer") }, 100);
