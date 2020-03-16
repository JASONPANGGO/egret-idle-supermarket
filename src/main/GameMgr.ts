/**
 * 游戏管理器
 * @description 主场景界面、游戏场景相关配置
 */
class GameMgr {
	public static mainView: MainView;
	public static showRect: egret.Rectangle;
	public static stage: egret.Stage;

	public static screenType: gConst.screenType = null; //横竖屏类型
	public static mobileType: gConst.mobileType = null; //设备类型

	public static lan: string = "us";

	public static scale: number;

	public static gameview: scene.GameScene;
	public static isReplay: boolean = false; //是否是重玩
	private static replayCnt: number = 0; //重玩次数

	private static _isEnd: boolean = false; //游戏是否已结束

	private static _endType: gConst.endType; //游戏结束类型 0:失败 1:胜利 2:初始化

	private static _auto: boolean = false;

	public static readonly maxPassId: number = 1; //最大关卡ID
	public static readonly screenMaxRow: number = 7; //每屏最多显示行数
	public static readonly screenMaxCol: number = 7; //每屏最多显示列数
	private static _passId: number = 0; //关卡ID，从0开始

	public static readonly maxLv: number = 3; //最大等级
	private static _lv: number = 1; //等级，从1开始

	private static _stepId: number = 1; //步骤ID

	private static _clickCnt: number = 0; //点击次数

	private static _avoiding: boolean; //男孩是否躲避中

	public static readonly maxHourseId: number = 3; //最大建筑物ID
	public static readonly maxCanBuildId: number = 2; //最大可建筑，建筑物ID
	private static _currHourseId: gConst.flagId = 0; //建筑物ID

	private static _gold: number = 0; //金币数
	public static readonly maxGold: number = 999999999; //最大金币数

	private static _firstToMaxLv: boolean = false; //首次升至最高级

	private static _showCurtainFull: boolean = false; //幕布是否已满屏

	private static _isVip: boolean = false; //是否为VIP

	public static houseCfg: Object = {
		"0": { "id": 0, "flagId": gConst.flagId.CAN_BUILD },
		"1": { "id": 1, "flagId": gConst.flagId.NOT_BUILD },
		"2": { "id": 2, "flagId": gConst.flagId.NOT_BUILD },
		"3": { "id": 3, "flagId": gConst.flagId.NOT_BUILD },
		"4": { "id": 4, "flagId": gConst.flagId.INSTALL },
		"5": { "id": 5, "flagId": gConst.flagId.INSTALL },
	}; //建筑物配置

	public constructor() {

	}

	public static init() {
		gGuideMgr.init();

		this.isEnd = false;
		this.endType = null;
		this.auto = false;
		this.passId = 0;
		this.lv = 1;
		this.stepId = 1;
		this.clickCnt = 0;
		this.avoiding = false;
		this.currHouseId = 0;
		this.gold = 0;
		this.firstToMaxLv = false;
		this.showCurtainFull = false;
		this.isVip = false;
	}

	/** 读取游戏动态参数配置 */
	public static getConfig(key: string): any {
		const res: any = RES.getRes("gameConfig_json");
		if (res[key]) {
			return res[key];
		}

		if (res["gameConfig"] && res["gameConfig"][key]) { //无难度模式区分
			return res["gameConfig"][key];
		}

		const gameDifficulty: string = res.gameDifficulty; //当前难度
		const ob: any = res["gameConfig"][gameDifficulty];
		if (ob && ob[key]) {
			return ob[key];
		}
		return null;
	}

	/** 获取视口宽度 */
	public static get getWinW(): number {
		let winW: number = window["adWidth"] || window.innerWidth;
		if (window["MW_CONFIG"]) {
			if (MW_CONFIG.channel == "vungle") {
				const body = document.body as HTMLBodyElement;
				winW = body.offsetWidth;
			}
		}
		return winW;
	}

