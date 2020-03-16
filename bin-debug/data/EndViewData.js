var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var data;
(function (data) {
    /**
     * 结束界面数据
     */
    var EndViewData = (function () {
        function EndViewData() {
        }
        /** 物品配置 */
        EndViewData.config = function (type) {
            return this._config[type];
        };
        return EndViewData;
    }());
    /** 物品配置 */
    EndViewData._config = {
        "1": {
            name: "p_hen_left_png",
            location: "top",
            x: 268,
            y: 160,
            y2: 190,
            goalX: 600,
            lastLayer: 2,
            scaleX: -0.8,
            scaleY: 0.8
        },
        "2": {
            name: "p_machine1_2_png",
            location: "top",
            x: 500,
            y: 230,
            goalX: 1238,
            lastLayer: 2
        },
        "3": {
            name: "p_machine1_2_png",
            location: "bottom",
            x: -108,
            y: 196,
            goalX: 682,
            lastLayer: 1
        },
        "4": {
            name: "p_machine2_2_png",
            location: "bottom",
            x: 684,
            y: 210,
            goalX: 1624,
            lastLayer: 1
        }
    };
    data.EndViewData = EndViewData;
    __reflect(EndViewData.prototype, "data.EndViewData");
})(data || (data = {}));
//# sourceMappingURL=EndViewData.js.map