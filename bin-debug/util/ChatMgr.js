var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var util;
(function (util) {
    /**
     * 对话控件管理器
     */
    var ChatMgr = (function () {
        function ChatMgr() {
        }
        ChatMgr.createAi = function () {
            var ai;
            if (this._aiPool && this._aiPool.length > 0) {
                ai = this._aiPool.shift();
            }
            else {
                ai = new com.ComChat();
            }
            return ai;
        };
        ChatMgr.removeAi = function (ai) {
            gTween.rmTweens(ai);
            gComMgr.rmObj(ai);
            this._aiPool.push(ai);
        };
        return ChatMgr;
    }());
    /** 所有对话 */
    ChatMgr.chats = (_a = {},
        _a[gConst.itemIdByType[0 /* WHOLE */]] = [
            new data.ChatData(1, 0 /* TEXT */, "text1"),
            new data.ChatData(-1, 0 /* TEXT */, "text2"),
            new data.ChatData(1, 0 /* TEXT */, "text3"),
            new data.ChatData(1, 1 /* PIC */, "text")
        ],
        _a[gConst.itemIdByType[1 /* BRACELET */]] = [
            new data.ChatData(-1, 1 /* PIC */, "text", gConst.itemIdByType[1 /* BRACELET */]),
            new data.ChatData(-1, 0 /* TEXT */, "text1", gConst.itemIdByType[1 /* BRACELET */]),
            new data.ChatData(1, 0 /* TEXT */, "text2", gConst.itemIdByType[1 /* BRACELET */])
        ],
        _a[gConst.itemIdByType[2 /* COLLAR */]] = [
            new data.ChatData(-1, 1 /* PIC */, "text", gConst.itemIdByType[2 /* COLLAR */]),
            new data.ChatData(-1, 0 /* TEXT */, "text1", gConst.itemIdByType[2 /* COLLAR */]),
            new data.ChatData(1, 0 /* TEXT */, "text2", gConst.itemIdByType[2 /* COLLAR */])
        ],
        _a[gConst.itemIdByType[3 /* EYE */]] = [
            new data.ChatData(-1, 1 /* PIC */, "text", gConst.itemIdByType[3 /* EYE */]),
            new data.ChatData(-1, 0 /* TEXT */, "text1", gConst.itemIdByType[3 /* EYE */]),
            new data.ChatData(1, 0 /* TEXT */, "text2", gConst.itemIdByType[3 /* EYE */])
        ],
        _a[gConst.itemIdByType[4 /* FULL */]] = [
            new data.ChatData(1, 0 /* TEXT */, "text1", gConst.itemIdByType[4 /* FULL */]),
            new data.ChatData(-1, 0 /* TEXT */, "text2", gConst.itemIdByType[4 /* FULL */])
        ],
        _a);
    ChatMgr._aiPool = [];
    util.ChatMgr = ChatMgr;
    __reflect(ChatMgr.prototype, "util.ChatMgr");
    var _a;
})(util || (util = {}));
//# sourceMappingURL=ChatMgr.js.map