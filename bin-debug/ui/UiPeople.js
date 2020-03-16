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
     * 人物页面
     */
    var UiPeople = (function (_super) {
        __extends(UiPeople, _super);
        function UiPeople() {
            var _this = _super.call(this) || this;
            _this.wordId = 1;
            _this.skinName = skins.UiPeople;
            return _this;
        }
        /* =========== 框架结构代码-start =========== */
        /**
         * 初始化
         * @param {any[]} args open()传参会通过init()传过去
         */
        UiPeople.prototype.init = function (id, wordId) {
            if (id === void 0) { id = 1; }
            // console.info("init", ...args);
            this.lastId = this.id;
            this.id = id;
            if (wordId != void 0) {
                this.wordId = wordId;
            }
            this.updateRender();
        };
        /** 首次打开界面时调用 */
        UiPeople.prototype.load = function () {
            // console.info("load");
            // gComMgr.setImgSize(this.word);
            // gComMgr.setImgSize(this.btn);
            this.touchEnabled = this.touchChildren = false;
            this.people = new com.ComBones();
            this.people.setData(this.conPeople, "ppeople");
            this.people.setPos({ x: this.conPeople.width / 2, y: this.conPeople.height });
            this.people.setIndex(0);
            this.people.hide();
            this.conChat.visible = false;
            this.updateRender();
        };
        /** 每次打开界面都会调用 */
        UiPeople.prototype.start = function () {
            // console.info("start");
            // this.conBody.visible = false;
            this.show();
        };
        /** 每次结束界面都会调用 */
        UiPeople.prototype.stop = function () {
            // console.info("stop");
        };
        /** 监听界面，每帧都会调用 */
        UiPeople.prototype.update = function () {
            // console.info("update");
        };
        /** 注册事件 */
        UiPeople.prototype.addEvent = function () {
            // console.info("addEvent");
        };
        /** 移除事件 */
        UiPeople.prototype.removeEvent = function () {
            // console.info("removeEvent");
        };
        /** 窗口大小改变时调用 */
        UiPeople.prototype.resizeView = function () {
            // console.info("resizeView", this.width, this.height);
            // var s1: number = this.width / this.con.width;
            // var s2: number = this.height / this.con.height;
            // this.con.scaleX = this.con.scaleY = Math.max(s1, s2);
            var baseScale = gConst.mobileByScale[this.screenType][this.mobileType];
            var peopleS = 1;
            if (this.screenType == 1 /* VERTICAL */) {
                //竖屏
                this.con.width = 750 /* WIDTH */;
                switch (this.mobileType) {
                    //iPhoneX或以上
                    case 1 /* IPHONE_X */:
                        peopleS = 1.1;
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
                this.con.width = 1334 /* HEIGHT */;
                switch (this.mobileType) {
                    //iPhoneX或以上
                    case 1 /* IPHONE_X */:
                        peopleS = .9;
                        break;
                    //iPhone8或以下
                    case 2 /* IPHONE_8 */:
                        break;
                    //iPad或其它
                    case 3 /* IPAD */:
                        peopleS = 1.5;
                        break;
                }
            }
            this.con.scaleX = this.con.scaleY = this.width / this.con.width * baseScale;
            this.conPeople.scaleX = this.conPeople.scaleY = peopleS;
        };
        /** 屏幕横竖屏转换时调用 */
        UiPeople.prototype.rotateView = function () {
            // console.info("rotateView", this.screenType);
            if (this.screenType == 1 /* VERTICAL */) {
                //竖屏
                this.conBody.width = this.conBody.parent.width;
            }
            else {
                //横屏
                this.conBody.width = 1180;
            }
        };
        /* =========== 框架结构代码-end =========== */
        /* =========== 业务代码-start =========== */
        // private showBlack() {
        // 	gTween.fadeIn(this.black, 100);
        // }
        // private hideBlack() {
        // 	gTween.fadeOut(this.black, 50);
        // }
        // private showWord() {
        // 	gTween.toBottomShow(this.word, 300, 0, 1, egret.Ease.backOut);
        // }
        // private hideWord() {
        // 	gTween.toTopHide(this.word, 200, 0, 1);
        // }
        // private showBtn(callback?: Function, thisObj?: any) {
        // 	gTween.toTopShow(this.btn, 300, 320, 1, egret.Ease.backOut, void 0, { callback: callback, thisObj: thisObj });
        // }
        // private hideBtn(callback?: Function, thisObj?: any) {
        // 	gTween.toBottomHide(this.btn, 200, 320, 1, void 0, void 0, { callback: callback, thisObj: thisObj });
        // }
        UiPeople.prototype.updateRender = function () {
            if (!this.people) {
                return;
            }
            var id = this.id;
            var wordId = this.wordId;
            this.people.play("animation" + id, -1);
            this.word.source = "pword" + wordId + "_png";
            if (id == 2 || id == 3) {
                this.showChat();
            }
            else {
                this.hideChat();
            }
        };
        // private clickBtn(event: egret.TouchEvent) {
        // 	Mapi.sendAction(1);
        // }
        UiPeople.prototype.show = function () {
            // this.showBlack();
            // this.showWord();
            // this.showBtn(() => {
            // 	this.showGuide();
            // 	this.showFinish();
            // });
            this.showPeople();
        };
        UiPeople.prototype.showPeople = function () {
            if (this.id === this.lastId) {
                return;
            }
            if (this.showed) {
            }
            else {
                // egret.setTimeout(() => {
                // gSoundMgr.playEff("sm_tanchu");
                // }, this, 200);
                this.showed = true;
                gTween.toRightShow(this.conPeople, 500, void 0, this.conPeople.anchorOffsetX, 1, egret.Ease.quartOut, void 0, {
                    callback: this.showFinish,
                    thisObj: this,
                    params: [this.people]
                });
            }
        };
        UiPeople.prototype.hidePeople = function (callback, thisObj) {
            if (!this.showed) {
                return;
            }
            this.showed = false;
            gTween.toLeftHide(this.conPeople, 300, void 0, this.conPeople.anchorOffsetX, 1, void 0, void 0, {
                callback: callback,
                thisObj: thisObj
            });
        };
        UiPeople.prototype.showFinish = function () {
            // GameMgr.stage.once(egret.TouchEvent.TOUCH_TAP, this.hide, this);
            // // this.btn.once(egret.TouchEvent.TOUCH_TAP, this.clickBtn, this);
            // this.hideDelay = egret.setTimeout(this.hide, this, gConst.closeStartTimer);
        };
        UiPeople.prototype.showChat = function () {
            if (this.showChated) {
                this.hideChat(this.showChat, this);
            }
            else {
                // egret.setTimeout(() => {
                // gSoundMgr.playEff("sm_tanchu");
                // }, this, 200);
                this.showChated = true;
                // gTween.toLeftShow(this.conChat, 500, 0, 1, egret.Ease.backOut);
                gTween.showBubble(this.conChat, 500, { orgS: 1, orgA: 1 }, void 0, void 0, void 0, { isFloat: false });
            }
        };
        UiPeople.prototype.hideChat = function (callback, thisObj) {
            if (!this.showChated) {
                return;
            }
            this.showChated = false;
            // gTween.toRightHide(this.conChat, 300, 1, 1, void 0, void 0, {
            // 	callback: callback,
            // 	thisObj: thisObj
            // });
            gTween.hideBubble(this.conChat, 300, { orgS: 1, orgA: 1 }, callback, thisObj);
        };
        UiPeople.prototype.hide = function (isClose) {
            var _this = this;
            // if (event) {
            // 	event.stopPropagation();
            // 	// gSoundMgr.playEff("smbtn");
            // }
            // GameMgr.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.hide, this);
            // this.btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtn, this);
            // egret.clearTimeout(this.hideDelay);
            // this.hideGuide();
            // this.hideBlack();
            // this.hideWord();
            // this.hideBtn(this.close, this);
            this.hidePeople(function () {
                if (isClose) {
                    _this.close();
                }
            }, this);
            this.hideChat();
        };
        return UiPeople;
    }(ui.UiFile));
    ui.UiPeople = UiPeople;
    __reflect(UiPeople.prototype, "ui.UiPeople");
})(ui || (ui = {}));
//# sourceMappingURL=UiPeople.js.map