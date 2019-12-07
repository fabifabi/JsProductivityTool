var LogAll = (function () {
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
        if (debug === true) {
            elm.___name = name
            return LogAllRec(elm);
        }
        else return elm;
    }
    return LogAll;
})();
