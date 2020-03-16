namespace com {
	/**
	 * 头部组件
	 */
	export class ComHeader extends com.ComFile {
		public con: eui.Group;
		public header: eui.Image;
		public conTime: eui.Group;
		public icon: eui.Image;
		public time: eui.BitmapLabel;
		public conNum: eui.Group;
		public num: eui.BitmapLabel;

		private curNum: number;
		private diffNum: number;
		private curTime: number;

		public constructor() {
			super();
			this.skinName = skins.ComHeader;
		}

		/* =========== 生命周期结构代码-start =========== */
		/**
		 * 初始化
		 * @param {any[]} args 构建传参会通过init()传过去
		 */
		protected init(...args: any[]) {
			// console.info("init", ...args);
		}

		/** 首次创建组件时调用 */
		protected load() {
			// console.info("load");
			this.curNum = 0;
			this.curTime = 6;
		}

		/** 每次创建组件都会调用 */
		protected start() {
			// console.info("start");
			this.time.text = gMath.switchHour(this.curTime);
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
				this.width = this.con.width = this.header.width = 760;
				this.height = this.con.height = this.header.height = 275;
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
				this.width = this.con.width = this.header.width = 410;
				this.height = this.con.height = this.header.height = 202;
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
				this.header.source = "p_top_png";
				this.conTime.left = 5;
				this.conTime.horizontalCenter = NaN;
				this.conTime.bottom = 42;
				this.conNum.right = 47;
				this.conNum.horizontalCenter = NaN;
			} else {
				//横屏
				this.header.source = "p_top_h_png";
				this.conTime.left = NaN;
				this.conTime.horizontalCenter = 0;
				this.conTime.bottom = 100;
				this.conNum.right = NaN;
				this.conNum.horizontalCenter = 0;
			}
		}
		/* =========== 生命周期结构代码-end =========== */


		/* =========== 业务代码-start =========== */
		/** 添加金币 */
		public addGold(diffNum: number) {
			this.diffNum = diffNum;
			this.take();
		}

		/**
		 * 当前金币数
		 */
		public get curGold() {
			return this.curNum;
		}

		/**
		 * 收钱到账
		 */
		private take() {
			this.playNum();
		}

		/**
		 * 播放数字切换效果
		 */
		private playNum() {
			if (!this.diffNum) {
				return;
			}

			var self = this;
			var baseNum: number = this.curNum;
			this.curNum += this.diffNum;

			var change: Function = (random: number) => {
				var diffNum: number = random - baseNum; //与原数字的差
				var absNum: number = Math.abs(diffNum); //差取绝对值
				var changeTimes: number = absNum < gConst.changeGoldTimes ? absNum : gConst.changeGoldTimes;
				var changeUnit: number = absNum < gConst.changeGoldTimes ? 1 : Math.floor(diffNum / gConst.changeGoldTimes); //每次变化的值
				//依次变化
				var i: number = 0;
				var changeNum: Function = () => {
					setTimeout(() => {
						//过程中
						this.num.text = gMath.switchNum(baseNum += changeUnit, true, 12);
						//最后一步指定最终值
						if (i == changeTimes - 1) {
							this.num.text = gMath.switchNum(this.curNum, true, 12);
							this.dispatchEventWith(egret.Event.COMPLETE);
							return;
						}
						i++;
						changeNum();
					}, gConst.changeGoldTimer * (i + 1));
				};
				changeNum();
			}

			var start: Function = () => {
				var _max: number;
				var _min: number;
				if (this.curNum > baseNum) {
					_max = this.curNum;
					_min = baseNum;
				} else {
					_max = baseNum;
					_min = this.curNum;
				}
				var random: number = Math.floor(Math.random() * _max + _min);
				change(random);
			}

			start();
		}

		public startTime() {
			this.timeDelay = egret.setInterval(this.updateTime, this, 2500);
		}

		private timeDelay: number;
		private updateTime() {
			this.curTime++;
			this.time.text = gMath.switchHour(this.curTime);
			if (this.curTime == 18) {
				// GameMgr.gameview.openEnd();
			} else if (this.curTime >= 20) {
				this.icon.source = "p_night_png";
				this.stopTime();
			}
		}

		private stopTime() {
			egret.clearInterval(this.timeDelay);
		}
		/* =========== 业务代码-end =========== */
	}
}