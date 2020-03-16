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
     * 卡牌组件
     */
    var ComCard = (function (_super) {
        __extends(ComCard, _super);
        function ComCard() {
            var _this = _super.call(this) || this;
            _this._direction = 2 /* RIGHT_BOTTOM */;
            _this.initS = 1;
            /* =========== 框架结构代码-end =========== */
            /* =========== 业务代码-start =========== */
            /** 设置or获取位置ID */
            // posId(posId?: number): number {
            // 	if (posId != void 0) {
            // 		this._posId = posId;
            // 	} else {
            // 		return this._posId;
            // 	}
            // }
            // private initPos() {
            // 	this.posId(0);
            // 	// const pos: { x: number, y: number, dir: gConst.aiDir } = gCar.getPos(this.posId());
            // 	const pos: { x: number, y: number } = GameMgr.getPosCar(this.pos);
            // 	// console.log(pos.x, pos.y);
            // 	this.x = pos.x;
            // 	this.y = pos.y;
            // }
            // private getDirectionByNext(nextPos: number[]): gConst.aiDir {
            // 	if (!nextPos || nextPos.length < 1) {
            // 		return;
            // 	}
            // 	const pos = this.pos;
            // 	const row = pos[0];
            // 	const col = pos[1];
            // 	const nextRow = nextPos[0];
            // 	const nextCol = nextPos[1];
            // 	let dir: gConst.aiDir;
            // 	if (row == nextRow) {
            // 		if (col < nextCol) {
            // 			dir = gConst.aiDir.LEFT_BOTTOM;
            // 		} else {
            // 			dir = gConst.aiDir.RIGHT_TOP;
            // 		}
            // 	} else {
            // 		if (row < nextRow) {
            // 			dir = gConst.aiDir.LEFT_TOP;
            // 		} else {
            // 			dir = gConst.aiDir.RIGHT_BOTTOM;
            // 		}
            // 	}
            // 	return dir;
            // }
            /**
             * 设置or获取Ai方向
             */
            // private direction(dir?: gConst.aiDir): gConst.aiDir {
            // 	if (dir != void 0) {
            // 		const isUpdate: boolean = this._direction != dir;
            // 		if (isUpdate) {
            // 			this._direction = dir;
            // 			this.updateRender();
            // 		}
            // 	} else {
            // 		return this._direction;
            // 	}
            // }
            // private updateRender() {
            // 	//小车
            // 	const dir = this.direction();
            // 	// console.log("updateRender", dir);
            // 	const uiDir = dir % 2;
            // 	const scaleX = dir >= 2 ? -1 : 1;
            // 	const con = this.con;
            // 	const card = this.card;
            // 	// card.source = `car${this.type}_${uiDir}_ui_png`;
            // 	gComMgr.setItemAnchor(card);
            // 	gComMgr.setItemAnchor(con);
            // 	card.scaleX = this.initS * scaleX;
            // 	//粒子
            // 	// this.conParticle.rotation = this.direction() == gConst.aiDir.LEFT_BOTTOM ? 45 : -45;
            // }
            // private playEff() {
            // 	this.createParticles(this.conParticle, ["coin", "monye"], "coin");
            // }
            // private move(item: egret.DisplayObject, x: number = item.x, y: number = item.y, speed: number = 500, ease?: { x: Function, y?: Function }, callBack?: Function, thisObj?: any, ...params: any[]): number {
            // 	//开始移动
            // 	let time: number = gMath.getTimeBySpeed(item.x, item.y, x, y, speed);
            // 	gTween.toMove(item, x, y, { x: time }, void 0, void 0, ease, void 0, {
            // 		callback: () => {
            // 			if (callBack) {
            // 				callBack.call(thisObj, ...params);
            // 			}
            // 		}
            // 	});
            // 	return time;
            // }
            _this.isOpen = false;
            _this.shaowShowTimer = 800;
            _this.skinName = skins.ComCard;
            return _this;
        }
        /* =========== 框架结构代码-start =========== */
        /**
         * 初始化
         * @param {any[]} args 构建传参会通过init()传过去
         */
        ComCard.prototype.init = function (data) {
            // console.info("init", ...args);
            this.data = data;
        };
        /** 首次创建组件时调用 */
        ComCard.prototype.load = function () {
            // console.info("load");
            this.touchChildren = false;
            var con = this.con;
            var card = this.card;
            var shadow = this.shadow;
            gComMgr.setItemAnchor(card);
            gComMgr.setItemAnchor(con, true, false);
            shadow.x = card.x;
            shadow.y = card.y;
            shadow.width = card.width;
            shadow.height = card.height;
            shadow.anchorOffsetX = card.anchorOffsetX;
            shadow.anchorOffsetY = card.anchorOffsetY;
            shadow.scaleX = card.scaleX;
            shadow.scaleY = card.scaleY;
            shadow.visible = false;
            shadow.alpha = 0;
            this.orgShadowX = shadow.x;
            this.orgShadowS = shadow.scaleX;
        };
        /** 每次创建组件都会调用 */
        ComCard.prototype.start = function () {
            // console.info("start");
            // this.emoji.visible = gMath.getRandomAnswer(true, false);
            // this.updateRender();
            // gTween.loopScaleY(this.people, 1.1, 500, 1, egret.Ease.backOut);
            // this.initPos();
            // this.updateRender();
            // this.draw();
        };
        /** 每次结束组件都会调用 */
        ComCard.prototype.stop = function () {
            // console.info("stop");
        };
        /** 监听组件，每帧都会调用 */
        ComCard.prototype.update = function () {
            // console.info("update");
        };
        /** 注册事件 */
        ComCard.prototype.addEvent = function () {
            // console.info("addEvent");
        };
        /** 移除事件 */
        ComCard.prototype.removeEvent = function () {
            // console.info("removeEvent");
        };
        /** 窗口大小改变时调用 */
        ComCard.prototype.resizeView = function (event) {
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
        ComCard.prototype.rotateView = function (event) {
            // console.info("rotateView", event, GameMgr.screenType, GameMgr.mobileType);
            if (GameMgr.screenType == 1 /* VERTICAL */) {
            }
            else {
            }
        };
        /** 显示组件 */
        // public show(aim?: boolean, callback: Function = this.startMove, thisObj: any = this, params?: any[]) {
        // 	if (!aim) {
        // 		super.show();
        // 		if (callback) {
        // 			callback.call(thisObj, ...params);
        // 		}
        // 		return;
        // 	}
        // 	gTween.fadeIn(this, 300, 1, void 0, { duration: 500 }, { callback: callback, thisObj: thisObj, params });
        // }
        /** 隐藏组件 */
        ComCard.prototype.hide = function (aim, callback, thisObj, params) {
            if (callback === void 0) { callback = util.CardMgr.removeAi; }
            if (thisObj === void 0) { thisObj = util.CardMgr; }
            if (params === void 0) { params = [this]; }
            if (!aim) {
                _super.prototype.hide.call(this);
                if (callback) {
                    callback.call.apply(callback, [thisObj].concat(params));
                }
                return;
            }
            gTween.fadeOut(this, 300, 1, void 0, { duration: 500 }, { callback: callback, thisObj: thisObj, params: params });
        };
        ComCard.prototype.draw = function (isAim) {
            if (!this.data.isOpen) {
                return;
            }
            var card = this.card;
            var data = this.data;
            var num = data.num;
            this.isOpen = true;
            gTween.rmTweens(card);
            if (isAim) {
                gSoundMgr.playEff("smfanpai");
                egret.Tween.get(card).to({ scaleX: 0 }, 100).call(function () {
                    // card.source = "p_" + (this.m_key == "r" ? 1 : 2) + "_" + this.m_value + "_png";
                    card.source = "card" + num + "_ui_png";
                }, this).to({ scaleX: 1 }, 100);
            }
            else {
                card.source = "card" + num + "_ui_png";
            }
        };
        ComCard.prototype.showShadow = function (dir) {
            var _this = this;
            var shadow = this.shadow;
            var orgX = this.orgShadowX;
            var orgS = this.orgShadowS;
            var duration = this.shaowShowTimer;
            shadow.alpha = 0;
            shadow.visible = true;
            gTween.tween(shadow, void 0, {
                props: {
                    x: orgX + 20 /* * dir*/,
                    alpha: 1,
                    scaleX: orgS * 1.05,
                    scaleY: orgS * 1.05
                }, duration: duration * .3, wait: { duration: duration * .4 }, call: {
                    callback: function () {
                        _this.hideShadow();
                    }
                }
            });
        };
        ComCard.prototype.hideShadow = function () {
            var shadow = this.shadow;
            var orgX = this.orgShadowX;
            var orgS = this.orgShadowS;
            // gTween.fadeOut(shadow, 100);
            var duration = this.shaowShowTimer;
            gTween.tween(shadow, void 0, {
                props: {
                    x: orgX,
                    alpha: 0,
                    scaleX: orgS,
                    scaleY: orgS
                }, duration: duration * .4
            });
        };
        return ComCard;
    }(com.ComFile));
    com.ComCard = ComCard;
    __reflect(ComCard.prototype, "com.ComCard");
})(com || (com = {}));
//# sourceMappingURL=ComCard.js.map