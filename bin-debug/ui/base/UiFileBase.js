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
     * UI基础文件
     */
    var UiFileBase = (function (_super) {
        __extends(UiFileBase, _super);
        function UiFileBase() {
            var _this = _super.call(this) || this;
            _this.isUiFirstLimit = true; //是否受UiFirstView限制  默认为true:保证 UiFirstView 在最顶层，false: 打开放最顶层
            _this.isLoadRes = null; //是否已loadRes()资源
            _this.isFirstOpen = true; //是否第一次打开界面
            _this.screenType = null; //横竖屏类型
            _this.mobileType = null; //设备类型
            _this.classId = gAutoId.id;
            // this.className = (this as any).__proto__.__class__.split(".")[1];
            _this.isFirstOpen = true;
            return _this;
        }
        /**
         * 打开界面
         * @param {any[]} args open()传参会通过init()传过去
         */
        UiFileBase.prototype.open = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (this.className === gDevelop.classToString(ui.UiFirst)) {
                GameMgr.gameview.addChild(this);
            }
            else {
                var UiFirst_1 = gUiMgr.get(ui.UiFirst);
                if (UiFirst_1 && UiFirst_1.parent && this.isUiFirstLimit) {
                    //保证 UiFirstView 在最顶层
                    var idx = GameMgr.gameview.getChildIndex(UiFirst_1);
                    if (this.parent === GameMgr.gameview) {
                        idx--;
                        idx = Math.max(idx, 0);
                    }
                    GameMgr.gameview.addChildAt(this, idx);
                }
                else {
                    GameMgr.gameview.addChild(this);
                }
            }
            this.init.apply(this, args);
            if (this.isFirstOpen) {
                this._initResizeView();
            }
            if (!this.isLoadRes) {
                this.isLoadRes = true;
                this.load();
            }
            this._resizeView();
            GameMgr.stage.removeEventListener(egret.Event.RESIZE, this._resizeView, this);
            GameMgr.stage.addEventListener(egret.Event.RESIZE, this._resizeView, this);
            this.start();
            this.update();
            this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
            this.addEventListener(egret.Event.ENTER_FRAME, this.update, this);
            this.removeEvent();
            this.addEvent();
            if (this.isFirstOpen) {
                this.isFirstOpen = false;
            }
        };
        /** 关闭界面 */
        UiFileBase.prototype.close = function () {
            this.end();
            gComMgr.rmObj(this);
            this.dispatchEventWith(gConst.eventType.CLOSE);
        };
        /** 结束界面 */
        UiFileBase.prototype.end = function () {
            this.isLoadRes = false;
            GameMgr.stage.removeEventListener(egret.Event.RESIZE, this._resizeView, this);
            this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
            this.removeEvent();
            // gComMgr.rmEvent(this);
            this.stop();
        };
        /** 显示界面 */
        UiFileBase.prototype.show = function () {
            this.visible = true;
        };
        /** 隐藏界面 */
        UiFileBase.prototype.hide = function () {
            this.visible = false;
        };
        /** 销毁界面 */
        UiFileBase.prototype.destroy = function (isAim) {
            var uiFile = gUiMgr.getByClassName(this.className);
            if (uiFile) {
                uiFile.removeEventListener(egret.Event.ENTER_FRAME, uiFile.update, uiFile);
                uiFile.removeEvent();
                if (!isAim) {
                    uiFile = gComMgr.destory(uiFile);
                }
                else {
                    gComMgr.fadeOutDestory(uiFile);
                }
                gUiMgr.destroy(this.className);
                this.isLoadRes = null;
            }
        };
        /** 点击下载(用户点击下载，调用SDK函数) */
        UiFileBase.prototype.clickInstall = function (event) {
            if (event) {
                event.stopPropagation();
            }
            Mapi.install();
        };
        /** 点击重玩 */
        UiFileBase.prototype.clickReplay = function (event) {
            event.stopPropagation();
            GameMgr.replay();
        };
        /** 游戏结束(SDK上报需要) */
        UiFileBase.prototype.gameEnd = function () {
            Mapi.gameEnd();
        };
        /* =========== 闪烁物代码-start =========== */
        /** 初始化窗口大小 */
        UiFileBase.prototype._initResizeView = function () {
            var winW = GameMgr.getWinW;
            var winH = GameMgr.getWinH;
            var _w; //当前窗口宽度
            var _h; //当前窗口高度
            var _r; //当前窗口宽高比
            var isRotate = this.isFirstOpen; //是否第一次打开界面，或存在转屏
            if (winW < winH) {
                //竖屏
                if (this.screenType === 0 /* HORIZONTAL */) {
                    isRotate = true;
                }
                this.screenType = 1 /* VERTICAL */;
                _w = 750 /* WIDTH */;
                _h = 750 /* WIDTH */ / winW * winH;
                _r = winW / winH;
            }
            else {
                //横屏
                if (this.screenType === 1 /* VERTICAL */) {
                    isRotate = true;
                }
                this.screenType = 0 /* HORIZONTAL */;
                _h = 750 /* WIDTH */;
                _w = 750 /* WIDTH */ / winH * winW;
                _r = winH / winW;
            }
            this.width = Math.ceil(_w);
            this.height = Math.ceil(_h);
            this.mobileType = _r < 0.51 ? 1 /* IPHONE_X */ : _r < 0.65 ? 2 /* IPHONE_8 */ : 3 /* IPAD */;
            return isRotate;
        };
        /** 窗口大小改变时调用 */
        UiFileBase.prototype._resizeView = function (event) {
            var isRotate = this._initResizeView(); //是否第一次打开界面，或存在转屏
            this.resizeView();
            // this.updataParticlesEmitter();
            if (isRotate) {
                this.rotateView();
            }
        };
        return UiFileBase;
    }(eui.Component));
    ui.UiFileBase = UiFileBase;
    __reflect(UiFileBase.prototype, "ui.UiFileBase");
})(ui || (ui = {}));
//# sourceMappingURL=UiFileBase.js.map