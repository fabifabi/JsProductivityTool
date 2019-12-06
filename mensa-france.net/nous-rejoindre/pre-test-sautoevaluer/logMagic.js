(function () {
    if (document.readyState !== 'loading') {
        run();
    } else {
        document.addEventListener('DOMContentLoaded', run);
    }

    var nowName = [];

    var arrayChangeHandler = {
        apply: function (target, thisArg, argumentsList) {
            if (nowName.length === 0)
                nowName.push(target.___name);
            var ctxt = nowName.join("");
            console.log("called: " + ctxt + "(" + argumentsList.join(", ") + ")");
            nowName = [];
        },
        get: function (target, propKey, receiver) {
            if (nowName.length === 0)
                nowName.push(target.___name);
            if (target instanceof Array)
                nowName.push("[" + propKey + "]");
            else
                nowName.push("." + propKey);
            if (!(target[propKey] instanceof Object))
                nowName = [];
            return target[propKey];
        },
        set: function (target, property, value, receiver) {
            if (nowName.length === 0)
                nowName.push(target.___name);
            var ctxt = nowName.join("");
            nowName = [];
            if (!(property in target))
                console.log("WARNING! NEW PROPERTY ! " + ctxt + "." + property);
            if (target instanceof Array)
                console.log(ctxt + "[" + property + "]=" + value);
            else
                console.log(ctxt + "." + property + "=" + value);
            target[property] = LogAllRec(value, ctxt);
            if (target[property] === undefined)
                target[property] = value;
            return true;
        }
    };

    function LogAllRec(elm) {
        if (elm === undefined || !(elm instanceof Object))
            return;
        for (var i in elm) {
            if (!(elm[i] instanceof Object))
                continue;
            var aux = LogAll(elm[i]);
            elm[i] = aux;
        }
        return new Proxy(elm, arrayChangeHandler);
    }

    function LogAll(elm, name) {
        elm.___name = name
        return LogAllRec(elm);
    }
    function run() {
        console.log("run");
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
        //   EventTarget.prototype.addEventListener2 = EventTarget.prototype.addEventListener;
        //  EventTarget.prototype.addEventListener = MyaddEventListener;

        function bidon() {
            console.log("bidon", this);
        }
        document.getElementById("hop").addEventListener('click', bidon);
        document.getElementById("hop").addEventListener('click', bidon);

        // log de changement dans une structure de donnée
        var exemple = {
            myfun() {
                console.log("je suis myfun");
            }, a: 2, b: 3, d: [1, 2, 3, 4, 5], c: {
                a: 1,
                b: 2,
                funsub() {
                    console.log("je suis sub");
                }
            }
        }
        exemple = LogAll(exemple, "exemple");
        exemple.a = exemple.a + 3;
        return;
        exemple.c.a = 3;
        exemple.c.newval = 3;
        exemple.d[2] = 25;
        exemple.c.newval = exemple.c.newval * 2;
        exemple.myfun(1, "azerty");
        exemple.c.funsub(2, "azerty");
        exemple.truc();
        exemple.a = 4;
        exemple.b = exemple.a;
    }

})();
