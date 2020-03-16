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
     * 按钮组件
     */
    var ComBtn = (function (_super) {
        __extends(ComBtn, _super);
        function ComBtn() {
            var _this = _super.call(this) || this;
            _this.currPosId = 0;
            _this.maxPosId = 2;
            _this.skinName = skins.ComBtn;
            return _this;
        }
        /* =========== 框架结构代码-start =========== */
        /**
         * 初始化
         * @param {any[]} args 构建传参会通过init()传过去
         */
        ComBtn.prototype.init = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // console.info("init", ...args);
        };
        /** 首次创建组件时调用 */
        ComBtn.prototype.load = function () {
            // console.info("load");
        };
        /** 每次创建组件都会调用 */
        ComBtn.prototype.start = function () {
            // console.info("start");
            var loupe = this.loupe;
            var currPosId = this.currPosId = 0;
            var pos = this["pos" + currPosId];
            loupe.visible = false;
            loupe.x = pos.x;
            loupe.y = pos.y;
            this.showLoupe();
        };
        /** 每次结束组件都会调用 */
        ComBtn.prototype.stop = function () {
            // console.info("stop");
        };
        /** 监听组件，每帧都会调用 */
        ComBtn.prototype.update = function () {
            // console.info("update");
        };
        /** 注册事件 */
        ComBtn.prototype.addEvent = function () {
            // console.info("addEvent");
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickInstall, this);
        };
        /** 移除事件 */
        ComBtn.prototype.removeEvent = function () {
            // console.info("removeEvent");
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickInstall, this);
        };
        /** 窗口大小改变时调用 */
        ComBtn.prototype.resizeView = function (event) {
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
        ComBtn.prototype.rotateView = function (event) {
            // console.info("rotateView", event, GameMgr.screenType, GameMgr.mobileType);
            if (GameMgr.screenType == 1 /* VERTICAL */) {
            }
            else {
            }
        };
        /* =========== 框架结构代码-end =========== */
        /* =========== 业务代码-start =========== */
        ComBtn.prototype.move = function (item, x, y, speed, ease, callBack, thisObj) {
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
        ComBtn.prototype.showLoupe = function () {
            var loupe = this.loupe;
            gTween.fadeIn(loupe, 300, 1, void 0, void 0, {
                callback: this.moveLoupe,
                thisObj: this
            });
        };
        ComBtn.prototype.moveLoupe = function () {
            var loupe = this.loupe;
            var currPosId = this.currPosId;
            currPosId++;
            if (currPosId > this.maxPosId) {
                currPosId = 0;
            }
            this.currPosId = currPosId;
            var pos = this["pos" + currPosId];
            this.move(loupe, pos.x, pos.y, 100, void 0, this.moveLoupe, this);
        };
        return ComBtn;
    }(com.ComFile));
    com.ComBtn = ComBtn;
    __reflect(ComBtn.prototype, "com.ComBtn");
})(com || (com = {}));
//# sourceMappingURL=ComBtn.js.map