	public static get getWinH(): number {
		let winH: number = window["adHeight"] || window.innerHeight;
		if (window["MW_CONFIG"]) {
			if (MW_CONFIG.channel == "vungle") {
				const body = document.body as HTMLBodyElement;
				winH = body.offsetHeight;
			}
		}
		return winH;
	}

	/** 重玩游戏 */
	public static replay() {
		// this.sendAction(5);
		this.isReplay = true;
		this.replayCnt++;
		this.gameview.replay();
	}

	/** 是否显示重玩 */
	public static isShowReplay(): boolean {
		if (GameMgr.endType == gConst.endType.FAIL) {
			//失败
			const playAgain: number = GameMgr.getConfig("playAgain");
			if (playAgain && (playAgain < 0 || GameMgr.replayCnt < playAgain)) {
				//配置重玩次数小于0，或当前重玩次数小于配置重玩次数
				return true;
			}
		}
		return false;
	}

	/** 重玩是否跳转商店 */
	public static replayInstall(): boolean {
		if (GameMgr.endType == gConst.endType.FAIL) {
			//失败
			const playAgain: number = GameMgr.getConfig("playAgain");
			if (playAgain && (playAgain < 0 || GameMgr.replayCnt < playAgain)) {
				//配置重玩次数小于0，或当前重玩次数小于配置重玩次数
				return false;
			}
			return true;
		}
		return false;
	}

	/** 获取游戏是否结束 */
	public static get isEnd(): boolean {
		return this._isEnd;
	}
	/** 设置游戏是否结束 */
	public static set isEnd(_isEnd: boolean) {
		this._isEnd = _isEnd;
	}

	/**
	 * 获取游戏结束类型
	 * @returns {gConst.endType} 游戏结束类型 0:失败 1:胜利 2:初始化
	 */
	public static get endType(): gConst.endType {
		return this._endType;
	}
	/**
	 * 设置游戏结束类型
	 * @param {gConst.endType} type 游戏结束类型 0:失败 1:胜利 2:初始化
	 */
	public static set endType(_endType: gConst.endType) {
		this._endType = _endType;
	}

	/** 获取自动游戏状态 */
	public static get auto(): boolean {
		return this._auto;
	}
	/** 设置自动游戏状态 */
	public static set auto(_auto: boolean) {
		this._auto = _auto;
	}

	/** 获取等级 */
	public static get lv(): number {
		return this._lv;
	}
	/** 设置等级 */
	public static set lv(_lv: number) {
		this._lv = _lv;
	}

	/** 获取首次升至最高级 */
	public static get firstToMaxLv(): boolean {
		return this._firstToMaxLv;
	}
	/** 设置首次升至最高级 */
	public static set firstToMaxLv(_firstToMaxLv: boolean) {
		this._firstToMaxLv = _firstToMaxLv;
	}

	/** 获取幕布是否已满屏 */
	public static get showCurtainFull(): boolean {
		return this._showCurtainFull;
	}
	/** 设置幕布是否已满屏 */
	public static set showCurtainFull(_showCurtainFull: boolean) {
		this._showCurtainFull = _showCurtainFull;
	}

	/** 获取是否为VIP */
	public static get isVip(): boolean {
		return this._isVip;
	}
	/** 设置是否为VIP */
	public static set isVip(_isVip: boolean) {
		this._isVip = _isVip;
	}

	/** 获取金币数 */
	public static get gold(): number {
		return this._gold;
	}
	/** 设置金币数 */
	public static set gold(_gold: number) {
		Math.max(_gold, 0);
		Math.min(_gold, this.maxGold);
		this._gold = _gold;
	}

	/** 获取关卡ID */
	public static get passId(): number {
		return this._passId;
	}
	/** 设置关卡ID */
	public static set passId(_passId: number) {
		this._passId = _passId;
	}

