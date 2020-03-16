namespace com {
	/**
	 * NPC组件
	 */
	export class ComNpc extends com.ComFile {
		public con: eui.Group;
		public npc: com.ComMovieClip;
		public npcDebug: eui.Image;
		public npcDieDebug: eui.Image;
		public conParticles: eui.Group;

		public id: gConst.stateId;
		private _die: boolean;

		private particleId: number;

		public constructor() {
			super();
			this.skinName = skins.ComNpc;
		}

		/* =========== 框架结构代码-start =========== */
		/**
		 * 初始化
		 * @param {any[]} args 构建传参会通过init()传过去
		 */
		protected init(...args: any[]) { // type: "a" | "b" | "c" | "d" | "e") {
			// console.info("init", ...args);
			// this.type = type;
		}

		/** 首次创建组件时调用 */
		protected load() {
			// console.info("load");
			const con = this.con;
			const npc = this.npc;
			const npcDebug = this.npcDebug;
			const npcDieDebug = this.npcDieDebug;

			if (!gConst.debugModel) {
				npcDebug.visible = false;
				npcDieDebug.visible = false;
			} else {
				npcDebug.visible = true;
				npcDieDebug.visible = true;
			}

			gComMgr.setObjSize(npcDebug, true);
			npc.width = npcDebug.width;
			npc.height = npcDebug.height;
			gComMgr.setItemAnchor(con, false);

			this.loadNpc();
		}

		/** 每次创建组件都会调用 */
		protected start() {
			// console.info("start");
			// this.emoji.visible = gMath.getRandomAnswer(true, false);
			// this.initPos();
			// this.updateRender();
			// gTween.loopScaleY(this.people, 1.1, 500, 1, egret.Ease.backOut);
			this.die(null);
			this.playIdle();
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
		public show(aim?: boolean, callback: Function = this.startMove, thisObj: any = this, params?: any[]) {
			if (!aim) {
				super.show();
				if (callback) {
					callback.call(thisObj, ...params);
				}
				return;
			}
			gTween.fadeIn(this, 300, 1, void 0, { duration: 500 }, { callback: callback, thisObj: thisObj, params });
		}

		/** 隐藏组件 */
		public hide(aim?: boolean, callback: Function = gPeople.removeAi, thisObj: any = gPeople, params: any[] = [this]) {
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
		private loadNpc() {
			const npc = this.npc;

			npc.open();

			npc.setData([
				new data.McData(gConst.stateName[gConst.stateId.IDLE], 12, "xlz_idle_{1}_png", { minBit: 2 }),
				new data.McData(gConst.stateName[gConst.stateId.WALK], 18, "xlz_bw_{1}_png", { minBit: 2 }),
				new data.McData(gConst.stateName[gConst.stateId.SHOT], 5, "xlz_shot_{1}_png", { minBit: 2 }),
				new data.McData(gConst.stateName[gConst.stateId.DIE], 6, "xlz_bf_{1}_png", { minBit: 2 }),
			]);
		}

		private initPeople() {
			const npc = this.npc;

			npc.x = 0;
			npc.y = 0;
		}

		/** 待机 */
		public playIdle() {
			const npc = this.npc;
			const id = this.id = gConst.stateId.IDLE;

			this.initPeople();
			npc.gotoAndPlay(gConst.stateName[id]);
		}

		/** 掉落 */
		public playDropDown() {
			const npc = this.npc;
			const id = this.id = gConst.stateId.DROP_DOWN;

			this.initPeople();
			npc.gotoAndPlay(gConst.stateName[id], 1);
		}

		/** 行走 */
		public playWalk() {
			const npc = this.npc;
			const id = this.id = gConst.stateId.WALK;

			this.initPeople();
			npc.gotoAndPlay(gConst.stateName[id]);
		}

		/** 射击 */
		public playShot() {
			const npc = this.npc;
			const id = this.id = gConst.stateId.SHOT;

			this.initPeople();
			npc.gotoAndPlay(gConst.stateName[id], 1);
		}

		/** 死亡 */
		public playDie() {
			const conParticles = this.conParticles;
			const npc = this.npc;
			const npcDieDebug = this.npcDieDebug;
			const id = this.id = gConst.stateId.DIE;
			let particleId = this.particleId;

			if (particleId == void 0) {
				particleId = this.particleId = this.createParticles(conParticles, ["blood"], "blood", void 0, false);
			}

			this.startParticle(particleId, 500);

			this.initPeople();
			npc.x = npcDieDebug.x;
			npc.y = npcDieDebug.y;
			npc.gotoAndPlay(gConst.stateName[id], 1);
		}

		/** 设置or获取死亡状态 */
		public die(die?: boolean): boolean {
			if (die !== void 0) {
				this._die = die;
			} else {
				return this._die;
			}
		}

		/** 设置or获取位置ID */
		// posId(posId?: number): number {
		// 	if (posId != void 0) {
		// 		this._posId = posId;
		// 	} else {
		// 		return this._posId;
		// 	}
		// }

		// private initPos() {
		// 	this.posId(gMath.getRandomAnswer(0, 101, 102, 201, 202));
		// 	const pos: { x: number, y: number, dir: gConst.aiDir } = gPeople.getPos(this.posId());
		// 	this.x = pos.x;
		// 	this.y = pos.y;
		// 	// this.direction(pos.dir);
		// }

		private startMove() {
			// const posId: number = gPeople.getNextPosId(this.posId());
			// if (posId == void 0) {
			// 	this.hide(true);
			// 	return;
			// }
			// this.posId(posId);
			// let aim: boolean = false;
			// const nextPos: { x: number, y: number, dir: gConst.aiDir } = gPeople.getPos(posId);
			// if (!nextPos) {
			// 	this.hide(aim);
			// 	return;
			// }
			// let hide: boolean = false;
			// if (posId >= gPeople.getMaxId(posId)) {
			// 	hide = true;
			// } else {
			// 	switch (posId) {
			// 		case 101:
			// 		case 102:
			// 		case 201:
			// 		case 202:
			// 			hide = gMath.getRandomAnswer(true, false);
			// 			aim = true;
			// 			break;
			// 	}
			// }
			// const speed: number = gMath.getRandomInteger(120, 80);
			// this.move(this, nextPos.x, nextPos.y, speed, void 0, () => {
			// 	if (hide) {
			// 		this.hide(aim);
			// 	} else {
			// 		// this.direction(nextPos.dir);
			// 		this.startMove();
			// 	}
			// });
		}

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
		// 	this.people.source = `pp${this.type}_${this.direction()}_png`;
		// 	gComMgr.setImgAnchor(this.people);
		// 	this.people.x = this.people.anchorOffsetX;
		// 	this.people.y = this.people.anchorOffsetY = this.people.height;
		// 	this.width = this.con.width = this.people.width;
		// 	this.height = this.con.height = this.people.height;
		// }

		private move(item: egret.DisplayObject, x: number = item.x, y: number = item.y, speed: number = 500, ease?: { x: Function, y?: Function }, callBack?: Function, thisObj?: any, ...params: any[]): number {
			//开始移动
			let time: number = gMath.getTimeBySpeed(item.x, item.y, x, y, speed);
			gTween.toMove(item, x, y, { x: time }, void 0, void 0, ease, void 0, {
				callback: () => {
					if (callBack) {
						callBack.call(thisObj, ...params);
					}
				}
			});
			return time;
		}
		/* =========== 业务代码-end =========== */
	}
}