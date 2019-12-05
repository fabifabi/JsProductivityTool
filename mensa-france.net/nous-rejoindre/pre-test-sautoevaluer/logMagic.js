(function () {
    if (document.readyState !== 'loading') {
        run();
    } else {
        document.addEventListener('DOMContentLoaded', run);
    }

    function callFun(str, fun, that) {
        return function () {
            console.log(str, that);
            fun.bind(that)();
        }
    }

    function MyaddEventListener(str, fun, x, y) {
        console.log("add event", str);
        this.addEventListener2(str, callFun(str, fun, this), x, y);
    }

    function bidon() {
        console.log("bidon", this);
    }

    function run() {
        console.log("run");
        EventTarget.prototype.addEventListener2 = EventTarget.prototype.addEventListener;
        EventTarget.prototype.addEventListener = MyaddEventListener;
        document.getElementById("hop").addEventListener('click', bidon);
        document.getElementById("hop").addEventListener('click', bidon);
    }

})();