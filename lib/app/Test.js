var Test;
(function (Test) {
    var Action = (function () {
        function Action() {
        }
        Action.prototype.HelloWord = function () {
            alert("Hello Word");
        };
        return Action;
    })();
    Test.Action = Action;
})(Test || (Test = {}));
//# sourceMappingURL=Test.js.map
