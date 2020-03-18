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
     * 控件基础文件
     */
    var ComFileBase = (function (_super) {
        __extends(ComFileBase, _super);
        /**
         * 构建组件
         */
        function ComFileBase() {
            var _this = _super.call(this) || this;
            _this.isLoadRes = null; //是否已loadRes()资源
            _this.isFirstOpen = true; //是否第一次创建组件
            _this.classId = gAutoId.id;
            _this.className = _this.__proto__.__class__.split(".")[1];
            _this.isFirstOpen = true;
            return _this;
        }
        /**
         * 打开组件
         * @param {any[]} args open()传参会通过init()传过去
         */
        ComFileBase.prototype.open = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            this.init.apply(this, args);
            if (!this.isLoadRes) {
                this.isLoadRes = true;
                this.load();
            }
            this._resizeView();
            GameMgr.gameview.removeEventListener(gConst.eventType.RESIZE_VIEW, this._resizeView, this);
            GameMgr.gameview.addEventListener(gConst.eventType.RESIZE_VIEW, this._resizeView, this);
            this._rotateView();
            GameMgr.gameview.removeEventListener(gConst.eventType.ROTATE_VIEW, this._rotateView, this);
            GameMgr.gameview.addEventListener(gConst.eventType.ROTATE_VIEW, this._rotateView, this);
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
        /** 关闭组件 */
        ComFileBase.prototype.close = function () {
            this.end();
            gComMgr.rmObj(this);
            this.dispatchEventWith(gConst.eventType.CLOSE);
        };
        /** 结束组件 */
        ComFileBase.prototype.end = function () {
            this.isLoadRes = false;
            GameMgr.gameview.removeEventListener(gConst.eventType.RESIZE_VIEW, this._resizeView, this);
            GameMgr.gameview.removeEventListener(gConst.eventType.ROTATE_VIEW, this._rotateView, this);
            this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
            this.removeEvent();
            // gComMgr.rmEvent(this);
            this.stop();
        };
        /** 显示组件 */
        ComFileBase.prototype.show = function () {
            this.visible = true;
        };
        /** 隐藏组件 */
        ComFileBase.prototype.hide = function () {
            this.visible = false;
        };
        /** 销毁组件 */
        ComFileBase.prototype.destroy = function (isAim) {
            GameMgr.gameview.removeEventListener(gConst.eventType.RESIZE_VIEW, this.resizeView, this);
            GameMgr.gameview.removeEventListener(gConst.eventType.ROTATE_VIEW, this.rotateView, this);
            this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
            this.removeEvent();
            this.isFirstOpen = false;
            if (!isAim) {
                gComMgr.destory(this);
            }
            else {
                gComMgr.fadeOutDestory(this);
            }
        };
        /** 点击下载(用户点击下载，调用SDK函数) */
        ComFileBase.prototype.clickInstall = function (event) {
            if (event) {
                event.stopPropagation();
            }
            Mapi.install();
        };
        /** 窗口大小改变时调用 */
        ComFileBase.prototype._resizeView = function (event) {
            this.resizeView(event);
            // this.updataParticlesEmitter();
        };
        /** 屏幕横竖屏转换时调用 */
        ComFileBase.prototype._rotateView = function (event) {
            this.rotateView(event);
        };
        return ComFileBase;
    }(eui.Component));
    com.ComFileBase = ComFileBase;
    __reflect(ComFileBase.prototype, "com.ComFileBase");
})(com || (com = {}));
//# sourceMappingURL=ComFileBase.js.map