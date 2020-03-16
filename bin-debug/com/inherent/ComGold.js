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
     * 头部组件
     */
    var ComGold = (function (_super) {
        __extends(ComGold, _super);
        function ComGold() {
            var _this = _super.call(this) || this;
            _this.playDelay = [];
            _this.aimCnt = 0;
            _this.fCnt = 1;
            // updateRender() {
            // 	const gold = GameMgr.gold;
            // 	if (gold == this.curNum) {
            // 		return;
            // 	}
            // 	this.curNum = gold;
            // 	this.num.text = gMath.switchNum(this.curNum, true);
            // }
            _this.maxLameIdx = 0;
            _this.initOffWait = 200;
            _this.initNextWait = 80;
            _this.curLameIdx = 0;
            _this.offLampWait = 0;
            _this.nextLampInterval = 0;
            _this.skinName = skins.ComGold;
            return _this;
        }
        /* =========== 生命周期结构代码-start =========== */
        /**
         * 初始化
         * @param {any[]} args 构建传参会通过init()传过去
         */
        ComGold.prototype.init = function (isCircle) {
            // console.info("init", ...args);
            // this.initCircle(isCircle);
        };
        /** 首次创建组件时调用 */
        ComGold.prototype.load = function () {
            // console.info("load");
            this.curNum = GameMgr.gold;
            this.updateRender(this.curNum);
            var bg = this.bg;
            var conNum = this.conNum;
            var con = this.con;
            gComMgr.setObjSize(bg, true);
            gComMgr.setObjSize(conNum, true);
            gComMgr.setObjSize(con, true);
            gComMgr.setItemAnchor(this);
            // this.updateRender();
        };
        /** 每次创建组件都会调用 */
        ComGold.prototype.start = function () {
            // console.info("start");
            this.initLamps();
        };
        /** 每次结束组件都会调用 */
        ComGold.prototype.stop = function () {
            // console.info("stop");
        };
        /** 监听组件，每帧都会调用 */
        ComGold.prototype.update = function () {
            // console.info("update");
        };
        /** 注册事件 */
        ComGold.prototype.addEvent = function () {
            // console.info("addEvent");
        };
        /** 移除事件 */
        ComGold.prototype.removeEvent = function () {
            // console.info("removeEvent");
        };
        /** 窗口大小改变时调用 */
        ComGold.prototype.resizeView = function (event) {
            // console.info("resizeView", event, GameMgr.gameview.width, GameMgr.gameview.height);
            var baseScale = gConst.mobileByScale[GameMgr.screenType][GameMgr.mobileType];
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
        ComGold.prototype.rotateView = function (event) {
            // console.info("rotateView", event, GameMgr.screenType, GameMgr.mobileType);
            if (GameMgr.screenType == 1 /* VERTICAL */) {
            }
            else {
            }
        };
        /* =========== 生命周期结构代码-end =========== */
        /* =========== 业务代码-start =========== */
        /** 添加金币 */
        ComGold.prototype.add = function (diffNum) {
            if (diffNum == void 0) {
                return;
            }
            this.diffNum = diffNum;
            this.take();
        };
        Object.defineProperty(ComGold.prototype, "curNum", {
            /**
             * 当前金币数
             */
            get: function () {
                return this._curNum;
            },
            set: function (num) {
                this._curNum = num;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 收钱到账
         */
        ComGold.prototype.take = function () {
            this.playNum();
        };
        /**
         * 播放数字切换效果
         */
        ComGold.prototype.playNum = function () {
            var _this = this;
            if (!this.diffNum) {
                return;
            }
            var lastUpdate = function () {
                _this.updateRender(_this.curNum);
                _this.dispatchEventWith(egret.Event.COMPLETE);
                _this.playing = false;
            };
            var clearDelay = function () {
                while (_this.playDelay && _this.playDelay.length) {
                    egret.clearTimeout(_this.playDelay.shift());
                }
            };
            var change = function (random) {
                var diffNum = random - baseNum; //与原数字的差
                var absNum = Math.abs(diffNum); //差取绝对值
                var changeTimes = Math.min(absNum, gConst.changeGoldTimes);
                var changeUnit = absNum < changeTimes ? 1 : Math.floor(diffNum / changeTimes); //每次变化的值
                // console.log("changeTimes", changeTimes);
                //依次变化
                var i = 0;
                var changeNum = function () {
                    if (_this.playStop) {
                        return;
                    }
                    _this.playDelay[_this.playDelay.length] = egret.setTimeout(function () {
                        if (_this.playStop) {
                            return;
                        }
                        //最后一步指定最终值
                        if (i == changeTimes - 1) {
                            lastUpdate.call(_this);
                            return;
                        }
                        else {
                            //过程中
                            _this.updateRender(baseNum += changeUnit);
                        }
                        i++;
                        changeNum();
                    }, _this, gConst.changeGoldTimer * (i + 1));
                };
                changeNum();
            };
            var start = function () {
                var max;
                var min;
                if (_this.curNum > baseNum) {
                    max = _this.curNum;
                    min = baseNum;
                }
                else {
                    max = baseNum;
                    min = _this.curNum;
                }
                _this.playStop = false;
                _this.playing = true;
                var random = Math.floor(Math.random() * max + min);
                change(random);
            };
            if (this.playing) {
                this.playStop = true;
                //不清除上次的延迟，即继续上次值播放到最新
                clearDelay.call(this);
                lastUpdate.call(this);
            }
            var baseNum = this.curNum;
            this.curNum += this.diffNum;
            start();
        };
        ComGold.prototype.updateRender = function (num) {
            var _this = this;
            if (num > this.curNum) {
                return;
            }
            var orgS = 1;
            var targetS = 1.1;
            num = Math.min(num, GameMgr.maxGold);
            // console.log("updateRender", num);
            if (GameMgr.isVip) {
                targetS = 1.4;
                this.fCnt = 6;
            }
            this.aimCnt++;
            if (this.aimCnt >= this.fCnt) {
                this.aimCnt = 0;
                gTween.toScale(this.num, targetS, 200, orgS, void 0, void 0, {
                    callback: function () {
                        gTween.toScale(_this.num, orgS, 100);
                    }
                });
            }
            this.num.text = gMath.switchNum(num, true);
            // if (num > gConst.showCarGold) {
            // 	this.dispatchEventWith(gConst.eventType.SHOW_CAR_START);
            // }
        };
        ComGold.prototype.initLamps = function () {
            var i = 0;
            var lamp = this["comLamp" + i];
            while (lamp) {
                lamp.open();
                this.maxLameIdx = Math.max(this.maxLameIdx, i);
                i++;
                lamp = this["comLamp" + i];
            }
        };
        ComGold.prototype.playLamps = function () {
            this.onLamp(this.curLameIdx);
            egret.clearInterval(this.nextLampDelay);
            this.nextLampDelay = egret.setInterval(this.onNextLamp, this, this.nextLampInterval);
        };
        ComGold.prototype.playLampsByScale = function (scale) {
            if (scale === void 0) { scale = 1; }
            var vipScale = GameMgr.isVip ? gConst.vipLampTimeScale : 1;
            this.offLampWait = gMath.keepDecimal(this.initOffWait / scale / vipScale, 0);
            this.nextLampInterval = gMath.keepDecimal(this.initNextWait / scale / vipScale, 0);
            this.playLamps();
        };
        ComGold.prototype.onNextLamp = function () {
            var i = this.curLameIdx;
            i++;
            if (i > this.maxLameIdx) {
                i = 0;
            }
            this.onLamp(i);
        };
        ComGold.prototype.onLamp = function (i) {
            var lamp = this["comLamp" + i];
            if (!lamp) {
                return;
            }
            this.curLameIdx = i;
            lamp.on(this.offLampWait);
        };
        return ComGold;
    }(com.ComFile));
    com.ComGold = ComGold;
    __reflect(ComGold.prototype, "com.ComGold");
})(com || (com = {}));
//# sourceMappingURL=ComGold.js.map