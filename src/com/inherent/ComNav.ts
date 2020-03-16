namespace com {
	/**
	 * 导航、菜单组件
	 */
	export class ComNav extends com.ComFile {
		public con: eui.Group;
		public bg: eui.Image;
		public item0: eui.Group;
		public target2: eui.Image;
		public num2: eui.Label;
		public ok2: eui.Image;
		public item1: eui.Group;
		public target6: eui.Image;
		public num6: eui.Label;
		public ok6: eui.Image;

		public constructor() {
			super();
			this.skinName = skins.ComNav;
		}

		/* =========== 生命周期结构代码-start =========== */
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
			this.initBg();
			this.updateRender(2, 10);
			this.updateRender(6, 10);
			this.ok2.visible = false;
			this.ok6.visible = false;
		}

		/** 每次创建组件都会调用 */
		protected start() {
			// console.info("start");
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
		}

		/** 移除事件 */
		protected removeEvent() {
			// console.info("removeEvent");
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
			} else {
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
		}
		/* =========== 生命周期结构代码-end =========== */


		/* =========== 业务代码-start =========== */
		public getTarget(id: number): eui.Image {
			return this[`target${id}`];
		}

		/** 改变数量 */
		public change(id: number, num: number) {
			const item: eui.Label = this[`num${id}`];
			if (!item) {
				return;
			}
			item["cnt"] += num;
			this.updateRender(id);
		}

		private updateRender(id: number, cnt?: number) {
			const item: eui.Label = this[`num${id}`];
			if (!item) {
				return;
			}
			cnt = cnt != void 0 ? cnt : item["cnt"];
			if (cnt < 0) {
				cnt = 0;
			}
			item["cnt"] = cnt;
			if (cnt == 0) {
				const ok: eui.Image = this[`ok${id}`];
				if (ok) {
					item.visible = false;
					ok.visible = true;
				}
				gSoundMgr.playEff("smfinish");
			}
			// console.log("updateRender", id);
			item.text = gMath.switchNum(cnt);
		}

		private initBg() {
			gComMgr.setObjAnchor(this.bg);
		}
		/* =========== 业务代码-end =========== */
	}
}