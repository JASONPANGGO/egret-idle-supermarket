namespace com {
	/**
	 * 建筑物组件
	 */
	export class ComHouse extends com.ComFile {
		public con: eui.Group;
		public lawn: eui.Image;
		public guidePos: eui.Image;
		public conFlag: eui.Group;
		public flag0: eui.Image;
		public flag1: eui.Image;
		public flag2: eui.Image;
		public conMoney: eui.Group;

		public conEff0: eui.Group;
		public moneyDebug: eui.Image;
		public mcMoney: com.ComMovieClip;
		public conParticle0: eui.Group;

		public conHouse: eui.Group;

		public conEff1: eui.Group;
		public levelupDebug: eui.Image;
		public mcLevelup: com.ComMovieClip;

		public conEff2: eui.Group;
		public buildupDebug: eui.Image;
		public mcBuildup: com.ComMovieClip;

		public money: eui.Image;
		public conUpgrade: eui.Group;
		public upgrade: eui.Image;
		public conBar: eui.Group;
		public comProgress: com.ComProgress;

		private house: com.ComBones;

		private _id: number = 0; //建筑物ID
		private _lv: number; //建筑物等级
		private flagId: gConst.flagId;

		private initY: number;
		private initScaleY: number;

		public orgPosH: { x?: number, y?: number } = {}; //横屏位置
		public orgPosV: { x?: number, y?: number } = {}; //竖屏位置

		private _state: gConst.state = gConst.state.NOT_ENABLE; //建筑物状态

		public constructor() {
			super();
			this.skinName = skins.ComHouse;
		}

		/* =========== 框架结构代码-start =========== */


		/**
		 * 初始化
		 * @param {any[]} args 构建传参会通过init()传过去
		 */
		protected init(id: number, flagId: gConst.flagId, lv: number = 1) {
			// console.info("init", ...args);
			this.id = id;
			this.flagId = flagId;
			this.lv = lv;
		}

		/** 首次创建组件时调用 */
		protected load() {
			// console.info("load");
			const con = this.con;
			const lawn = this.lawn;
			const money = this.money;
			const upgrade = this.upgrade;
			const comProgress = this.comProgress;

			const conEff0 = this.conEff0;
			const moneyDebug = this.moneyDebug;
			const mcMoney = this.mcMoney;
			const conParticle0 = this.conParticle0;

			const conMoney = this.conMoney;
			const conUpgrade = this.conUpgrade;
			const conBar = this.conBar;

			const conEff1 = this.conEff1;
			const levelupDebug = this.levelupDebug;
			const mcLevelup = this.mcLevelup;

			const conEff2 = this.conEff2;
			const buildupDebug = this.buildupDebug;
			const mcBuildup = this.mcBuildup;

			gComMgr.setObjSize(lawn, true);
			gComMgr.setObjSize(con, true);

			gComMgr.setItemAnchor(money, true, false);
			gComMgr.setItemAnchor(upgrade, true, false);
			comProgress.open(this);
			gComMgr.setItemAnchor(comProgress, true, false);
			money.visible = false;
			upgrade.visible = false;
			comProgress.visible = false;

			conEff0.touchEnabled = conEff0.touchChildren = false;
			conParticle0.touchEnabled = conParticle0.touchChildren = false;
			conEff1.touchEnabled = conEff1.touchChildren = false;
			conEff2.touchEnabled = conEff2.touchChildren = false;

			this.setItemOrgPos(conEff0);
			this.setItemOrgPos(conParticle0);
			this.setItemOrgPos(conMoney);
			this.setItemOrgPos(conUpgrade);
			this.setItemOrgPos(conBar);
			this.setItemOrgPos(conEff1);
			this.setItemOrgPos(conEff2);

			this.initMcEff(moneyDebug, mcMoney, [new data.McData("work", 6/*12*/, "xle_money_{1}_png")]);
			this.initMcEff(levelupDebug, mcLevelup, [new data.McData("work", 8/*16*/, "xle_levelup_{1}_png")]);
			this.initMcEff(buildupDebug, mcBuildup, [new data.McData("work", 7/*13*/, "xle_buildup_{1}_png")]);
		}

		/** 每次创建组件都会调用 */
		protected start() {
			// console.info("start");
			this.initAllFlag();
			this.showCurrFlag();
			this.renderHouse();
		}

		/** 每次结束组件都会调用 */
		protected stop() {
			// console.info("stop");
		}

		/** 监听组件，每帧都会调用 */
		protected update() {
			// console.info("update");
			this.checkMeetUpgrade();
			this.playAuto();
			this.addPeople();
			this.sortSceneByY();
		}

		/** 注册事件 */
		protected addEvent() {
			// console.info("addEvent");
			this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHouse, this, true);
		}

		/** 移除事件 */
		protected removeEvent() {
			// console.info("removeEvent");
			this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHouse, this, true);
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
			// console.info("rotateView", this.id);

			const conEff0 = this.conEff0;
			const conParticle0 = this.conParticle0;
			const conMoney = this.conMoney;
			const conUpgrade = this.conUpgrade;
			const conBar = this.conBar;
			const conEff1 = this.conEff1;
			const conEff2 = this.conEff2;

			if (GameMgr.screenType == gConst.screenType.VERTICAL) {
				//竖屏
				this.x = this.orgPosV.x;
				this.y = this.orgPosV.y;
			} else {
				//横屏
				this.x = this.orgPosH.x;
				this.y = this.orgPosH.y;
			}

			this.updateItemPos(conEff0);
			this.updateItemPos(conParticle0);
			this.updateItemPos(conMoney);
			this.updateItemPos(conUpgrade);
			this.updateItemPos(conBar);
			this.updateItemPos(conEff1);
			this.updateItemPos(conEff2);
		}
		/* =========== 框架结构代码-end =========== */


		/* =========== 业务代码-start =========== */
		private gameStarted: boolean;
		gameStart() {
			if (this.gameStarted) {
				return;
			}
			this.gameStarted = true;
			this.updateProps();

			const conEff0 = this.conEff0;
			const conMoney = this.conMoney;
			const conUpgrade = this.conUpgrade;
			const conBar = this.conBar;
			const conEff1 = this.conEff1;
			const conEff2 = this.conEff2;

			this.updateItemPos(conEff0);
			this.updateItemPos(conMoney);
			this.updateItemPos(conUpgrade);
			this.updateItemPos(conBar);
			this.updateItemPos(conEff1);
			this.updateItemPos(conEff2);
		}

		/** 获取建筑物ID */
		get id(): number {
			return this._id;
		}
		/** 设置建筑物ID */
		set id(id: number) {
			this._id = id;
		}

		/** 获取建筑物状态 */
		get state(): gConst.state {
			return this._state;
		}
		/** 设置建筑物状态 */
		set state(state: gConst.state) {
			// if (state == gConst.state.AUTO) {
			// 	console.log("set.state", this.id);
			// }
			this._state = state;
		}

		/** 获取建筑物等级 */
		get lv(): number {
			return this._lv;
		}
		/** 设置建筑物等级 */
		set lv(lv: number) {
			if (lv > GameMgr.maxLv) {
				return;
			}
			const isUpdate: boolean = this._lv != void 0 && this._lv != lv;
			if (isUpdate) {
				this.playUpgrade(lv);
			}
			this._lv = lv;
			if (lv == GameMgr.maxLv) {
				this.dispatchEventWith(gConst.eventType.LV_TO_MAX);
				this.playAuto();
			}
		}


		private allPeople: com.ComPeople[] = [];

		private endPeople: boolean = true;

		/** 显示人物 */
		showPeople() {
			// console.info("showCar");
			this.endPeople = false;
			this.addPeople();
		}

		/** 隐藏人物 */
		private hidePeople(clearAll: boolean = true) {
			// console.info("hideCar");
			this.endPeople = true;
			if (clearAll) {
				while (this.allPeople.length > 0) {
					//第一个子对象为debug区域，所以从下标1开始
					const ai = this.allPeople[0];
					gPeople.removeAi(ai);
					gDevelop.arrDelVal(this.allSortSceneObj, ai);
				}
				this.allPeople = [];
			}
		}

		private nextShowPeople: number;
		private updateNextShowPeople() {
			const float = 100;
			const time = Math.max(1500 - this.id * 500, 300);
			this.nextShowPeople = egret.getTimer() + gMath.getRandomInteger(time + float, time - float);
		}

		private checkPeople(): boolean {
			return this.allPeople.length >= GameMgr.getMaxPeople();
		}

		/** 添加小车 */
		private addPeople() {
			if (this.endPeople) {
				return;
			}
			if (this.checkPeople()) {
				return;
			}
			if (this.nextShowPeople >= egret.getTimer()) {
				return;
			} else {
				this.updateNextShowPeople();
			}
			const birthPos = gPeople.birthPos;
			// console.info("addCar", birthPos);
			if (!birthPos || birthPos.length == 0) {
				return;
			}
			//初始化
			const people = gPeople.createAi();
			const birth: number[] = gMath.getRandomAnswer(...birthPos);
			// console.info("addCar", birth);
			people.once(gConst.eventType.REMOVE_OBJ, this.removePeople, this);
			people.open(birth, this);
			people.show(true);
			this.allPeople.push(people);
			this.allSortSceneObj.push(people);
			this.con.addChild(people);
			// gSoundMgr.playEff("smcar");
		}

		private allSortSceneObj: (egret.DisplayObject | egret.DisplayObjectContainer)[] = [];
		private startSceneIdx: number = 1;

		/** 排序场景中对象y轴 */
		private sortSceneByY() {
			// console.info("sortSceneByY.this.starHouseInx ==", this.starHouseInx);
			// egret.clearTimeout(this.sortHousesDelay);
			this.allSortSceneObj.sort((child1, child2) => {
				return child1.y - child2.y;
			});

			this.allSortSceneObj.forEach((child, i) => {
				if (child.parent) {
					child.parent.setChildIndex(child, this.startSceneIdx + i);
				}
			});

			// console.info("sortSceneByY", this.comHouses);
		}

		private removePeople(event: egret.Event, car: com.ComPeople) {
			let _people: com.ComPeople;
			if (event) {
				_people = event.data;
			} else {
				_people = car;
			}
			if (!_people) {
				return;
			}
			gPeople.removeAi(_people);
			gDevelop.arrDelVal(this.allPeople, _people);
			gDevelop.arrDelVal(this.allSortSceneObj, _people);
		}

		/** 播放升级特效 */
		private playUpgrade(lv: number) {
			const house = this.house;
			if (!house) {
				return;
			}
			const armatureDisplay = house.armatureDisplay;
			if (!armatureDisplay) {
				return;
			}
			// const animationName = `building${this.id + 1}${this.lv}`;
			this._lv = lv;
			// armatureDisplay.removeEventListener(egret.Event.COMPLETE, this.playComplete, this);
			// armatureDisplay.once(egret.Event.COMPLETE, this.playComplete, this);
			// house.play(animationName);

			this.playComplete();
		}

		/** 播放获得金币特效 */
		private playGetGold() {
			if (this.state == gConst.state.AUTO) {
				return;
			}
			const house = this.house;
			if (!house) {
				return;
			}
			const armatureDisplay = house.armatureDisplay;
			if (!armatureDisplay) {
				return;
			}
			const animationName = `building${this.id + 1}${this.lv}`;
			armatureDisplay.removeEventListener(egret.Event.COMPLETE, this.playComplete, this);
			house.play(animationName).timeScale = 2;
		}

		private playComplete(event?: egret.Event) {
			const house = this.house;
			if (house && house.armatureDisplay) {
				house.armatureDisplay.removeEventListener(egret.Event.COMPLETE, this.playComplete, this);
			}

			if (GameMgr.isEnd) {
				return;
			}

			if (!house) {
				return;
			}
			const armatureDisplay = house.armatureDisplay;
			if (!armatureDisplay) {
				return;
			}

			const animationName = `building${this.id + 1}${this.lv}`;
			// if (GameMgr.auto) {
			// 	this.updateProps();
			// } else {
			house.play(animationName);
			// }
		}

		private playAuto() {
			if (!GameMgr.auto) {
				return;
			}
			if (this.flagId == gConst.flagId.INSTALL && this.state == gConst.state.NOT_ENABLE) {
				return;
			}
			if (this.lv < GameMgr.maxLv) {
				return;
			}
			if (this.state == gConst.state.AUTO) {
				this.hideAllProps();
				return;
			}
			this.state = gConst.state.AUTO;

			const house = this.house;
			if (!house) {
				return;
			}
			const armatureDisplay = house.armatureDisplay;
			if (!armatureDisplay) {
				return;
			}
			const animationName = `building${this.id + 1}${this.lv}`;
			armatureDisplay.removeEventListener(egret.Event.COMPLETE, this.playComplete, this);
			armatureDisplay.addEvent(dragonBones.EgretEvent.LOOP_COMPLETE, this.playLoopComplete, this);
			house.play(animationName, 0).timeScale = 2;

			this.hideProps(this.getCurrProps());
		}

		private playLoopComplete(event: dragonBones.EgretEvent) {
			// console.info("playLoopComplete");

			//满屏停止循环播放回调
			// if (GameMgr.showCurtainFull) {
			// const house = this.house;
			// if (!house) {
			// 	return;
			// }
			// const armatureDisplay = house.armatureDisplay;
			// if (!armatureDisplay) {
			// 	return;
			// }
			// armatureDisplay.removeEvent(dragonBones.EgretEvent.LOOP_COMPLETE, this.playLoopComplete, this);
			// return;
			// }

			const income = this.getCurIncome();
			if (income != void 0) {
				const vipScale = GameMgr.isVip ? gConst.vipGoldScale : 1;
				GameMgr.gold += income * vipScale;
				GameMgr.gameview.dispatchEventWith(gConst.eventType.UPDATE_GOLD, void 0, income * vipScale);
			}
			this.playMcMoney();
			// this.showMoneyParticles();
		}

		private initAllFlag() {
			let i: number = 0;
			let flag: eui.Image = this[`flag${i}`];

			while (flag) {
				flag.visible = false;
				i++;
				flag = this[`flag${i}`];
			}
		}

		private hideCurrFlag() {
			const flagId = this.flagId;

			const flag: eui.Image = this[`flag${flagId}`];
			if (flag) {
				flag.visible = false;
			}
		}

		private showCurrFlag() {
			const flagId = this.flagId;

			const flag: eui.Image = this[`flag${flagId}`];
			if (flag) {
				flag.visible = true;
			}
		}

		updateFlag(_flagId: gConst.flagId = gConst.flagId.CAN_BUILD) {
			const flagId = this.flagId;

			if (_flagId == flagId) {
				return;
			}
			this.hideCurrFlag();
			this.flagId = _flagId;
			this.showCurrFlag();
		}

		updateState(_state: gConst.state = gConst.state.ENABLE) {
			if (this.flagId == gConst.flagId.INSTALL) {
				return;
			}
			const state = this.state;

			if (_state == state) {
				return;
			}
			this.state = _state;
			if (this.id == GameMgr.maxHourseId) {
				this.lv = 3;
			}
			this.initHouse();
		}

		private initHouse() {
			let house = this.house;
			if (!house) {
				const conHouse = this.conHouse;
				house = this.house = new com.ComBones();
				house.setData(conHouse, "building");
				house.setScale(2); //资源被缩小一倍
				const name = `building${this.id + 1}${this.lv}`;
				house.gotoAndStopByTime(name);
				this.playMcBuildup();
				//建造建筑物，隐藏建筑物标志、草坪
				this.lawn.visible = false;
				this.conFlag.visible = false;

				if (this.id > 0) {
					gSoundMgr.playEff("smbuild");
				}

				if (this.id == GameMgr.maxHourseId) {
					const armatureDisplay = house.armatureDisplay;
					if (!armatureDisplay) {
						return;
					}

					const animationName = `building${this.id + 1}${this.lv}`;
					armatureDisplay.addEvent(dragonBones.EgretEvent.LOOP_COMPLETE, this.playLoopComplete, this);
					house.play(animationName, 0).timeScale = 2;
					gTween.toBottomShow(conHouse, 300, 300, 0, 1);
				}
			}
		}

		private getCurrProps() {
			const type = this.propsType;
			if (type == void 0) {
				return;
			}
			switch (type) {
				//钱币
				case gConst.propsType.MONEY:
					return this.money;
				//升级
				case gConst.propsType.UPGRADE:
					return this.upgrade;
				//进度条
				case gConst.propsType.PROGRESS:
					return this.comProgress;
			}
		}

		private hideProps(props: eui.Image | com.ComProgress, callBack?: Function, thisObj?: any, ...arg: any[]) {
			if (!props || !props.visible) {
				return;
			}
			gTween.toSmallHide(props, 200, 1, 1, void 0, void 0, {
				callback: () => {
					if (callBack) {
						callBack.call(thisObj, ...arg);
					}
				}
			});
		}

		private hideAlled: boolean;

		private hideAllProps() {
			if (this.hideAlled) {
				return;
			}
			this.hideAlled = true;
			this.hideProps(this.money);
			this.hideProps(this.upgrade);
			this.hideProps(this.comProgress);
		}

		private showProps(props: eui.Image | com.ComProgress) {
			if (this.state == gConst.state.AUTO) {
				return;
			}
			if (!props || props.visible) {
				return;
			}
			const type = this.propsType;
			const orgY = props.anchorOffsetY;

			gTween.rmTweens(props);
			props.scaleX = props.scaleY = 0;
			props.visible = true;
			props.y = orgY + 100;
			props.alpha = 1;
			egret.Tween.get(props).to({ scaleX: 1, scaleY: 1, y: orgY }, 200).call(() => {
				gTween.floatBubble(props, -20, 500, orgY);
				if (type == gConst.propsType.PROGRESS) {
					const comProgress = props as com.ComProgress;
					comProgress.removeEventListener(egret.Event.COMPLETE, this.updateProps, this);
					comProgress.once(egret.Event.COMPLETE, this.updateProps, this);
					comProgress.startLoading();
				}
			});
		}

		public propsType: gConst.propsType;

		private changeProps(_type: gConst.propsType) {
			const type = this.propsType;

			if (_type == type) {
				this.hideProps(this.getCurrProps(), () => {
					this.showProps(this.getCurrProps());
				});
			} else {
				this.hideProps(this.getCurrProps());
				this.propsType = _type;
				this.showProps(this.getCurrProps());
			}

			if (_type == gConst.propsType.MONEY) {
				this.playGetGold();
			}
		}

		private fastPlayed: boolean;

		fastPlay() {
			if (this.fastPlayed) {
				return;
			}
			this.fastPlayed = true;

			const house = this.house;
			if (!house) {
				return;
			}
			const armatureDisplay = house.armatureDisplay;
			if (!armatureDisplay) {
				return;
			}
			const animationName = `building${this.id + 1}${this.lv}`;
			house.play(animationName, 0).timeScale = 4;
		}

		stopPlay() {
			const house = this.house;
			if (!house) {
				return;
			}
			const armatureDisplay = house.armatureDisplay;
			if (!armatureDisplay) {
				return;
			}
			const animationName = `building${this.id + 1}${this.lv}`;
			armatureDisplay.removeEventListener(egret.Event.COMPLETE, this.playComplete, this);
			armatureDisplay.removeEvent(dragonBones.EgretEvent.LOOP_COMPLETE, this.playLoopComplete, this);
			house.stop(animationName);
		}

		private updateProps(event?: egret.Event) {
			const type = this.propsType;

			switch (type) {
				case void 0:
					this.changeProps(gConst.propsType.PROGRESS);
					break;
				case gConst.propsType.PROGRESS:
					this.changeProps(gConst.propsType.MONEY);
					break;
				case gConst.propsType.MONEY:
					// this.changeProps(gConst.propsType.PROGRESS);
					break;
			}
		}

		private renderHouse() {
			// const house = this.house;

			// house.source = `pshop${this.type}_lv${this.lv()}_png`;
			// gComMgr.setObjAnchor(house);
			// house.x = house.anchorOffsetX;
			// house.y = house.anchorOffsetY = house.height;
			// this.width = this.con.width = house.width;
			// this.height = this.con.height = house.height;

			// this.initY = house.y;
		}

		/** 播放金币特效 */
		playGold() {
			// if (!GameMgr.isEnd) {
			// 	gSoundMgr.playEff("smcoin");
			// }

			// const gold = this.gold;

			// gold.show();
			// gold.removeEventListener(egret.Event.COMPLETE, gold.hide, gold);
			// gold.once(egret.Event.COMPLETE, gold.hide, gold);
			// gold.gotoAndPlay("bloom", 1);
		}

		/** 播放烟花特效 */
		private playFireworks() {
			// const fireworks = this.fireworks;

			// fireworks.show();
			// fireworks.removeEventListener(egret.Event.COMPLETE, fireworks.hide, fireworks);
			// fireworks.once(egret.Event.COMPLETE, fireworks.hide, fireworks);
			// fireworks.gotoAndPlay("bloom", 1);
		}

		private clickHouse(event?: egret.TouchEvent, type?: gConst.propsType) {
			// console.info("clickHouse id ==", this.id, this.flagId, this.state);
			if (event) {
				gSoundMgr.playEff("smclick");
			}

			if (this.flagId == gConst.flagId.INSTALL || this.state == gConst.state.NOT_ENABLE || this.state == gConst.state.AUTO || this.fastPlayed) {
				this.clickInstall();
				return;
			}
			if (type == void 0) {
				type = this.propsType;
			}
			switch (type) {
				//钱币
				case gConst.propsType.MONEY:
					const income = this.getCurIncome();
					if (income != void 0) {
						const vipScale = GameMgr.isVip ? gConst.vipGoldScale : 1;
						GameMgr.gold += income * vipScale;
						GameMgr.gameview.dispatchEventWith(gConst.eventType.UPDATE_GOLD, void 0, income * vipScale);
						this.playMcMoney();
						// this.showMoneyParticles();
					}
					this.changeProps(gConst.propsType.PROGRESS);
					break;
				//升级
				case gConst.propsType.UPGRADE:
					const consume = this.getCurConsume();
					if (consume != void 0) {
						// GameMgr.gold -= consume; //顶部的数值不用减少了，直接增加，也就是扣掉的钱数不显示了
						// GameMgr.gameview.dispatchEventWith(gConst.eventType.UPDATE_GOLD, void 0, -consume);
						this.lv++;
						this.changeProps(gConst.propsType.PROGRESS);
					}
					// this.showStarParticles();
					this.playMcLevelup();
					break;
				//进度条
				case gConst.propsType.PROGRESS:
					// this.comProgress.fastComlete();
					this.comProgress.stopLoading();

					if (this.id == GameMgr.maxCanBuildId) {
						//第三关不需要出现钞票图标，点击一次就直接跳过进度条，获得金币然后重新开始计算进度条（少去收钱步骤）
						this.clickHouse(null, gConst.propsType.MONEY);
						this.playGetGold();
					} else {
						this.changeProps(gConst.propsType.MONEY);
					}
					break;
			}

			GameMgr.gameview.hideGuide();
			GameMgr.gameview.showGuide();
		}

		private getCurConsume(): number {
			const lv = this.lv;
			if (lv >= GameMgr.maxLv) {
				return;
			}

			const consumes: number[] = GameMgr.getConfig(`consumes${this.id}`);
			if (!consumes || consumes.length < lv) {
				return;
			}
			return consumes[lv - 1];
		}

		private getCurIncome(): number {
			const lv = this.lv;

			const incomes: number[] = GameMgr.getConfig(`incomes${this.id}`);
			if (!incomes || incomes.length < lv) {
				return;
			}
			return incomes[lv - 1];
		}

		private checkMeetUpgrade() {
			if (!this.gameStarted) {
				return;
			}
			if (this.propsType == gConst.propsType.UPGRADE) {
				return;
			}

			const consume = this.getCurConsume();
			if (consume == void 0) {
				return;
			}

			if (GameMgr.gold < consume) {
				return;
			}
			this.comProgress.stopLoading();
			this.changeProps(gConst.propsType.UPGRADE);
		}

		private setItemOrgPos(item: egret.DisplayObjectContainer) {
			if (!item) {
				return;
			}
			item["orgPos"] = { x: item.x, y: item.y };
			item["orgParent"] = item.parent;

			item.touchEnabled = false;
			item.touchChildren = false;
		}

		private updateItemPos(item) {
			const gameScene = GameMgr.gameview;

			if (!gameScene) {
				return;
			}

			if (!item["orgPos"] || !item["orgParent"]) {
				return;
			}

			// const conScene = gameScene.conScene;
			// const idx = conScene.numChildren - 4;

			// conScene.addChild(item);

			// let pos = (item["orgParent"] as egret.DisplayObjectContainer).localToGlobal(item["orgPos"].x, item["orgPos"].y);
			// pos = gComMgr.toLocal(conScene, pos.x, pos.y, pos);
			// item.x = pos.x;
			// item.y = pos.y;
		}

		private particleId0: number;

		/** 展示金币粒子 */
		private showMoneyParticles() {
			const id = this.id;
			if (id == GameMgr.maxHourseId) {
				return;
			}

			const cfgName = "earn";
			let duration = 1000;
			let particleId0 = this.particleId0;

			const conParticle0 = this.conParticle0;

			conParticle0.visible = true;
			conParticle0.alpha = 1;

			let resName: string[] = [];
			// resName = [cfgName];
			switch (id) {
				case 0:
					resName = ["particle1_ui"];
					break;
				case 1:
					resName = ["particle2_ui", "particle3_ui"];
					break;
				case 2:
					resName = ["particle4_ui", "particle5_ui", "particle6_ui"];
					break;
			}

			// if (particleId0 == void 0) {
			particleId0 =/* this.particleId0 =*/ this.createParticles(conParticle0, resName, cfgName, void 0, false);
			// }

			// const cfg = RES.getRes(`${cfgName}_json`);
			// if (cfg && cfg.duration != void 0) {
			// 	duration = cfg.duration;
			// }

			this.startParticle(particleId0, duration);

			const particle = this.getParticle(particleId0);
			if (particle && particle.particleObj) {
				for (const key in particle.particleObj) {
					const particleObj: com.ComParticle = particle.particleObj[key];
					if (!particleObj) {
						continue;
					}
					egret.setTimeout(() => {
						gTween.fadeOut(particleObj.system, 100, 1);
					}, this, duration + 1000);
				}
			}
		}

		private initMcEff(mcDebug: eui.Image, mc: com.ComMovieClip, ob: data.McData[]) {
			gComMgr.setItemAnchor(mcDebug, false, false);
			mcDebug.visible = false;
			mc.open();
			mc.width = mcDebug.width;
			mc.height = mcDebug.height;
			mc.anchorOffsetX = mc.width / 2;
			mc.anchorOffsetY = mc.height / 2;
			mc.x = 0;
			mc.y = 0;
			mc.setData(ob);
			mc.gotoAndStop("work");
			mc.visible = false;
		}

		private playMcMoney() {
			const mcMoney = this.mcMoney;
			mcMoney.visible = true;
			mcMoney.removeEventListener(egret.Event.COMPLETE, this.hideMcMoney, this);
			mcMoney.once(egret.Event.COMPLETE, this.hideMcMoney, this);
			mcMoney.gotoAndPlay("work", 1, 1);
			if (!GameMgr.isEnd) {
				gSoundMgr.playEff("smcoin");
			}
		}

		private hideMcMoney() {
			const mcMoney = this.mcMoney;
			mcMoney.visible = false;
		}

		private playMcLevelup() {
			const mcLevelup = this.mcLevelup;
			mcLevelup.visible = true;
			mcLevelup.removeEventListener(egret.Event.COMPLETE, this.hideMcLevelup, this);
			mcLevelup.once(egret.Event.COMPLETE, this.hideMcLevelup, this);
			mcLevelup.gotoAndPlay("work", 1, 1);
			gSoundMgr.playEff("smlevelup");
		}

		private hideMcLevelup() {
			const mcLevelup = this.mcLevelup;
			mcLevelup.visible = false;
		}

		private playMcBuildup() {
			const mcBuildup = this.mcBuildup;
			mcBuildup.visible = true;
			mcBuildup.removeEventListener(egret.Event.COMPLETE, this.hideMcBuildup, this);
			mcBuildup.once(egret.Event.COMPLETE, this.hideMcBuildup, this);
			mcBuildup.gotoAndPlay("work", 1, 1);
		}

		private hideMcBuildup() {
			const mcBuildup = this.mcBuildup;
			mcBuildup.visible = false;
		}

		private particleId1: number;

		/** 展示星星粒子 */
		private showStarParticles() {
			const cfgName = "star";
			let duration = 500;
			let particleId1 = this.particleId1;

			let conEff1 = this.conEff1;

			conEff1.visible = true;
			conEff1.alpha = 1;

			if (particleId1 == void 0) {
				particleId1 = this.particleId1 = this.createParticles(conEff1, [cfgName], cfgName, void 0, false);
			}

			// const cfg = RES.getRes(`${cfgName}_json`);
			// if (cfg && cfg.duration != void 0) {
			// 	duration = cfg.duration;
			// }

			this.startParticle(particleId1, duration);

			egret.setTimeout(() => {
				gTween.fadeOut(conEff1, 100, 1);
			}, this, duration - 100);
		}
		/* =========== 业务代码-end =========== */
	}
}