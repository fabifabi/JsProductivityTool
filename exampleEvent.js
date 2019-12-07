(function () {
    if (document.readyState !== 'loading') {
        run();
    } else {
        document.addEventListener('DOMContentLoaded', run);
    }

    function run() {
        function sillyLog() {
            console.log("click");
        }
        document.getElementById("ID1").addEventListener("click", sillyLog);
        document.getElementById("ID2").addEventListener("click", sillyLog);
    }
})();
