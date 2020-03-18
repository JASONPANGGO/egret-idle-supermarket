namespace com {
	/**
	 * 控件基础文件
	 */
	export abstract class ComFileBase extends eui.Component {
		public classId: number; //不需要重写，自动设置
		public className: string; //不需要重写，自动设置
		/**
		 * 初始化
		 * @param {any[]} args 构建传参会通过init()传过去
		 */
		protected abstract init(...args: any[]);
		protected abstract load(); //首次创建组件时调用
		protected abstract resizeView(event: egret.Event); //窗口大小改变时调用(每次打开界面会调用一次)
		protected abstract rotateView(event: egret.Event); //屏幕横竖屏转换时调用(每次打开界面会调用一次)
		protected abstract start(); //每次创建组件都会调用
		protected abstract stop(); //每次结束组件都会调用
		protected abstract update(); //监听组件，每帧都会调用
		protected abstract removeEvent(); //移除事件
		protected abstract addEvent(); //注册事件

		public isLoadRes: boolean = null; //是否已loadRes()资源
		public isFirstOpen: boolean = true; //是否第一次创建组件

		/**
		 * 构建组件
		 */
		public constructor() {
			super();
			this.classId = gAutoId.id;
			this.className = (this as any).__proto__.__class__.split(".")[1];
			this.isFirstOpen = true;
		}

		/**
		 * 打开组件
		 * @param {any[]} args open()传参会通过init()传过去
		 */
		public open(...args: any[]) {
			this.init(...args);
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
		}

		/** 关闭组件 */
		public close() {
			this.end();
			gComMgr.rmObj(this);
			this.dispatchEventWith(gConst.eventType.CLOSE);
		}

		/** 结束组件 */
		public end() {
			this.isLoadRes = false;
			GameMgr.gameview.removeEventListener(gConst.eventType.RESIZE_VIEW, this._resizeView, this);
			GameMgr.gameview.removeEventListener(gConst.eventType.ROTATE_VIEW, this._rotateView, this);
			this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
			this.removeEvent();
			// gComMgr.rmEvent(this);
			this.stop();
		}

		/** 显示组件 */
		public show() {
			this.visible = true;
		}

		/** 隐藏组件 */
		public hide() {
			this.visible = false;
		}

		/** 销毁组件 */
		public destroy(isAim?: boolean) {
			GameMgr.gameview.removeEventListener(gConst.eventType.RESIZE_VIEW, this.resizeView, this);
			GameMgr.gameview.removeEventListener(gConst.eventType.ROTATE_VIEW, this.rotateView, this);
			this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
			this.removeEvent();
			this.isFirstOpen = false;
			if (!isAim) {
				gComMgr.destory(this);
			} else {
				gComMgr.fadeOutDestory(this);
			}
		}

		/** 点击下载(用户点击下载，调用SDK函数) */
		public clickInstall(event?: egret.TouchEvent): void {
			if (event) {
				event.stopPropagation();
			}
			Mapi.install();
		}

	

		/** 窗口大小改变时调用 */
		private _resizeView(event?: egret.Event) {
			this.resizeView(event);
			// this.updataParticlesEmitter();
		}

		/** 屏幕横竖屏转换时调用 */
		private _rotateView(event?: egret.Event) {
			this.rotateView(event);
		}
	}
}