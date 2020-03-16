namespace ui {
	/**
	 * 对话页面
	 */
	export abstract class UiChat extends ui.UiFile {
		public con: eui.Group;
		public conChat: eui.Group;
		public chat: eui.Image;

		// private chatId: number;

		public constructor() {
			super();
			this.skinName = skins.UiChat;
		}

		/* =========== 框架结构代码-start =========== */

		/**
		 * 初始化
		 * @param {any[]} args open()传参会通过init()传过去
		 */
		protected init(/*chatId: number = 1*/) {
			// console.info("init", ...args);
			// this.chatId = chatId;
		}

		/** 首次打开界面时调用 */
		protected load() {
			// console.info("load");
			this.touchEnabled = this.touchChildren = false;
		}

		/** 每次打开界面都会调用 */
		protected start() {
			// console.info("start");
			// this.chat.source = `p_word${this.chatId}_png`;

			this.showChat();
			// this.showPeople();
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
			this.con.scaleX = this.con.scaleY = baseScale;

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
			if (this.screenType == gConst.screenType.VERTICAL) {
				//竖屏
				// this.con.height = 190;
				// this.conChat.horizontalCenter = 0;
				this.con.bottom = "15%";
			} else {
				//横屏
				// this.con.height = 94;
				// this.conChat.horizontalCenter = -140;
				this.con.bottom = "5%";
			}
		}
		/* =========== 框架结构代码-end =========== */


		/* =========== 业务代码-start =========== */

		// private people: com.ComBones;
		// private peopleShowed: boolean;

		// private initPeople() {
		// 	if (!this.people) {
		// 		this.people = new com.ComBones();
		// 	}
		// 	this.people.setIndex(0);
		// 	this.people.setData(this.g_people, "fishman", void 0, "Armature");
		// 	this.people.play("newAnimation", 0);
		// }

		// private showPeople() {
		// 	this.initPeople();
		// 	if (this.peopleShowed) {
		// 		this.hidePeople(this.showPeople, this);
		// 	} else {
		// 		this.peopleShowed = true;
		// 		gTween.toRightShow(this.g_people, 500, 0, 1, egret.Ease.backOut);
		// 	}
		// }

		// public hidePeople(callback?: Function, thisObj?: any) {
		// 	if (!this.peopleShowed) {
		// 		return;
		// 	}
		// 	this.peopleShowed = false;
		// 	gTween.toLeftHide(this.g_people, 300, 1, 1, void 0, void 0, {
		// 		callback: callback,
		// 		thisObj: thisObj
		// 	});
		// }

		private showed: boolean;

		private showChat() {
			if (this.showed) {
				this.hideChat(this.showChat, this);
			} else {
				// egret.setTimeout(() => {
				// gSoundMgr.playEff("sm_tanchu");
				// }, this, 200);
				this.showed = true;
				// gTween.toLeftShow(this.conChat, 500, 0, 1, egret.Ease.backOut);
				gTween.toTopShow(this.conChat, 500, void 0, 0, 1, egret.Ease.backOut /*, void 0, {
					callback: this.floatChat,
					thisObj: this,
					params: [this.conChat]
				}*/ );
			}
		}

		public hideChat(callback?: Function, thisObj?: any) {
			if (!this.showed) {
				return;
			}
			this.showed = false;
			// gTween.toRightHide(this.conChat, 300, 1, 1, void 0, void 0, {
			// 	callback: callback,
			// 	thisObj: thisObj
			// });
			gTween.toBottomHide(this.conChat, 300, void 0, 1, 1, void 0, void 0, {
				callback: callback,
				thisObj: thisObj
			});
		}

		/** 文字漂浮 */
		private floatChat(item: egret.DisplayObject | egret.DisplayObjectContainer, targetY: number = -30, duration: number = 500) {
			gTween.loopFloat(item, targetY, duration);
		}

		public close() {
			this.hideChat(() => {
				super.close();
			});
			// this.hidePeople();
		}
		/* =========== 业务代码-end =========== */
	}
}