var LogAll = (function () {
    var pushEval = [];
    var nowName = function () { return pushEval[pushEval.length - 1] };
    var arrayChangeHandler = {
        apply: function (target, thisArg, argumentsList) {
            if (target instanceof Object)
                nowName.push(target.___name);
            var ctxt = nowName.join(".");
            console.log("called: " + ctxt + "(" + argumentsList.join(", ") + ")");
            nowName = [];
        },
        get: function (target, propKey, receiver) {
            console.log("get", target.___name);
            if (target.___root === true) {
                pushEval([target.___name]);
            }
            if (target[propKey] instanceof Array) {
                nowName.push(target.___name + "[" + propKey + "]");
            }
            else
                if (!(target[propKey] instanceof Object)) {
                    console.log("read: ", nowName.join(".") + "." + propKey, " (value) ", target[propKey]);
                    nowName = [target.___name];
                }
                else // object
                {
                    nowName.push(propKey);
                    console.log("read: ", nowName.join("."), target[propKey]);
                }
            return target[propKey];
        },
        set: function (target, property, value, receiver) {
            console.log("set", nowName);
            var ctxt = nowName.join(".");
            nowName = [];
            if (!(property in target))
                console.log("WARNING! NEW PROPERTY ! " + ctxt + "." + property);
            if (target instanceof Array) {
                console.log(ctxt + "[" + property + "]=" + value);
            }
            else {
                console.log(ctxt + "." + property + "=" + value);
            }
            if (target[property] instanceof Object && target[property].__name === undefined)
                target[property] = LogAllRec(value, property);
            else
                target[property] = value;
            return true;
        }
    };

    function LogAllRec(elm, name) {
        if (elm === undefined || !(elm instanceof Object))
            return;
        elm.___name = name;
        for (var i in elm) {
            if (!(elm[i] instanceof Object))
                continue;
            // if (elm[i] instanceof Array)
            //   i=i+[]
            var aux = LogAllRec(elm[i], i);
            elm[i] = aux;
        }
        return new Proxy(elm, arrayChangeHandler);
    }

    function LogAll(elm, name) {
        if (debug === true) {
            elm.___root = true;
            return LogAllRec(elm, name);
        }
        else return elm;
    }
    return LogAll;
})();
