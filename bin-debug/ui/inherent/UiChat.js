var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ui;
(function (ui) {
    /**
     * 对话页面
     */
    var UiChat = (function (_super) {
        __extends(UiChat, _super);
        // private chatId: number;
        function UiChat() {
            var _this = _super.call(this) || this;
            _this.skinName = skins.UiChat;
            return _this;
        }
        /* =========== 框架结构代码-start =========== */
        /**
         * 初始化
         * @param {any[]} args open()传参会通过init()传过去
         */
        UiChat.prototype.init = function () {
            // console.info("init", ...args);
            // this.chatId = chatId;
        };
        /** 首次打开界面时调用 */
        UiChat.prototype.load = function () {
            // console.info("load");
            this.touchEnabled = this.touchChildren = false;
        };
        /** 每次打开界面都会调用 */
        UiChat.prototype.start = function () {
            // console.info("start");
            // this.chat.source = `p_word${this.chatId}_png`;
            this.showChat();
            // this.showPeople();
        };
        /** 每次结束界面都会调用 */
        UiChat.prototype.stop = function () {
            // console.info("stop");
        };
        /** 监听界面，每帧都会调用 */
        UiChat.prototype.update = function () {
            // console.info("update");
        };
        /** 注册事件 */
        UiChat.prototype.addEvent = function () {
            // console.info("addEvent");
        };
        /** 移除事件 */
        UiChat.prototype.removeEvent = function () {
            // console.info("removeEvent");
        };
        /** 窗口大小改变时调用 */
        UiChat.prototype.resizeView = function () {
            // console.info("resizeView", this.width, this.height);
            // var s1: number = this.width / this.con.width;
            // var s2: number = this.height / this.con.height;
            // this.con.scaleX = this.con.scaleY = Math.max(s1, s2);
            var baseScale = gConst.mobileByScale[this.screenType][this.mobileType];
            this.con.scaleX = this.con.scaleY = baseScale;
            if (this.screenType == 1 /* VERTICAL */) {
                //竖屏
                switch (this.mobileType) {
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
                switch (this.mobileType) {
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
        UiChat.prototype.rotateView = function () {
            // console.info("rotateView", this.screenType);
            if (this.screenType == 1 /* VERTICAL */) {
                //竖屏
                // this.con.height = 190;
                // this.conChat.horizontalCenter = 0;
                this.con.bottom = "15%";
            }
            else {
                //横屏
                // this.con.height = 94;
                // this.conChat.horizontalCenter = -140;
                this.con.bottom = "5%";
            }
        };
        UiChat.prototype.showChat = function () {
            if (this.showed) {
                this.hideChat(this.showChat, this);
            }
            else {
                // egret.setTimeout(() => {
                // gSoundMgr.playEff("sm_tanchu");
                // }, this, 200);
                this.showed = true;
                // gTween.toLeftShow(this.conChat, 500, 0, 1, egret.Ease.backOut);
                gTween.toTopShow(this.conChat, 500, void 0, 0, 1, egret.Ease.backOut /*, void 0, {
                    callback: this.floatChat,
                    thisObj: this,
                    params: [this.conChat]
                }*/);
            }
        };
        UiChat.prototype.hideChat = function (callback, thisObj) {
            if (!this.showed) {
                return;
            }
            this.showed = false;
            // gTween.toRightHide(this.conChat, 300, 1, 1, void 0, void 0, {
            // 	callback: callback,
            // 	thisObj: thisObj
            // });
            gTween.toBottomHide(this.conChat, 300, void 0, 1, 1, void 0, void 0, {
                callback: callback,
                thisObj: thisObj
            });
        };
        /** 文字漂浮 */
        UiChat.prototype.floatChat = function (item, targetY, duration) {
            if (targetY === void 0) { targetY = -30; }
            if (duration === void 0) { duration = 500; }
            gTween.loopFloat(item, targetY, duration);
        };
        UiChat.prototype.close = function () {
            var _this = this;
            this.hideChat(function () {
                _super.prototype.close.call(_this);
            });
            // this.hidePeople();
        };
        return UiChat;
    }(ui.UiFile));
    ui.UiChat = UiChat;
    __reflect(UiChat.prototype, "ui.UiChat");
})(ui || (ui = {}));
//# sourceMappingURL=UiChat.js.map