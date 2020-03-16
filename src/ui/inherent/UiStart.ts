namespace ui {
	/**
	 * 开场页面
	 */
	export abstract class UiStart extends ui.UiFile {
		public black: eui.Rect;
		public con: eui.Group;
		public conParticle: eui.Group;
		public conPeople: eui.Group;
		public people: eui.Image;
		public gChat: eui.Group;
		public gWord: eui.Group;
		public conWord: eui.Group;
		public word: eui.Image;
		public btnTips: eui.Image;
		public guidePos: eui.Image;

		private orgIdx: number; //记录原层级，切换竖屏时设置回去

		private chatId: number = 1; //对话内容ID

		public constructor() {
			super();
			this.skinName = skins.UiStart;
		}

		/* =========== 框架结构代码-start =========== */
		/**
		 * 初始化
		 * @param {any[]} args open()传参会通过init()传过去
		 */
		protected init(chatId: number = 1) {
			// console.info("init", ...args);
			this.chatId = chatId;
		}

		/** 首次打开界面时调用 */
		protected load() {
			// console.info("load");
			// const btn = this.btn;

			// gComMgr.setImgSize(btn);
			this.orgIdx = this.parent.getChildIndex(this);
		}

		/** 每次打开界面都会调用 */
		protected start() {
			// console.info("start");
			const con = this.con;
			const conWord = this.conWord;
			const word = this.word;
			const btnTips = this.btnTips;
			const black = this.black;

			con.visible = false;
			conWord.visible = false;
			btnTips.visible = false;
			black.visible = false;

			let isInitParent = true;

			switch (this.chatId) {
				case 1:
					word.source = "lang_gword1_png";
					break;
				case 2:
					word.source = "lang_pword_png";
					break;
				case 3:
					word.source = "lang_eword_png";
					isInitParent = false;
					break;
			}

			gComMgr.setObjSize(word, isInitParent);
			if (isInitParent) {
				gComMgr.setObjSize(conWord, true);
			}

			// this.show();
			// this.showWord();
			// this.updateItems();
			// this.initPeople();
			this.showPeople();
			this.showWord();
			if (this.chatId == 3) {
				this.showBlack();
			}
			this.showGuide();
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
			if (this.chatId != 3) {
				GameMgr.stage.once(egret.TouchEvent.TOUCH_TAP, this.hide, this, true);
			}
		}

		/** 移除事件 */
		protected removeEvent() {
			// console.info("removeEvent");
			GameMgr.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.hide, this, true);
		}

		/** 窗口大小改变时调用 */
		protected resizeView(): void {
			// console.info("resizeView", this.width, this.height);
			// var s1: number = this.width / this.con.width;
			// var s2: number = this.height / this.con.height;
			// this.con.scaleX = this.con.scaleY = Math.max(s1, s2);

			const conPeople = this.conPeople;
			const gWord = this.gWord;

			const baseScale: number = gConst.mobileByScale[this.screenType][this.mobileType];

			conPeople.scaleX = conPeople.scaleY = baseScale;
			gWord.scaleX = gWord.scaleY = baseScale;

			this.flyConParticle();
			// this.flyParticlComplete();

			if (this.screenType == gConst.screenType.VERTICAL) {
				//竖屏
				// conPeople.scaleX = conPeople.scaleY = baseScale;

				if (this.parent && this.chatId != 3) {
					this.parent.setChildIndex(this, this.orgIdx);
				}

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
				conPeople.left = -100 * conPeople.scaleX;
				conPeople.bottom = 0 * conPeople.scaleX;

				gWord.left = 220 * gWord.scaleX;
				gWord.bottom = 460 * gWord.scaleX;
			} else {
				//横屏
				// conPeople.scaleX = conPeople.scaleY = baseScale * .9;

				if (this.parent && this.chatId != 3) {
					// this.parent.addChild(this);
					this.parent.setChildIndex(this, this.parent.numChildren - 1);
				}

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
				conPeople.left = -110 * conPeople.scaleX;
				conPeople.bottom = -234 * conPeople.scaleX;

				gWord.left = 250 * gWord.scaleX;
				gWord.bottom = 250 * gWord.scaleX;
			}
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
		private showBlack() {
			gTween.fadeIn(this.black, 100);
		}
		private hideBlack() {
			gTween.fadeOut(this.black, 50);
		}

		private initPeople() {

		}

		private showPeople() {
			const people = this.people;

			gTween.toRightShow(people, 300, void 0, 0, 1);
		}

		private hidePeople(callback?: Function, thisObj?: any) {
			const people = this.people;

			gTween.toLeftHide(people, 300, void 0, 0, 1, egret.Ease.backIn, void 0, {
				callback: () => {
					if (callback) {
						callback.call(thisObj);
					}
				}
			});
		}

		private showWord() {
			const conWord = this.conWord;
			const btnTips = this.btnTips;

			gTween.toTopShow(conWord, 300, void 0, conWord.anchorOffsetY, 1);

			if (this.chatId != 3) {
				gTween.fadeIn(btnTips, 200, 1, void 0, void 0, {
					callback: () => {
						gTween.loopAlpha(btnTips, .2, 300, 1);
					}
				});
			}
		}

		// private hideWordComplete: boolean;

		private hideWord() {
			const conWord = this.conWord;
			const btnTips = this.btnTips;

			// egret.setTimeout(() => {
			// 	gTween.hideBubble(conWord, 200, { orgS: 1, orgA: 1 }, () => {
			// 		this.dispatchEventWith(gConst.eventType.IN_COMPLETE);
			// 	});
			// }, this, 1500);

			gTween.toBottomHide(conWord, 200, void 0, 0, 1, egret.Ease.backIn);
			gTween.fadeOut(btnTips, 200, 1);
		}

		// private showBtn(callback?: Function, thisObj?: any) {
		// 	gTween.toTopShow(this.btn, 300, 320, 1, egret.Ease.backOut, void 0, { callback: callback, thisObj: thisObj });
		// }
		// private hideBtn(callback?: Function, thisObj?: any) {
		// 	gTween.toBottomHide(this.btn, 200, 320, 1, void 0, void 0, { callback: callback, thisObj: thisObj });
		// }

		// private loopTips() {
		// 	gTween.loopAlpha(this.con_tips, .5);
		// }

		// private clickBtn(event: egret.TouchEvent) {
		// 	Mapi.sendAction(1);
		// }

		// public show() {
		// this.showBlack();
		// this.showWord();
		// this.showBtn(() => {
		// 	this.showGuide();
		// 	this.showFinish();
		// });
		// this.showBody();
		// this.loopTips();
		// }
		// private showed: boolean;

		// private showBody() {
		// 	if (this.showed) {
		// 		this.hideBody(this.showBody, this);
		// 	} else {
		// 		// egret.setTimeout(() => {
		// 		// gSoundMgr.playEff("sm_tanchu");
		// 		// }, this, 200);
		// 		this.showed = true;
		// 		// gTween.toLeftShow(this.conBody, 500, 0, 1, egret.Ease.backOut);
		// 		gTween.toTopShow(this.conBody, 500, 0, 1, egret.Ease.backIn, void 0, {
		// 			callback: this.showFinish,
		// 			thisObj: this
		// 		});
		// 		// this.conBody.visible = true;
		// 		// this.showFinish();
		// 	}
		// }

		// public hideBody(callback?: Function, thisObj?: any) {
		// 	if (!this.showed) {
		// 		return;
		// 	}
		// 	this.showed = false;
		// 	// gTween.toRightHide(this.conBody, 300, 1, 1, void 0, void 0, {
		// 	// 	callback: callback,
		// 	// 	thisObj: thisObj
		// 	// });
		// 	gTween.toBottomHide(this.conBody, 300, 1, 1, void 0, void 0, {
		// 		callback: callback,
		// 		thisObj: thisObj
		// 	});
		// }

		// private showFinish() {
		// 	// GameMgr.stage.once(egret.TouchEvent.TOUCH_TAP, this.hide, this);
		// 	// this.btn.once(egret.TouchEvent.TOUCH_TAP, this.clickBtn, this);
		// 	// this.hideDelay = egret.setTimeout(this.hide, this, gConst.closeStartTimer);
		// }

		private hideDelay: number;

		public hide(event?: egret.TouchEvent, isClose: boolean = true) {
			if (event) {
				event.stopPropagation();
				// gSoundMgr.playEff("smbtn");
				// Mapi.sendAction(1);
			}
			// GameMgr.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.hide, this);
			// this.btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtn, this);
			// egret.clearTimeout(this.hideDelay);
			this.hideGuide();
			// this.hideBlack();
			// this.hideStar(false);
			// this.hideBtn(this.close, this);
			// this.hideBody(this.close, this);
			if (isClose) {
				this.hidePeople(this.close, this);
			} else {
				this.hidePeople();
			}
			this.hideWord();
		}

		private guide: com.ComGuide; //引导组件
		private showGuided: boolean; //引导显示状态
		private firstTouch: boolean = true;

		/** 显示引导 */
		public showGuide() {
			if (GameMgr.isEnd) {
				return;
			}
			if (this.showGuided) {
				return;
			}

			const time: number = this.firstTouch ? gConst.firstGuideTimer : gConst.afterGuideTimer;

			if (!this.guide) {
				this.guide = new com.ComGuide();
				this.guide.open();
			}

			this.showGuided = true;
			this.guide.setData(time, { target1: this.guidePos }, this.gWord, { pressT: 200, liftT: 300, waitT: 100, direction: gConst.direction.RIGHT_BOTTOM, offR: 15 });
			this.guide.play();
		}

		/** 隐藏引导 */
		public hideGuide() {
			if (!this.guide) {
				return;
			}
			if (!this.showGuided) {
				return;
			}
			this.firstTouch = false;
			this.showGuided = false;
			this.guide.over();
		}

		private flyCompleted: boolean;
		private flyParticlComplete() {
			const conParticle = this.conParticle;

			gTween.rmTweens(conParticle);

			// if (!this.flyConParticled) {
			// 	return;
			// }

			if (this.flyCompleted) {
				return;
			}
			this.flyCompleted = true;

			conParticle.y = this.flyToY;

			this.stopParticles();
		}

		private get flyToY(): number {
			return -this.height * this.flyScale - 200;
		}

		private flyConParticled: boolean;
		private flyConParticleing: boolean;
		private flyConParticle() {
			if (!this.flyConParticleing) {
				return;
			}
			if (this.flyCompleted) {
				return;
			}
			// if (this.flyConParticled) {
			// 	return;
			// }
			// this.flyConParticled = true;

			const time = this.flyTime();

			const conParticle = this.conParticle;

			gTween.toMoveY(conParticle, this.flyToY, time, void 0, egret.Ease.sineOut, { duration: 1000 }, {
				callback: this.flyParticlComplete, thisObj: this
			});
		}

		private readonly flyScale: number = 1; //飞行倍速
		/** 飞行总时长 */
		private flyTime(): number {
			const conParticle = this.conParticle;
			return gMath.getTimeBySpeed(conParticle.x, conParticle.y, conParticle.x, this.flyToY, this.flyScale * 3000 / 4);
			// return this.flyScale * 2000;
		}

		/** 展示粒子 */
		showParticles() {
			const scaleSpeed = this.flyScale;
			const time = this.flyTime();

			// console.info("showParticles", time);

			const con = this.con;
			const conParticle = this.conParticle;

			con.visible = true;

			const particleId = this.createParticles(conParticle, ["fail"], "fail"/*, void 0, false*/);
			egret.setTimeout(() => {
				GameMgr.showCurtainFull = true;
				this.dispatchEventWith(gConst.eventType.SHOW_CURTAIN_FULL);
			}, this, time * .5);

			// this.startParticle(particleId, time);

			this.flyConParticleing = true;
			this.flyConParticle();
		}
		/* =========== 业务代码-end =========== */
	}
}