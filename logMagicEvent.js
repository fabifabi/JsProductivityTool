; (function () {
    if (debug !== true)
        return;

    function callFun(str, fun, that) {
        return function (arg) {
            console.log("event:", str, that, arg);
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
)();
