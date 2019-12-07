(function () {
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
})();
