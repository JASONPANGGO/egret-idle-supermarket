var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var com;
(function (com) {
    /**
     * 对话控件
     */
    var ComChat = (function (_super) {
        __extends(ComChat, _super);
        function ComChat() {
            var _this = _super.call(this) || this;
            _this.skinName = skins.ComChat;
            return _this;
        }
        /* =========== 框架结构代码-start =========== */
        /**
         * 初始化
         * @param {any[]} args 构建传参会通过init()传过去
         */
        ComChat.prototype.init = function (data) {
            // console.info("init", ...args);
            this.data = data;
        };
        /** 首次创建组件时调用 */
        ComChat.prototype.load = function () {
            // console.info("load");
            var chat = this.chat;
            var hand = this.hand;
            hand.visible = false;
            chat.visible = false;
            this.render();
        };
        /** 每次创建组件都会调用 */
        ComChat.prototype.start = function () {
            // console.info("start");
        };
        /** 每次结束组件都会调用 */
        ComChat.prototype.stop = function () {
            // console.info("stop");
        };
        /** 监听组件，每帧都会调用 */
        ComChat.prototype.update = function () {
            // console.info("update");
        };
        /** 注册事件 */
        ComChat.prototype.addEvent = function () {
            // console.info("addEvent");
        };
        /** 移除事件 */
        ComChat.prototype.removeEvent = function () {
            // console.info("removeEvent");
        };
        /** 窗口大小改变时调用 */
        ComChat.prototype.resizeView = function (event) {
            // console.info("resizeView", event, GameMgr.gameview.width, GameMgr.gameview.height);
            if (GameMgr.screenType == 1 /* VERTICAL */) {
                //竖屏
                switch (GameMgr.mobileType) {
                    //iPhoneX或以上
                    case 1 /* IPHONE_X */:
                        break;
                    //iPhone8或以下
                    case 2 /* IPHONE_8 */:
                        break;
                    //iPad或其它
                    case 3 /* IPAD */:
                        break;
                }
            }
            else {
                //横屏
                switch (GameMgr.mobileType) {
                    //iPhoneX或以上
                    case 1 /* IPHONE_X */:
                        break;
                    //iPhone8或以下
                    case 2 /* IPHONE_8 */:
                        break;
                    //iPad或其它
                    case 3 /* IPAD */:
                        break;
                }
            }
        };
        /** 屏幕横竖屏转换时调用 */
        ComChat.prototype.rotateView = function (event) {
            // console.info("rotateView", event, GameMgr.screenType, GameMgr.mobileType);
            if (GameMgr.screenType == 1 /* VERTICAL */) {
            }
            else {
            }
        };
        /* =========== 框架结构代码-end =========== */
        /* =========== 业务代码-start =========== */
        ComChat.prototype.render = function () {
            var data = this.data;
            if (!data) {
                return;
            }
            var speakerId = data.speakerId;
            var type = data.type;
            var later = data.later;
            var itemType = data.itemType;
            var hand = this.hand;
            var con = this.con;
            var chat = this.chat;
            var before;
            var diffX;
            var handSpase;
            if (type === 0 /* TEXT */) {
                before = "lang";
                diffX = 0;
                chat.source = before + "_" + itemType + later + "_png";
            }
            else {
                before = "pic";
                diffX = 25;
                chat.source = "" + before + itemType + "_" + later + "_png";
            }
            gComMgr.setObjSize(chat, true);
            gComMgr.setObjSize(con, true);
            if (speakerId === 1) {
                //左边（对方对话）
                gComMgr.setObjAnchor(hand);
                // hand.visible = true;
                chat.anchorOffsetX = 0;
                chat.x = diffX;
                handSpase = 15;
                con.x = hand.x + (hand.width - hand.anchorOffsetX) * hand.scaleX + handSpase;
            }
            else {
                //右边（我方对话）
                // hand.visible = false;
                chat.anchorOffsetX = chat.width;
                chat.x = (chat.width - diffX) * chat.scaleX;
                handSpase = 0;
                con.x = handSpase;
            }
        };
        ComChat.prototype.showChat = function (callback, thisObj) {
            var callArg = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                callArg[_i - 2] = arguments[_i];
            }
            var data = this.data;
            if (!data) {
                return;
            }
            var speakerId = data.speakerId;
            var hand = this.hand;
            var chat = this.chat;
            if (speakerId === 1) {
                //左边（对方对话）
                gTween.fadeIn(hand, 100, 1);
                gSoundMgr.stopEff("smtextboy");
                gSoundMgr.playEff("smtextboy");
            }
            else {
                //右边（我方对话）
                gSoundMgr.stopEff("smtextplayer");
                gSoundMgr.playEff("smtextplayer");
            }
            gTween.toBigShow(chat, 200, 1, 1, void 0, void 0, {
                callback: callback, thisObj: thisObj, params: callArg
            });
        };
        return ComChat;
    }(com.ComFile));
    com.ComChat = ComChat;
    __reflect(ComChat.prototype, "com.ComChat");
})(com || (com = {}));
//# sourceMappingURL=ComChat.js.map