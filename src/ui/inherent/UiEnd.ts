namespace ui {
	/**
	 * 结束页面
	 */
	export abstract class UiEnd extends ui.UiFile {
		// public black: eui.Rect;
		// public conBg: eui.Group;
		// public mcBg: com.ComMovieClip;
		// public bg: eui.Image;

		// public conLogo: eui.Group;
		// public logo: eui.Image;

		// public conBtn: eui.Group;
		// public replay: eui.Image;
		// public btn: eui.Image;

		// public conBody: eui.Group;
		public bg_mc_con: eui.Group;
		public bg_mc: com.ComMovieClip;

		public bg: eui.Image;
		public btn: eui.Image;


		// public conParticles_0: eui.Group;
		// public conParticles_1: eui.Group;

		// private readonly bannerBefore: string = "epic_";
		// private readonly bannerMax: number = 3;


		public constructor() {
			super();
			this.skinName = skins.UiEnd;
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

			this.bg_mc.open()
			this.bg_mc.setData([new data.McData('ending', 2, 'ending_{1}_png', { backplay: true })])
			// this.bg_mc.setData([new ])
			this.bg_mc.interval = 400


			// console.info("load");

			// gComMgr.setItemAnchor(this.logo);
			// gComMgr.setItemAnchor(this.btn);
			// if (GameMgr.isShowReplay()) {
			// 	gComMgr.setItemAnchor(this.replay);
			// }

			// gComMgr.setItemAnchor(this.bg);
			// this.mcBg.open();
			// this.mcBg.setData([new data.McData("bg", 2, "ending_{1}_png", { backplay: true })]);
			// this.mcBg.interval = 400;

		}

		/** 每次打开界面都会调用 */
		protected start() {
			// console.info("start");
			// if (GameMgr.endType == gConst.endType.VICTORY) {
			// this.showParticles();
			// }
			// this.mcBg.gotoAndPlay("bg");

			// if (GameMgr.isShowReplay()) {
			// 	const space: number = 20;
			// 	// const conBtnH = this.replay.height + space + this.btn.height;
			// 	// this.conBtn.height = conBtnH;
			// 	// this.btn.y = conBtnH - this.btn.anchorOffsetY;
			// 	// this.conBtn.anchorOffsetY = conBtnH / 2;

			// 	this.btn.y = this.replay.y + this.replay.anchorOffsetY + space + this.btn.anchorOffsetY;
			// }

			this.playMC()
			gTween.yoyoBtn(this.btn)
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
			if (gConst.globalClick) {
				this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickInstall, this);
				// } else {
				// 	this.btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickInstall, this);
			}
			// this.btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtn, this);
			// if (GameMgr.replayInstall()) {
			// 	this.replay.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickInstall, this);
			// } else {
			// 	this.replay.once(egret.TouchEvent.TOUCH_TAP, this.clickReplay, this);
			// }

		}

		/** 移除事件 */
		protected removeEvent() {
			// console.info("removeEvent");
			if (gConst.globalClick) {
				this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickInstall, this);
				// } else {
				// 	this.btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickInstall, this);
			}
			// this.btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtn, this);
			// this.replay.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickReplay, this);
			// this.replay.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickInstall, this);

		}

		/** 窗口大小改变时调用 */
		protected resizeView(): void {
			// console.info("resizeView", this.width, this.height);

			const baseScale: number = gConst.mobileByScale[GameMgr.screenType][GameMgr.mobileType];

			this.bg_mc_con.bottom = 0

			// const conLogo = this.conLogo;
			// const conBtn = this.conBtn;
			// const conBg = this.conBg;

			// conLogo.scaleX = conLogo.scaleY = baseScale;
			// conBtn.scaleX = conBtn.scaleY = baseScale;

			// conBg.scaleX = conBg.scaleY = Math.max(this.width / conBg.width, this.height / conBg.height);
			// conBg.width = this.width;
			// conBg.height = this.height;

			if (this.screenType == gConst.screenType.VERTICAL) {
				//竖屏
				// this.con_logo.y = Math.floor(this.height * .02);
				// this.con_title.y = Math.floor(this.height * .35);
				// this.con.y = Math.floor(this.height * .6);
				this.bg.scaleX = this.bg.scaleY = Math.max(this.width / this.bg.width, this.height / this.bg.height);


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
				// this.con.x = Math.floor(this.width * .75);
				// conLogo.x = conBtn.x = Math.floor(this.width * .75);

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


			// this.con_logo.scaleX = this.con_logo.scaleY =
			// this.con.scaleX = this.con.scaleY = baseScale;
		}

		/** 屏幕横竖屏转换时调用 */
		protected rotateView(): void {
			// console.info("rotateView", this.screenType);


			if (this.screenType == gConst.screenType.VERTICAL) {
				//竖屏
			} else {
				//横屏
			}
		}
		/* =========== 框架结构代码-end =========== */


		/* =========== 业务代码-start =========== */

		private playMC() {
			this.bg_mc.gotoAndPlay('ending')
		}

		// private showLine() {
		// 	gTween.toBigShow(this.con_line, 300, 1.5, 1, void 0, void 0, {
		// 		callback: () => {
		// 			gTween.loopRotate(this.line_0, 1, 7200);
		// 			gTween.loopRotate(this.line_1, -1, 7200);
		// 		}
		// 	});
		// }

		// private showBlack() {
		// 	gTween.fadeIn(this.black, 300);
		// }

		// private hideBlack() {
		// 	gTween.fadeOut(this.black, 300);
		// }

		// private showTitle() {
		// 	// this.toTopShow(this.title);
		// 	gTween.toBigShow(this.title, 300, void 0, void 0, egret.Ease.backOut);
		// }

		// private showGold() {
		// 	this.gold.open(true);
		// 	this.toTopShow(this.gold, () => {
		// 		// this.gold.add(GameMgr.gameview.gold.curNum);
		// 	});
		// }

		// private showBanner() {
		// 	this.con_new.visible = true;
		// 	//内容
		// 	gTween.toBigShow(this.con_banner, 500, void 0, void 0, egret.Ease.bounceOut, void 0, {
		// 		callback: this.playBanner,
		// 		thisObj: this
		// 	});
		// }

		// private playBanner() {
		// 	this.showShine();
		// 	this.arrow0.addEventListener(egret.TouchEvent.TOUCH_TAP, this.playBannerLeft, this);
		// 	this.arrow1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.playBannerRight, this);
		// 	this.playBannerDelay = egret.setTimeout(this.playBannerLeft, this, 2500);
		// }

		// private showShine() {
		// 	// gTween.toBigShow(this.shine, 1000, void 0, void 0, egret.Ease.bounceOut, void 0, {
		// 	// 	callback: () => {
		// 	// 		gTween.loopRotate(this.shine, 1, 7200);
		// 	// 	}
		// 	// });
		// 	gTween.fadeIn(this.shine, 200, 1, void 0, void 0, {
		// 		callback: () => {
		// 			gTween.loopRotate(this.shine, 1, 7200);
		// 		}
		// 	});
		// }

		// private curBannerId: number;
		// private playBannerDelay: number;
		// private playBannerTimer: number = 300;
		// private playBannering: boolean;
		// private playBannerLeft(event?: egret.TouchEvent) {
		// 	if (event) {
		// 		event.stopPropagation();
		// 		Mapi.sendAction(4);
		// 		gComMgr.clickAim(event.target, gConst.clkAimType.SCALE, { x: 1, y: 1 });
		// 	}
		// 	egret.clearTimeout(this.playBannerDelay);
		// 	if (this.playBannering) {
		// 		return;
		// 	}
		// 	this.playBannering = true;
		// 	for (let i: number = 0; i < 3; i++) {
		// 		let banner: eui.Image = this["banner" + i] as eui.Image;
		// 		gTween.rmTweens(banner);
		// 		if (banner.x <= -banner.width) {
		// 			//左边的往右放
		// 			egret.Tween.get(banner).to({ x: -2 * banner.width }, this.playBannerTimer).call(() => {
		// 				gTween.rmTweens(banner);
		// 				banner.x = banner.width;
		// 				let id: number = this.curBannerId + 1;
		// 				if (id > this.bannerMax) {
		// 					id = 1;
		// 				}
		// 				banner.name = id + "";
		// 				banner.source = this.bannerBefore + id + "_png";
		// 				this.playBannering = false;
		// 				this.playBannerDelay = egret.setTimeout(this.playBannerLeft, this, 2500);
		// 			}, this);
		// 		} else if (banner.x > 0) {
		// 			//右边的显示
		// 			this.curBannerId = Number(banner.name);
		// 			egret.Tween.get(banner).to({ x: 0, alpha: 1 }, this.playBannerTimer).call(gTween.rmTweens, gTween, [banner]);
		// 		} else {
		// 			//中间的隐藏
		// 			egret.Tween.get(banner).to({ x: -banner.width, alpha: 0 }, this.playBannerTimer).call(gTween.rmTweens, gTween, [banner]);
		// 		}
		// 	}
		// }

		// private playBannerRight(event?: egret.TouchEvent) {
		// 	if (event) {
		// 		event.stopPropagation();
		// 		Mapi.sendAction(4);
		// 		gComMgr.clickAim(event.target, gConst.clkAimType.SCALE, { x: -1, y: 1 });
		// 	}
		// 	egret.clearTimeout(this.playBannerDelay);
		// 	if (this.playBannering) {
		// 		return;
		// 	}
		// 	this.playBannering = true;
		// 	for (let i: number = 0; i < 3; i++) {
		// 		let banner: eui.Image = this["banner" + i] as eui.Image;
		// 		gTween.rmTweens(banner);
		// 		if (banner.x >= banner.width) {
		// 			//右边的往左放
		// 			egret.Tween.get(banner).to({ x: 2 * banner.width }, this.playBannerTimer).call(() => {
		// 				gTween.rmTweens(banner);
		// 				banner.x = -banner.width;
		// 				let id: number = this.curBannerId - 1;
		// 				if (id <= 0) {
		// 					id = this.bannerMax;
		// 				}
		// 				banner.name = id + "";
		// 				banner.source = this.bannerBefore + id + "_png";
		// 				this.playBannering = false;
		// 				this.playBannerDelay = egret.setTimeout(this.playBannerLeft, this, 2500);
		// 			}, this);
		// 		} else if (banner.x < 0) {
		// 			//右边的显示
		// 			this.curBannerId = Number(banner.name);
		// 			egret.Tween.get(banner).to({ x: 0, alpha: 1 }, this.playBannerTimer).call(gTween.rmTweens, gTween, [banner]);
		// 		} else {
		// 			//中间的隐藏
		// 			egret.Tween.get(banner).to({ x: banner.width, alpha: 0 }, this.playBannerTimer).call(gTween.rmTweens, gTween, [banner]);
		// 		}
		// 	}
		// }

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
		// 	this.conLogo.visible = true;
		// 	this.toBottomShow(this.logo/*, () => {
		// 		//发光
		// 		this.showLine();
		// 	}*/);
		// }

		// private showBody() {
		// 	this.toTopShow(this.conBody, this.showBtn, this);
		// }

		// private showBtn() {
		// 	this.conBtn.visible = true;
		// 	this.toTopShow(this.btn, gTween.yoyoBtn, gTween, this.btn);
		// 	if (GameMgr.isShowReplay()) {
		// 		this.toTopShow(this.replay);
		// 	}
		// }

		// private palyBg() {
		// 	this.cool.play(0);
		// }

		// private replayBg() {
		// 	this.cool.play(0);
		// }

		// private swingWord(item: egret.DisplayObject | egret.DisplayObjectContainer) {
		// 	gTween.swing(item, 3, 500, 0, void 0, { duration: 1000 });
		// }

		// private swingPaw(paw: egret.DisplayObject) {
		// 	gTween.swing(paw, 5, 1000, 0);
		// }

		// public showLogoBtn() {
		// 	this.showLogo();
		// 	this.showBtn();
		// 	// this.toBottomShow(this.replay);
		// }

		// private createPeople() {
		// 	if (GameMgr.endType == gConst.endType.VICTORY) {
		// 		const people: com.ComBones = new com.ComBones();
		// 		people.setData(this.conPeople, "ppeople");
		// 		this.conPeople.width = 255;
		// 		this.conPeople.height = 382;
		// 		people.setPos({ x: this.conPeople.width * .5, y: this.conPeople.height });
		// 		people.play("people", 0);
		// 	} else {
		// 		const people: eui.Image = new eui.Image("epic2_png");
		// 		this.conPeople.addChild(people);
		// 		gComMgr.setItemAnchor(people);
		// 	}
		// 	if (GameMgr.endType == gConst.endType.VICTORY) {
		// 		gSoundMgr.playEff("smsuccess");
		// 	} else {
		// 		gSoundMgr.playEff("smfail");
		// 	}
		// }


		/** 显示界面 */
		public show() {
			// this.bg.visible = true;
			// gTween.toSmallShow(this.conBg, 3, 500, 1, 1, void 0, void 0, {
			// 	callback: () => {
			// 		this.showLogoBtn();
			// 		this.createPeople();
			// 	}
			// });

			// gTween.fadeIn(this.bg, 500);
			// this.conBg.visible = true;
			// gTween.toScale(this.conBg, 1, 500, 3, void 0, void 0, {
			// 	callback: () => {
			// 		this.showLogoBtn();
			// 		// this.createPeople();
			// 	}
			// });
		}

		/** 其它元素展示 */
	public showOther() {
			// gSoundMgr.changeBg("bm_ending");
			// gSoundMgr.playEff("smsuccess");
			this.gameEnd();
			// this.con.visible = true;

			//Banner
			// for (let i: number = 0; i < 3; i++) {
			// 	var banner: eui.Image = this["banner" + i] as eui.Image;
			// 	banner.alpha = 0;
			// 	banner.visible = true;
			// }

			// this.playBannering = false;
			// this.playBannerLeft();

			// var _y: number = this.g_banner.y;
			// egret.Tween.get(this.g_banner, { loop: true }).to({ y: _y + 20 }, 800).to({ y: _y }, 800);

			// this.replay.visible = GameMgr.isShowReplay();

			// this.cool.addEventListener(egret.Event.COMPLETE, this.replayBg, this);
			// this.palyBg();

			// this.showBlack();
			// this.showGold();
			// this.showTitle();
			// this.showBanner();

			// this.showLogoBtn();
			// this.showLogo();
			// this.showBody();
			// gTween.yoyoBtn(this.btn);

			// this.bg.visible = true;
			// gTween.fadeIn(this.conBg, 500, 1, void 0, void 0, { callback: this.showLogoBtn, thisObj: this });

		}

		/** 隐藏界面 */
		public hide() {


			// this.bg.visible = false;
			// // this.black.visible = false;
			// this.conBg.visible = false;
			// // this.con.visible = false;
			// this.conLogo.visible = false;
			// this.conBtn.visible = false;
			// this.btn.visible = false;
			// this.replay.visible = false;

		}

		// private clickBtn(event: egret.TouchEvent) {
		// 	Mapi.sendAction(5);
		// }

		/** 展示粒子 */
		// private showParticles() {
		// 	const particleId_0 = this.createParticles(this.conParticles_0, ["p_streamer1", "p_streamer2", "p_streamer3", "p_streamer4", "p_streamer5", "p_streamer6", "p_streamer7", "p_streamer8"], "p_streamer", void 0, false);
		// 	this.startParticle(particleId_0, 1000);
		// 	const particleId_1 = this.createParticles(this.conParticles_1, ["p_streamer1", "p_streamer2", "p_streamer3", "p_streamer4", "p_streamer5", "p_streamer6", "p_streamer7", "p_streamer8"], "p_streamer", void 0, false);
		// 	this.startParticle(particleId_1, 1000);
		// }
		/* =========== 业务代码-end =========== */
	}
}