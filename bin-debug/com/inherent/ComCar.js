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
     * 汽车组件
     */
    var ComCar = (function (_super) {
        __extends(ComCar, _super);
        function ComCar() {
            var _this = _super.call(this) || this;
            // public conParticle: eui.Group;
            _this._direction = 2 /* RIGHT_BOTTOM */;
            _this.initS = 1;
            _this.firstBirth = true;
            _this.nextDie = false;
            _this.skinName = skins.ComCar;
            return _this;
        }
        /* =========== 框架结构代码-start =========== */
        /**
         * 初始化
         * @param {any[]} args 构建传参会通过init()传过去
         */
        ComCar.prototype.init = function (pos) {
            // console.info("init", ...args);
            this.pos = pos;
            this.type = gMath.getRandomAnswer(1, 2, 3);
            this.initPos();
        };
        /** 首次创建组件时调用 */
        ComCar.prototype.load = function () {
            // console.info("load");
            var con = this.con;
            var car = this.car;
            gComMgr.setItemAnchor(car);
            gComMgr.setItemAnchor(con);
        };
        /** 每次创建组件都会调用 */
        ComCar.prototype.start = function () {
            // console.info("start");
            // this.emoji.visible = gMath.getRandomAnswer(true, false);
            // this.updateRender();
            // gTween.loopScaleY(this.people, 1.1, 500, 1, egret.Ease.backOut);
            // this.initPos();
            this.firstBirth = true;
            this.nextDie = false;
            this.updateRender();
        };
        /** 每次结束组件都会调用 */
        ComCar.prototype.stop = function () {
            // console.info("stop");
        };
        /** 监听组件，每帧都会调用 */
        ComCar.prototype.update = function () {
            // console.info("update");
        };
        /** 注册事件 */
        ComCar.prototype.addEvent = function () {
            // console.info("addEvent");
        };
        /** 移除事件 */
        ComCar.prototype.removeEvent = function () {
            // console.info("removeEvent");
        };
        /** 窗口大小改变时调用 */
        ComCar.prototype.resizeView = function (event) {
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
        ComCar.prototype.rotateView = function (event) {
            // console.info("rotateView", event, GameMgr.screenType, GameMgr.mobileType);
            if (GameMgr.screenType == 1 /* VERTICAL */) {
            }
            else {
            }
        };
        /** 显示组件 */
        ComCar.prototype.show = function (aim, callback, thisObj, params) {
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
        ComCar.prototype.hide = function (aim, callback, thisObj, params) {
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
        /** 设置or获取位置ID */
        ComCar.prototype.posId = function (posId) {
            if (posId != void 0) {
                this._posId = posId;
            }
            else {
                return this._posId;
            }
        };
        ComCar.prototype.initPos = function () {
            this.posId(0);
            // const pos: { x: number, y: number, dir: gConst.aiDir } = gCar.getPos(this.posId());
            var pos = GameMgr.getPosCar(this.pos);
            // console.log(pos.x, pos.y);
            this.x = pos.x;
            this.y = pos.y;
        };
        ComCar.prototype.nextPos = function () {
            var pos = this.pos;
            var nextAllPos = [];
            var row = pos[0];
            var col = pos[1];
            var pushItem = function (pos) {
                if (!pos) {
                    return;
                }
                var allPos = gCar.allPos;
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
            if (row < gCar.maxRow - 1) {
                pushItem.call(this, [row + 1, col]);
            }
            if (col > 0) {
                pushItem.call(this, [row, (col - 1)]);
            }
            if (col < gCar.maxCol - 1) {
                pushItem.call(this, [row, (col + 1)]);
            }
            var nextPos = gMath.getRandomAnswer.apply(gMath, nextAllPos);
            // console.info("nextPos", pos, nextPos);
            return nextPos;
        };
        ComCar.prototype.startMove = function () {
            var _this = this;
            // console.info("startMove");
            // const posId: number = gCar.getNextPosId(this.posId());
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
            var posLoc = GameMgr.getPosCar(nextPos);
            if (!posLoc) {
            }
            this.nextDie = gDevelop.arrHasVal(gCar.diePos, nextPos);
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
        ComCar.prototype.getDirectionByNext = function (nextPos) {
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
        ComCar.prototype.direction = function (dir) {
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
        ComCar.prototype.updateRender = function () {
            //小车
            var dir = this.direction();
            // console.log("updateRender", dir);
            var uiDir = dir % 2;
            var scaleX = dir >= 2 ? -1 : 1;
            var con = this.con;
            var car = this.car;
            car.source = "car" + this.type + "_" + uiDir + "_ui_png";
            gComMgr.setItemAnchor(car);
            gComMgr.setItemAnchor(con);
            car.scaleX = this.initS * scaleX;
            //粒子
            // this.conParticle.rotation = this.direction() == gConst.aiDir.LEFT_BOTTOM ? 45 : -45;
        };
        // private playEff() {
        // 	this.createParticles(this.conParticle, ["coin", "monye"], "coin");
        // }
        ComCar.prototype.move = function (item, x, y, speed, ease, callBack, thisObj) {
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
        return ComCar;
    }(com.ComFile));
    com.ComCar = ComCar;
    __reflect(ComCar.prototype, "com.ComCar");
})(com || (com = {}));
//# sourceMappingURL=ComCar.js.map