	/**
	 * 关卡配置
	 * @param {number} id 关卡ID
	 * @param {{ id: number, x: number, keyPinH: number, finish: boolean }[]} pinOnes 所有锁芯
	 * @param {number} keyPos 钥匙上的点
	 * @param {number} finishPos 钥匙上，完成的点
	 */
	private static passCfg: {
		"0": data.UnlockData,
		"1": data.UnlockData,
	} = {
		"0": new data.UnlockData(0, [
			{ id: 0, x: 27.5, keyPinH: 71, finish: false },
			{ id: 1, x: 73.5, keyPinH: 65, finish: false },
			{ id: 2, x: 119.5, keyPinH: 72, finish: false },
			{ id: 3, x: 163.5, keyPinH: 71, finish: false },
			{ id: 4, x: 208.5, keyPinH: 71, finish: true },
		], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24], [18, 19]),
		"1": new data.UnlockData(1, [
			{ id: 0, x: 16.5, keyPinH: 74, finish: false },
			{ id: 1, x: 56.5, keyPinH: 65, finish: false },
			{ id: 2, x: 96.5, keyPinH: 73, finish: false },
			{ id: 3, x: 137.5, keyPinH: 72, finish: false },
			{ id: 4, x: 177.5, keyPinH: 64, finish: false },
			{ id: 5, x: 217.5, keyPinH: 65, finish: true },
		], [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 21, 22, 23, 24], [51, 52]),
	};

	/** 获取关卡数据 */
	public static getPass(passId: number = this.passId): data.UnlockData {
		return this.passCfg[passId];
	}

	// /** 当前项是否为动态项 */
	// public static isTrend(itemId: number, passId: number = this.passId): boolean {
	// 	const passData = this.getPass(passId);
	// 	if (!passData) {
	// 		return;
	// 	}
	// 	if (!passData.trendId) {
	// 		return;
	// 	}
	// 	for (let trendId of passData.trendId) {
	// 		if (itemId == trendId) {
	// 			return true;
	// 		}
	// 	}
	// }

	/** 当前等级最大人数 */
	public static getMaxPeople(): number {
		return 5 + this.currHouseId * 3;
	}

	/** 当前等级最大小车数 */
	public static getMaxCar(): number {
		return (this.currHouseId + 1) * 10;
	}

	public static getPosCar(pos: number[]): { x: number, y: number } {
		const scene = this.gameview;
		if (!scene) {
			return;
		}
		if (!pos || pos.length < 1) {
			return;
		}
		return scene[`posCar_${pos[0]}_${pos[1]}`];
	}

	/** 通过目标ID获取项ID */
	// public static getItemIdByTargetId(targetId: number, passId: number = this.passId): number {
	// 	const passData = this.getPass(passId);
	// 	if (!passData) {
	// 		return;
	// 	}
	// 	if (!passData.relateId) {
	// 		return;
	// 	}
	// 	for (let itemId in passData.relateId) {
	// 		const _targetId = passData.relateId[itemId];
	// 		if (targetId == _targetId) {
	// 			return Number(itemId);
	// 		}
	// 	}
	// }

	/** 获取步骤ID */
	public static get stepId(): number {
		return this._stepId;
	}
	/** 设置步骤ID */
	public static set stepId(_stepId: number) {
		this._stepId = _stepId;
	}

	/** 获取男孩是否躲避中 */
	public static get avoiding() {
		return this._avoiding;
	}
	/** 设置男孩是否躲避中 */
	public static set avoiding(_avoiding: boolean) {
		this._avoiding = _avoiding;
	}

	/** 获取点击次数 */
	public static get clickCnt(): number {
		return this._clickCnt;
	}
	/** 设置点击次数 */
	public static set clickCnt(_clickCnt: number) {
		this._clickCnt = _clickCnt;
	}

	/** 获取当前建筑物ID */
	public static get currHouseId(): number {
		return this._currHourseId;
	}
	/** 设置当前建筑物ID */
	public static set currHouseId(_currHourseId: number) {
		if (_currHourseId > this.maxHourseId) {
			return;
		}
		this._currHourseId = _currHourseId;
	}
}