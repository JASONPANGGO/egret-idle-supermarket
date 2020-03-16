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
     * 结束页面（失败）
     */
    var UiEndFail = (function (_super) {
        __extends(UiEndFail, _super);
        function UiEndFail() {
            var _this = _super.call(this) || this;
            _this.skinName = skins.UiEndFail;
            return _this;
        }
        /* =========== 框架结构代码-start =========== */
        /**
         * 初始化
         * @param {any[]} args open()传参会通过init()传过去
         */
        UiEndFail.prototype.init = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // console.info("init", ...args);
        };
        /** 首次打开界面时调用 */
        UiEndFail.prototype.load = function () {
            // console.info("load");
        };
        /** 每次打开界面都会调用 */
        UiEndFail.prototype.start = function () {
            // console.info("start");
            gSoundMgr.playEff("smtimeout");
            // if (GameMgr.endType == gConst.endType.VICTORY) {
            // 	this.createCaiDais();
            // }
        };
        /** 每次结束界面都会调用 */
        UiEndFail.prototype.stop = function () {
            // console.info("stop");
        };
        /** 监听界面，每帧都会调用 */
        UiEndFail.prototype.update = function () {
            // console.info("update");
        };
        /** 注册事件 */
        UiEndFail.prototype.addEvent = function () {
            // console.info("addEvent");
            if (!gConst.globalClick) {
                this.btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickInstall, this);
            }
            else {
                this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickInstall, this);
            }
            if (GameMgr.isShowReplay()) {
                this.replay.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickReplay, this);
            }
        };
        /** 移除事件 */
        UiEndFail.prototype.removeEvent = function () {
            // console.info("removeEvent");
            if (!gConst.globalClick) {
                this.btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickInstall, this);
            }
            else {
                this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickInstall, this);
            }
            if (GameMgr.isShowReplay()) {
                this.replay.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickReplay, this);
            }
        };
        /** 窗口大小改变时调用 */
        UiEndFail.prototype.resizeView = function () {
            // console.info("resizeView", this.width, this.height);
            // var s1: number = this.width / this.con.width;
            // var s2: number = this.height / this.con.height;
            // this.con.scaleX = this.con.scaleY = Math.max(s1, s2);
            var conPeople = this.conPeople;
            var conBtn = this.conBtn;
            var baseScale = gConst.mobileByScale[GameMgr.screenType][GameMgr.mobileType];
            conPeople.scaleX = conPeople.scaleY = baseScale;
            conBtn.scaleX = conBtn.scaleY = baseScale;
            if (this.screenType == 1 /* VERTICAL */) {
                //竖屏
                // this.con.y = Math.floor(this.height * .75);
                // this.conLogo.y = Math.floor(this.height * .3);
                this.conPeople.scaleX = this.conPeople.scaleY = .9;
                switch (this.mobileType) {
                    //iPhoneX或以上
                    case 1 /* IPHONE_X */:
                        this.conPeople.scaleX = this.conPeople.scaleY = 1;
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
                this.conPeople.scaleX = this.conPeople.scaleY = 1;
                switch (this.mobileType) {
                    //iPhoneX或以上
                    case 1 /* IPHONE_X */:
                        conPeople.verticalCenter = "-38%";
                        break;
                    //iPhone8或以下
                    case 2 /* IPHONE_8 */:
                        conPeople.verticalCenter = "-40%";
                        break;
                    //iPad或其它
                    case 3 /* IPAD */:
                        conPeople.verticalCenter = "-28%";
                        break;
                }
            }
        };
        /** 屏幕横竖屏转换时调用 */
        UiEndFail.prototype.rotateView = function () {
            // console.info("rotateView", this.screenType);
            var conPeople = this.conPeople;
            var conBtn = this.conBtn;
            if (this.screenType == 1 /* VERTICAL */) {
                //竖屏
                conPeople.verticalCenter = "-8%";
                conBtn.bottom = "18%";
            }
            else {
                //横屏
                conBtn.bottom = "6%";
            }
        };
        /* =========== 框架结构代码-end =========== */
        /* =========== 业务代码-start =========== */
        // private showLine() {
        // 	gTween.toBigShow(this.conLine, 300, 1.5, 1, void 0, void 0, {
        // 		callback: () => {
        // 			gTween.loopRotate(this.line0, 1, 7200);
        // 			gTween.loopRotate(this.line1, -1, 7200);
        // 		}
        // 	});
        // }
        // private particle: com.ComParticle;
        // private showParticle() {
        // 	if (!this.particle) {
        // 		this.particle = new com.ComParticle();
        // 		this.particle.setData(this.conLine, "star_2");
        // 		// this.particle.setIndex(1);
        // 		this.particle.setPos(this.conLine.width / 2, this.conLine.height / 2);
        // 	}
        // 	this.particle.start(500);
        // 	egret.setTimeout(this.showParticle, this, 1500);
        // }
        UiEndFail.prototype.showBlack = function () {
            gTween.fadeIn(this.black, 100, 1);
        };
        UiEndFail.prototype.hideBlack = function () {
            gTween.fadeOut(this.black, 50, 1);
        };
        UiEndFail.prototype.toTopShow = function (item, callback, thisObj) {
            var arg = [];
            for (var _i = 3; _i < arguments.length; _i++) {
                arg[_i - 3] = arguments[_i];
            }
            gTween.toTopShow(item, 800, void 0, void 0, 1, egret.Ease.elasticOut, void 0, {
                callback: function () {
                    if (callback) {
                        callback.call.apply(callback, [thisObj].concat(arg));
                    }
                    ;
                }
            });
        };
        UiEndFail.prototype.toBottomShow = function (item, callback, thisObj) {
            var arg = [];
            for (var _i = 3; _i < arguments.length; _i++) {
                arg[_i - 3] = arguments[_i];
            }
            gTween.toBottomShow(item, 800, void 0, void 0, 1, egret.Ease.elasticOut, void 0, {
                callback: function () {
                    if (callback) {
                        callback.call.apply(callback, [thisObj].concat(arg));
                    }
                    ;
                }
            });
        };
        // private showLogo() {
        // 	this.toTopShow(this.logo/*, () => {
        // 		//发光
        // 		this.showLine();
        // 		//粒子
        // 		this.showParticle();
        // 	}*/);
        // }
        UiEndFail.prototype.showBtn = function () {
            this.toTopShow(this.btn /*, gTween.yoyoBtn, gTween, this.btn*/);
            this.btn.open();
        };
        UiEndFail.prototype.showLogoBtn = function () {
            this.conBtn.visible = true;
            // this.showLogo();
            this.showBtn();
            if (GameMgr.isShowReplay()) {
                this.toTopShow(this.replay);
            }
        };
        UiEndFail.prototype.createPeople = function () {
            var people = new com.ComBones();
            people.setData(this.conPeople, "e_people");
            people.play("fail", 0);
        };
        UiEndFail.prototype.showPeople = function () {
            this.toBottomShow(this.people);
        };
        /** 显示界面 */
        UiEndFail.prototype.show = function () {
            //初始化
            if (GameMgr.endType == 1 /* VICTORY */) {
            }
            else {
            }
            this.showBlack();
        };
        /** 其它元素展示 */
        UiEndFail.prototype.showOther = function () {
            // gSoundMgr.changeBg("bm_ending");
            this.gameEnd();
            // this.conBg.visible = true;
            // gTween.toScale(this.conBg, 1, 1000, 3, egret.Ease.cubicOut, void 0, {
            // 	callback: () => {
            // 		this.createPeople();
            // 		this.showLogoBtn();
            // 	}
            // });
            this.showPeople();
            this.showLogoBtn();
            // gTween.yoyoBtn(this.btn);
        };
        /** 隐藏界面 */
        UiEndFail.prototype.hide = function () {
            this.black.visible = false;
            this.people.visible = false;
            this.conBtn.visible = false;
            this.btn.visible = false;
            this.replay.visible = false;
        };
        return UiEndFail;
    }(ui.UiFile));
    ui.UiEndFail = UiEndFail;
    __reflect(UiEndFail.prototype, "ui.UiEndFail");
})(ui || (ui = {}));
//# sourceMappingURL=UiEndFail.js.map