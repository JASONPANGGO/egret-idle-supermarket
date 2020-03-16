namespace com {
	/**
	 * 按钮组件
	 */
	export class ComBtn extends com.ComFile {
		public con: eui.Group;
		public btn: eui.Image;
		public loupe: eui.Image;
		public pos0: eui.Image;
		public pos1: eui.Image;
		public pos2: eui.Image;

		private currPosId = 0;
		private readonly maxPosId = 2;

		public constructor() {
			super();
			this.skinName = skins.ComBtn;
		}

		/* =========== 框架结构代码-start =========== */
		/**
		 * 初始化
		 * @param {any[]} args 构建传参会通过init()传过去
		 */
		protected init(...args: any[]) {
			// console.info("init", ...args);
		}

		/** 首次创建组件时调用 */
		protected load() {
			// console.info("load");
		}

		/** 每次创建组件都会调用 */
		protected start() {
			// console.info("start");
			const loupe = this.loupe;
			const currPosId = this.currPosId = 0;
			const pos = this[`pos${currPosId}`];

			loupe.visible = false;
			loupe.x = pos.x;
			loupe.y = pos.y;
			this.showLoupe();
		}

		/** 每次结束组件都会调用 */
		protected stop() {
			// console.info("stop");
		}

		/** 监听组件，每帧都会调用 */
		protected update() {
			// console.info("update");
		}

		/** 注册事件 */
		protected addEvent() {
			// console.info("addEvent");
			this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickInstall, this);
		}

		/** 移除事件 */
		protected removeEvent() {
			// console.info("removeEvent");
			this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickInstall, this);
		}

		/** 窗口大小改变时调用 */
		protected resizeView(event?: egret.Event) {
			// console.info("resizeView", event, GameMgr.gameview.width, GameMgr.gameview.height);
			if (GameMgr.screenType == gConst.screenType.VERTICAL) {
				//竖屏
				switch (GameMgr.mobileType) {
					//iPhoneX或以上
					case gConst.mobileType.IPHONE_X:
						break;
					//iPhone8或以下
					case gConst.mobileType.IPHONE_8:
						break;
					//iPad或其它
					case gConst.mobileType.IPAD:
						break;
				}
			} else {
				//横屏
				switch (GameMgr.mobileType) {
					//iPhoneX或以上
					case gConst.mobileType.IPHONE_X:
						break;
					//iPhone8或以下
					case gConst.mobileType.IPHONE_8:
						break;
					//iPad或其它
					case gConst.mobileType.IPAD:
						break;
				}
			}
		}

		/** 屏幕横竖屏转换时调用 */
		protected rotateView(event: egret.Event) {
			// console.info("rotateView", event, GameMgr.screenType, GameMgr.mobileType);
			if (GameMgr.screenType == gConst.screenType.VERTICAL) {
				//竖屏
			} else {
				//横屏
			}
		}
		/* =========== 框架结构代码-end =========== */


		/* =========== 业务代码-start =========== */
		private move(item: egret.DisplayObject, x: number = item.x, y: number = item.y, speed: number = 500, ease?: { x: Function, y?: Function }, callBack?: Function, thisObj?: any, ...params: any[]): number {
			//开始移动
			let time: number = gMath.getTimeBySpeed(item.x, item.y, x, y, speed);
			gTween.toMove(item, x, y, { x: time }, void 0, void 0, ease, void 0, {
				callback: () => {
					if (callBack) {
						callBack.call(thisObj, ...params);
					}
				}
			});
			return time;
		}

		private showLoupe() {
			const loupe = this.loupe;

			gTween.fadeIn(loupe, 300, 1, void 0, void 0, {
				callback: this.moveLoupe,
				thisObj: this
			});
		}

		private moveLoupe() {
			const loupe = this.loupe;

			let currPosId = this.currPosId;
			currPosId++;
			if (currPosId > this.maxPosId) {
				currPosId = 0;
			}
			this.currPosId = currPosId;
			const pos = this[`pos${currPosId}`];
			this.move(loupe, pos.x, pos.y, 100, void 0, this.moveLoupe, this);
		}
		/* =========== 业务代码-end =========== */
	}
}