var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var data;
(function (data) {
    /**
     * 开锁组件数据
     */
    var UnlockData = (function () {
        /**
         * 构造动画数据
         * @param {number} id 关卡ID
         * @param {{ id: number, x: number, keyPinH: number, finish: boolean }[]} pinOnes 所有锁芯
         * @param {number} keyPos 钥匙上的点
         * @param {number} finishPos 钥匙上，完成的点
         */
        function UnlockData(id, pinOnes, keyPos, finishPos) {
            this.pinOnes = []; //所有锁芯
            this.id = id;
            this.pinOnes = pinOnes;
            this.keyPos = keyPos;
            this.finishPos = finishPos;
        }
        return UnlockData;
    }());
    data.UnlockData = UnlockData;
    __reflect(UnlockData.prototype, "data.UnlockData");
})(data || (data = {}));
//# sourceMappingURL=UnlockData.js.map