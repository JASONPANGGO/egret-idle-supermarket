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
     * 开场页面
     */
    var UiStart = (function (_super) {
        __extends(UiStart, _super);
        function UiStart() {
            var _this = _super.call(this) || this;
            _this.chatId = 1; //对话内容ID
            _this.firstTouch = true;
            _this.flyScale = 1; //飞行倍速
            _this.skinName = skins.UiStart;
            return _this;
        }
        /* =========== 框架结构代码-start =========== */
        /**
         * 初始化
         * @param {any[]} args open()传参会通过init()传过去
         */
        UiStart.prototype.init = function (chatId) {
            if (chatId === void 0) { chatId = 1; }
            // console.info("init", ...args);
            this.chatId = chatId;
        };
        /** 首次打开界面时调用 */
        UiStart.prototype.load = function () {
            // console.info("load");
            // const btn = this.btn;
            // gComMgr.setImgSize(btn);
            this.orgIdx = this.parent.getChildIndex(this);
        };
        /** 每次打开界面都会调用 */
        UiStart.prototype.start = function () {
            // console.info("start");
            var con = this.con;
            var conWord = this.conWord;
            var word = this.word;
            var btnTips = this.btnTips;
            var black = this.black;
            con.visible = false;
            conWord.visible = false;
            btnTips.visible = false;
            black.visible = false;
            var isInitParent = true;
            switch (this.chatId) {
                case 1:
                    word.source = "lang_gword1_png";
                    break;
                case 2:
                    word.source = "lang_pword_png";
                    break;
                case 3:
                    word.source = "lang_eword_png";
                    isInitParent = false;
                    break;
            }
            gComMgr.setObjSize(word, isInitParent);
            if (isInitParent) {
                gComMgr.setObjSize(conWord, true);
            }
            // this.show();
            // this.showWord();
            // this.updateItems();
            // this.initPeople();
            this.showPeople();
            this.showWord();
            if (this.chatId == 3) {
                this.showBlack();
            }
            this.showGuide();
        };
        /** 每次结束界面都会调用 */
        UiStart.prototype.stop = function () {
            // console.info("stop");
        };
        /** 监听界面，每帧都会调用 */
        UiStart.prototype.update = function () {
            // console.info("update");
        };
        /** 注册事件 */
        UiStart.prototype.addEvent = function () {
            // console.info("addEvent");
            if (this.chatId != 3) {
                GameMgr.stage.once(egret.TouchEvent.TOUCH_TAP, this.hide, this, true);
            }
        };
        /** 移除事件 */
        UiStart.prototype.removeEvent = function () {
            // console.info("removeEvent");
            GameMgr.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.hide, this, true);
        };
        /** 窗口大小改变时调用 */
        UiStart.prototype.resizeView = function () {
            // console.info("resizeView", this.width, this.height);
            // var s1: number = this.width / this.con.width;
            // var s2: number = this.height / this.con.height;
            // this.con.scaleX = this.con.scaleY = Math.max(s1, s2);
            var conPeople = this.conPeople;
            var gWord = this.gWord;
            var baseScale = gConst.mobileByScale[this.screenType][this.mobileType];
            conPeople.scaleX = conPeople.scaleY = baseScale;
            gWord.scaleX = gWord.scaleY = baseScale;
            this.flyConParticle();
            // this.flyParticlComplete();
            if (this.screenType == 1 /* VERTICAL */) {
                //竖屏
                // conPeople.scaleX = conPeople.scaleY = baseScale;
                if (this.parent && this.chatId != 3) {
                    this.parent.setChildIndex(this, this.orgIdx);
                }
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
                conPeople.left = -100 * conPeople.scaleX;
                conPeople.bottom = 0 * conPeople.scaleX;
                gWord.left = 220 * gWord.scaleX;
                gWord.bottom = 460 * gWord.scaleX;
            }
            else {
                //横屏
                // conPeople.scaleX = conPeople.scaleY = baseScale * .9;
                if (this.parent && this.chatId != 3) {
                    // this.parent.addChild(this);
                    this.parent.setChildIndex(this, this.parent.numChildren - 1);
                }
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
                conPeople.left = -110 * conPeople.scaleX;
                conPeople.bottom = -234 * conPeople.scaleX;
                gWord.left = 250 * gWord.scaleX;
                gWord.bottom = 250 * gWord.scaleX;
            }
        };
        /** 屏幕横竖屏转换时调用 */
        UiStart.prototype.rotateView = function () {
            // console.info("rotateView", this.screenType);
            if (this.screenType == 1 /* VERTICAL */) {
            }
            else {
            }
        };
        /* =========== 框架结构代码-end =========== */
        /* =========== 业务代码-start =========== */
        UiStart.prototype.showBlack = function () {
            gTween.fadeIn(this.black, 100);
        };
        UiStart.prototype.hideBlack = function () {
            gTween.fadeOut(this.black, 50);
        };
        UiStart.prototype.initPeople = function () {
        };
        UiStart.prototype.showPeople = function () {
            var people = this.people;
            gTween.toRightShow(people, 300, void 0, 0, 1);
        };
        UiStart.prototype.hidePeople = function (callback, thisObj) {
            var people = this.people;
            gTween.toLeftHide(people, 300, void 0, 0, 1, egret.Ease.backIn, void 0, {
                callback: function () {
                    if (callback) {
                        callback.call(thisObj);
                    }
                }
            });
        };
        UiStart.prototype.showWord = function () {
            var conWord = this.conWord;
            var btnTips = this.btnTips;
            gTween.toTopShow(conWord, 300, void 0, conWord.anchorOffsetY, 1);
            if (this.chatId != 3) {
                gTween.fadeIn(btnTips, 200, 1, void 0, void 0, {
                    callback: function () {
                        gTween.loopAlpha(btnTips, .2, 300, 1);
                    }
                });
            }
        };
        // private hideWordComplete: boolean;
        UiStart.prototype.hideWord = function () {
            var conWord = this.conWord;
            var btnTips = this.btnTips;
            // egret.setTimeout(() => {
            // 	gTween.hideBubble(conWord, 200, { orgS: 1, orgA: 1 }, () => {
            // 		this.dispatchEventWith(gConst.eventType.IN_COMPLETE);
            // 	});
            // }, this, 1500);
            gTween.toBottomHide(conWord, 200, void 0, 0, 1, egret.Ease.backIn);
            gTween.fadeOut(btnTips, 200, 1);
        };
        UiStart.prototype.hide = function (event, isClose) {
            if (isClose === void 0) { isClose = true; }
            if (event) {
                event.stopPropagation();
            }
            // GameMgr.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.hide, this);
            // this.btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtn, this);
            // egret.clearTimeout(this.hideDelay);
            this.hideGuide();
            // this.hideBlack();
            // this.hideStar(false);
            // this.hideBtn(this.close, this);
            // this.hideBody(this.close, this);
            if (isClose) {
                this.hidePeople(this.close, this);
            }
            else {
                this.hidePeople();
            }
            this.hideWord();
        };
        /** 显示引导 */
        UiStart.prototype.showGuide = function () {
            if (GameMgr.isEnd) {
                return;
            }
            if (this.showGuided) {
                return;
            }
            var time = this.firstTouch ? gConst.firstGuideTimer : gConst.afterGuideTimer;
            if (!this.guide) {
                this.guide = new com.ComGuide();
                this.guide.open();
            }
            this.showGuided = true;
            this.guide.setData(time, { target1: this.guidePos }, this.gWord, { pressT: 200, liftT: 300, waitT: 100, direction: gConst.direction.RIGHT_BOTTOM, offR: 15 });
            this.guide.play();
        };
        /** 隐藏引导 */
        UiStart.prototype.hideGuide = function () {
            if (!this.guide) {
                return;
            }
            if (!this.showGuided) {
                return;
            }
            this.firstTouch = false;
            this.showGuided = false;
            this.guide.over();
        };
        UiStart.prototype.flyParticlComplete = function () {
            var conParticle = this.conParticle;
            gTween.rmTweens(conParticle);
            // if (!this.flyConParticled) {
            // 	return;
            // }
            if (this.flyCompleted) {
                return;
            }
            this.flyCompleted = true;
            conParticle.y = this.flyToY;
            this.stopParticles();
        };
        Object.defineProperty(UiStart.prototype, "flyToY", {
            get: function () {
                return -this.height * this.flyScale - 200;
            },
            enumerable: true,
            configurable: true
        });
        UiStart.prototype.flyConParticle = function () {
            if (!this.flyConParticleing) {
                return;
            }
            if (this.flyCompleted) {
                return;
            }
            // if (this.flyConParticled) {
            // 	return;
            // }
            // this.flyConParticled = true;
            var time = this.flyTime();
            var conParticle = this.conParticle;
            gTween.toMoveY(conParticle, this.flyToY, time, void 0, egret.Ease.sineOut, { duration: 1000 }, {
                callback: this.flyParticlComplete, thisObj: this
            });
        };
        /** 飞行总时长 */
        UiStart.prototype.flyTime = function () {
            var conParticle = this.conParticle;
            return gMath.getTimeBySpeed(conParticle.x, conParticle.y, conParticle.x, this.flyToY, this.flyScale * 3000 / 4);
            // return this.flyScale * 2000;
        };
        /** 展示粒子 */
        UiStart.prototype.showParticles = function () {
            var _this = this;
            var scaleSpeed = this.flyScale;
            var time = this.flyTime();
            // console.info("showParticles", time);
            var con = this.con;
            var conParticle = this.conParticle;
            con.visible = true;
            var particleId = this.createParticles(conParticle, ["fail"], "fail" /*, void 0, false*/);
            egret.setTimeout(function () {
                GameMgr.showCurtainFull = true;
                _this.dispatchEventWith(gConst.eventType.SHOW_CURTAIN_FULL);
            }, this, time * .5);
            // this.startParticle(particleId, time);
            this.flyConParticleing = true;
            this.flyConParticle();
        };
        return UiStart;
    }(ui.UiFile));
    ui.UiStart = UiStart;
    __reflect(UiStart.prototype, "ui.UiStart");
})(ui || (ui = {}));
//# sourceMappingURL=UiStart.js.map