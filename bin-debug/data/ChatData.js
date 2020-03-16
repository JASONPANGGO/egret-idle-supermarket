var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var data;
(function (data) {
    /**
     * 对话控件数据
     */
    var ChatData = (function () {
        /**
         * 构造组件数据
         * @param {1|-1} speakerId 对话者ID
         * @param {gConst.chatType} type 对话类型
         * @param {string} later 纹理后缀
         */
        function ChatData(speakerId, type, later, itemType) {
            if (itemType === void 0) { itemType = ""; }
            this.id = gAutoId.id;
            this.speakerId = speakerId;
            this.type = type;
            this.later = later;
            this.itemType = itemType;
        }
        return ChatData;
    }());
    data.ChatData = ChatData;
    __reflect(ChatData.prototype, "data.ChatData");
})(data || (data = {}));
//# sourceMappingURL=ChatData.js.map