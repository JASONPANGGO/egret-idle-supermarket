namespace ui {
	/**
	 * 人物页面
	 */
	export abstract class UiPeople extends ui.UiFile {
		public black: eui.Rect;
		public con: eui.Group;
		public conBody: eui.Group;
		public conPeople: eui.Group;
		public people: com.ComBones;
		public conChat: eui.Group;
		public word: eui.Image;

		private id: number;
		private lastId: number;
		private wordId: number = 1;

		public constructor() {
			super();
			this.skinName = skins.UiPeople;
		}

		/* =========== 框架结构代码-start =========== */
		/**
		 * 初始化
		 * @param {any[]} args open()传参会通过init()传过去
		 */
		protected init(id: number = 1, wordId?: number) {
			// console.info("init", ...args);
			this.lastId = this.id;
			this.id = id;
			if (wordId != void 0) {
				this.wordId = wordId;
			}
			this.updateRender();
		}

		/** 首次打开界面时调用 */
		protected load() {
			// console.info("load");
			// gComMgr.setImgSize(this.word);
			// gComMgr.setImgSize(this.btn);
			this.touchEnabled = this.touchChildren = false;
			this.people = new com.ComBones();
			this.people.setData(this.conPeople, "ppeople");
			this.people.setPos({ x: this.conPeople.width / 2, y: this.conPeople.height });
			this.people.setIndex(0);
			this.people.hide();
			this.conChat.visible = false;
			this.updateRender();
		}

		/** 每次打开界面都会调用 */
		protected start() {
			// console.info("start");
			// this.conBody.visible = false;
			this.show();
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
		}

		/** 移除事件 */
		protected removeEvent() {
			// console.info("removeEvent");
		}

		/** 窗口大小改变时调用 */
		protected resizeView(): void {
			// console.info("resizeView", this.width, this.height);
			// var s1: number = this.width / this.con.width;
			// var s2: number = this.height / this.con.height;
			// this.con.scaleX = this.con.scaleY = Math.max(s1, s2);

			let baseScale: number = gConst.mobileByScale[this.screenType][this.mobileType];

			let peopleS: number = 1

			if (this.screenType == gConst.screenType.VERTICAL) {
				//竖屏
				this.con.width = gConst.screen.WIDTH;

				switch (this.mobileType) {
					//iPhoneX或以上
					case gConst.mobileType.IPHONE_X:
						peopleS = 1.1;
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
				this.con.width = gConst.screen.HEIGHT;

				switch (this.mobileType) {
					//iPhoneX或以上
					case gConst.mobileType.IPHONE_X:
						peopleS = .9;
						break;
					//iPhone8或以下
					case gConst.mobileType.IPHONE_8:
						break;
					//iPad或其它
					case gConst.mobileType.IPAD:
						peopleS = 1.5;
						break;
				}
			}
			this.con.scaleX = this.con.scaleY = this.width / this.con.width * baseScale;
			this.conPeople.scaleX = this.conPeople.scaleY = peopleS;
		}

		/** 屏幕横竖屏转换时调用 */
		protected rotateView(): void {
			// console.info("rotateView", this.screenType);
			if (this.screenType == gConst.screenType.VERTICAL) {
				//竖屏
				this.conBody.width = this.conBody.parent.width;
			} else {
				//横屏
				this.conBody.width = 1180;
			}
		}
		/* =========== 框架结构代码-end =========== */


		/* =========== 业务代码-start =========== */
		// private showBlack() {
		// 	gTween.fadeIn(this.black, 100);
		// }
		// private hideBlack() {
		// 	gTween.fadeOut(this.black, 50);
		// }

		// private showWord() {
		// 	gTween.toBottomShow(this.word, 300, 0, 1, egret.Ease.backOut);
		// }
		// private hideWord() {
		// 	gTween.toTopHide(this.word, 200, 0, 1);
		// }

		// private showBtn(callback?: Function, thisObj?: any) {
		// 	gTween.toTopShow(this.btn, 300, 320, 1, egret.Ease.backOut, void 0, { callback: callback, thisObj: thisObj });
		// }
		// private hideBtn(callback?: Function, thisObj?: any) {
		// 	gTween.toBottomHide(this.btn, 200, 320, 1, void 0, void 0, { callback: callback, thisObj: thisObj });
		// }

		private updateRender() {
			if (!this.people) {
				return;
			}
			const id = this.id;
			const wordId = this.wordId;
			this.people.play(`animation${id}`, -1);
			this.word.source = `pword${wordId}_png`;
			if (id == 2 || id == 3) {
				this.showChat();
			} else {
				this.hideChat();
			}
		}

		// private clickBtn(event: egret.TouchEvent) {
		// 	Mapi.sendAction(1);
		// }

		public show() {
			// this.showBlack();
			// this.showWord();
			// this.showBtn(() => {
			// 	this.showGuide();
			// 	this.showFinish();
			// });
			this.showPeople();
		}
		private showed: boolean;

		private showPeople() {
			if (this.id === this.lastId) {
				return;
			}
			if (this.showed) {
				// this.hidePeople(this.showPeople, this);
			} else {
				// egret.setTimeout(() => {
				// gSoundMgr.playEff("sm_tanchu");
				// }, this, 200);
				this.showed = true;
				gTween.toRightShow(this.conPeople, 500, void 0, this.conPeople.anchorOffsetX, 1, egret.Ease.quartOut, void 0, {
					callback: this.showFinish,
					thisObj: this,
					params: [this.people]
				});
			}
		}

		public hidePeople(callback?: Function, thisObj?: any) {
			if (!this.showed) {
				return;
			}
			this.showed = false;
			gTween.toLeftHide(this.conPeople, 300, void 0, this.conPeople.anchorOffsetX, 1, void 0, void 0, {
				callback: callback,
				thisObj: thisObj
			});
		}

		private showFinish() {
			// GameMgr.stage.once(egret.TouchEvent.TOUCH_TAP, this.hide, this);
			// // this.btn.once(egret.TouchEvent.TOUCH_TAP, this.clickBtn, this);
			// this.hideDelay = egret.setTimeout(this.hide, this, gConst.closeStartTimer);
		}

		private showChated: boolean;

		private showChat() {
			if (this.showChated) {
				this.hideChat(this.showChat, this);
			} else {
				// egret.setTimeout(() => {
				// gSoundMgr.playEff("sm_tanchu");
				// }, this, 200);
				this.showChated = true;
				// gTween.toLeftShow(this.conChat, 500, 0, 1, egret.Ease.backOut);
				gTween.showBubble(this.conChat, 500, { orgS: 1, orgA: 1 }, void 0, void 0, void 0, { isFloat: false });
			}
		}

		public hideChat(callback?: Function, thisObj?: any) {
			if (!this.showChated) {
				return;
			}
			this.showChated = false;
			// gTween.toRightHide(this.conChat, 300, 1, 1, void 0, void 0, {
			// 	callback: callback,
			// 	thisObj: thisObj
			// });
			gTween.hideBubble(this.conChat, 300, { orgS: 1, orgA: 1 }, callback, thisObj);
		}

		private hideDelay: number;

		public hide(isClose?: boolean) {
			// if (event) {
			// 	event.stopPropagation();
			// 	// gSoundMgr.playEff("smbtn");
			// }
			// GameMgr.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.hide, this);
			// this.btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtn, this);
			// egret.clearTimeout(this.hideDelay);
			// this.hideGuide();
			// this.hideBlack();
			// this.hideWord();
			// this.hideBtn(this.close, this);
			this.hidePeople(() => {
				if (isClose) {
					this.close();
				}
			}, this);
			this.hideChat();
		}

		// private guide: com.ComGuide; //引导组件
		// private showGuided: boolean; //引导显示状态

		/** 显示引导 */
		// public showGuide() {
		// 	if (GameMgr.ended()) {
		// 		return;
		// 	}
		// 	if (this.showGuided) {
		// 		return;
		// 	}

		// 	let time: number = 100;

		// 	if (!this.guide) {
		// 		this.guide = new com.ComGuide();
		// 		this.guide.open();
		// 	}

		// 	this.showGuided = true;
		// 	this.guide.setData(time, { target1: this.guidePos }, this.con, { pressT: 200, liftT: 500, waitT: 300, direction: gConst.direction.RIGHT_BOTTOM });
		// 	this.guide.play();
		// }

		/** 隐藏引导 */
		// public hideGuide() {
		// 	if (!this.guide) {
		// 		return;
		// 	}
		// 	if (!this.showGuided) {
		// 		return;
		// 	}
		// 	this.showGuided = false;
		// 	this.guide.stop();
		// }
		/* =========== 业务代码-end =========== */
	}
}