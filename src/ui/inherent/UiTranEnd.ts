namespace ui {
	/**
	 * 结束过场页面
	 */
	export abstract class UiTranEnd extends ui.UiFile {
		// public black: eui.Rect;
		public con: eui.Group;
		public conParticle: eui.Group;

		// public bg: eui.Image;
		// public people: eui.Image;
		// public title: eui.Image;
		// public gBtn: eui.Group;
		// public conBtn: eui.Group;
		// public bgBtn: eui.Image;
		// public word: eui.Image;
		// public btnClose: eui.Image;

		// private people: com.ComBones;

		// public light: eui.Rect;

		private data: { isReplay: boolean };

		public constructor() {
			super();
			this.skinName = skins.UiTranEnd;
		}

		/* =========== 框架结构代码-start =========== */
		/**
		 * 初始化
		 * @param {any[]} args open()传参会通过init()传过去
		 */
		protected init(data: { isReplay: boolean }) {
			// console.info("init", ...args);
			this.data = data;
		}

		/** 首次打开界面时调用 */
		protected load() {
			// console.info("load");
			// const bg = this.bg;
			// const title = this.title;

			// gComMgr.setItemAnchor(bg);
			// gComMgr.setObjAnchor(title, true);
		}

		/** 每次打开界面都会调用 */
		protected start() {
			// console.info("start");
			// let people = this.people;
			// const title = this.title;
			// const conBtn = this.conBtn;
			// const bgBtn = this.bgBtn;
			// const word = this.word;
			// const data = this.data;

			// title.visible = false;
			// conBtn.visible = false;
			// gComMgr.setObjSize(bgBtn, true);
			// gComMgr.setItemAnchor(conBtn);
			// if (data && data.isReplay) {
			// 	word.source = "lang_replay_png";
			// } else {
			// 	word.source = "lang_tips_png";
			// 	GameMgr.endType = gConst.endType.FAIL;
			// 	Mapi.gameEnd();
			// }

			// this.showBlack();
			// this.showBg();

			// if (!people) {
			// 	people = this.people = new com.ComBones();
			// 	people.setData(this.conPeople, "GoodJob");
			// 	people.create();
			// }
			// people.armatureDisplay.once(egret.Event.COMPLETE, () => {
			// 	egret.setTimeout(this.close, this, 500);
			// }, this);
			// people.play("newAnimation");

			// this.showPeople(() => {
			// 	gSoundMgr.playEff("smfail");
			// 	this.showTitle();
			// 	this.showBtn(() => {
			// 		this.dispatchEventWith(gConst.eventType.IN_COMPLETE);
			// 		gTween.yoyoBtn(this.conBtn);
			// 	});
			// });

			// this.light.visible = false;
			// this.showLight();
			this.showParticles();
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
			// const btnClose = this.btnClose;
			// const conBtn = this.conBtn;
			// const data = this.data;

			// btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickInstall, this);
			// if (data && data.isReplay) {
			// 	conBtn.once(egret.TouchEvent.TOUCH_TAP, this.clickBtnReplay, this);
			// } else {
			// 	conBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtnTips, this);
			// }
		}

		/** 移除事件 */
		protected removeEvent() {
			// console.info("removeEvent");
			// const btnClose = this.btnClose;
			// const conBtn = this.conBtn;

			// btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickInstall, this);
			// conBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtnReplay, this);
			// conBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtnTips, this);
		}

		/** 窗口大小改变时调用 */
		protected resizeView(): void {
			// console.info("resizeView", this.width, this.height);
			// var s1: number = this.width / this.con.width;
			// var s2: number = this.height / this.con.height;
			// this.con.scaleX = this.con.scaleY = Math.max(s1, s2);

			const con = this.con;

			const baseScale: number = gConst.mobileByScale[this.screenType][this.mobileType];

			con.scaleX = con.scaleY = baseScale;

			if (this.screenType == gConst.screenType.VERTICAL) {
				//竖屏
				switch (this.mobileType) {
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
				con.x = Math.floor(this.width * .72);

				switch (this.mobileType) {
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
		protected rotateView(): void {
			// console.info("rotateView", this.screenType);
			// const con = this.con;

			if (this.screenType == gConst.screenType.VERTICAL) {
				//竖屏
				// con.horizontalCenter = 0;
			} else {
				//横屏
				// con.horizontalCenter = NaN;
			}
		}
		/* =========== 框架结构代码-end =========== */


		/* =========== 业务代码-start =========== */
		// private showLight() {
		// 	gTween.fadeIn(this.light, 1000, 1, void 0, { duration: 50 }, {
		// 		callback: () => {
		// 			this.dispatchEventWith(gConst.eventType.IN_COMPLETE);
		// 			this.close();
		// 		}
		// 	});
		// }

		// private hideLight(callBack?: Function, thisObj?: any, ...params: any[]) {
		// 	gTween.fadeOut(this.light, 1000, 1, void 0, void 0, { callback: callBack, thisObj: thisObj, params: params });
		// }

		// private hideWord(callBack?: Function, thisObj?: any, ...params: any[]) {
		// 	gTween.fadeOut(this.light, 200, 1, void 0, void 0, { callback: callBack, thisObj: thisObj, params: params });
		// }

		// private showBlack() {
		// 	gTween.fadeIn(this.black, 100, 1);
		// }
		// private hideBlack(callBack?: Function, thisObj?: any) {
		// 	gTween.fadeOut(this.black, 50, 1, void 0, void 0, {
		// 		callback: () => {
		// 			if (callBack) {
		// 				callBack.call(thisObj);
		// 			}
		// 		}
		// 	});
		// }

		// private showBg() {
		// 	gTween.fadeIn(this.bg, 200, 1);
		// }
		// private hideBg(callBack?: Function, thisObj?: any) {
		// 	gTween.fadeOut(this.bg, 200, 1, void 0, void 0, {
		// 		callback: () => {
		// 			if (callBack) {
		// 				callBack.call(thisObj);
		// 			}
		// 		}
		// 	});
		// }

		// private showPeople(callBack?: Function, thisObj?: any) {
		// 	gTween.fadeIn(this.people, 200, 1, void 0, void 0, { callback: callBack, thisObj: thisObj });
		// }
		// private hidePeople() {
		// 	gTween.fadeOut(this.people, 100);
		// }

		// private showTitle() {
		// 	gTween.toBigShow(this.title, 300, 1, 1, egret.Ease.backInOut);
		// 	// gTween.toBottomShow(this.title, 1000, void 0, 0, 1, egret.Ease.elasticOut);
		// }
		// private hideTitle() {
		// 	gTween.toSmallHide(this.title, 100, 1, 1);
		// 	// gTween.toTopHide(this.title, 100, void 0, 0, 1);
		// }

		// private showBtn(callBack?: Function, thisObj?: any) {
		// 	gTween.toTopShow(this.conBtn, 200, void 0, void 0, 1, void 0, void 0, { callback: callBack, thisObj: thisObj });
		// }
		// private hideBtn() {
		// 	gTween.toBottomHide(this.conBtn, 100, void 0, void 0, 1);
		// }

		public close(event?: egret.TouchEvent) {
			// this.hideLight(() => {
			// 	super.close();
			// });
			// this.hideBlack();
			// this.hidePeople();
			// this.hideTitle();
			// this.hideBtn();
			// this.hideBg(() => {
			super.close();
			// });
		}

		/** 展示粒子 */
		private showParticles() {
			const scaleSpeed = 1;
			const time = 1500 * scaleSpeed;

			const conParticle = this.conParticle;

			const particleId = this.createParticles(conParticle, ["fail"], "fail"/*, void 0, false*/);
			egret.setTimeout(() => {
				this.dispatchEventWith(gConst.eventType.SHOW_CURTAIN_FULL);
			}, this, time * .5);

			// this.startParticle(particleId, time);

			gTween.toMoveY(conParticle, -this.height * scaleSpeed - 200, time, 200, egret.Ease.quadOut, void 0, {
				callback: () => {
					// this.stopParticles();
					// const endTime = 1500;
					// egret.setTimeout(this.close, this, endTime);
				}
			});
		}

		private clickBtnReplay(event: egret.TouchEvent) {
			// Mapi.sendAction(4);
			this.close(event);
		}

		private clickBtnTips(event: egret.TouchEvent) {
			// Mapi.sendAction(5);
			this.clickInstall(event);
		}
		/* =========== 业务代码-end =========== */
	}
}