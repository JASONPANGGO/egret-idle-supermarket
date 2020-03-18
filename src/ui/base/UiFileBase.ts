namespace ui {
	/**
	 * UI基础文件
	 */
	export abstract class UiFileBase extends eui.Component {
		public isUiFirstLimit: boolean = true; //是否受UiFirstView限制  默认为true:保证 UiFirstView 在最顶层，false: 打开放最顶层
		public classId: number; //不需要重写，自动设置
		public className: string; //不需要重写，自动设置
		/**
		 * 初始化
		 * @param {any[]} args open()传参会通过init()传过去
		 */
		protected abstract init(...args: any[]);
		protected abstract load(); //首次打开界面时调用
		protected abstract start(); //每次打开界面都会调用
		protected abstract stop(); //每次结束界面都会调用
		protected abstract update(); //监听界面，每帧都会调用
		protected abstract removeEvent(); //移除事件
		protected abstract addEvent(); //注册事件
		protected abstract resizeView(); //窗口大小改变时调用(每次打开界面会调用一次)
		protected abstract rotateView(); //屏幕横竖屏转换时调用(每次打开界面会调用一次)

		public isLoadRes: boolean = null; //是否已loadRes()资源
		public isFirstOpen: boolean = true; //是否第一次打开界面
		public screenType: gConst.screenType = null; //横竖屏类型
		public mobileType: gConst.mobileType = null; //设备类型

		public constructor() {
			super();
			this.classId = gAutoId.id;
			// this.className = (this as any).__proto__.__class__.split(".")[1];
			this.isFirstOpen = true;
		}

		/**
		 * 打开界面
		 * @param {any[]} args open()传参会通过init()传过去
		 */
		public open(...args: any[]) {
			if (this.className === gDevelop.classToString(ui.UiFirst)) {
				GameMgr.gameview.addChild(this);
			} else {
				const UiFirst: ui.UiFirst = gUiMgr.get(ui.UiFirst) as ui.UiFirst;
				if (UiFirst && UiFirst.parent && this.isUiFirstLimit) {
					//保证 UiFirstView 在最顶层
					let idx: number = GameMgr.gameview.getChildIndex(UiFirst);
					if (this.parent === GameMgr.gameview) {
						idx--;
						idx = Math.max(idx, 0);
					}
					GameMgr.gameview.addChildAt(this, idx);
				} else {
					GameMgr.gameview.addChild(this);
				}
			}
			this.init(...args);
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
		}

		/** 关闭界面 */
		public close() {
			this.end();
			gComMgr.rmObj(this);
			this.dispatchEventWith(gConst.eventType.CLOSE);
		}

		/** 结束界面 */
		public end() {
			this.isLoadRes = false;
			GameMgr.stage.removeEventListener(egret.Event.RESIZE, this._resizeView, this);
			this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
			this.removeEvent();
			// gComMgr.rmEvent(this);
			this.stop();
		}

		/** 显示界面 */
		public show() {
			this.visible = true;
		}

		/** 隐藏界面 */
		public hide() {
			this.visible = false;
		}

		/** 销毁界面 */
		public destroy(isAim?: boolean) {
			let uiFile: ui.UiFileBase = gUiMgr.getByClassName(this.className);
			if (uiFile) {
				uiFile.removeEventListener(egret.Event.ENTER_FRAME, uiFile.update, uiFile);
				uiFile.removeEvent();
				if (!isAim) {
					uiFile = gComMgr.destory(uiFile);
				} else {
					gComMgr.fadeOutDestory(uiFile);
				}
				gUiMgr.destroy(this.className);
				this.isLoadRes = null;
			}
		}

		/** 点击下载(用户点击下载，调用SDK函数) */
		public clickInstall(event?: egret.TouchEvent): void {
			if (event) {
				event.stopPropagation();
			}
			Mapi.install();
		}

		/** 点击重玩 */
		public clickReplay(event: egret.TouchEvent): void {
			event.stopPropagation();
			GameMgr.replay();
		}

		/** 游戏结束(SDK上报需要) */
		public gameEnd(): void {
			Mapi.gameEnd();
		}

	

		/* =========== 闪烁物代码-start =========== */
	

		/** 初始化窗口大小 */
		private _initResizeView(): boolean {
			const winW: number = GameMgr.getWinW;
			const winH: number = GameMgr.getWinH;
			let _w: number; //当前窗口宽度
			let _h: number; //当前窗口高度
			let _r: number; //当前窗口宽高比
			let isRotate: boolean = this.isFirstOpen; //是否第一次打开界面，或存在转屏
			if (winW < winH) {
				//竖屏
				if (this.screenType === gConst.screenType.HORIZONTAL) {
					isRotate = true;
				}
				this.screenType = gConst.screenType.VERTICAL;
				_w = gConst.screen.WIDTH;
				_h = gConst.screen.WIDTH / winW * winH;

				_r = winW / winH;
			} else {
				//横屏
				if (this.screenType === gConst.screenType.VERTICAL) {
					isRotate = true;
				}
				this.screenType = gConst.screenType.HORIZONTAL;
				_h = gConst.screen.WIDTH;
				_w = gConst.screen.WIDTH / winH * winW;

				_r = winH / winW;
			}
			this.width = Math.ceil(_w);
			this.height = Math.ceil(_h);
			this.mobileType = _r < 0.51 ? gConst.mobileType.IPHONE_X : _r < 0.65 ? gConst.mobileType.IPHONE_8 : gConst.mobileType.IPAD;
			return isRotate;
		}

		/** 窗口大小改变时调用 */
		private _resizeView(event?: egret.Event) {
			const isRotate: boolean = this._initResizeView(); //是否第一次打开界面，或存在转屏
			this.resizeView();
			// this.updataParticlesEmitter();
			if (isRotate) {
				this.rotateView();
			}
		}
	}
}