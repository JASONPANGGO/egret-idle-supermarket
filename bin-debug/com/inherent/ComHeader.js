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
    var ComHeader = (function (_super) {
        __extends(ComHeader, _super);
        function ComHeader() {
            var _this = _super.call(this) || this;
            _this.skinName = skins.ComHeader;
            return _this;
        }
        /* =========== 生命周期结构代码-start =========== */
        /**
         * 初始化
         * @param {any[]} args 构建传参会通过init()传过去
         */
        ComHeader.prototype.init = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // console.info("init", ...args);
        };
        /** 首次创建组件时调用 */
        ComHeader.prototype.load = function () {
            // console.info("load");
            this.curNum = 0;
            this.curTime = 6;
        };
        /** 每次创建组件都会调用 */
        ComHeader.prototype.start = function () {
            // console.info("start");
            this.time.text = gMath.switchHour(this.curTime);
        };
        /** 每次结束组件都会调用 */
        ComHeader.prototype.stop = function () {
            // console.info("stop");
        };
        /** 监听组件，每帧都会调用 */
        ComHeader.prototype.update = function () {
            // console.info("update");
        };
        /** 注册事件 */
        ComHeader.prototype.addEvent = function () {
            // console.info("addEvent");
        };
        /** 移除事件 */
        ComHeader.prototype.removeEvent = function () {
            // console.info("removeEvent");
        };
        /** 窗口大小改变时调用 */
        ComHeader.prototype.resizeView = function (event) {
            // console.info("resizeView", event, GameMgr.gameview.width, GameMgr.gameview.height);
            if (GameMgr.screenType == 1 /* VERTICAL */) {
                //竖屏
                this.width = this.con.width = this.header.width = 760;
                this.height = this.con.height = this.header.height = 275;
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
                this.width = this.con.width = this.header.width = 410;
                this.height = this.con.height = this.header.height = 202;
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
        ComHeader.prototype.rotateView = function (event) {
            // console.info("rotateView", event, GameMgr.screenType, GameMgr.mobileType);
            if (GameMgr.screenType == 1 /* VERTICAL */) {
                //竖屏
                this.header.source = "p_top_png";
                this.conTime.left = 5;
                this.conTime.horizontalCenter = NaN;
                this.conTime.bottom = 42;
                this.conNum.right = 47;
                this.conNum.horizontalCenter = NaN;
            }
            else {
                //横屏
                this.header.source = "p_top_h_png";
                this.conTime.left = NaN;
                this.conTime.horizontalCenter = 0;
                this.conTime.bottom = 100;
                this.conNum.right = NaN;
                this.conNum.horizontalCenter = 0;
            }
        };
        /* =========== 生命周期结构代码-end =========== */
        /* =========== 业务代码-start =========== */
        /** 添加金币 */
        ComHeader.prototype.addGold = function (diffNum) {
            this.diffNum = diffNum;
            this.take();
        };
        Object.defineProperty(ComHeader.prototype, "curGold", {
            /**
             * 当前金币数
             */
            get: function () {
                return this.curNum;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 收钱到账
         */
        ComHeader.prototype.take = function () {
            this.playNum();
        };
        /**
         * 播放数字切换效果
         */
        ComHeader.prototype.playNum = function () {
            var _this = this;
            if (!this.diffNum) {
                return;
            }
            var self = this;
            var baseNum = this.curNum;
            this.curNum += this.diffNum;
            var change = function (random) {
                var diffNum = random - baseNum; //与原数字的差
                var absNum = Math.abs(diffNum); //差取绝对值
                var changeTimes = absNum < gConst.changeGoldTimes ? absNum : gConst.changeGoldTimes;
                var changeUnit = absNum < gConst.changeGoldTimes ? 1 : Math.floor(diffNum / gConst.changeGoldTimes); //每次变化的值
                //依次变化
                var i = 0;
                var changeNum = function () {
                    setTimeout(function () {
                        //过程中
                        _this.num.text = gMath.switchNum(baseNum += changeUnit, true, 12);
                        //最后一步指定最终值
                        if (i == changeTimes - 1) {
                            _this.num.text = gMath.switchNum(_this.curNum, true, 12);
                            _this.dispatchEventWith(egret.Event.COMPLETE);
                            return;
                        }
                        i++;
                        changeNum();
                    }, gConst.changeGoldTimer * (i + 1));
                };
                changeNum();
            };
            var start = function () {
                var _max;
                var _min;
                if (_this.curNum > baseNum) {
                    _max = _this.curNum;
                    _min = baseNum;
                }
                else {
                    _max = baseNum;
                    _min = _this.curNum;
                }
                var random = Math.floor(Math.random() * _max + _min);
                change(random);
            };
            start();
        };
        ComHeader.prototype.startTime = function () {
            this.timeDelay = egret.setInterval(this.updateTime, this, 2500);
        };
        ComHeader.prototype.updateTime = function () {
            this.curTime++;
            this.time.text = gMath.switchHour(this.curTime);
            if (this.curTime == 18) {
            }
            else if (this.curTime >= 20) {
                this.icon.source = "p_night_png";
                this.stopTime();
            }
        };
        ComHeader.prototype.stopTime = function () {
            egret.clearInterval(this.timeDelay);
        };
        return ComHeader;
    }(com.ComFile));
    com.ComHeader = ComHeader;
    __reflect(ComHeader.prototype, "com.ComHeader");
})(com || (com = {}));
//# sourceMappingURL=ComHeader.js.map