var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var util;
(function (util) {
    /**
     * 开场界面管理器
     */
    var StartMgr = (function () {
        function StartMgr() {
        }
        return StartMgr;
    }());
    util.StartMgr = StartMgr;
    __reflect(StartMgr.prototype, "util.StartMgr");
})(util || (util = {}));
//# sourceMappingURL=StartMgr.js.map