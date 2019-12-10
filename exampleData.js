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
            }, a1: 2, b1: 3, d1: [1, 2, 3, 4, 5], c1: {
                a2: 1,
                b2: 2,
                funsub() {
                    console.log("I am funsub");
                }
            }
        }
        example = LogAll(example, "example");
        /*
        example.myfun();
        example.c1.a2;
        example.a1 + 3;
        example.a1 = example.b1 + 3;
        example.c1.a2 = 3;
        example.d1[2] = 25;
        example.c1.a2;*//*
        example.c1.newval2 = 3;
        example.c1.newval2;
        example.c1.newval2;
        example.c1.newval2 * 2;
        example.c1.newval2 = 0;
        example.c1.newval2 = example.c1.newval2 * 2;
*/
        example.c1.a2 = example.a1 * 2;
        /*        example.myfun(1, "azerty");
                example.c1.funsub(2, "azerty");
                example.a1 = 4;
                example.b1 = example.a1;*/
    }
})();
