namespace ui {
	/**
	 * 恭喜页面
	 */
	export abstract class UiCongrats extends ui.UiFile {
		public black: eui.Rect;
		public con: eui.Group;
		// public comBoxEnd: com.ComBoxEnd;
		public txtMoney: eui.Label;

		public conBtn: eui.Group;
		public btn: eui.Image;

		// public word: eui.Image;
		// public btn: eui.Image;
		private notClose: boolean;

		private moneyId: number = 0;

		public constructor() {
			super();
			this.skinName = skins.UiCongrats;
		}

		/* =========== 框架结构代码-start =========== */
		/**
		 * 初始化
		 * @param {any[]} args open()传参会通过init()传过去
		 */
		protected init(notClose?: boolean, moneyId: number = 0) {
			// console.info("init", ...args);
			this.notClose = notClose;
			this.moneyId = moneyId;
		}

		/** 首次打开界面时调用 */
		protected load() {
			// console.info("load");
			// this.word.visible = false;
			// this.comBoxEnd.open("congrats");
		}

		/** 每次打开界面都会调用 */
		protected start() {
			// console.info("start");
			gSoundMgr.playEff("smmoney");

			const con = this.con;
			const txtMoney = this.txtMoney;
			const conBtn = this.conBtn;
			const btn = this.btn;

			con.visible = false;
			txtMoney.visible = false;
			conBtn.visible = false;
			btn.visible = false;

			this.showBlack();
			this.showBox();
			// this.showWord();
			// this.showBtn();
			this.showCon();
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
			// this.btn.once(egret.TouchEvent.TOUCH_TAP, this.clickBtn, this);
			this.conBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickItem, this);
		}

