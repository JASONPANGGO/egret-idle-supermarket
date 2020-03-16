namespace com {
	/**
	 * 汽车组件
	 */
	export class ComCar extends com.ComFile {
		public con: eui.Group;
		public car: eui.Image;
		// public conParticle: eui.Group;

		private _direction: gConst.aiDir = gConst.aiDir.RIGHT_BOTTOM;

		private _posId: number;

		private _die: boolean;

		private type: 1 | 2 | 3;

		public pos: number[];

		private initS: number = 1;

		public constructor() {
			super();
			this.skinName = skins.ComCar;
		}

		/* =========== 框架结构代码-start =========== */
		/**
		 * 初始化
		 * @param {any[]} args 构建传参会通过init()传过去
		 */
		protected init(pos: number[]) {
			// console.info("init", ...args);
			this.pos = pos;
			this.type = gMath.getRandomAnswer(1, 2, 3);
			this.initPos();
		}

		/** 首次创建组件时调用 */
		protected load() {
			// console.info("load");
			const con = this.con;
			const car = this.car;

			gComMgr.setItemAnchor(car);
			gComMgr.setItemAnchor(con);
		}

		/** 每次创建组件都会调用 */
		protected start() {
			// console.info("start");
			// this.emoji.visible = gMath.getRandomAnswer(true, false);
			// this.updateRender();
			// gTween.loopScaleY(this.people, 1.1, 500, 1, egret.Ease.backOut);
			// this.initPos();
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
		/** 设置or获取位置ID */
		posId(posId?: number): number {
			if (posId != void 0) {
				this._posId = posId;
			} else {
				return this._posId;
			}
		}

		private initPos() {
			this.posId(0);
			// const pos: { x: number, y: number, dir: gConst.aiDir } = gCar.getPos(this.posId());
			const pos: { x: number, y: number } = GameMgr.getPosCar(this.pos);
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
				const allPos = gCar.allPos;
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
			if (row < gCar.maxRow - 1) {
				pushItem.call(this, [row + 1, col]);
			}

			if (col > 0) {
				pushItem.call(this, [row, (col - 1)]);
			}
			if (col < gCar.maxCol - 1) {
				pushItem.call(this, [row, (col + 1)]);
			}

			const nextPos = gMath.getRandomAnswer(...nextAllPos);
			// console.info("nextPos", pos, nextPos);
			return nextPos;
		}

		private startMove() {
			// console.info("startMove");
			// const posId: number = gCar.getNextPosId(this.posId());
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

			const posLoc = GameMgr.getPosCar(nextPos);

			if (!posLoc) {
				// debugger;
			}

			this.nextDie = gDevelop.arrHasVal(gCar.diePos, nextPos);

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
			//小车
			const dir = this.direction();
			// console.log("updateRender", dir);
			const uiDir = dir % 2;
			const scaleX = dir >= 2 ? -1 : 1;

			const con = this.con;
			const car = this.car;

			car.source = `car${this.type}_${uiDir}_ui_png`;
			gComMgr.setItemAnchor(car);
			gComMgr.setItemAnchor(con);
			car.scaleX = this.initS * scaleX;

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