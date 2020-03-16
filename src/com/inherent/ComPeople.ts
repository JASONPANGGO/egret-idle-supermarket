namespace com {
	/**
	 * 人物组件
	 */
	export class ComPeople extends com.ComFile {
		public con: eui.Group;
		// public people: com.ComMovieClip;
		public people: eui.Image;
		// public peopleDebug: eui.Image;
		// public peopleDieDebug: eui.Image;
		// public peopleWalkDebug: eui.Image;
		// public conParticles: eui.Group;
		// public warn: eui.Image;

		// public orgParent: egret.DisplayObjectContainer;
		// public orgIndex: number;

		// public emoji: eui.Image;

		// private _direction: gConst.aiDir = gConst.aiDir.RIGHT_BOTTOM;
		// private type: "a" | "b" | "c" | "d" | "e";
		// private _die: boolean;

		// private _posId: number;

		private comHouse: com.ComHouse;

		public id: gConst.stateId;

		// public readonly type: gConst.itemType = gConst.itemType.PEOPLE;

		private particleId: number;

		private _direction: gConst.aiDir = gConst.aiDir.RIGHT_BOTTOM;

		private _posId: number;

		private _die: boolean;

		private type: 1 | 2 | 3 | 4;

		public pos: number[];

		private initS: number = 1;

		public constructor() {
			super();
			this.skinName = skins.ComPeople;
		}

		/* =========== 框架结构代码-start =========== */
		/**
		 * 初始化
		 * @param {any[]} args 构建传参会通过init()传过去
		 */
		protected init(pos: number[], comHouse: com.ComHouse) {
			// console.info("init", ...args);
			// this.type = type;
			this.pos = pos;
			this.comHouse = comHouse;
			this.type = gMath.getRandomAnswer(1, 2, 3, 4);
			this.initPos();
		}

		/** 首次创建组件时调用 */
		protected load() {
			// console.info("load");
			const con = this.con;
			const people = this.people;
			// const peopleDebug = this.peopleDebug;
			// const peopleDieDebug = this.peopleDieDebug;
			// const peopleWalkDebug = this.peopleWalkDebug;
			// const warn = this.warn;

			// if (!gConst.debugModel) {
			// 	peopleDebug.visible = false;
			// 	peopleDieDebug.visible = false;
			// 	peopleWalkDebug.visible = false;
			// } else {
			// 	peopleDebug.visible = true;
			// 	peopleDieDebug.visible = true;
			// 	peopleWalkDebug.visible = true;
			// }

			// gComMgr.setObjSize(peopleDebug, true);
			// people.width = peopleDebug.width;
			// people.height = peopleDebug.height;
			// gComMgr.setItemAnchor(con);
			// warn.visible = false;

			gComMgr.setItemAnchor(people);
			people.y = people.anchorOffsetY = people.height;
			gComMgr.setItemAnchor(con);
			con.y = con.anchorOffsetY = con.height;
			this.anchorOffsetY = this.height;

			// this.loadPeople();
		}

		/** 每次创建组件都会调用 */
		protected start() {
			// console.info("start");
			// this.emoji.visible = gMath.getRandomAnswer(true, false);
			// this.initPos();
			// this.updateRender();
			// gTween.loopScaleY(this.people, 1.1, 500, 1, egret.Ease.backOut);
			// this.die(null);
			// this.playIdle();
			this.firstBirth = true;
			this.nextDie = false;
			this.updateRender();
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
		// private loadPeople() {
		// 	const people = this.people;

		// 	people.open();

		// 	people.setData([
		// 		new data.McData(gConst.stateName[gConst.stateId.IDLE], 15, "xlz_hanging_{1}_png", { minBit: 2 }),
		// 		new data.McData(gConst.stateName[gConst.stateId.DROP_DOWN], 28, "xlz_landing_{1}_png", { minBit: 2 }),
		// 		new data.McData(gConst.stateName[gConst.stateId.WALK], 21, "xlz_run_{1}_png", { minBit: 2 }),
		// 		new data.McData(gConst.stateName[gConst.stateId.STAND], 1, "xlz_run_{1}_png", { minBit: 2 }),
		// 		new data.McData(gConst.stateName[gConst.stateId.DIE], 1, "xlz_die_png"),
		// 	]);
		// }

		// private initPeople() {
		// 	const people = this.people;

		// 	gTween.rmTweens(people);
		// 	people.x = 0;
		// 	people.y = 0;
		// }

		/** 待机 */
		// public playIdle() {
		// 	const people = this.people;
		// 	const id = this.id = gConst.stateId.IDLE;

		// 	this.initPeople();
		// 	people.gotoAndPlay(gConst.stateName[id]);
		// 	gTween.loopFloat(people, 20, 1000, 0);
		// }

		/** 掉落 */
		// public playDropDown() {
		// 	const people = this.people;
		// 	const id = this.id = gConst.stateId.DROP_DOWN;

		// 	this.initPeople();
		// 	people.gotoAndPlay(gConst.stateName[id], 1);
		// }

		/** 行走 */
		// public playWalk() {
		// 	const people = this.people;
		// 	const id = this.id = gConst.stateId.WALK;

		// 	this.initPeople();
		// 	people.gotoAndPlay(gConst.stateName[id]);
		// }

		/** 站立 */
		// public playStand() {
		// 	const people = this.people;
		// 	const id = this.id = gConst.stateId.STAND;

		// 	this.initPeople();
		// 	people.gotoAndPlay(gConst.stateName[id], 1);
		// }

		/** 死亡 */
		// public playDie() {
		// 	const conParticles = this.conParticles;
		// 	const people = this.people;
		// 	const peopleDieDebug = this.peopleDieDebug;
		// 	const id = this.id = gConst.stateId.DIE;
		// 	let particleId = this.particleId;

		// 	if (particleId == void 0) {
		// 		particleId = this.particleId = this.createParticles(conParticles, ["blood"], "blood", void 0, false);
		// 	}
		// 	this.startParticle(particleId, 500);
		// 	this.initPeople();
		// 	people.x = peopleDieDebug.x;
		// 	people.y = peopleDieDebug.y;
		// 	people.gotoAndPlay(gConst.stateName[id], 1);
		// }

		/** 设置or获取位置ID */
		// posId(posId?: number): number {
		// 	if (posId != void 0) {
		// 		this._posId = posId;
		// 	} else {
		// 		return this._posId;
		// 	}
		// }

		/** 设置or获取死亡状态 */
		// public die(die?: boolean): boolean {
		// 	if (die !== void 0) {
		// 		this._die = die;
		// 	} else {
		// 		return this._die;
		// 	}
		// }

		/** 显示警告 */
		// public showWarn() {
		// 	gTween.showBubble(this.warn, 300, void 0, void 0, void 0, void 0, { isFloat: false });
		// }

		// private initPos() {
		// 	this.posId(gMath.getRandomAnswer(0, 101, 102, 201, 202));
		// 	const pos: { x: number, y: number, dir: gConst.aiDir } = gPeople.getPos(this.posId());
		// 	this.x = pos.x;
		// 	this.y = pos.y;
		// 	// this.direction(pos.dir);
		// }

		// private startMove() {
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
		// 	this.people.source = `pp${this.type}_${this.direction()}_png`;
		// 	gComMgr.setImgAnchor(this.people);
		// 	this.people.x = this.people.anchorOffsetX;
		// 	this.people.y = this.people.anchorOffsetY = this.people.height;
		// 	this.width = this.con.width = this.people.width;
		// 	this.height = this.con.height = this.people.height;
		// }
		/** 设置or获取位置ID */
		posId(posId?: number): number {
			if (posId != void 0) {
				this._posId = posId;
			} else {
				return this._posId;
			}
		}

		private getPosPeople(pos: number[]): { x: number, y: number } {
			const comHouse = this.comHouse;
			if (!comHouse) {
				return;
			}
			if (!pos || pos.length < 1) {
				return;
			}
			return comHouse[`posPeople_${pos[0]}_${pos[1]}`];
		}

		private initPos() {
			this.posId(0);
			// const pos: { x: number, y: number, dir: gConst.aiDir } = gPeople.getPos(this.posId());
			const pos: { x: number, y: number } = this.getPosPeople(this.pos);
			// console.log(pos.x, pos.y);
			this.x = pos.x;
			this.y = pos.y;
		}

		private firstBirth: boolean = true;
		private nextDie: boolean = false;

		private nextPos(): number[] {
			const pos = this.pos;
			let nextAllPos = [];
			const row = pos[0];
			const col = pos[1];

			let pushItem: Function = (pos: number[]) => {
				if (!pos) {
					return;
				}
				const allPos = gPeople.allPos;
				// console.info("pushItem", allPos, pos);
				// if (allPos && allPos.indexOf(pos) != -1) {
				if (allPos && !gDevelop.arrHasVal(allPos, pos)) {
					return;
				}
				nextAllPos.push(pos);
			};

			if (row > 0) {
				pushItem.call(this, [row - 1, col]);
			}
			if (row < gPeople.maxRow - 1) {
				pushItem.call(this, [row + 1, col]);
			}

			if (col > 0) {
				pushItem.call(this, [row, (col - 1)]);
			}
			if (col < gPeople.maxCol - 1) {
				pushItem.call(this, [row, (col + 1)]);
			}

			const nextPos = gMath.getRandomAnswer(...nextAllPos);
			// console.info("nextPos", pos, nextPos);
			return nextPos;
		}

		private startMove() {
			// console.info("startMove");
			// const posId: number = gPeople.getNextPosId(this.posId());
			if (this.nextDie) {
				this.dispatchEventWith(gConst.eventType.REMOVE_OBJ, void 0, this);
				return;
			}
			// this.posId(posId);
			let aim: boolean = false;
			const nextPos: number[] = this.nextPos();
			if (!nextPos) {
				this.dispatchEventWith(gConst.eventType.REMOVE_OBJ, void 0, this);
				return;
			}
			const direct = this.getDirectionByNext(nextPos);
			this.direction(direct);

			const posLoc = this.getPosPeople(nextPos);

			if (!posLoc) {
				// debugger;
			}

			this.nextDie = gDevelop.arrHasVal(gPeople.diePos, nextPos);

			// let hide: boolean = false;
			const speed: number = gMath.getRandomInteger(250, 200);
			this.move(this, posLoc.x, posLoc.y, speed, void 0, () => {
				// if (hide) {
				// 	this.hide(aim);
				// } else {
				this.pos = nextPos;
				this.startMove();
				// }
			});
		}

		private getDirectionByNext(nextPos: number[]): gConst.aiDir {
			if (!nextPos || nextPos.length < 1) {
				return;
			}
			const pos = this.pos;
			const row = pos[0];
			const col = pos[1];
			const nextRow = nextPos[0];
			const nextCol = nextPos[1];

			let dir: gConst.aiDir;

			if (row == nextRow) {
				if (col < nextCol) {
					dir = gConst.aiDir.LEFT_BOTTOM;
				} else {
					dir = gConst.aiDir.RIGHT_TOP;
				}
			} else {
				if (row < nextRow) {
					dir = gConst.aiDir.LEFT_TOP;
				} else {
					dir = gConst.aiDir.RIGHT_BOTTOM;
				}
			}
			return dir;
		}

		/**
		 * 设置or获取Ai方向
		 */
		private direction(dir?: gConst.aiDir): gConst.aiDir {
			if (dir != void 0) {
				const isUpdate: boolean = this._direction != dir;
				if (isUpdate) {
					this._direction = dir;
					this.updateRender();
				}
			} else {
				return this._direction;
			}
		}

		private updateRender() {
			//人物
			const dir = this.direction();
			// console.log("updateRender", dir);
			const uiDir = dir % 2;
			const scaleX = dir >= 2 ? -1 : 1;

			const con = this.con;
			const people = this.people;

			people.source = `people${this.type}_${uiDir}_ui_png`;

			gComMgr.setItemAnchor(people);
			people.y = people.anchorOffsetY = people.height;
			gComMgr.setItemAnchor(con);
			con.y = con.anchorOffsetY = con.height;
			this.anchorOffsetY = this.height;

			people.scaleX = this.initS * scaleX;

			//粒子
			// this.conParticle.rotation = this.direction() == gConst.aiDir.LEFT_BOTTOM ? 45 : -45;
		}

		// private playEff() {
		// 	this.createParticles(this.conParticle, ["coin", "monye"], "coin");
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