		/** 移除事件 */
		protected removeEvent() {
			// console.info("removeEvent");
			this.conBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickItem, this);
		}

		/** 窗口大小改变时调用 */
		protected resizeView(): void {
			// console.info("resizeView", this.width, this.height);
			// var s1: number = this.width / this.con.width;
			// var s2: number = this.height / this.con.height;

			const con = this.con;

			let baseScale: number = gConst.mobileByScale[GameMgr.screenType][GameMgr.mobileType];
			let conDiffS: number = 1;

			// con.scaleX = con.scaleY = Math.max(s1, s2);

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
						conDiffS = .85;
						break;
				}
				con.scaleX = con.scaleY = baseScale * conDiffS;
				con.x = gMath.keepDecimal((-(con.width / 2 - con.anchorOffsetX) * con.scaleX) + this.width * .5, 0);
				con.y = gMath.keepDecimal((-(con.height / 2 - con.anchorOffsetY) * con.scaleY) + this.height * .5, 0);
			} else {
				//横屏
				switch (this.mobileType) {
					//iPhoneX或以上
					case gConst.mobileType.IPHONE_X:
						conDiffS = .85;
						break;
					//iPhone8或以下
					case gConst.mobileType.IPHONE_8:
						conDiffS = .85;
						break;
					//iPad或其它
					case gConst.mobileType.IPAD:
						conDiffS = .85;
						break;
				}
				con.scaleX = con.scaleY = baseScale * conDiffS;
				con.x = gMath.keepDecimal((-(con.width / 2 - con.anchorOffsetX) * con.scaleX) + this.width * .75, 0);
				con.y = gMath.keepDecimal((-(con.height / 2 - con.anchorOffsetY) * con.scaleY) + this.height * .5, 0);
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
		private showBlack() {
			gTween.fadeIn(this.black, 300);
		}

		private hideBlack() {
			gTween.fadeOut(this.black, 300);
		}

		// private clickBtn(event: egret.TouchEvent) {
		// 	Mapi.sendAction(4);
		// 	GameMgr.auto(true);
		// 	this.hidePeople();
		// 	this.hideWord(this.close, this);
		// 	this.hideBtn();
		// }

		// private showBtn() {
		// 	gTween.toBigShow(this.btn, 300, 1, 1, egret.Ease.bounceOut, void 0, {
		// 		callback: gTween.yoyoBtn,
		// 		thisObj: gTween,
		// 		params: [this.btn, false]
		// 	});
		// }

		// private hideBtn() {
		// 	gTween.toSmallHide(this.btn, 200, 1, 1);
		// }

		private box: com.ComBones;

		private showBox() {
			const con = this.con;
			let box = this.box;

			if (!box) {
				// gSoundMgr.playEff("sm_tanchu");
				// gSoundMgr.playEff("sm_menglu");
				box = this.box = new com.ComBones();
				box.setData(con, "lang_hongbao" /* , { aimType: 0, time: 100 } */);
				// box.setPoint({ x: con.width / 2, y: con.height });
				box.setIndex(0);
			}
			box.play("outside", 0, true);

			this.openBoxed = false;
			this.once(egret.TouchEvent.TOUCH_TAP, this.openBox, this);
			this.openBoxDelay = egret.setTimeout(this.openBox, this, gConst.autoOpenRedPakeTime);
		}

		private openBoxDelay: number;
		private openBoxed: boolean;

		private openBox(e: egret.TouchEvent) {
			this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.openBox, this);
			egret.clearTimeout(this.openBoxDelay);

			if (this.openBoxed) {
				return;
			}
			this.openBoxed = true;

			const box = this.box;
			const txtMoney = this.txtMoney;
			const conBtn = this.conBtn;
			const btn = this.btn;
			if (!box) {
				return;
			}
			box.play("inside");

			const moneyId = this.moneyId;
			txtMoney.visible = true;
			gSoundMgr.playEff(`smmoney${moneyId}_1`);
			const money = GameMgr.getConfig(`redPackMeney${moneyId}`);
			txtMoney.text = money + "";

			conBtn.visible = true;
			gTween.toBigShow(btn, 200, 1, 1, void 0, void 0, {
				callback: () => {
					gTween.yoyoBtn(btn);
				}
			});

			this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.openBox, this);
			GameMgr.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickCon, this, true);
		}

		private clickCon(e: egret.TouchEvent) {
			if (!this.notClose) {
				this.hideCon(e);
			} else {
				this.clickInstall();
			}
		}

		private hideBox() {
			// this.box.playComplete();
		}

		/** 显示文字 */
		// private showWord() {
		// 	gTween.toBigShow(this.word, 200, 1, void 0, egret.Ease.backOut, void 0, {
		// 		callback: this.floatWord,
		// 		thisObj: this,
		// 		params: [this.word, -20, 1000]
		// 	});
		// }

		private showCon() {
			// gTween.toBigShow(this.con, 200, 1, void 0, egret.Ease.cubicOut, void 0, { callback: this.showConFinish, thisObj: this });
			this.con.visible = true;
			// this.comBoxEnd.initPass();
			// if (GameMgr.passId >= GameMgr.maxPassId) {
			// 	this.createSuiPians();
			// 	this.dispatchEventWith(gConst.eventType.GAME_END);
			// 	this.comBoxEnd.turnFan();
			// } else {
			// 	this.comBoxEnd.once(gConst.eventType.IN_COMPLETE, this.showConFinish, this);
			// }
			// this.comBoxEnd.playShow();
		}

		// private showConFinish() {
		// 	GameMgr.stage.once(egret.TouchEvent.TOUCH_TAP, this.clickCon, this, true);
		// 	this.hideConDelay = egret.setTimeout(this.hideCon, this, gConst.closeCongratsTimer);
		// }

		private hideConDelay: number;

		private hideCon(event?: egret.TouchEvent) {
			// if (event) {
			// 	event.stopPropagation();
			// 	// gSoundMgr.playEff("sm_select");
			// }
			GameMgr.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickCon, this, true);
			// egret.clearTimeout(this.hideConDelay);

			const con = this.con;

			// this.comBoxEnd.hideEff();
			// gTween.toSmallHide(this.con, 200, 1, void 0, void 0, void 0, { callback: this.close, thisObj: this });

			const baseScale: number = gConst.mobileByScale[this.screenType][this.mobileType];
			gTween.toBigHide(con, 2, 300, baseScale, 1, void 0, void 0, {
				callback: () => {
					this.close();
				}
			});
		}

		private clickItem(e: egret.TouchEvent) {
			Mapi.sendAction(4);
		}

		/** 文字漂浮 */
		// private floatWord(item: egret.DisplayObject | egret.DisplayObjectContainer, targetY: number = -30, duration: number = 500) {
		// 	gTween.loopFloat(item, targetY, duration);
		// }

		/** 隐藏文字 */
		// private hideWord(callback?: Function, thisObj?: any) {
		// 	gTween.toSmallHide(this.word, 200, 1, void 0, void 0, void 0, {
		// 		callback: () => {
		// 			this.word = gComMgr.rmObj(this.word);
		// 			if (callback) {
		// 				callback.call(thisObj);
		// 			}
		// 		}
		// 	});
		// }

		/** 显示发光 */
		// private showLight() {
		// 	gTween.fadeIn(this.light, 200, void 0, void 0, void 0, {
		// 		callback: () => {
		// 			gTween.loopRotate(this.light, 1, 7200);
		// 		}
		// 	});
		// }

		// /** 隐藏发光 */
		// private hideLight() {
		// 	gTween.fadeOut(this.light, 200, void 0, void 0, void 0, {
		// 		callback: gComMgr.rmObj,
		// 		thisObj: gComMgr,
		// 		params: [this.light]
		// 	});
		// }
		/* =========== 业务代码-end =========== */
	}
}