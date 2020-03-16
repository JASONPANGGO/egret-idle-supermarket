namespace com {
	/**
	 * 对话控件
	 */
	export class ComChat extends com.ComFile {
		public hand: eui.Image;
		public con: eui.Group;
		public chat: eui.Image;

		public data: data.ChatData;

		public constructor() {
			super();
			this.skinName = skins.ComChat;
		}

		/* =========== 框架结构代码-start =========== */
		/**
		 * 初始化
		 * @param {any[]} args 构建传参会通过init()传过去
		 */
		protected init(data: data.ChatData) {
			// console.info("init", ...args);
			this.data = data;
		}

		/** 首次创建组件时调用 */
		protected load() {
			// console.info("load");
			const chat = this.chat;
			const hand = this.hand;

			hand.visible = false;
			chat.visible = false;

			this.render();
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
			} else {
				//横屏
			}
		}
		/* =========== 框架结构代码-end =========== */


		/* =========== 业务代码-start =========== */
		private render() {
			const data = this.data;
			if (!data) {
				return;
			}
			const speakerId = data.speakerId;
			const type = data.type;
			const later = data.later;
			const itemType = data.itemType;

			const hand = this.hand;
			const con = this.con;
			const chat = this.chat;

			let before: string;
			let diffX: number;
			let handSpase: number;
			if (type === gConst.chatType.TEXT) {
				before = "lang";
				diffX = 0;
				chat.source = `${before}_${itemType}${later}_png`;
			} else {
				before = "pic";
				diffX = 25;
				chat.source = `${before}${itemType}_${later}_png`;
			}
			gComMgr.setObjSize(chat, true);
			gComMgr.setObjSize(con, true);

			if (speakerId === 1) {
				//左边（对方对话）
				gComMgr.setObjAnchor(hand);
				// hand.visible = true;
				chat.anchorOffsetX = 0;
				chat.x = diffX;
				handSpase = 15;
				con.x = hand.x + (hand.width - hand.anchorOffsetX) * hand.scaleX + handSpase;
			} else {
				//右边（我方对话）
				// hand.visible = false;
				chat.anchorOffsetX = chat.width;
				chat.x = (chat.width - diffX) * chat.scaleX;
				handSpase = 0;
				con.x = handSpase;
			}
		}

		public showChat(callback?: Function, thisObj?: any, ...callArg: any[]) {
			const data = this.data;
			if (!data) {
				return;
			}
			const speakerId = data.speakerId;

			const hand = this.hand;
			const chat = this.chat;

			if (speakerId === 1) {
				//左边（对方对话）
				gTween.fadeIn(hand, 100, 1);
				gSoundMgr.stopEff("smtextboy");
				gSoundMgr.playEff("smtextboy");
			} else {
				//右边（我方对话）
				gSoundMgr.stopEff("smtextplayer");
				gSoundMgr.playEff("smtextplayer");
			}

			gTween.toBigShow(chat, 200, 1, 1, void 0, void 0, {
				callback: callback, thisObj: thisObj, params: callArg
			});
		}
		/* =========== 业务代码-end =========== */
	}
}