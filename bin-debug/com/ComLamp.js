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
     * 灯泡组件
     */
    var ComLamp = (function (_super) {
        __extends(ComLamp, _super);
        function ComLamp() {
            var _this = _super.call(this) || this;
            _this.skinName = skins.ComLamp;
            return _this;
        }
        /* =========== 框架结构代码-start =========== */
        /**
         * 初始化
         * @param {any[]} args 构建传参会通过init()传过去
         */
        ComLamp.prototype.init = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // console.info("init", ...args);
        };
        /** 首次创建组件时调用 */
        ComLamp.prototype.load = function () {
            // console.info("load");
            var light = this.light;
            gTween.rmTweens(light);
            light.visible = false;
        };
        /** 每次创建组件都会调用 */
        ComLamp.prototype.start = function () {
            // console.info("start");
        };
        /** 每次结束组件都会调用 */
        ComLamp.prototype.stop = function () {
            // console.info("stop");
        };
        /** 监听组件，每帧都会调用 */
        ComLamp.prototype.update = function () {
            // console.info("update");
        };
        /** 注册事件 */
        ComLamp.prototype.addEvent = function () {
            // console.info("addEvent");
        };
        /** 移除事件 */
        ComLamp.prototype.removeEvent = function () {
            // console.info("removeEvent");
        };
        /** 窗口大小改变时调用 */
        ComLamp.prototype.resizeView = function (event) {
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
        ComLamp.prototype.rotateView = function (event) {
            // console.info("rotateView", event, GameMgr.screenType, GameMgr.mobileType);
            if (GameMgr.screenType == 1 /* VERTICAL */) {
            }
            else {
            }
        };
        /** 开灯 */
        ComLamp.prototype.on = function (offWait) {
            if (this.isON) {
                return;
            }
            this.isON = true;
            offWait = offWait || 100;
            var light = this.light;
            gTween.fadeIn(this.light, 100, void 0, void 0, { duration: offWait }, {
                callback: this.off, thisObj: this
            });
        };
        /** 关灯 */
        ComLamp.prototype.off = function () {
            if (!this.isON) {
                return;
            }
            this.isON = false;
            var light = this.light;
            gTween.fadeOut(this.light, 300);
        };
        return ComLamp;
    }(com.ComFile));
    com.ComLamp = ComLamp;
    __reflect(ComLamp.prototype, "com.ComLamp");
})(com || (com = {}));
//# sourceMappingURL=ComLamp.js.map