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
     * 导航、菜单组件
     */
    var ComNav = (function (_super) {
        __extends(ComNav, _super);
        function ComNav() {
            var _this = _super.call(this) || this;
            _this.skinName = skins.ComNav;
            return _this;
        }
        /* =========== 生命周期结构代码-start =========== */
        /**
         * 初始化
         * @param {any[]} args 构建传参会通过init()传过去
         */
        ComNav.prototype.init = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // console.info("init", ...args);
        };
        /** 首次创建组件时调用 */
        ComNav.prototype.load = function () {
            // console.info("load");
            this.initBg();
            this.updateRender(2, 10);
            this.updateRender(6, 10);
            this.ok2.visible = false;
            this.ok6.visible = false;
        };
        /** 每次创建组件都会调用 */
        ComNav.prototype.start = function () {
            // console.info("start");
        };
        /** 每次结束组件都会调用 */
        ComNav.prototype.stop = function () {
            // console.info("stop");
        };
        /** 监听组件，每帧都会调用 */
        ComNav.prototype.update = function () {
            // console.info("update");
        };
        /** 注册事件 */
        ComNav.prototype.addEvent = function () {
            // console.info("addEvent");
        };
        /** 移除事件 */
        ComNav.prototype.removeEvent = function () {
            // console.info("removeEvent");
        };
        /** 窗口大小改变时调用 */
        ComNav.prototype.resizeView = function (event) {
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
        ComNav.prototype.rotateView = function (event) {
            // console.info("rotateView", event, GameMgr.screenType, GameMgr.mobileType);
            if (GameMgr.screenType == 1 /* VERTICAL */) {
                //竖屏
                this.con.width = this.bg.height;
                this.con.height = this.bg.width;
                this.bg.rotation = 90;
                this.item0.horizontalCenter = NaN;
                this.item0.top = NaN;
                this.item1.horizontalCenter = NaN;
                this.item1.bottom = NaN;
                this.item0.verticalCenter = 0;
                this.item0.left = 100;
                this.item1.verticalCenter = 0;
                this.item1.right = 100;
            }
            else {
                //横屏
                this.con.width = this.bg.width;
                this.con.height = this.bg.height;
                this.bg.rotation = 0;
                this.item0.verticalCenter = NaN;
                this.item0.left = NaN;
                this.item1.verticalCenter = NaN;
                this.item1.right = NaN;
                this.item0.horizontalCenter = 0;
                this.item0.top = 100;
                this.item1.horizontalCenter = 0;
                this.item1.bottom = 100;
            }
            if (this.parent) {
                this.parent.width = this.con.width;
                this.parent.height = this.con.height;
            }
        };
        /* =========== 生命周期结构代码-end =========== */
        /* =========== 业务代码-start =========== */
        ComNav.prototype.getTarget = function (id) {
            return this["target" + id];
        };
        /** 改变数量 */
        ComNav.prototype.change = function (id, num) {
            var item = this["num" + id];
            if (!item) {
                return;
            }
            item["cnt"] += num;
            this.updateRender(id);
        };
        ComNav.prototype.updateRender = function (id, cnt) {
            var item = this["num" + id];
            if (!item) {
                return;
            }
            cnt = cnt != void 0 ? cnt : item["cnt"];
            if (cnt < 0) {
                cnt = 0;
            }
            item["cnt"] = cnt;
            if (cnt == 0) {
                var ok = this["ok" + id];
                if (ok) {
                    item.visible = false;
                    ok.visible = true;
                }
                gSoundMgr.playEff("smfinish");
            }
            // console.log("updateRender", id);
            item.text = gMath.switchNum(cnt);
        };
        ComNav.prototype.initBg = function () {
            gComMgr.setObjAnchor(this.bg);
        };
        return ComNav;
    }(com.ComFile));
    com.ComNav = ComNav;
    __reflect(ComNav.prototype, "com.ComNav");
})(com || (com = {}));
//# sourceMappingURL=ComNav.js.map