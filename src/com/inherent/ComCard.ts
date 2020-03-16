namespace com {
	/**
	 * 卡牌组件
	 */
	export class ComCard extends com.ComFile {
		public con: eui.Group;
		public card: eui.Image;
		// public conParticle: eui.Group;
		public shadow: eui.Rect;

		private _direction: gConst.aiDir = gConst.aiDir.RIGHT_BOTTOM;

		private _posId: number;

		private _die: boolean;

		public pos: number[];

		private initS: number = 1;

		public pilePos: { x: number, y: number };

		public row: number; //行
		public col: number; //列

		public data: data.CardData;

		public type: gConst.cardType;

		private orgShadowX: number;
		private orgShadowS: number;

		public constructor() {
			super();
			this.skinName = skins.ComCard;
		}

		/* =========== 框架结构代码-start =========== */
		/**
		 * 初始化
		 * @param {any[]} args 构建传参会通过init()传过去
		 */
		protected init(data: data.CardData) {
			// console.info("init", ...args);
			this.data = data;
		}

		/** 首次创建组件时调用 */
		protected load() {
			// console.info("load");
			this.touchChildren = false;

			const con = this.con;
			const card = this.card;
			const shadow = this.shadow;

			gComMgr.setItemAnchor(card);
			gComMgr.setItemAnchor(con, true, false);

			shadow.x = card.x;
			shadow.y = card.y;
			shadow.width = card.width;
			shadow.height = card.height;
			shadow.anchorOffsetX = card.anchorOffsetX;
			shadow.anchorOffsetY = card.anchorOffsetY;
			shadow.scaleX = card.scaleX;
			shadow.scaleY = card.scaleY;
			shadow.visible = false;
			shadow.alpha = 0;

			this.orgShadowX = shadow.x;
			this.orgShadowS = shadow.scaleX;
		}

		/** 每次创建组件都会调用 */
		protected start() {
			// console.info("start");
			// this.emoji.visible = gMath.getRandomAnswer(true, false);
			// this.updateRender();
			// gTween.loopScaleY(this.people, 1.1, 500, 1, egret.Ease.backOut);
			// this.initPos();
			// this.updateRender();
			// this.draw();
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

		/** 显示组件 */
		// public show(aim?: boolean, callback: Function = this.startMove, thisObj: any = this, params?: any[]) {
		// 	if (!aim) {
		// 		super.show();
		// 		if (callback) {
		// 			callback.call(thisObj, ...params);
		// 		}
		// 		return;
		// 	}
		// 	gTween.fadeIn(this, 300, 1, void 0, { duration: 500 }, { callback: callback, thisObj: thisObj, params });
		// }

		/** 隐藏组件 */
		public hide(aim?: boolean, callback: Function = util.CardMgr.removeAi, thisObj: any = util.CardMgr, params: any[] = [this]) {
			if (!aim) {
				super.hide();
				if (callback) {
					callback.call(thisObj, ...params);
				}
				return;
			}
			gTween.fadeOut(this, 300, 1, void 0, { duration: 500 }, { callback: callback, thisObj: thisObj, params });
		}
		/* =========== 框架结构代码-end =========== */


		/* =========== 业务代码-start =========== */
		/** 设置or获取位置ID */
		// posId(posId?: number): number {
		// 	if (posId != void 0) {
		// 		this._posId = posId;
		// 	} else {
		// 		return this._posId;
		// 	}
		// }

		// private initPos() {
		// 	this.posId(0);
		// 	// const pos: { x: number, y: number, dir: gConst.aiDir } = gCar.getPos(this.posId());
		// 	const pos: { x: number, y: number } = GameMgr.getPosCar(this.pos);
		// 	// console.log(pos.x, pos.y);
		// 	this.x = pos.x;
		// 	this.y = pos.y;
		// }

		// private getDirectionByNext(nextPos: number[]): gConst.aiDir {
		// 	if (!nextPos || nextPos.length < 1) {
		// 		return;
		// 	}
		// 	const pos = this.pos;
		// 	const row = pos[0];
		// 	const col = pos[1];
		// 	const nextRow = nextPos[0];
		// 	const nextCol = nextPos[1];

		// 	let dir: gConst.aiDir;

		// 	if (row == nextRow) {
		// 		if (col < nextCol) {
		// 			dir = gConst.aiDir.LEFT_BOTTOM;
		// 		} else {
		// 			dir = gConst.aiDir.RIGHT_TOP;
		// 		}
		// 	} else {
		// 		if (row < nextRow) {
		// 			dir = gConst.aiDir.LEFT_TOP;
		// 		} else {
		// 			dir = gConst.aiDir.RIGHT_BOTTOM;
		// 		}
		// 	}
		// 	return dir;
		// }

		/**
		 * 设置or获取Ai方向
		 */
		// private direction(dir?: gConst.aiDir): gConst.aiDir {
		// 	if (dir != void 0) {
		// 		const isUpdate: boolean = this._direction != dir;
		// 		if (isUpdate) {
		// 			this._direction = dir;
		// 			this.updateRender();
		// 		}
		// 	} else {
		// 		return this._direction;
		// 	}
		// }

		// private updateRender() {
		// 	//小车
		// 	const dir = this.direction();
		// 	// console.log("updateRender", dir);
		// 	const uiDir = dir % 2;
		// 	const scaleX = dir >= 2 ? -1 : 1;

		// 	const con = this.con;
		// 	const card = this.card;

		// 	// card.source = `car${this.type}_${uiDir}_ui_png`;
		// 	gComMgr.setItemAnchor(card);
		// 	gComMgr.setItemAnchor(con);
		// 	card.scaleX = this.initS * scaleX;

		// 	//粒子
		// 	// this.conParticle.rotation = this.direction() == gConst.aiDir.LEFT_BOTTOM ? 45 : -45;
		// }

		// private playEff() {
		// 	this.createParticles(this.conParticle, ["coin", "monye"], "coin");
		// }

		// private move(item: egret.DisplayObject, x: number = item.x, y: number = item.y, speed: number = 500, ease?: { x: Function, y?: Function }, callBack?: Function, thisObj?: any, ...params: any[]): number {
		// 	//开始移动
		// 	let time: number = gMath.getTimeBySpeed(item.x, item.y, x, y, speed);
		// 	gTween.toMove(item, x, y, { x: time }, void 0, void 0, ease, void 0, {
		// 		callback: () => {
		// 			if (callBack) {
		// 				callBack.call(thisObj, ...params);
		// 			}
		// 		}
		// 	});
		// 	return time;
		// }

		public isOpen: boolean = false;

		public draw(isAim: boolean): void {
			if (!this.data.isOpen) {
				return;
			}
			const card = this.card;

			const data = this.data;
			const num = data.num;

			this.isOpen = true;
			gTween.rmTweens(card);
			if (isAim) {
				gSoundMgr.playEff("smfanpai");
				egret.Tween.get(card).to({ scaleX: 0 }, 100).call(() => {
					// card.source = "p_" + (this.m_key == "r" ? 1 : 2) + "_" + this.m_value + "_png";
					card.source = `card${num}_ui_png`;
				}, this).to({ scaleX: 1 }, 100);
			} else {
				card.source = `card${num}_ui_png`;
			}
		}

		private readonly shaowShowTimer: number = 800;

		public showShadow(dir: number) {
			const shadow = this.shadow;
			const orgX = this.orgShadowX;
			const orgS = this.orgShadowS;
			const duration = this.shaowShowTimer;

			shadow.alpha = 0;
			shadow.visible = true;
			gTween.tween(shadow, void 0, {
				props: {
					x: orgX + 20 /* * dir*/,
					alpha: 1,
					scaleX: orgS * 1.05,
					scaleY: orgS * 1.05
				}, duration: duration * .3, wait: { duration: duration * .4 }, call: {
					callback: () => {
						this.hideShadow();
					}
				}
			});
		}

		public hideShadow() {
			const shadow = this.shadow;
			const orgX = this.orgShadowX;
			const orgS = this.orgShadowS;
			// gTween.fadeOut(shadow, 100);
			const duration = this.shaowShowTimer;

			gTween.tween(shadow, void 0, {
				props: {
					x: orgX,
					alpha: 0,
					scaleX: orgS,
					scaleY: orgS
				}, duration: duration * .4
			});
		}
		/* =========== 业务代码-end =========== */
	}
}