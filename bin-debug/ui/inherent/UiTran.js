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
     * 过场页面
     */
    var UiTran = (function (_super) {
        __extends(UiTran, _super);
        function UiTran() {
            var _this = _super.call(this) || this;
            _this.isUiFirstLimit = false; //是否受UiFirstView限制  默认为true:保证 UiFirstView 在最顶层，false: 打开放最顶层
            _this.skinName = skins.UiTran;
            return _this;
        }
        /* =========== 框架结构代码-start =========== */
        /**
         * 初始化
         * @param {any[]} args open()传参会通过init()传过去
         */
        UiTran.prototype.init = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // console.info("init", ...args);
        };
        /** 首次打开界面时调用 */
        UiTran.prototype.load = function () {
            // console.info("load");
            // const bg = this.bg;
            var conColorBar = this.conColorBar;
            var colorBar = this.colorBar;
            var conWord = this.conWord;
            var word = this.word;
            gComMgr.setItemAnchor(colorBar, true, false);
            colorBar.width += colorBar.height * 4;
            colorBar.anchorOffsetX = colorBar.width / 2;
            gComMgr.setItemAnchor(word);
            // gComMgr.setItemAnchor(bg);
        };
        /** 每次打开界面都会调用 */
        UiTran.prototype.start = function () {
            // console.info("start");
            // const con = this.con;
            var colorBar = this.colorBar;
            this.closed = false;
            // this.showBlack();
            // this.showBg(() => {
            // 	this.dispatchEventWith(gConst.eventType.IN_COMPLETE);
            // });
            // this.closeDelay = egret.setTimeout(this.close, this, gConst.closeTranTimer);
            // this.light.visible = false;
            // this.showLight();
            this.playAniOutComplete = false;
            this.playParticlesComplete = false;
            this.playEnd = false;
            // let bones = this.bones;
            // if (!bones) {
            // 	bones = this.bones = new com.ComBones();
            // 	bones.setData(con, "lang_VIP"/*, true*/);
            // }
            // const aimName: string = GameMgr.screenType == gConst.screenType.VERTICAL ? "heng" : "shu";
            // const aimName: string = "shu";
            // bones.create();
            // bones.armatureDisplay.once(dragonBones.EgretEvent.FRAME_EVENT, this.onFrameEvent, this);
            // bones.armatureDisplay.once(egret.Event.COMPLETE, this.playComplete, this);
            // bones.play(aimName);
            colorBar.visible = false;
            this.playAniIn();
        };
        /** 每次结束界面都会调用 */
        UiTran.prototype.stop = function () {
            // console.info("stop");
        };
        /** 监听界面，每帧都会调用 */
        UiTran.prototype.update = function () {
            // console.info("update");
        };
        /** 注册事件 */
        UiTran.prototype.addEvent = function () {
            // console.info("addEvent");
            // this.once(egret.TouchEvent.TOUCH_TAP, this.close, this);
        };
        /** 移除事件 */
        UiTran.prototype.removeEvent = function () {
            // console.info("removeEvent");
            // this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
        };
        /** 窗口大小改变时调用 */
        UiTran.prototype.resizeView = function () {
            // console.info("resizeView", this.width, this.height);
            // var s1: number = this.width / this.con.width;
            // var s2: number = this.height / this.con.height;
            // this.con.scaleX = this.con.scaleY = Math.max(s1, s2);
            // const con = this.con;
            var conColorBar = this.conColorBar;
            var colorBar = this.colorBar;
            var baseScale = gConst.mobileByScale[this.screenType][this.mobileType];
            // con.scaleX = con.scaleY = Math.max(this.width / con.width, this.height / con.height);
            colorBar.width = this.width + conColorBar.height * 4;
            colorBar.anchorOffsetX = colorBar.width / 2;
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
        UiTran.prototype.rotateView = function () {
            // console.info("rotateView", this.screenType);
            // const bones = this.bones;
            var conColorBar = this.conColorBar;
            var conWord = this.conWord;
            if (this.screenType == 1 /* VERTICAL */) {
                //竖屏
                // if (bones && !this.playEnd) {
                // 	bones.play("shu");
                // }
                conColorBar.verticalCenter = "-20%";
                conWord.verticalCenter = "-30%";
                conColorBar.rotation = -20;
            }
            else {
                //横屏
                // if (bones && !this.playEnd) {
                // 	bones.play("heng");
                // }
                conColorBar.verticalCenter = "-8%";
                conWord.verticalCenter = "-18%";
                conColorBar.rotation = -10;
            }
        };
        /* =========== 框架结构代码-end =========== */
        /* =========== 业务代码-start =========== */
        UiTran.prototype.playAniIn = function () {
            var conColorBar = this.conColorBar;
            var colorBar = this.colorBar;
            var word = this.word;
            gTween.toRightShow(colorBar, 300, -colorBar.width, conColorBar.width / 2, 1, void 0, { duration: 1000 }, {
                callback: this.playAniOut, thisObj: this
            });
            gTween.toSmallShow(word, 5, 200, 1, 1);
            this.showParticles();
            gSoundMgr.playEff("smwin");
        };
        UiTran.prototype.playAniOut = function () {
            var _this = this;
            var colorBar = this.colorBar;
            var word = this.word;
            gTween.toScaleY(colorBar, Math.max(this.height, this.width) / colorBar.height * 1.6, 300, 1, void 0, void 0, {
                callback: function () {
                    _this.dispatchEventWith(gConst.eventType.IN_COMPLETE);
                    gTween.fadeOut(colorBar, 200, 1, void 0, void 0, {
                        callback: function () {
                            _this.playAniOutComplete = true;
                            _this.close();
                        }
                    });
                }
            });
            gTween.fadeOut(word, 200);
        };
        // private showLight() {
        // 	gTween.fadeIn(this.light, 1000, 1, void 0, { duration: 50 }, {
        // 		callback: () => {
        // 			this.dispatchEventWith(gConst.eventType.IN_COMPLETE);
        // 			this.close();
        // 		}
        // 	});
        // }
        // private hideLight(callBack?: Function, thisObj?: any, ...params: any[]) {
        // 	gTween.fadeOut(this.light, 1000, 1, void 0, void 0, { callback: callBack, thisObj: thisObj, params: params });
        // }
        // private hideWord(callBack?: Function, thisObj?: any, ...params: any[]) {
        // 	gTween.fadeOut(this.light, 200, 1, void 0, void 0, { callback: callBack, thisObj: thisObj, params: params });
        // }
        UiTran.prototype.showBlack = function () {
            gTween.fadeIn(this.black, 100, 1);
        };
        UiTran.prototype.hideBlack = function (callBack, thisObj) {
            gTween.fadeOut(this.black, 50, 1, void 0, void 0, {
                callback: function () {
                    if (callBack) {
                        callBack.call(thisObj);
                    }
                }
            });
        };
        // private showBg(callBack?: Function, thisObj?: any) {
        // 	gTween.fadeIn(this.bg, 200, 1, void 0, void 0, {
        // 		callback: () => {
        // 			if (callBack) {
        // 				callBack.call(thisObj);
        // 			}
        // 		}
        // 	});
        // }
        // private hideBg(callBack?: Function, thisObj?: any) {
        // 	gTween.fadeOut(this.bg, 200, 1, void 0, void 0, {
        // 		callback: () => {
        // 			if (callBack) {
        // 				callBack.call(thisObj);
        // 			}
        // 		}
        // 	});
        // }
        /** 展示粒子 */
        UiTran.prototype.showParticles = function () {
            var _this = this;
            var duration = 1000;
            var delay = 10000;
            var particleId = this.createParticles(this.conParticles, ["streamer1", "streamer2", "streamer3", "streamer4", "streamer5", "streamer6", "streamer7", "streamer8"], "streamer");
            this.startParticle(particleId, duration);
            egret.setTimeout(function () {
                // this.stopParticle(particleId);
                egret.setTimeout(function () {
                    _this.playParticlesComplete = true;
                    _this.close();
                }, _this, delay);
            }, this, duration);
        };
        UiTran.prototype.playComplete = function (event) {
            this.playEnd = true;
            this.close();
        };
        UiTran.prototype.close = function (event) {
            // egret.clearTimeout(this.closeDelay);
            if (this.closed) {
                return;
            }
            if (!this.playAniOutComplete) {
                return;
            }
            if (!this.playParticlesComplete) {
                return;
            }
            this.closed = true;
            // this.dispatchEventWith(gConst.eventType.IN_COMPLETE);
            // this.hideLight(() => {
            // 	super.close();
            // });
            // this.hideBlack();
            // this.hideBg(() => {
            _super.prototype.close.call(this);
            // });
        };
        return UiTran;
    }(ui.UiFile));
    ui.UiTran = UiTran;
    __reflect(UiTran.prototype, "ui.UiTran");
})(ui || (ui = {}));
//# sourceMappingURL=UiTran.js.map