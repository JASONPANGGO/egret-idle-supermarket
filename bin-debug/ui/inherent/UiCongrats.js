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
     * 恭喜页面
     */
    var UiCongrats = (function (_super) {
        __extends(UiCongrats, _super);
        function UiCongrats() {
            var _this = _super.call(this) || this;
            _this.moneyId = 0;
            _this.skinName = skins.UiCongrats;
            return _this;
        }
        /* =========== 框架结构代码-start =========== */
        /**
         * 初始化
         * @param {any[]} args open()传参会通过init()传过去
         */
        UiCongrats.prototype.init = function (notClose, moneyId) {
            if (moneyId === void 0) { moneyId = 0; }
            // console.info("init", ...args);
            this.notClose = notClose;
            this.moneyId = moneyId;
        };
        /** 首次打开界面时调用 */
        UiCongrats.prototype.load = function () {
            // console.info("load");
            // this.word.visible = false;
            // this.comBoxEnd.open("congrats");
        };
        /** 每次打开界面都会调用 */
        UiCongrats.prototype.start = function () {
            // console.info("start");
            gSoundMgr.playEff("smmoney");
            var con = this.con;
            var txtMoney = this.txtMoney;
            var conBtn = this.conBtn;
            var btn = this.btn;
            con.visible = false;
            txtMoney.visible = false;
            conBtn.visible = false;
            btn.visible = false;
            this.showBlack();
            this.showBox();
            // this.showWord();
            // this.showBtn();
            this.showCon();
        };
        /** 每次结束界面都会调用 */
        UiCongrats.prototype.stop = function () {
            // console.info("stop");
        };
        /** 监听界面，每帧都会调用 */
        UiCongrats.prototype.update = function () {
            // console.info("update");
        };
        /** 注册事件 */
        UiCongrats.prototype.addEvent = function () {
            // console.info("addEvent");
            // this.btn.once(egret.TouchEvent.TOUCH_TAP, this.clickBtn, this);
            this.conBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickItem, this);
        };
        /** 移除事件 */
        UiCongrats.prototype.removeEvent = function () {
            // console.info("removeEvent");
            this.conBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickItem, this);
        };
        /** 窗口大小改变时调用 */
        UiCongrats.prototype.resizeView = function () {
            // console.info("resizeView", this.width, this.height);
            // var s1: number = this.width / this.con.width;
            // var s2: number = this.height / this.con.height;
            var con = this.con;
            var baseScale = gConst.mobileByScale[GameMgr.screenType][GameMgr.mobileType];
            var conDiffS = 1;
            // con.scaleX = con.scaleY = Math.max(s1, s2);
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
                        conDiffS = .85;
                        break;
                }
                con.scaleX = con.scaleY = baseScale * conDiffS;
                con.x = gMath.keepDecimal((-(con.width / 2 - con.anchorOffsetX) * con.scaleX) + this.width * .5, 0);
                con.y = gMath.keepDecimal((-(con.height / 2 - con.anchorOffsetY) * con.scaleY) + this.height * .5, 0);
            }
            else {
                //横屏
                switch (this.mobileType) {
                    //iPhoneX或以上
                    case 1 /* IPHONE_X */:
                        conDiffS = .85;
                        break;
                    //iPhone8或以下
                    case 2 /* IPHONE_8 */:
                        conDiffS = .85;
                        break;
                    //iPad或其它
                    case 3 /* IPAD */:
                        conDiffS = .85;
                        break;
                }
                con.scaleX = con.scaleY = baseScale * conDiffS;
                con.x = gMath.keepDecimal((-(con.width / 2 - con.anchorOffsetX) * con.scaleX) + this.width * .75, 0);
                con.y = gMath.keepDecimal((-(con.height / 2 - con.anchorOffsetY) * con.scaleY) + this.height * .5, 0);
            }
        };
        /** 屏幕横竖屏转换时调用 */
        UiCongrats.prototype.rotateView = function () {
            // console.info("rotateView", this.screenType);
            // const con = this.con;
            if (this.screenType == 1 /* VERTICAL */) {
            }
            else {
            }
        };
        /* =========== 框架结构代码-end =========== */
        /* =========== 业务代码-start =========== */
        UiCongrats.prototype.showBlack = function () {
            gTween.fadeIn(this.black, 300);
        };
        UiCongrats.prototype.hideBlack = function () {
            gTween.fadeOut(this.black, 300);
        };
        UiCongrats.prototype.showBox = function () {
            var con = this.con;
            var box = this.box;
            if (!box) {
                // gSoundMgr.playEff("sm_tanchu");
                // gSoundMgr.playEff("sm_menglu");
                box = this.box = new com.ComBones();
                box.setData(con, "lang_hongbao" /* , { aimType: 0, time: 100 } */);
                // box.setPoint({ x: con.width / 2, y: con.height });
                box.setIndex(0);
            }
            box.play("outside", 0, true);
            this.openBoxed = false;
            this.once(egret.TouchEvent.TOUCH_TAP, this.openBox, this);
            this.openBoxDelay = egret.setTimeout(this.openBox, this, gConst.autoOpenRedPakeTime);
        };
        UiCongrats.prototype.openBox = function (e) {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.openBox, this);
            egret.clearTimeout(this.openBoxDelay);
            if (this.openBoxed) {
                return;
            }
            this.openBoxed = true;
            var box = this.box;
            var txtMoney = this.txtMoney;
            var conBtn = this.conBtn;
            var btn = this.btn;
            if (!box) {
                return;
            }
            box.play("inside");
            var moneyId = this.moneyId;
            txtMoney.visible = true;
            gSoundMgr.playEff("smmoney" + moneyId + "_1");
            var money = GameMgr.getConfig("redPackMeney" + moneyId);
            txtMoney.text = money + "";
            conBtn.visible = true;
            gTween.toBigShow(btn, 200, 1, 1, void 0, void 0, {
                callback: function () {
                    gTween.yoyoBtn(btn);
                }
            });
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.openBox, this);
            GameMgr.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickCon, this, true);
        };
        UiCongrats.prototype.clickCon = function (e) {
            if (!this.notClose) {
                this.hideCon(e);
            }
            else {
                this.clickInstall();
            }
        };
        UiCongrats.prototype.hideBox = function () {
            // this.box.playComplete();
        };
        /** 显示文字 */
        // private showWord() {
        // 	gTween.toBigShow(this.word, 200, 1, void 0, egret.Ease.backOut, void 0, {
        // 		callback: this.floatWord,
        // 		thisObj: this,
        // 		params: [this.word, -20, 1000]
        // 	});
        // }
        UiCongrats.prototype.showCon = function () {
            // gTween.toBigShow(this.con, 200, 1, void 0, egret.Ease.cubicOut, void 0, { callback: this.showConFinish, thisObj: this });
            this.con.visible = true;
            // this.comBoxEnd.initPass();
            // if (GameMgr.passId >= GameMgr.maxPassId) {
            // 	this.createSuiPians();
            // 	this.dispatchEventWith(gConst.eventType.GAME_END);
            // 	this.comBoxEnd.turnFan();
            // } else {
            // 	this.comBoxEnd.once(gConst.eventType.IN_COMPLETE, this.showConFinish, this);
            // }
            // this.comBoxEnd.playShow();
        };
        UiCongrats.prototype.hideCon = function (event) {
            var _this = this;
            // if (event) {
            // 	event.stopPropagation();
            // 	// gSoundMgr.playEff("sm_select");
            // }
            GameMgr.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickCon, this, true);
            // egret.clearTimeout(this.hideConDelay);
            var con = this.con;
            // this.comBoxEnd.hideEff();
            // gTween.toSmallHide(this.con, 200, 1, void 0, void 0, void 0, { callback: this.close, thisObj: this });
            var baseScale = gConst.mobileByScale[this.screenType][this.mobileType];
            gTween.toBigHide(con, 2, 300, baseScale, 1, void 0, void 0, {
                callback: function () {
                    _this.close();
                }
            });
        };
        UiCongrats.prototype.clickItem = function (e) {
            Mapi.sendAction(4);
        };
        return UiCongrats;
    }(ui.UiFile));
    ui.UiCongrats = UiCongrats;
    __reflect(UiCongrats.prototype, "ui.UiCongrats");
})(ui || (ui = {}));
//# sourceMappingURL=UiCongrats.js.map