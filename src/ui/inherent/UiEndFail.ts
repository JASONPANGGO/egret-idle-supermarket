namespace ui {
	/**
	 * 结束页面（失败）
	 */
	export abstract class UiEndFail extends ui.UiFile {
		public black: eui.Rect;
		public conPeople: eui.Group;
		public people: eui.Image;
		public conBtn: eui.Group;
		public replay: eui.Image;
		public btn: com.ComBtn;

		public constructor() {
			super();
			this.skinName = skins.UiEndFail;
		}

		/* =========== 框架结构代码-start =========== */
		/**
		 * 初始化
		 * @param {any[]} args open()传参会通过init()传过去
		 */
		protected init(...args: any[]) {
			// console.info("init", ...args);
		}

		/** 首次打开界面时调用 */
		protected load() {
			// console.info("load");
		}

		/** 每次打开界面都会调用 */
		protected start() {
			// console.info("start");
			gSoundMgr.playEff("smtimeout");
			// if (GameMgr.endType == gConst.endType.VICTORY) {
			// 	this.createCaiDais();
			// }
		}

		/** 每次结束界面都会调用 */
		protected stop() {
			// console.info("stop");
		}

		/** 监听界面，每帧都会调用 */
		protected update() {
			// console.info("update");
		}

		/** 注册事件 */
		protected addEvent() {
			// console.info("addEvent");
			if (!gConst.globalClick) {
				this.btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickInstall, this);
			} else {
				this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickInstall, this);
			}
			if (GameMgr.isShowReplay()) {
				this.replay.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickReplay, this);
			}
		}

		/** 移除事件 */
		protected removeEvent() {
			// console.info("removeEvent");
			if (!gConst.globalClick) {
				this.btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickInstall, this);
			} else {
				this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickInstall, this);
			}
			if (GameMgr.isShowReplay()) {
				this.replay.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickReplay, this);
			}
		}

		/** 窗口大小改变时调用 */
		protected resizeView(): void {
			// console.info("resizeView", this.width, this.height);
			// var s1: number = this.width / this.con.width;
			// var s2: number = this.height / this.con.height;
			// this.con.scaleX = this.con.scaleY = Math.max(s1, s2);

			const conPeople = this.conPeople;
			const conBtn = this.conBtn;

			const baseScale: number = gConst.mobileByScale[GameMgr.screenType][GameMgr.mobileType];

			conPeople.scaleX = conPeople.scaleY = baseScale;
			conBtn.scaleX = conBtn.scaleY = baseScale;


			if (this.screenType == gConst.screenType.VERTICAL) {
				//竖屏
				// this.con.y = Math.floor(this.height * .75);
				// this.conLogo.y = Math.floor(this.height * .3);

				this.conPeople.scaleX = this.conPeople.scaleY = .9;

				switch (this.mobileType) {
					//iPhoneX或以上
					case gConst.mobileType.IPHONE_X:
						this.conPeople.scaleX = this.conPeople.scaleY = 1;
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
				this.conPeople.scaleX = this.conPeople.scaleY = 1;

				switch (this.mobileType) {
					//iPhoneX或以上
					case gConst.mobileType.IPHONE_X:
						conPeople.verticalCenter = "-38%";
						break;
					//iPhone8或以下
					case gConst.mobileType.IPHONE_8:
						conPeople.verticalCenter = "-40%";
						break;
					//iPad或其它
					case gConst.mobileType.IPAD:
						conPeople.verticalCenter = "-28%";
						break;
				}
			}
		}

		/** 屏幕横竖屏转换时调用 */
		protected rotateView(): void {
			// console.info("rotateView", this.screenType);
			const conPeople = this.conPeople;
			const conBtn = this.conBtn;

			if (this.screenType == gConst.screenType.VERTICAL) {
				//竖屏
				conPeople.verticalCenter = "-8%";
				conBtn.bottom = "18%";
			} else {
				//横屏
				conBtn.bottom = "6%";
			}
		}
		/* =========== 框架结构代码-end =========== */


		/* =========== 业务代码-start =========== */
		// private showLine() {
		// 	gTween.toBigShow(this.conLine, 300, 1.5, 1, void 0, void 0, {
		// 		callback: () => {
		// 			gTween.loopRotate(this.line0, 1, 7200);
		// 			gTween.loopRotate(this.line1, -1, 7200);
		// 		}
		// 	});
		// }

		// private particle: com.ComParticle;

		// private showParticle() {
		// 	if (!this.particle) {
		// 		this.particle = new com.ComParticle();
		// 		this.particle.setData(this.conLine, "star_2");
		// 		// this.particle.setIndex(1);
		// 		this.particle.setPos(this.conLine.width / 2, this.conLine.height / 2);
		// 	}
		// 	this.particle.start(500);
		// 	egret.setTimeout(this.showParticle, this, 1500);
		// }

		private showBlack() {
			gTween.fadeIn(this.black, 100, 1);
		}
		private hideBlack() {
			gTween.fadeOut(this.black, 50, 1);
		}

		private toTopShow(item: egret.DisplayObject | egret.DisplayObjectContainer, callback?: Function, thisObj?: any, ...arg: any[]) {
			gTween.toTopShow(item, 800, void 0, void 0, 1, egret.Ease.elasticOut, void 0, {
				callback: () => {
					if (callback) {
						callback.call(thisObj, ...arg);
					};
				}
			});
		}

		private toBottomShow(item: egret.DisplayObject | egret.DisplayObjectContainer, callback?: Function, thisObj?: any, ...arg: any[]) {
			gTween.toBottomShow(item, 800, void 0, void 0, 1, egret.Ease.elasticOut, void 0, {
				callback: () => {
					if (callback) {
						callback.call(thisObj, ...arg);
					};
				}
			});
		}

		// private showLogo() {
		// 	this.toTopShow(this.logo/*, () => {
		// 		//发光
		// 		this.showLine();
		// 		//粒子
		// 		this.showParticle();
		// 	}*/);
		// }

		private showBtn() {
			this.toTopShow(this.btn/*, gTween.yoyoBtn, gTween, this.btn*/);
			this.btn.open();
		}

		private showLogoBtn() {
			this.conBtn.visible = true;
			// this.showLogo();
			this.showBtn();
			if (GameMgr.isShowReplay()) {
				this.toTopShow(this.replay);
			}
		}

		private createPeople() {
			const people: com.ComBones = new com.ComBones();
			people.setData(this.conPeople, "e_people");
			people.play("fail", 0);
		}

		private showPeople() {
			this.toBottomShow(this.people);
		}

		/** 显示界面 */
		public show() {
			//初始化
			if (GameMgr.endType == gConst.endType.VICTORY) {
				//胜利
				// this.replay.visible = false;
			} else {
				//失败
				// this.replay.visible = true;
			}
			this.showBlack();
		}

		/** 其它元素展示 */
		public showOther() {
			// gSoundMgr.changeBg("bm_ending");
			this.gameEnd();

			// this.conBg.visible = true;
			// gTween.toScale(this.conBg, 1, 1000, 3, egret.Ease.cubicOut, void 0, {
			// 	callback: () => {
			// 		this.createPeople();
			// 		this.showLogoBtn();
			// 	}
			// });
			this.showPeople();
			this.showLogoBtn();

			// gTween.yoyoBtn(this.btn);
		}

		/** 隐藏界面 */
		public hide() {
			this.black.visible = false;
			this.people.visible = false;
			this.conBtn.visible = false;
			this.btn.visible = false;
			this.replay.visible = false;
		}
		/* =========== 业务代码-end =========== */
	}
}