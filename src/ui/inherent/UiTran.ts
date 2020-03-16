namespace ui {
	/**
	 * 过场页面
	 */
	export abstract class UiTran extends ui.UiFile {
		public isUiFirstLimit: boolean = false; //是否受UiFirstView限制  默认为true:保证 UiFirstView 在最顶层，false: 打开放最顶层

		public black: eui.Rect;
		public conColorBar: eui.Group;
		public colorBar: eui.Image;
		public light: eui.Rect;
		public conParticles: eui.Group;

		public conWord: eui.Group;
		public word: eui.Image;

		// private bones: com.ComBones;

		// private people: com.ComBones;

		// public light: eui.Rect;

		private playAniOutComplete: boolean;
		private playParticlesComplete: boolean;

		public constructor() {
			super();
			this.skinName = skins.UiTran;
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
			// const bg = this.bg;
			const conColorBar = this.conColorBar;
			const colorBar = this.colorBar;
			const conWord = this.conWord;
			const word = this.word;

			gComMgr.setItemAnchor(colorBar, true, false);
			colorBar.width += colorBar.height * 4;
			colorBar.anchorOffsetX = colorBar.width / 2;

			gComMgr.setItemAnchor(word);

			// gComMgr.setItemAnchor(bg);
		}

		/** 每次打开界面都会调用 */
		protected start() {
			// console.info("start");
			// const con = this.con;
			const colorBar = this.colorBar;

			this.closed = false;
			// this.showBlack();
			// this.showBg(() => {
			// 	this.dispatchEventWith(gConst.eventType.IN_COMPLETE);
			// });

			// this.closeDelay = egret.setTimeout(this.close, this, gConst.closeTranTimer);

			// this.light.visible = false;
			// this.showLight();

			this.playAniOutComplete = false;
			this.playParticlesComplete = false;
			this.playEnd = false;

			// let bones = this.bones;

			// if (!bones) {
			// 	bones = this.bones = new com.ComBones();
			// 	bones.setData(con, "lang_VIP"/*, true*/);
			// }
			// const aimName: string = GameMgr.screenType == gConst.screenType.VERTICAL ? "heng" : "shu";
			// const aimName: string = "shu";
			// bones.create();
			// bones.armatureDisplay.once(dragonBones.EgretEvent.FRAME_EVENT, this.onFrameEvent, this);

			// bones.armatureDisplay.once(egret.Event.COMPLETE, this.playComplete, this);

			// bones.play(aimName);

			colorBar.visible = false;

			this.playAniIn();
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
			// this.once(egret.TouchEvent.TOUCH_TAP, this.close, this);
		}

		/** 移除事件 */
		protected removeEvent() {
			// console.info("removeEvent");
			// this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
		}

		/** 窗口大小改变时调用 */
		protected resizeView(): void {
			// console.info("resizeView", this.width, this.height);
			// var s1: number = this.width / this.con.width;
			// var s2: number = this.height / this.con.height;
			// this.con.scaleX = this.con.scaleY = Math.max(s1, s2);

			// const con = this.con;
			const conColorBar = this.conColorBar;
			const colorBar = this.colorBar;

			const baseScale: number = gConst.mobileByScale[this.screenType][this.mobileType];

			// con.scaleX = con.scaleY = Math.max(this.width / con.width, this.height / con.height);

			colorBar.width = this.width + conColorBar.height * 4;
			colorBar.anchorOffsetX = colorBar.width / 2;

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
			// const bones = this.bones;
			const conColorBar = this.conColorBar;
			const conWord = this.conWord;

			if (this.screenType == gConst.screenType.VERTICAL) {
				//竖屏
				// if (bones && !this.playEnd) {
				// 	bones.play("shu");
				// }
				conColorBar.verticalCenter = "-20%";
				conWord.verticalCenter = "-30%";
				conColorBar.rotation = -20;
			} else {
				//横屏
				// if (bones && !this.playEnd) {
				// 	bones.play("heng");
				// }
				conColorBar.verticalCenter = "-8%";
				conWord.verticalCenter = "-18%";
				conColorBar.rotation = -10;
			}
		}
		/* =========== 框架结构代码-end =========== */


		/* =========== 业务代码-start =========== */
		private playAniIn() {
			const conColorBar = this.conColorBar;
			const colorBar = this.colorBar;
			const word = this.word;

			gTween.toRightShow(colorBar, 300, -colorBar.width, conColorBar.width / 2, 1, void 0, { duration: 1000 }, {
				callback: this.playAniOut, thisObj: this
			});

			gTween.toSmallShow(word, 5, 200, 1, 1);

			this.showParticles();

			gSoundMgr.playEff("smwin");
		}

		private playAniOut() {
			const colorBar = this.colorBar;
			const word = this.word;

			gTween.toScaleY(colorBar, Math.max(this.height, this.width) / colorBar.height * 1.6, 300, 1, void 0, void 0, {
				callback: () => {
					this.dispatchEventWith(gConst.eventType.IN_COMPLETE);
					gTween.fadeOut(colorBar, 200, 1, void 0, void 0, {
						callback: () => {
							this.playAniOutComplete = true;
							this.close();
						}
					});
				}
			});

			gTween.fadeOut(word, 200);
		}

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

		private showBlack() {
			gTween.fadeIn(this.black, 100, 1);
		}
		private hideBlack(callBack?: Function, thisObj?: any) {
			gTween.fadeOut(this.black, 50, 1, void 0, void 0, {
				callback: () => {
					if (callBack) {
						callBack.call(thisObj);
					}
				}
			});
		}

		// private showBg(callBack?: Function, thisObj?: any) {
		// 	gTween.fadeIn(this.bg, 200, 1, void 0, void 0, {
		// 		callback: () => {
		// 			if (callBack) {
		// 				callBack.call(thisObj);
		// 			}
		// 		}
		// 	});
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

		/** 展示粒子 */
		private showParticles() {
			const duration = 1000;
			const delay = 10000;
			const particleId = this.createParticles(this.conParticles, ["streamer1", "streamer2", "streamer3", "streamer4", "streamer5", "streamer6", "streamer7", "streamer8"], "streamer");
			this.startParticle(particleId, duration);

			egret.setTimeout(() => {
				// this.stopParticle(particleId);
				egret.setTimeout(() => {
					this.playParticlesComplete = true;
					this.close();
				}, this, delay);
			}, this, duration);
		}

		// private onFrameEvent(event: dragonBones.EgretEvent) {
		// 	// console.info("onFrameEvent", event.frameLabel);

		// 	// if (event.frameLabel == "particle") {
		// 	this.showParticles();
		// 	// }
		// }

		private playEnd: boolean;

		private playComplete(event: egret.Event) {
			this.playEnd = true;
			this.close();
		}

		private closeDelay: number;
		private closed: boolean;

		public close(event?: egret.TouchEvent) {
			// egret.clearTimeout(this.closeDelay);
			if (this.closed) {
				return;
			}
			if (!this.playAniOutComplete) {
				return;
			}
			if (!this.playParticlesComplete) {
				return;
			}
			this.closed = true;
			// this.dispatchEventWith(gConst.eventType.IN_COMPLETE);
			// this.hideLight(() => {
			// 	super.close();
			// });
			// this.hideBlack();
			// this.hideBg(() => {
			super.close();
			// });
		}
		/* =========== 业务代码-end =========== */
	}
}