/**
 * 主场景界面
 */
class MainView extends eui.Component {
	private curw: number;
	public constructor() {
		super();
		GameMgr.init();
		GameMgr.mainView = this;
		GameMgr.gameview = new scene.GameScene();
		GameMgr.gameview.open();

		this.addEventListener(egret.Event.ENTER_FRAME, this.update, this);
		this.addChild(GameMgr.gameview);
	}

	private update(e): void {
		const winW: number = GameMgr.getWinW;
		if (this.curw != winW) {
			this.resizeView();
		}
	}

	/**
	 * 初始化窗口大小
	 * @param {boolean} rotate = void 0 是否转屏
	 */
	public initResizeView(rotate?: boolean): boolean {
		const winW: number = GameMgr.getWinW;
		const winH: number = GameMgr.getWinH;
		let isRotate: boolean = GameMgr.screenType === null || rotate; //是否转屏
		let _r: number; //当前窗口宽高比
		if (GameMgr.stage.stageWidth < GameMgr.stage.stageHeight) {
			//竖屏
			if (GameMgr.screenType === gConst.screenType.HORIZONTAL) {
				isRotate = true;
			}
			GameMgr.screenType = gConst.screenType.VERTICAL;
			GameMgr.stage.scaleMode = egret.StageScaleMode.FIXED_WIDTH;
			_r = GameMgr.stage.stageWidth / GameMgr.stage.stageHeight;
		} else {
			//横屏
			if (GameMgr.screenType === gConst.screenType.VERTICAL) {
				isRotate = true;
			}
			GameMgr.screenType = gConst.screenType.HORIZONTAL;
			GameMgr.stage.scaleMode = egret.StageScaleMode.FIXED_HEIGHT;
			_r = GameMgr.stage.stageHeight / GameMgr.stage.stageWidth;
		}
		GameMgr.mobileType = _r < 0.51 ? gConst.mobileType.IPHONE_X : _r < 0.65 ? gConst.mobileType.IPHONE_8 : gConst.mobileType.IPAD;

		this.curw = winW;
		let _w: number;
		let _h: number;
		if (winW > winH) {
			_h = gConst.screen.WIDTH;
			_w = gConst.screen.WIDTH / winH * winW;
			GameMgr.stage.orientation = egret.OrientationMode.LANDSCAPE;
		} else {
			_w = gConst.screen.WIDTH;
			_h = gConst.screen.WIDTH / winW * winH;
			GameMgr.stage.orientation = egret.OrientationMode.PORTRAIT;
		}
		if (GameMgr.gameview) {
			GameMgr.gameview.width = Math.ceil(_w);
			GameMgr.gameview.height = Math.ceil(_h);
		}
		GameMgr.scale = 1;
		return isRotate;
	}

	/**
	 * 窗口大小改变时调用
	 * @param {boolean} rotate = void 0 是否转屏
	 */
	public resizeView(event?: egret.Event, rotate?: boolean): void {
		const isRotate: boolean = this.initResizeView(rotate); //是否转屏
		this._resizeView();
		if (isRotate) {
			this._rotateView();
		}
	}

	/** 窗口大小改变时调用 */
	private _resizeView() {
		if (GameMgr.gameview) {
			GameMgr.gameview.resizeView();
		}
	}

	/** 屏幕横竖屏转换时才调用 */
	private _rotateView() {
		if (GameMgr.gameview) {
			GameMgr.gameview.rotateView();
		}
	}
}