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

    function recOn(elm) {
        if (elm === undefined)
            return;
        for (var i = 0; i < elm.children.length; i++) {
            recOn(elm.children[i]);
        }
        for (var i in elm) {
            if (i.substr(0, 2) === "on" && typeof (elm[i]) === "function") {
                var keep = elm[i];
                elm[i + "new"] = function (keep, elm) {
                    console.log(i, this);
                    keep.bind(elm)();
                }
                // elm.onclick=fun;
                // elm.onclick()
                Object.defineProperty(elm, i, {
                    set: function (x) {
                        console.log("affectation", this);
                        this[i + "new"] = function () {
                            return function () {
                                console.log(i, this);
                                x();
                            }
                        }
                    },
                    get: function () {
                        return this[i + "new"];
                    }
                });
            }
        }
    }


    function run() {
        console.log("run");
        EventTarget.prototype.addEventListener2 = EventTarget.prototype.addEventListener;
        EventTarget.prototype.addEventListener = MyaddEventListener;
        document.getElementById("hop").addEventListener('click', bidon);
        document.getElementById("hop").addEventListener('click', bidon);
        recOn(document.body);
        document.getElementById("hop").onclick = bidon;
    }

})();