var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var data;
(function (data) {
    /**
     * 卡牌组件数据
     */
    var CardData = (function () {
        /**
         * 构造组件数据
         * @param {number} num 卡牌数字
         * @param {gConst.cardPattern} type 卡牌花型
         * @param {boolean} isOpen 是否打开
         */
        function CardData(num, type, isOpen) {
            if (isOpen === void 0) { isOpen = false; }
            this.id = gAutoId.id;
            this.num = num;
            this.type = type;
            this.isOpen = isOpen;
        }
        return CardData;
    }());
    data.CardData = CardData;
    __reflect(CardData.prototype, "data.CardData");
})(data || (data = {}));
//# sourceMappingURL=CardData.js.map