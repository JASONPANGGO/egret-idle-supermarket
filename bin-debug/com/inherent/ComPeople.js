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
     * 人物组件
     */
    var ComPeople = (function (_super) {
        __extends(ComPeople, _super);
        function ComPeople() {
            var _this = _super.call(this) || this;
            _this._direction = 2 /* RIGHT_BOTTOM */;
            _this.initS = 1;
            _this.firstBirth = true;
            _this.nextDie = false;
            _this.skinName = skins.ComPeople;
            return _this;
        }
        /* =========== 框架结构代码-start =========== */
        /**
         * 初始化
         * @param {any[]} args 构建传参会通过init()传过去
         */
        ComPeople.prototype.init = function (pos, comHouse) {
            // console.info("init", ...args);
            // this.type = type;
            this.pos = pos;
            this.comHouse = comHouse;
            this.type = gMath.getRandomAnswer(1, 2, 3, 4);
            this.initPos();
        };
        /** 首次创建组件时调用 */
        ComPeople.prototype.load = function () {
            // console.info("load");
            var con = this.con;
            var people = this.people;
            // const peopleDebug = this.peopleDebug;
            // const peopleDieDebug = this.peopleDieDebug;
            // const peopleWalkDebug = this.peopleWalkDebug;
            // const warn = this.warn;
            // if (!gConst.debugModel) {
            // 	peopleDebug.visible = false;
            // 	peopleDieDebug.visible = false;
            // 	peopleWalkDebug.visible = false;
            // } else {
            // 	peopleDebug.visible = true;
            // 	peopleDieDebug.visible = true;
            // 	peopleWalkDebug.visible = true;
            // }
            // gComMgr.setObjSize(peopleDebug, true);
            // people.width = peopleDebug.width;
            // people.height = peopleDebug.height;
            // gComMgr.setItemAnchor(con);
            // warn.visible = false;
            gComMgr.setItemAnchor(people);
            people.y = people.anchorOffsetY = people.height;
            gComMgr.setItemAnchor(con);
            con.y = con.anchorOffsetY = con.height;
            this.anchorOffsetY = this.height;
            // this.loadPeople();
        };
        /** 每次创建组件都会调用 */
        ComPeople.prototype.start = function () {
            // console.info("start");
            // this.emoji.visible = gMath.getRandomAnswer(true, false);
            // this.initPos();
            // this.updateRender();
            // gTween.loopScaleY(this.people, 1.1, 500, 1, egret.Ease.backOut);
            // this.die(null);
            // this.playIdle();
            this.firstBirth = true;
            this.nextDie = false;
            this.updateRender();
        };
        /** 每次结束组件都会调用 */
        ComPeople.prototype.stop = function () {
            // console.info("stop");
        };
        /** 监听组件，每帧都会调用 */
        ComPeople.prototype.update = function () {
            // console.info("update");
        };
        /** 注册事件 */
        ComPeople.prototype.addEvent = function () {
            // console.info("addEvent");
        };
        /** 移除事件 */
        ComPeople.prototype.removeEvent = function () {
            // console.info("removeEvent");
        };
        /** 窗口大小改变时调用 */
        ComPeople.prototype.resizeView = function (event) {
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
        ComPeople.prototype.rotateView = function (event) {
            // console.info("rotateView", event, GameMgr.screenType, GameMgr.mobileType);
            if (GameMgr.screenType == 1 /* VERTICAL */) {
            }
            else {
            }
        };
        /** 显示组件 */
        ComPeople.prototype.show = function (aim, callback, thisObj, params) {
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
        ComPeople.prototype.hide = function (aim, callback, thisObj, params) {
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
        // private loadPeople() {
        // 	const people = this.people;
        // 	people.open();
        // 	people.setData([
        // 		new data.McData(gConst.stateName[gConst.stateId.IDLE], 15, "xlz_hanging_{1}_png", { minBit: 2 }),
        // 		new data.McData(gConst.stateName[gConst.stateId.DROP_DOWN], 28, "xlz_landing_{1}_png", { minBit: 2 }),
        // 		new data.McData(gConst.stateName[gConst.stateId.WALK], 21, "xlz_run_{1}_png", { minBit: 2 }),
        // 		new data.McData(gConst.stateName[gConst.stateId.STAND], 1, "xlz_run_{1}_png", { minBit: 2 }),
        // 		new data.McData(gConst.stateName[gConst.stateId.DIE], 1, "xlz_die_png"),
        // 	]);
        // }
        // private initPeople() {
        // 	const people = this.people;
        // 	gTween.rmTweens(people);
        // 	people.x = 0;
        // 	people.y = 0;
        // }
        /** 待机 */
        // public playIdle() {
        // 	const people = this.people;
        // 	const id = this.id = gConst.stateId.IDLE;
        // 	this.initPeople();
        // 	people.gotoAndPlay(gConst.stateName[id]);
        // 	gTween.loopFloat(people, 20, 1000, 0);
        // }
        /** 掉落 */
        // public playDropDown() {
        // 	const people = this.people;
        // 	const id = this.id = gConst.stateId.DROP_DOWN;
        // 	this.initPeople();
        // 	people.gotoAndPlay(gConst.stateName[id], 1);
        // }
        /** 行走 */
        // public playWalk() {
        // 	const people = this.people;
        // 	const id = this.id = gConst.stateId.WALK;
        // 	this.initPeople();
        // 	people.gotoAndPlay(gConst.stateName[id]);
        // }
        /** 站立 */
        // public playStand() {
        // 	const people = this.people;
        // 	const id = this.id = gConst.stateId.STAND;
        // 	this.initPeople();
        // 	people.gotoAndPlay(gConst.stateName[id], 1);
        // }
        /** 死亡 */
        // public playDie() {
        // 	const conParticles = this.conParticles;
        // 	const people = this.people;
        // 	const peopleDieDebug = this.peopleDieDebug;
        // 	const id = this.id = gConst.stateId.DIE;
        // 	let particleId = this.particleId;
        // 	if (particleId == void 0) {
        // 		particleId = this.particleId = this.createParticles(conParticles, ["blood"], "blood", void 0, false);
        // 	}
        // 	this.startParticle(particleId, 500);
        // 	this.initPeople();
        // 	people.x = peopleDieDebug.x;
        // 	people.y = peopleDieDebug.y;
        // 	people.gotoAndPlay(gConst.stateName[id], 1);
        // }
        /** 设置or获取位置ID */
        // posId(posId?: number): number {
        // 	if (posId != void 0) {
        // 		this._posId = posId;
        // 	} else {
        // 		return this._posId;
        // 	}
        // }
        /** 设置or获取死亡状态 */
        // public die(die?: boolean): boolean {
        // 	if (die !== void 0) {
        // 		this._die = die;
        // 	} else {
        // 		return this._die;
        // 	}
        // }
        /** 显示警告 */
        // public showWarn() {
        // 	gTween.showBubble(this.warn, 300, void 0, void 0, void 0, void 0, { isFloat: false });
        // }
        // private initPos() {
        // 	this.posId(gMath.getRandomAnswer(0, 101, 102, 201, 202));
        // 	const pos: { x: number, y: number, dir: gConst.aiDir } = gPeople.getPos(this.posId());
        // 	this.x = pos.x;
        // 	this.y = pos.y;
        // 	// this.direction(pos.dir);
        // }
        // private startMove() {
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
        // 	this.people.source = `pp${this.type}_${this.direction()}_png`;
        // 	gComMgr.setImgAnchor(this.people);
        // 	this.people.x = this.people.anchorOffsetX;
        // 	this.people.y = this.people.anchorOffsetY = this.people.height;
        // 	this.width = this.con.width = this.people.width;
        // 	this.height = this.con.height = this.people.height;
        // }
        /** 设置or获取位置ID */
        ComPeople.prototype.posId = function (posId) {
            if (posId != void 0) {
                this._posId = posId;
            }
            else {
                return this._posId;
            }
        };
        ComPeople.prototype.getPosPeople = function (pos) {
            var comHouse = this.comHouse;
            if (!comHouse) {
                return;
            }
            if (!pos || pos.length < 1) {
                return;
            }
            return comHouse["posPeople_" + pos[0] + "_" + pos[1]];
        };
        ComPeople.prototype.initPos = function () {
            this.posId(0);
            // const pos: { x: number, y: number, dir: gConst.aiDir } = gPeople.getPos(this.posId());
            var pos = this.getPosPeople(this.pos);
            // console.log(pos.x, pos.y);
            this.x = pos.x;
            this.y = pos.y;
        };
        ComPeople.prototype.nextPos = function () {
            var pos = this.pos;
            var nextAllPos = [];
            var row = pos[0];
            var col = pos[1];
            var pushItem = function (pos) {
                if (!pos) {
                    return;
                }
                var allPos = gPeople.allPos;
                // console.info("pushItem", allPos, pos);
                // if (allPos && allPos.indexOf(pos) != -1) {
                if (allPos && !gDevelop.arrHasVal(allPos, pos)) {
                    return;
                }
                nextAllPos.push(pos);
            };
            if (row > 0) {
                pushItem.call(this, [row - 1, col]);
            }
            if (row < gPeople.maxRow - 1) {
                pushItem.call(this, [row + 1, col]);
            }
            if (col > 0) {
                pushItem.call(this, [row, (col - 1)]);
            }
            if (col < gPeople.maxCol - 1) {
                pushItem.call(this, [row, (col + 1)]);
            }
            var nextPos = gMath.getRandomAnswer.apply(gMath, nextAllPos);
            // console.info("nextPos", pos, nextPos);
            return nextPos;
        };
        ComPeople.prototype.startMove = function () {
            var _this = this;
            // console.info("startMove");
            // const posId: number = gPeople.getNextPosId(this.posId());
            if (this.nextDie) {
                this.dispatchEventWith(gConst.eventType.REMOVE_OBJ, void 0, this);
                return;
            }
            // this.posId(posId);
            var aim = false;
            var nextPos = this.nextPos();
            if (!nextPos) {
                this.dispatchEventWith(gConst.eventType.REMOVE_OBJ, void 0, this);
                return;
            }
            var direct = this.getDirectionByNext(nextPos);
            this.direction(direct);
            var posLoc = this.getPosPeople(nextPos);
            if (!posLoc) {
            }
            this.nextDie = gDevelop.arrHasVal(gPeople.diePos, nextPos);
            // let hide: boolean = false;
            var speed = gMath.getRandomInteger(250, 200);
            this.move(this, posLoc.x, posLoc.y, speed, void 0, function () {
                // if (hide) {
                // 	this.hide(aim);
                // } else {
                _this.pos = nextPos;
                _this.startMove();
                // }
            });
        };
        ComPeople.prototype.getDirectionByNext = function (nextPos) {
            if (!nextPos || nextPos.length < 1) {
                return;
            }
            var pos = this.pos;
            var row = pos[0];
            var col = pos[1];
            var nextRow = nextPos[0];
            var nextCol = nextPos[1];
            var dir;
            if (row == nextRow) {
                if (col < nextCol) {
                    dir = 0 /* LEFT_BOTTOM */;
                }
                else {
                    dir = 3 /* RIGHT_TOP */;
                }
            }
            else {
                if (row < nextRow) {
                    dir = 1 /* LEFT_TOP */;
                }
                else {
                    dir = 2 /* RIGHT_BOTTOM */;
                }
            }
            return dir;
        };
        /**
         * 设置or获取Ai方向
         */
        ComPeople.prototype.direction = function (dir) {
            if (dir != void 0) {
                var isUpdate = this._direction != dir;
                if (isUpdate) {
                    this._direction = dir;
                    this.updateRender();
                }
            }
            else {
                return this._direction;
            }
        };
        ComPeople.prototype.updateRender = function () {
            //人物
            var dir = this.direction();
            // console.log("updateRender", dir);
            var uiDir = dir % 2;
            var scaleX = dir >= 2 ? -1 : 1;
            var con = this.con;
            var people = this.people;
            people.source = "people" + this.type + "_" + uiDir + "_ui_png";
            gComMgr.setItemAnchor(people);
            people.y = people.anchorOffsetY = people.height;
            gComMgr.setItemAnchor(con);
            con.y = con.anchorOffsetY = con.height;
            this.anchorOffsetY = this.height;
            people.scaleX = this.initS * scaleX;
            //粒子
            // this.conParticle.rotation = this.direction() == gConst.aiDir.LEFT_BOTTOM ? 45 : -45;
        };
        // private playEff() {
        // 	this.createParticles(this.conParticle, ["coin", "monye"], "coin");
        // }
        ComPeople.prototype.move = function (item, x, y, speed, ease, callBack, thisObj) {
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
        return ComPeople;
    }(com.ComFile));
    com.ComPeople = ComPeople;
    __reflect(ComPeople.prototype, "com.ComPeople");
})(com || (com = {}));
//# sourceMappingURL=ComPeople.js.map