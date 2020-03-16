var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 主场景界面
 */
var MainView = (function (_super) {
    __extends(MainView, _super);
    function MainView() {
        var _this = _super.call(this) || this;
        GameMgr.init();
        GameMgr.mainView = _this;
        GameMgr.gameview = new scene.GameScene();
        GameMgr.gameview.open();
        _this.addEventListener(egret.Event.ENTER_FRAME, _this.update, _this);
        _this.addChild(GameMgr.gameview);
        return _this;
    }
    MainView.prototype.update = function (e) {
        var winW = GameMgr.getWinW;
        if (this.curw != winW) {
            this.resizeView();
        }
    };
    /**
     * 初始化窗口大小
     * @param {boolean} rotate = void 0 是否转屏
     */
    MainView.prototype.initResizeView = function (rotate) {
        var winW = GameMgr.getWinW;
        var winH = GameMgr.getWinH;
        var isRotate = GameMgr.screenType === null || rotate; //是否转屏
        var _r; //当前窗口宽高比
        if (GameMgr.stage.stageWidth < GameMgr.stage.stageHeight) {
            //竖屏
            if (GameMgr.screenType === 0 /* HORIZONTAL */) {
                isRotate = true;
            }
            GameMgr.screenType = 1 /* VERTICAL */;
            GameMgr.stage.scaleMode = egret.StageScaleMode.FIXED_WIDTH;
            _r = GameMgr.stage.stageWidth / GameMgr.stage.stageHeight;
        }
        else {
            //横屏
            if (GameMgr.screenType === 1 /* VERTICAL */) {
                isRotate = true;
            }
            GameMgr.screenType = 0 /* HORIZONTAL */;
            GameMgr.stage.scaleMode = egret.StageScaleMode.FIXED_HEIGHT;
            _r = GameMgr.stage.stageHeight / GameMgr.stage.stageWidth;
        }
        GameMgr.mobileType = _r < 0.51 ? 1 /* IPHONE_X */ : _r < 0.65 ? 2 /* IPHONE_8 */ : 3 /* IPAD */;
        this.curw = winW;
        var _w;
        var _h;
        if (winW > winH) {
            _h = 750 /* WIDTH */;
            _w = 750 /* WIDTH */ / winH * winW;
            GameMgr.stage.orientation = egret.OrientationMode.LANDSCAPE;
        }
        else {
            _w = 750 /* WIDTH */;
            _h = 750 /* WIDTH */ / winW * winH;
            GameMgr.stage.orientation = egret.OrientationMode.PORTRAIT;
        }
        if (GameMgr.gameview) {
            GameMgr.gameview.width = Math.ceil(_w);
            GameMgr.gameview.height = Math.ceil(_h);
        }
        GameMgr.scale = 1;
        return isRotate;
    };
    /**
     * 窗口大小改变时调用
     * @param {boolean} rotate = void 0 是否转屏
     */
    MainView.prototype.resizeView = function (event, rotate) {
        var isRotate = this.initResizeView(rotate); //是否转屏
        this._resizeView();
        if (isRotate) {
            this._rotateView();
        }
    };
    /** 窗口大小改变时调用 */
    MainView.prototype._resizeView = function () {
        if (GameMgr.gameview) {
            GameMgr.gameview.resizeView();
        }
    };
    /** 屏幕横竖屏转换时才调用 */
    MainView.prototype._rotateView = function () {
        if (GameMgr.gameview) {
            GameMgr.gameview.rotateView();
        }
    };
    return MainView;
}(eui.Component));
__reflect(MainView.prototype, "MainView");
//# sourceMappingURL=MainView.js.map