var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var data;
(function (data) {
    /**
     * 配置数据
     */
    var ConfigData = (function () {
        function ConfigData() {
        }
        return ConfigData;
    }());
    data.ConfigData = ConfigData;
    __reflect(ConfigData.prototype, "data.ConfigData");
})(data || (data = {}));
//# sourceMappingURL=ConfigData.js.map