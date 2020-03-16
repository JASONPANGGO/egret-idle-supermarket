namespace util {
    /**
     * 对话控件管理器
     */
    export class ChatMgr {

        /** 所有对话 */
        public static chats: {
        } = {
            [gConst.itemIdByType[gConst.itemId.WHOLE]]: [
                new data.ChatData(1, gConst.chatType.TEXT, "text1"),
                new data.ChatData(-1, gConst.chatType.TEXT, "text2"),
                new data.ChatData(1, gConst.chatType.TEXT, "text3"),
                new data.ChatData(1, gConst.chatType.PIC, "text")
            ],
            [gConst.itemIdByType[gConst.itemId.BRACELET]]: [
                new data.ChatData(-1, gConst.chatType.PIC, "text", gConst.itemIdByType[gConst.itemId.BRACELET]),
                new data.ChatData(-1, gConst.chatType.TEXT, "text1", gConst.itemIdByType[gConst.itemId.BRACELET]),
                new data.ChatData(1, gConst.chatType.TEXT, "text2", gConst.itemIdByType[gConst.itemId.BRACELET])
            ],
            [gConst.itemIdByType[gConst.itemId.COLLAR]]: [
                new data.ChatData(-1, gConst.chatType.PIC, "text", gConst.itemIdByType[gConst.itemId.COLLAR]),
                new data.ChatData(-1, gConst.chatType.TEXT, "text1", gConst.itemIdByType[gConst.itemId.COLLAR]),
                new data.ChatData(1, gConst.chatType.TEXT, "text2", gConst.itemIdByType[gConst.itemId.COLLAR])
            ],
            [gConst.itemIdByType[gConst.itemId.EYE]]: [
                new data.ChatData(-1, gConst.chatType.PIC, "text", gConst.itemIdByType[gConst.itemId.EYE]),
                new data.ChatData(-1, gConst.chatType.TEXT, "text1", gConst.itemIdByType[gConst.itemId.EYE]),
                new data.ChatData(1, gConst.chatType.TEXT, "text2", gConst.itemIdByType[gConst.itemId.EYE])
            ],
            [gConst.itemIdByType[gConst.itemId.FULL]]: [
                new data.ChatData(1, gConst.chatType.TEXT, "text1", gConst.itemIdByType[gConst.itemId.FULL]),
                new data.ChatData(-1, gConst.chatType.TEXT, "text2", gConst.itemIdByType[gConst.itemId.FULL])
            ],
        };

        public constructor() {

        }

        private static _aiPool: com.ComChat[] = [];

        public static createAi() {
            let ai: com.ComChat;
            if (this._aiPool && this._aiPool.length > 0) {
                ai = this._aiPool.shift();
            } else {
                ai = new com.ComChat();
            }
            return ai;
        }

        public static removeAi(ai: com.ComChat) {
            gTween.rmTweens(ai);
            gComMgr.rmObj(ai);
            this._aiPool.push(ai);
        }
    }
}