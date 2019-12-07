(function () {
    if (document.readyState !== 'loading') {
        run();
    } else {
        document.addEventListener('DOMContentLoaded', run);
    }

    function run() {
        var example = {
            myfun() {
                console.log("I am myfun");
            }, a: 2, b: 3, d: [1, 2, 3, 4, 5], c: {
                a: 1,
                b: 2,
                funsub() {
                    console.log("jI am s sub");
                }
            }
        }
        example = LogAll(example, "example");
        example.a = example.a + 3;
        example.c.a = 3;
        example.c.newval = 3;
        example.d[2] = 25;
        example.c.newval = example.c.newval * 2;
        example.myfun(1, "azerty");
        example.c.funsub(2, "azerty");
        example.a = 4;
        example.b = example.a;
    }
})();
