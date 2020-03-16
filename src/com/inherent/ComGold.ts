namespace com {
	/**
	 * 头部组件
	 */
	export class ComGold extends com.ComFile {
		public con: eui.Group;
		public conNum: eui.Group;
		public flyPos: eui.Image;
		public bg: eui.Image;

		public conLamps: eui.Group;

		// public num: eui.BitmapLabel;
		public num: eui.Label;

		private _curNum: number;
		private diffNum: number;

		public constructor() {
			super();
			this.skinName = skins.ComGold;
		}

		/* =========== 生命周期结构代码-start =========== */
		/**
		 * 初始化
		 * @param {any[]} args 构建传参会通过init()传过去
		 */
		protected init(isCircle: boolean) {
			// console.info("init", ...args);
			// this.initCircle(isCircle);
		}

		/** 首次创建组件时调用 */
		protected load() {
			// console.info("load");
			this.curNum = GameMgr.gold;
			this.updateRender(this.curNum);
			const bg = this.bg;
			const conNum = this.conNum;
			const con = this.con;

			gComMgr.setObjSize(bg, true);
			gComMgr.setObjSize(conNum, true);
			gComMgr.setObjSize(con, true);
			gComMgr.setItemAnchor(this);

			// this.updateRender();
		}

		/** 每次创建组件都会调用 */
		protected start() {
			// console.info("start");
			this.initLamps();
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

			const baseScale: number = gConst.mobileByScale[GameMgr.screenType][GameMgr.mobileType];

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
		/* =========== 生命周期结构代码-end =========== */


		/* =========== 业务代码-start =========== */
		/** 添加金币 */
		public add(diffNum: number) {
			if (diffNum == void 0) {
				return;
			}
			this.diffNum = diffNum;
			this.take();
		}

		/**
		 * 当前金币数
		 */
		public get curNum() {
			return this._curNum;
		}
		public set curNum(num: number) {
			this._curNum = num;
		}

		/**
		 * 收钱到账
		 */
		private take() {
			this.playNum();
		}

		private playDelay: number[] = [];
		private playing: boolean;
		private playStop: boolean;

		/**
		 * 播放数字切换效果
		 */
		private playNum() {
			if (!this.diffNum) {
				return;
			}

			const lastUpdate: Function = () => {
				this.updateRender(this.curNum);
				this.dispatchEventWith(egret.Event.COMPLETE);
				this.playing = false;
			}

			const clearDelay: Function = () => {
				while (this.playDelay && this.playDelay.length) {
					egret.clearTimeout(this.playDelay.shift());
				}
			}

			const change: Function = (random: number) => {
				const diffNum: number = random - baseNum; //与原数字的差
				const absNum: number = Math.abs(diffNum); //差取绝对值
				const changeTimes: number = Math.min(absNum, gConst.changeGoldTimes);
				const changeUnit: number = absNum < changeTimes ? 1 : Math.floor(diffNum / changeTimes); //每次变化的值
				// console.log("changeTimes", changeTimes);
				//依次变化
				let i: number = 0;
				const changeNum: Function = () => {
					if (this.playStop) {
						return;
					}
					this.playDelay[this.playDelay.length] = egret.setTimeout(() => {
						if (this.playStop) {
							return;
						}
						//最后一步指定最终值
						if (i == changeTimes - 1) {
							lastUpdate.call(this);
							return;
						} else {
							//过程中
							this.updateRender(baseNum += changeUnit);
						}
						i++;
						changeNum();
					}, this, gConst.changeGoldTimer * (i + 1));
				};
				changeNum();
			}

			const start: Function = () => {
				let max: number;
				let min: number;
				if (this.curNum > baseNum) {
					max = this.curNum;
					min = baseNum;
				} else {
					max = baseNum;
					min = this.curNum;
				}

				this.playStop = false;
				this.playing = true;
				const random: number = Math.floor(Math.random() * max + min);
				change(random);
			}

			if (this.playing) {
				this.playStop = true;
				//不清除上次的延迟，即继续上次值播放到最新
				clearDelay.call(this);
				lastUpdate.call(this);
			}

			let baseNum: number = this.curNum;
			this.curNum += this.diffNum;

			start();
		}

		private aimCnt: number = 0;
		private fCnt: number = 1;

		private updateRender(num: number) {
			if (num > this.curNum) {
				return;
			}
			const orgS: number = 1;
			let targetS: number = 1.1;
			num = Math.min(num, GameMgr.maxGold);
			// console.log("updateRender", num);
			if (GameMgr.isVip) {
				targetS = 1.4;
				this.fCnt = 6;
			}
			this.aimCnt++;
			if (this.aimCnt >= this.fCnt) {
				this.aimCnt = 0;
				gTween.toScale(this.num, targetS, 200, orgS, void 0, void 0, {
					callback: () => {
						gTween.toScale(this.num, orgS, 100);
					}
				});
			}
			this.num.text = gMath.switchNum(num, true);
			// if (num > gConst.showCarGold) {
			// 	this.dispatchEventWith(gConst.eventType.SHOW_CAR_START);
			// }
		}

		// updateRender() {
		// 	const gold = GameMgr.gold;

		// 	if (gold == this.curNum) {
		// 		return;
		// 	}
		// 	this.curNum = gold;
		// 	this.num.text = gMath.switchNum(this.curNum, true);
		// }

		private maxLameIdx: number = 0;

		private initLamps() {
			let i: number = 0;
			let lamp: com.ComLamp = this[`comLamp${i}`];

			while (lamp) {
				lamp.open();
				this.maxLameIdx = Math.max(this.maxLameIdx, i);
				i++;
				lamp = this[`comLamp${i}`];
			}
		}

		private readonly initOffWait: number = 200;
		private readonly initNextWait: number = 80;

		private curLameIdx: number = 0;
		private offLampWait: number = 0;
		private nextLampInterval: number = 0;

		private nextLampDelay: number;

		private playLamps() {
			this.onLamp(this.curLameIdx);
			egret.clearInterval(this.nextLampDelay);
			this.nextLampDelay = egret.setInterval(this.onNextLamp, this, this.nextLampInterval);
		}

		playLampsByScale(scale: number = 1) {
			const vipScale = GameMgr.isVip ? gConst.vipLampTimeScale : 1;
			this.offLampWait = gMath.keepDecimal(this.initOffWait / scale / vipScale, 0);
			this.nextLampInterval = gMath.keepDecimal(this.initNextWait / scale / vipScale, 0);
			this.playLamps();
		}

		private onNextLamp() {
			let i = this.curLameIdx;
			i++;
			if (i > this.maxLameIdx) {
				i = 0;
			}
			this.onLamp(i);
		}

		private onLamp(i: number) {
			let lamp: com.ComLamp = this[`comLamp${i}`];
			if (!lamp) {
				return;
			}

			this.curLameIdx = i;
			lamp.on(this.offLampWait);
		}
		/* =========== 业务代码-end =========== */
	}
}