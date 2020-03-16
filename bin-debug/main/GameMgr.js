var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 游戏管理器
 * @description 主场景界面、游戏场景相关配置
 */
var GameMgr = (function () {
    function GameMgr() {
    }
    GameMgr.init = function () {
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
    };
    /** 读取游戏动态参数配置 */
    GameMgr.getConfig = function (key) {
        var res = RES.getRes("gameConfig_json");
        if (res[key]) {
            return res[key];
        }
        if (res["gameConfig"] && res["gameConfig"][key]) {
            return res["gameConfig"][key];
        }
        var gameDifficulty = res.gameDifficulty; //当前难度
        var ob = res["gameConfig"][gameDifficulty];
        if (ob && ob[key]) {
            return ob[key];
        }
        return null;
    };
    Object.defineProperty(GameMgr, "getWinW", {
        /** 获取视口宽度 */
        get: function () {
            var winW = window["adWidth"] || window.innerWidth;
            if (window["MW_CONFIG"]) {
                if (MW_CONFIG.channel == "vungle") {
                    var body = document.body;
                    winW = body.offsetWidth;
                }
            }
            return winW;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameMgr, "getWinH", {
        get: function () {
            var winH = window["adHeight"] || window.innerHeight;
            if (window["MW_CONFIG"]) {
                if (MW_CONFIG.channel == "vungle") {
                    var body = document.body;
                    winH = body.offsetHeight;
                }
            }
            return winH;
        },
        enumerable: true,
        configurable: true
    });
    /** 重玩游戏 */
    GameMgr.replay = function () {
        // this.sendAction(5);
        this.isReplay = true;
        this.replayCnt++;
        this.gameview.replay();
    };
    /** 是否显示重玩 */
    GameMgr.isShowReplay = function () {
        if (GameMgr.endType == 0 /* FAIL */) {
            //失败
            var playAgain = GameMgr.getConfig("playAgain");
            if (playAgain && (playAgain < 0 || GameMgr.replayCnt < playAgain)) {
                //配置重玩次数小于0，或当前重玩次数小于配置重玩次数
                return true;
            }
        }
        return false;
    };
    /** 重玩是否跳转商店 */
    GameMgr.replayInstall = function () {
        if (GameMgr.endType == 0 /* FAIL */) {
            //失败
            var playAgain = GameMgr.getConfig("playAgain");
            if (playAgain && (playAgain < 0 || GameMgr.replayCnt < playAgain)) {
                //配置重玩次数小于0，或当前重玩次数小于配置重玩次数
                return false;
            }
            return true;
        }
        return false;
    };
    Object.defineProperty(GameMgr, "isEnd", {
        /** 获取游戏是否结束 */
        get: function () {
            return this._isEnd;
        },
        /** 设置游戏是否结束 */
        set: function (_isEnd) {
            this._isEnd = _isEnd;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameMgr, "endType", {
        /**
         * 获取游戏结束类型
         * @returns {gConst.endType} 游戏结束类型 0:失败 1:胜利 2:初始化
         */
        get: function () {
            return this._endType;
        },
        /**
         * 设置游戏结束类型
         * @param {gConst.endType} type 游戏结束类型 0:失败 1:胜利 2:初始化
         */
        set: function (_endType) {
            this._endType = _endType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameMgr, "auto", {
        /** 获取自动游戏状态 */
        get: function () {
            return this._auto;
        },
        /** 设置自动游戏状态 */
        set: function (_auto) {
            this._auto = _auto;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameMgr, "lv", {
        /** 获取等级 */
        get: function () {
            return this._lv;
        },
        /** 设置等级 */
        set: function (_lv) {
            this._lv = _lv;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameMgr, "firstToMaxLv", {
        /** 获取首次升至最高级 */
        get: function () {
            return this._firstToMaxLv;
        },
        /** 设置首次升至最高级 */
        set: function (_firstToMaxLv) {
            this._firstToMaxLv = _firstToMaxLv;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameMgr, "showCurtainFull", {
        /** 获取幕布是否已满屏 */
        get: function () {
            return this._showCurtainFull;
        },
        /** 设置幕布是否已满屏 */
        set: function (_showCurtainFull) {
            this._showCurtainFull = _showCurtainFull;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameMgr, "isVip", {
        /** 获取是否为VIP */
        get: function () {
            return this._isVip;
        },
        /** 设置是否为VIP */
        set: function (_isVip) {
            this._isVip = _isVip;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameMgr, "gold", {
        /** 获取金币数 */
        get: function () {
            return this._gold;
        },
        /** 设置金币数 */
        set: function (_gold) {
            Math.max(_gold, 0);
            Math.min(_gold, this.maxGold);
            this._gold = _gold;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameMgr, "passId", {
        /** 获取关卡ID */
        get: function () {
            return this._passId;
        },
        /** 设置关卡ID */
        set: function (_passId) {
            this._passId = _passId;
        },
        enumerable: true,
        configurable: true
    });
    /** 获取关卡数据 */
    GameMgr.getPass = function (passId) {
        if (passId === void 0) { passId = this.passId; }
        return this.passCfg[passId];
    };
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
    GameMgr.getMaxPeople = function () {
        return 5 + this.currHouseId * 3;
    };
    /** 当前等级最大小车数 */
    GameMgr.getMaxCar = function () {
        return (this.currHouseId + 1) * 10;
    };
    GameMgr.getPosCar = function (pos) {
        var scene = this.gameview;
        if (!scene) {
            return;
        }
        if (!pos || pos.length < 1) {
            return;
        }
        return scene["posCar_" + pos[0] + "_" + pos[1]];
    };
    Object.defineProperty(GameMgr, "stepId", {
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
        get: function () {
            return this._stepId;
        },
        /** 设置步骤ID */
        set: function (_stepId) {
            this._stepId = _stepId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameMgr, "avoiding", {
        /** 获取男孩是否躲避中 */
        get: function () {
            return this._avoiding;
        },
        /** 设置男孩是否躲避中 */
        set: function (_avoiding) {
            this._avoiding = _avoiding;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameMgr, "clickCnt", {
        /** 获取点击次数 */
        get: function () {
            return this._clickCnt;
        },
        /** 设置点击次数 */
        set: function (_clickCnt) {
            this._clickCnt = _clickCnt;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameMgr, "currHouseId", {
        /** 获取当前建筑物ID */
        get: function () {
            return this._currHourseId;
        },
        /** 设置当前建筑物ID */
        set: function (_currHourseId) {
            if (_currHourseId > this.maxHourseId) {
                return;
            }
            this._currHourseId = _currHourseId;
        },
        enumerable: true,
        configurable: true
    });
    return GameMgr;
}());
GameMgr.screenType = null; //横竖屏类型
GameMgr.mobileType = null; //设备类型
GameMgr.lan = "us";
GameMgr.isReplay = false; //是否是重玩
GameMgr.replayCnt = 0; //重玩次数
GameMgr._isEnd = false; //游戏是否已结束
GameMgr._auto = false;
GameMgr.maxPassId = 1; //最大关卡ID
GameMgr.screenMaxRow = 7; //每屏最多显示行数
GameMgr.screenMaxCol = 7; //每屏最多显示列数
GameMgr._passId = 0; //关卡ID，从0开始
GameMgr.maxLv = 3; //最大等级
GameMgr._lv = 1; //等级，从1开始
GameMgr._stepId = 1; //步骤ID
GameMgr._clickCnt = 0; //点击次数
GameMgr.maxHourseId = 3; //最大建筑物ID
GameMgr.maxCanBuildId = 2; //最大可建筑，建筑物ID
GameMgr._currHourseId = 0; //建筑物ID
GameMgr._gold = 0; //金币数
GameMgr.maxGold = 999999999; //最大金币数
GameMgr._firstToMaxLv = false; //首次升至最高级
GameMgr._showCurtainFull = false; //幕布是否已满屏
GameMgr._isVip = false; //是否为VIP
GameMgr.houseCfg = {
    "0": { "id": 0, "flagId": 1 /* CAN_BUILD */ },
    "1": { "id": 1, "flagId": 0 /* NOT_BUILD */ },
    "2": { "id": 2, "flagId": 0 /* NOT_BUILD */ },
    "3": { "id": 3, "flagId": 0 /* NOT_BUILD */ },
    "4": { "id": 4, "flagId": 2 /* INSTALL */ },
    "5": { "id": 5, "flagId": 2 /* INSTALL */ },
}; //建筑物配置
/**
 * 关卡配置
 * @param {number} id 关卡ID
 * @param {{ id: number, x: number, keyPinH: number, finish: boolean }[]} pinOnes 所有锁芯
 * @param {number} keyPos 钥匙上的点
 * @param {number} finishPos 钥匙上，完成的点
 */
GameMgr.passCfg = {
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
__reflect(GameMgr.prototype, "GameMgr");
//# sourceMappingURL=GameMgr.js.map