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
     * NPC组件
     */
    var ComNpc = (function (_super) {
        __extends(ComNpc, _super);
        function ComNpc() {
            var _this = _super.call(this) || this;
            _this.skinName = skins.ComNpc;
            return _this;
        }
        /* =========== 框架结构代码-start =========== */
        /**
         * 初始化
         * @param {any[]} args 构建传参会通过init()传过去
         */
        ComNpc.prototype.init = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // console.info("init", ...args);
            // this.type = type;
        };
        /** 首次创建组件时调用 */
        ComNpc.prototype.load = function () {
            // console.info("load");
            var con = this.con;
            var npc = this.npc;
            var npcDebug = this.npcDebug;
            var npcDieDebug = this.npcDieDebug;
            if (!gConst.debugModel) {
                npcDebug.visible = false;
                npcDieDebug.visible = false;
            }
            else {
                npcDebug.visible = true;
                npcDieDebug.visible = true;
            }
            gComMgr.setObjSize(npcDebug, true);
            npc.width = npcDebug.width;
            npc.height = npcDebug.height;
            gComMgr.setItemAnchor(con, false);
            this.loadNpc();
        };
        /** 每次创建组件都会调用 */
        ComNpc.prototype.start = function () {
            // console.info("start");
            // this.emoji.visible = gMath.getRandomAnswer(true, false);
            // this.initPos();
            // this.updateRender();
            // gTween.loopScaleY(this.people, 1.1, 500, 1, egret.Ease.backOut);
            this.die(null);
            this.playIdle();
        };
        /** 每次结束组件都会调用 */
        ComNpc.prototype.stop = function () {
            // console.info("stop");
        };
        /** 监听组件，每帧都会调用 */
        ComNpc.prototype.update = function () {
            // console.info("update");
        };
        /** 注册事件 */
        ComNpc.prototype.addEvent = function () {
            // console.info("addEvent");
        };
        /** 移除事件 */
        ComNpc.prototype.removeEvent = function () {
            // console.info("removeEvent");
        };
        /** 窗口大小改变时调用 */
        ComNpc.prototype.resizeView = function (event) {
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
        ComNpc.prototype.rotateView = function (event) {
            // console.info("rotateView", event, GameMgr.screenType, GameMgr.mobileType);
            if (GameMgr.screenType == 1 /* VERTICAL */) {
            }
            else {
            }
        };
        /** 显示组件 */
        ComNpc.prototype.show = function (aim, callback, thisObj, params) {
            if (callback === void 0) { callback = this.startMove; }
            if (thisObj === void 0) { thisObj = this; }
            if (!aim) {
                _super.prototype.show.call(this);
                if (callback) {
                    callback.call.apply(callback, [thisObj].concat(params));
                }
                return;
            }
            gTween.fadeIn(this, 300, 1, void 0, { duration: 500 }, { callback: callback, thisObj: thisObj, params: params });
        };
        /** 隐藏组件 */
        ComNpc.prototype.hide = function (aim, callback, thisObj, params) {
            if (callback === void 0) { callback = gPeople.removeAi; }
            if (thisObj === void 0) { thisObj = gPeople; }
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
        /* =========== 框架结构代码-end =========== */
        /* =========== 业务代码-start =========== */
        ComNpc.prototype.loadNpc = function () {
            var npc = this.npc;
            npc.open();
            npc.setData([
                new data.McData(gConst.stateName[0 /* IDLE */], 12, "xlz_idle_{1}_png", { minBit: 2 }),
                new data.McData(gConst.stateName[2 /* WALK */], 18, "xlz_bw_{1}_png", { minBit: 2 }),
                new data.McData(gConst.stateName[5 /* SHOT */], 5, "xlz_shot_{1}_png", { minBit: 2 }),
                new data.McData(gConst.stateName[4 /* DIE */], 6, "xlz_bf_{1}_png", { minBit: 2 }),
            ]);
        };
        ComNpc.prototype.initPeople = function () {
            var npc = this.npc;
            npc.x = 0;
            npc.y = 0;
        };
        /** 待机 */
        ComNpc.prototype.playIdle = function () {
            var npc = this.npc;
            var id = this.id = 0 /* IDLE */;
            this.initPeople();
            npc.gotoAndPlay(gConst.stateName[id]);
        };
        /** 掉落 */
        ComNpc.prototype.playDropDown = function () {
            var npc = this.npc;
            var id = this.id = 1 /* DROP_DOWN */;
            this.initPeople();
            npc.gotoAndPlay(gConst.stateName[id], 1);
        };
        /** 行走 */
        ComNpc.prototype.playWalk = function () {
            var npc = this.npc;
            var id = this.id = 2 /* WALK */;
            this.initPeople();
            npc.gotoAndPlay(gConst.stateName[id]);
        };
        /** 射击 */
        ComNpc.prototype.playShot = function () {
            var npc = this.npc;
            var id = this.id = 5 /* SHOT */;
            this.initPeople();
            npc.gotoAndPlay(gConst.stateName[id], 1);
        };
        /** 死亡 */
        ComNpc.prototype.playDie = function () {
            var conParticles = this.conParticles;
            var npc = this.npc;
            var npcDieDebug = this.npcDieDebug;
            var id = this.id = 4 /* DIE */;
            var particleId = this.particleId;
            if (particleId == void 0) {
                particleId = this.particleId = this.createParticles(conParticles, ["blood"], "blood", void 0, false);
            }
            this.startParticle(particleId, 500);
            this.initPeople();
            npc.x = npcDieDebug.x;
            npc.y = npcDieDebug.y;
            npc.gotoAndPlay(gConst.stateName[id], 1);
        };
        /** 设置or获取死亡状态 */
        ComNpc.prototype.die = function (die) {
            if (die !== void 0) {
                this._die = die;
            }
            else {
                return this._die;
            }
        };
        /** 设置or获取位置ID */
        // posId(posId?: number): number {
        // 	if (posId != void 0) {
        // 		this._posId = posId;
        // 	} else {
        // 		return this._posId;
        // 	}
        // }
        // private initPos() {
        // 	this.posId(gMath.getRandomAnswer(0, 101, 102, 201, 202));
        // 	const pos: { x: number, y: number, dir: gConst.aiDir } = gPeople.getPos(this.posId());
        // 	this.x = pos.x;
        // 	this.y = pos.y;
        // 	// this.direction(pos.dir);
        // }
        ComNpc.prototype.startMove = function () {
            // const posId: number = gPeople.getNextPosId(this.posId());
            // if (posId == void 0) {
            // 	this.hide(true);
            // 	return;
            // }
            // this.posId(posId);
            // let aim: boolean = false;
            // const nextPos: { x: number, y: number, dir: gConst.aiDir } = gPeople.getPos(posId);
            // if (!nextPos) {
            // 	this.hide(aim);
            // 	return;
            // }
            // let hide: boolean = false;
            // if (posId >= gPeople.getMaxId(posId)) {
            // 	hide = true;
            // } else {
            // 	switch (posId) {
            // 		case 101:
            // 		case 102:
            // 		case 201:
            // 		case 202:
            // 			hide = gMath.getRandomAnswer(true, false);
            // 			aim = true;
            // 			break;
            // 	}
            // }
            // const speed: number = gMath.getRandomInteger(120, 80);
            // this.move(this, nextPos.x, nextPos.y, speed, void 0, () => {
            // 	if (hide) {
            // 		this.hide(aim);
            // 	} else {
            // 		// this.direction(nextPos.dir);
            // 		this.startMove();
            // 	}
            // });
        };
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
        // 	this.people.source = `pp${this.type}_${this.direction()}_png`;
        // 	gComMgr.setImgAnchor(this.people);
        // 	this.people.x = this.people.anchorOffsetX;
        // 	this.people.y = this.people.anchorOffsetY = this.people.height;
        // 	this.width = this.con.width = this.people.width;
        // 	this.height = this.con.height = this.people.height;
        // }
        ComNpc.prototype.move = function (item, x, y, speed, ease, callBack, thisObj) {
            if (x === void 0) { x = item.x; }
            if (y === void 0) { y = item.y; }
            if (speed === void 0) { speed = 500; }
            var params = [];
            for (var _i = 7; _i < arguments.length; _i++) {
                params[_i - 7] = arguments[_i];
            }
            //开始移动
            var time = gMath.getTimeBySpeed(item.x, item.y, x, y, speed);
            gTween.toMove(item, x, y, { x: time }, void 0, void 0, ease, void 0, {
                callback: function () {
                    if (callBack) {
                        callBack.call.apply(callBack, [thisObj].concat(params));
                    }
                }
            });
            return time;
        };
        return ComNpc;
    }(com.ComFile));
    com.ComNpc = ComNpc;
    __reflect(ComNpc.prototype, "com.ComNpc");
})(com || (com = {}));
//# sourceMappingURL=ComNpc.js.map