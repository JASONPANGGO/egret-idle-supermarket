var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var com;
(function (com) {
    /**
     * 建筑物组件
     */
    var ComHouse = (function (_super) {
        __extends(ComHouse, _super);
        function ComHouse() {
            var _this = _super.call(this) || this;
            _this._id = 0; //建筑物ID
            _this.orgPosH = {}; //横屏位置
            _this.orgPosV = {}; //竖屏位置
            _this._state = 0 /* NOT_ENABLE */; //建筑物状态
            _this.allPeople = [];
            _this.endPeople = true;
            _this.allSortSceneObj = [];
            _this.startSceneIdx = 1;
            _this.skinName = skins.ComHouse;
            return _this;
        }
        /* =========== 框架结构代码-start =========== */
        /**
         * 初始化
         * @param {any[]} args 构建传参会通过init()传过去
         */
        ComHouse.prototype.init = function (id, flagId, lv) {
            if (lv === void 0) { lv = 1; }
            // console.info("init", ...args);
            this.id = id;
            this.flagId = flagId;
            this.lv = lv;
        };
        /** 首次创建组件时调用 */
        ComHouse.prototype.load = function () {
            // console.info("load");
            var con = this.con;
            var lawn = this.lawn;
            var money = this.money;
            var upgrade = this.upgrade;
            var comProgress = this.comProgress;
            var conEff0 = this.conEff0;
            var moneyDebug = this.moneyDebug;
            var mcMoney = this.mcMoney;
            var conParticle0 = this.conParticle0;
            var conMoney = this.conMoney;
            var conUpgrade = this.conUpgrade;
            var conBar = this.conBar;
            var conEff1 = this.conEff1;
            var levelupDebug = this.levelupDebug;
            var mcLevelup = this.mcLevelup;
            var conEff2 = this.conEff2;
            var buildupDebug = this.buildupDebug;
            var mcBuildup = this.mcBuildup;
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
            this.initMcEff(moneyDebug, mcMoney, [new data.McData("work", 6 /*12*/, "xle_money_{1}_png")]);
            this.initMcEff(levelupDebug, mcLevelup, [new data.McData("work", 8 /*16*/, "xle_levelup_{1}_png")]);
            this.initMcEff(buildupDebug, mcBuildup, [new data.McData("work", 7 /*13*/, "xle_buildup_{1}_png")]);
        };
        /** 每次创建组件都会调用 */
        ComHouse.prototype.start = function () {
            // console.info("start");
            this.initAllFlag();
            this.showCurrFlag();
            this.renderHouse();
        };
        /** 每次结束组件都会调用 */
        ComHouse.prototype.stop = function () {
            // console.info("stop");
        };
        /** 监听组件，每帧都会调用 */
        ComHouse.prototype.update = function () {
            // console.info("update");
            this.checkMeetUpgrade();
            this.playAuto();
            this.addPeople();
            this.sortSceneByY();
        };
        /** 注册事件 */
        ComHouse.prototype.addEvent = function () {
            // console.info("addEvent");
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHouse, this, true);
        };
        /** 移除事件 */
        ComHouse.prototype.removeEvent = function () {
            // console.info("removeEvent");
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHouse, this, true);
        };
        /** 窗口大小改变时调用 */
        ComHouse.prototype.resizeView = function (event) {
            // console.info("resizeView", event, GameMgr.gameview.width, GameMgr.gameview.height);
            if (GameMgr.screenType == 1 /* VERTICAL */) {
                //竖屏
                switch (GameMgr.mobileType) {
                    //iPhoneX或以上
                    case 1 /* IPHONE_X */:
                        break;
                    //iPhone8或以下
                    case 2 /* IPHONE_8 */:
                        break;
                    //iPad或其它
                    case 3 /* IPAD */:
                        break;
                }
            }
            else {
                //横屏
                switch (GameMgr.mobileType) {
                    //iPhoneX或以上
                    case 1 /* IPHONE_X */:
                        break;
                    //iPhone8或以下
                    case 2 /* IPHONE_8 */:
                        break;
                    //iPad或其它
                    case 3 /* IPAD */:
                        break;
                }
            }
        };
        /** 屏幕横竖屏转换时调用 */
        ComHouse.prototype.rotateView = function (event) {
            // console.info("rotateView", event, GameMgr.screenType, GameMgr.mobileType);
            // console.info("rotateView", this.id);
            var conEff0 = this.conEff0;
            var conParticle0 = this.conParticle0;
            var conMoney = this.conMoney;
            var conUpgrade = this.conUpgrade;
            var conBar = this.conBar;
            var conEff1 = this.conEff1;
            var conEff2 = this.conEff2;
            if (GameMgr.screenType == 1 /* VERTICAL */) {
                //竖屏
                this.x = this.orgPosV.x;
                this.y = this.orgPosV.y;
            }
            else {
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
        };
        ComHouse.prototype.gameStart = function () {
            if (this.gameStarted) {
                return;
            }
            this.gameStarted = true;
            this.updateProps();
            var conEff0 = this.conEff0;
            var conMoney = this.conMoney;
            var conUpgrade = this.conUpgrade;
            var conBar = this.conBar;
            var conEff1 = this.conEff1;
            var conEff2 = this.conEff2;
            this.updateItemPos(conEff0);
            this.updateItemPos(conMoney);
            this.updateItemPos(conUpgrade);
            this.updateItemPos(conBar);
            this.updateItemPos(conEff1);
            this.updateItemPos(conEff2);
        };
        Object.defineProperty(ComHouse.prototype, "id", {
            /** 获取建筑物ID */
            get: function () {
                return this._id;
            },
            /** 设置建筑物ID */
            set: function (id) {
                this._id = id;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ComHouse.prototype, "state", {
            /** 获取建筑物状态 */
            get: function () {
                return this._state;
            },
            /** 设置建筑物状态 */
            set: function (state) {
                // if (state == gConst.state.AUTO) {
                // 	console.log("set.state", this.id);
                // }
                this._state = state;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ComHouse.prototype, "lv", {
            /** 获取建筑物等级 */
            get: function () {
                return this._lv;
            },
            /** 设置建筑物等级 */
            set: function (lv) {
                if (lv > GameMgr.maxLv) {
                    return;
                }
                var isUpdate = this._lv != void 0 && this._lv != lv;
                if (isUpdate) {
                    this.playUpgrade(lv);
                }
                this._lv = lv;
                if (lv == GameMgr.maxLv) {
                    this.dispatchEventWith(gConst.eventType.LV_TO_MAX);
                    this.playAuto();
                }
            },
            enumerable: true,
            configurable: true
        });
        /** 显示人物 */
        ComHouse.prototype.showPeople = function () {
            // console.info("showCar");
            this.endPeople = false;
            this.addPeople();
        };
        /** 隐藏人物 */
        ComHouse.prototype.hidePeople = function (clearAll) {
            if (clearAll === void 0) { clearAll = true; }
            // console.info("hideCar");
            this.endPeople = true;
            if (clearAll) {
                while (this.allPeople.length > 0) {
                    //第一个子对象为debug区域，所以从下标1开始
                    var ai = this.allPeople[0];
                    gPeople.removeAi(ai);
                    gDevelop.arrDelVal(this.allSortSceneObj, ai);
                }
                this.allPeople = [];
            }
        };
        ComHouse.prototype.updateNextShowPeople = function () {
            var float = 100;
            var time = Math.max(1500 - this.id * 500, 300);
            this.nextShowPeople = egret.getTimer() + gMath.getRandomInteger(time + float, time - float);
        };
        ComHouse.prototype.checkPeople = function () {
            return this.allPeople.length >= GameMgr.getMaxPeople();
        };
        /** 添加小车 */
        ComHouse.prototype.addPeople = function () {
            if (this.endPeople) {
                return;
            }
            if (this.checkPeople()) {
                return;
            }
            if (this.nextShowPeople >= egret.getTimer()) {
                return;
            }
            else {
                this.updateNextShowPeople();
            }
            var birthPos = gPeople.birthPos;
            // console.info("addCar", birthPos);
            if (!birthPos || birthPos.length == 0) {
                return;
            }
            //初始化
            var people = gPeople.createAi();
            var birth = gMath.getRandomAnswer.apply(gMath, birthPos);
            // console.info("addCar", birth);
            people.once(gConst.eventType.REMOVE_OBJ, this.removePeople, this);
            people.open(birth, this);
            people.show(true);
            this.allPeople.push(people);
            this.allSortSceneObj.push(people);
            this.con.addChild(people);
            // gSoundMgr.playEff("smcar");
        };
        /** 排序场景中对象y轴 */
        ComHouse.prototype.sortSceneByY = function () {
            var _this = this;
            // console.info("sortSceneByY.this.starHouseInx ==", this.starHouseInx);
            // egret.clearTimeout(this.sortHousesDelay);
            this.allSortSceneObj.sort(function (child1, child2) {
                return child1.y - child2.y;
            });
            this.allSortSceneObj.forEach(function (child, i) {
                if (child.parent) {
                    child.parent.setChildIndex(child, _this.startSceneIdx + i);
                }
            });
            // console.info("sortSceneByY", this.comHouses);
        };
        ComHouse.prototype.removePeople = function (event, car) {
            var _people;
            if (event) {
                _people = event.data;
            }
            else {
                _people = car;
            }
            if (!_people) {
                return;
            }
            gPeople.removeAi(_people);
            gDevelop.arrDelVal(this.allPeople, _people);
            gDevelop.arrDelVal(this.allSortSceneObj, _people);
        };
        /** 播放升级特效 */
        ComHouse.prototype.playUpgrade = function (lv) {
            var house = this.house;
            if (!house) {
                return;
            }
            var armatureDisplay = house.armatureDisplay;
            if (!armatureDisplay) {
                return;
            }
            // const animationName = `building${this.id + 1}${this.lv}`;
            this._lv = lv;
            // armatureDisplay.removeEventListener(egret.Event.COMPLETE, this.playComplete, this);
            // armatureDisplay.once(egret.Event.COMPLETE, this.playComplete, this);
            // house.play(animationName);
            this.playComplete();
        };
        /** 播放获得金币特效 */
        ComHouse.prototype.playGetGold = function () {
            if (this.state == 2 /* AUTO */) {
                return;
            }
            var house = this.house;
            if (!house) {
                return;
            }
            var armatureDisplay = house.armatureDisplay;
            if (!armatureDisplay) {
                return;
            }
            var animationName = "building" + (this.id + 1) + this.lv;
            armatureDisplay.removeEventListener(egret.Event.COMPLETE, this.playComplete, this);
            house.play(animationName).timeScale = 2;
        };
        ComHouse.prototype.playComplete = function (event) {
            var house = this.house;
            if (house && house.armatureDisplay) {
                house.armatureDisplay.removeEventListener(egret.Event.COMPLETE, this.playComplete, this);
            }
            if (GameMgr.isEnd) {
                return;
            }
            if (!house) {
                return;
            }
            var armatureDisplay = house.armatureDisplay;
            if (!armatureDisplay) {
                return;
            }
            var animationName = "building" + (this.id + 1) + this.lv;
            // if (GameMgr.auto) {
            // 	this.updateProps();
            // } else {
            house.play(animationName);
            // }
        };
        ComHouse.prototype.playAuto = function () {
            if (!GameMgr.auto) {
                return;
            }
            if (this.flagId == 2 /* INSTALL */ && this.state == 0 /* NOT_ENABLE */) {
                return;
            }
            if (this.lv < GameMgr.maxLv) {
                return;
            }
            if (this.state == 2 /* AUTO */) {
                this.hideAllProps();
                return;
            }
            this.state = 2 /* AUTO */;
            var house = this.house;
            if (!house) {
                return;
            }
            var armatureDisplay = house.armatureDisplay;
            if (!armatureDisplay) {
                return;
            }
            var animationName = "building" + (this.id + 1) + this.lv;
            armatureDisplay.removeEventListener(egret.Event.COMPLETE, this.playComplete, this);
            armatureDisplay.addEvent(dragonBones.EgretEvent.LOOP_COMPLETE, this.playLoopComplete, this);
            house.play(animationName, 0).timeScale = 2;
            this.hideProps(this.getCurrProps());
        };
        ComHouse.prototype.playLoopComplete = function (event) {
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
            var income = this.getCurIncome();
            if (income != void 0) {
                var vipScale = GameMgr.isVip ? gConst.vipGoldScale : 1;
                GameMgr.gold += income * vipScale;
                GameMgr.gameview.dispatchEventWith(gConst.eventType.UPDATE_GOLD, void 0, income * vipScale);
            }
            this.playMcMoney();
            // this.showMoneyParticles();
        };
        ComHouse.prototype.initAllFlag = function () {
            var i = 0;
            var flag = this["flag" + i];
            while (flag) {
                flag.visible = false;
                i++;
                flag = this["flag" + i];
            }
        };
        ComHouse.prototype.hideCurrFlag = function () {
            var flagId = this.flagId;
            var flag = this["flag" + flagId];
            if (flag) {
                flag.visible = false;
            }
        };
        ComHouse.prototype.showCurrFlag = function () {
            var flagId = this.flagId;
            var flag = this["flag" + flagId];
            if (flag) {
                flag.visible = true;
            }
        };
        ComHouse.prototype.updateFlag = function (_flagId) {
            if (_flagId === void 0) { _flagId = 1 /* CAN_BUILD */; }
            var flagId = this.flagId;
            if (_flagId == flagId) {
                return;
            }
            this.hideCurrFlag();
            this.flagId = _flagId;
            this.showCurrFlag();
        };
        ComHouse.prototype.updateState = function (_state) {
            if (_state === void 0) { _state = 1 /* ENABLE */; }
            if (this.flagId == 2 /* INSTALL */) {
                return;
            }
            var state = this.state;
            if (_state == state) {
                return;
            }
            this.state = _state;
            if (this.id == GameMgr.maxHourseId) {
                this.lv = 3;
            }
            this.initHouse();
        };
        ComHouse.prototype.initHouse = function () {
            var house = this.house;
            if (!house) {
                var conHouse = this.conHouse;
                house = this.house = new com.ComBones();
                house.setData(conHouse, "building");
                house.setScale(2); //资源被缩小一倍
                var name_1 = "building" + (this.id + 1) + this.lv;
                house.gotoAndStopByTime(name_1);
                this.playMcBuildup();
                //建造建筑物，隐藏建筑物标志、草坪
                this.lawn.visible = false;
                this.conFlag.visible = false;
                if (this.id > 0) {
                    gSoundMgr.playEff("smbuild");
                }
                if (this.id == GameMgr.maxHourseId) {
                    var armatureDisplay = house.armatureDisplay;
                    if (!armatureDisplay) {
                        return;
                    }
                    var animationName = "building" + (this.id + 1) + this.lv;
                    armatureDisplay.addEvent(dragonBones.EgretEvent.LOOP_COMPLETE, this.playLoopComplete, this);
                    house.play(animationName, 0).timeScale = 2;
                    gTween.toBottomShow(conHouse, 300, 300, 0, 1);
                }
            }
        };
        ComHouse.prototype.getCurrProps = function () {
            var type = this.propsType;
            if (type == void 0) {
                return;
            }
            switch (type) {
                //钱币
                case 1 /* MONEY */:
                    return this.money;
                //升级
                case 2 /* UPGRADE */:
                    return this.upgrade;
                //进度条
                case 3 /* PROGRESS */:
                    return this.comProgress;
            }
        };
        ComHouse.prototype.hideProps = function (props, callBack, thisObj) {
            var arg = [];
            for (var _i = 3; _i < arguments.length; _i++) {
                arg[_i - 3] = arguments[_i];
            }
            if (!props || !props.visible) {
                return;
            }
            gTween.toSmallHide(props, 200, 1, 1, void 0, void 0, {
                callback: function () {
                    if (callBack) {
                        callBack.call.apply(callBack, [thisObj].concat(arg));
                    }
                }
            });
        };
        ComHouse.prototype.hideAllProps = function () {
            if (this.hideAlled) {
                return;
            }
            this.hideAlled = true;
            this.hideProps(this.money);
            this.hideProps(this.upgrade);
            this.hideProps(this.comProgress);
        };
        ComHouse.prototype.showProps = function (props) {
            var _this = this;
            if (this.state == 2 /* AUTO */) {
                return;
            }
            if (!props || props.visible) {
                return;
            }
            var type = this.propsType;
            var orgY = props.anchorOffsetY;
            gTween.rmTweens(props);
            props.scaleX = props.scaleY = 0;
            props.visible = true;
            props.y = orgY + 100;
            props.alpha = 1;
            egret.Tween.get(props).to({ scaleX: 1, scaleY: 1, y: orgY }, 200).call(function () {
                gTween.floatBubble(props, -20, 500, orgY);
                if (type == 3 /* PROGRESS */) {
                    var comProgress = props;
                    comProgress.removeEventListener(egret.Event.COMPLETE, _this.updateProps, _this);
                    comProgress.once(egret.Event.COMPLETE, _this.updateProps, _this);
                    comProgress.startLoading();
                }
            });
        };
        ComHouse.prototype.changeProps = function (_type) {
            var _this = this;
            var type = this.propsType;
            if (_type == type) {
                this.hideProps(this.getCurrProps(), function () {
                    _this.showProps(_this.getCurrProps());
                });
            }
            else {
                this.hideProps(this.getCurrProps());
                this.propsType = _type;
                this.showProps(this.getCurrProps());
            }
            if (_type == 1 /* MONEY */) {
                this.playGetGold();
            }
        };
        ComHouse.prototype.fastPlay = function () {
            if (this.fastPlayed) {
                return;
            }
            this.fastPlayed = true;
            var house = this.house;
            if (!house) {
                return;
            }
            var armatureDisplay = house.armatureDisplay;
            if (!armatureDisplay) {
                return;
            }
            var animationName = "building" + (this.id + 1) + this.lv;
            house.play(animationName, 0).timeScale = 4;
        };
        ComHouse.prototype.stopPlay = function () {
            var house = this.house;
            if (!house) {
                return;
            }
            var armatureDisplay = house.armatureDisplay;
            if (!armatureDisplay) {
                return;
            }
            var animationName = "building" + (this.id + 1) + this.lv;
            armatureDisplay.removeEventListener(egret.Event.COMPLETE, this.playComplete, this);
            armatureDisplay.removeEvent(dragonBones.EgretEvent.LOOP_COMPLETE, this.playLoopComplete, this);
            house.stop(animationName);
        };
        ComHouse.prototype.updateProps = function (event) {
            var type = this.propsType;
            switch (type) {
                case void 0:
                    this.changeProps(3 /* PROGRESS */);
                    break;
                case 3 /* PROGRESS */:
                    this.changeProps(1 /* MONEY */);
                    break;
                case 1 /* MONEY */:
                    // this.changeProps(gConst.propsType.PROGRESS);
                    break;
            }
        };
        ComHouse.prototype.renderHouse = function () {
            // const house = this.house;
            // house.source = `pshop${this.type}_lv${this.lv()}_png`;
            // gComMgr.setObjAnchor(house);
            // house.x = house.anchorOffsetX;
            // house.y = house.anchorOffsetY = house.height;
            // this.width = this.con.width = house.width;
            // this.height = this.con.height = house.height;
            // this.initY = house.y;
        };
        /** 播放金币特效 */
        ComHouse.prototype.playGold = function () {
            // if (!GameMgr.isEnd) {
            // 	gSoundMgr.playEff("smcoin");
            // }
            // const gold = this.gold;
            // gold.show();
            // gold.removeEventListener(egret.Event.COMPLETE, gold.hide, gold);
            // gold.once(egret.Event.COMPLETE, gold.hide, gold);
            // gold.gotoAndPlay("bloom", 1);
        };
        /** 播放烟花特效 */
        ComHouse.prototype.playFireworks = function () {
            // const fireworks = this.fireworks;
            // fireworks.show();
            // fireworks.removeEventListener(egret.Event.COMPLETE, fireworks.hide, fireworks);
            // fireworks.once(egret.Event.COMPLETE, fireworks.hide, fireworks);
            // fireworks.gotoAndPlay("bloom", 1);
        };
        ComHouse.prototype.clickHouse = function (event, type) {
            // console.info("clickHouse id ==", this.id, this.flagId, this.state);
            if (event) {
                gSoundMgr.playEff("smclick");
            }
            if (this.flagId == 2 /* INSTALL */ || this.state == 0 /* NOT_ENABLE */ || this.state == 2 /* AUTO */ || this.fastPlayed) {
                this.clickInstall();
                return;
            }
            if (type == void 0) {
                type = this.propsType;
            }
            switch (type) {
                //钱币
                case 1 /* MONEY */:
                    var income = this.getCurIncome();
                    if (income != void 0) {
                        var vipScale = GameMgr.isVip ? gConst.vipGoldScale : 1;
                        GameMgr.gold += income * vipScale;
                        GameMgr.gameview.dispatchEventWith(gConst.eventType.UPDATE_GOLD, void 0, income * vipScale);
                        this.playMcMoney();
                    }
                    this.changeProps(3 /* PROGRESS */);
                    break;
                //升级
                case 2 /* UPGRADE */:
                    var consume = this.getCurConsume();
                    if (consume != void 0) {
                        // GameMgr.gold -= consume; //顶部的数值不用减少了，直接增加，也就是扣掉的钱数不显示了
                        // GameMgr.gameview.dispatchEventWith(gConst.eventType.UPDATE_GOLD, void 0, -consume);
                        this.lv++;
                        this.changeProps(3 /* PROGRESS */);
                    }
                    // this.showStarParticles();
                    this.playMcLevelup();
                    break;
                //进度条
                case 3 /* PROGRESS */:
                    // this.comProgress.fastComlete();
                    this.comProgress.stopLoading();
                    if (this.id == GameMgr.maxCanBuildId) {
                        //第三关不需要出现钞票图标，点击一次就直接跳过进度条，获得金币然后重新开始计算进度条（少去收钱步骤）
                        this.clickHouse(null, 1 /* MONEY */);
                        this.playGetGold();
                    }
                    else {
                        this.changeProps(1 /* MONEY */);
                    }
                    break;
            }
            GameMgr.gameview.hideGuide();
            GameMgr.gameview.showGuide();
        };
        ComHouse.prototype.getCurConsume = function () {
            var lv = this.lv;
            if (lv >= GameMgr.maxLv) {
                return;
            }
            var consumes = GameMgr.getConfig("consumes" + this.id);
            if (!consumes || consumes.length < lv) {
                return;
            }
            return consumes[lv - 1];
        };
        ComHouse.prototype.getCurIncome = function () {
            var lv = this.lv;
            var incomes = GameMgr.getConfig("incomes" + this.id);
            if (!incomes || incomes.length < lv) {
                return;
            }
            return incomes[lv - 1];
        };
        ComHouse.prototype.checkMeetUpgrade = function () {
            if (!this.gameStarted) {
                return;
            }
            if (this.propsType == 2 /* UPGRADE */) {
                return;
            }
            var consume = this.getCurConsume();
            if (consume == void 0) {
                return;
            }
            if (GameMgr.gold < consume) {
                return;
            }
            this.comProgress.stopLoading();
            this.changeProps(2 /* UPGRADE */);
        };
        ComHouse.prototype.setItemOrgPos = function (item) {
            if (!item) {
                return;
            }
            item["orgPos"] = { x: item.x, y: item.y };
            item["orgParent"] = item.parent;
            item.touchEnabled = false;
            item.touchChildren = false;
        };
        ComHouse.prototype.updateItemPos = function (item) {
            var gameScene = GameMgr.gameview;
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
        };
        /** 展示金币粒子 */
        ComHouse.prototype.showMoneyParticles = function () {
            var id = this.id;
            if (id == GameMgr.maxHourseId) {
                return;
            }
            var cfgName = "earn";
            var duration = 1000;
            var particleId0 = this.particleId0;
            var conParticle0 = this.conParticle0;
            conParticle0.visible = true;
            conParticle0.alpha = 1;
            var resName = [];
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
            particleId0 = this.createParticles(conParticle0, resName, cfgName, void 0, false);
            // }
            // const cfg = RES.getRes(`${cfgName}_json`);
            // if (cfg && cfg.duration != void 0) {
            // 	duration = cfg.duration;
            // }
            this.startParticle(particleId0, duration);
            var particle = this.getParticle(particleId0);
            if (particle && particle.particleObj) {
                var _loop_1 = function (key) {
                    var particleObj = particle.particleObj[key];
                    if (!particleObj) {
                        return "continue";
                    }
                    egret.setTimeout(function () {
                        gTween.fadeOut(particleObj.system, 100, 1);
                    }, this_1, duration + 1000);
                };
                var this_1 = this;
                for (var key in particle.particleObj) {
                    _loop_1(key);
                }
            }
        };
        ComHouse.prototype.initMcEff = function (mcDebug, mc, ob) {
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
        };
        ComHouse.prototype.playMcMoney = function () {
            var mcMoney = this.mcMoney;
            mcMoney.visible = true;
            mcMoney.removeEventListener(egret.Event.COMPLETE, this.hideMcMoney, this);
            mcMoney.once(egret.Event.COMPLETE, this.hideMcMoney, this);
            mcMoney.gotoAndPlay("work", 1, 1);
            if (!GameMgr.isEnd) {
                gSoundMgr.playEff("smcoin");
            }
        };
        ComHouse.prototype.hideMcMoney = function () {
            var mcMoney = this.mcMoney;
            mcMoney.visible = false;
        };
        ComHouse.prototype.playMcLevelup = function () {
            var mcLevelup = this.mcLevelup;
            mcLevelup.visible = true;
            mcLevelup.removeEventListener(egret.Event.COMPLETE, this.hideMcLevelup, this);
            mcLevelup.once(egret.Event.COMPLETE, this.hideMcLevelup, this);
            mcLevelup.gotoAndPlay("work", 1, 1);
            gSoundMgr.playEff("smlevelup");
        };
        ComHouse.prototype.hideMcLevelup = function () {
            var mcLevelup = this.mcLevelup;
            mcLevelup.visible = false;
        };
        ComHouse.prototype.playMcBuildup = function () {
            var mcBuildup = this.mcBuildup;
            mcBuildup.visible = true;
            mcBuildup.removeEventListener(egret.Event.COMPLETE, this.hideMcBuildup, this);
            mcBuildup.once(egret.Event.COMPLETE, this.hideMcBuildup, this);
            mcBuildup.gotoAndPlay("work", 1, 1);
        };
        ComHouse.prototype.hideMcBuildup = function () {
            var mcBuildup = this.mcBuildup;
            mcBuildup.visible = false;
        };
        /** 展示星星粒子 */
        ComHouse.prototype.showStarParticles = function () {
            var cfgName = "star";
            var duration = 500;
            var particleId1 = this.particleId1;
            var conEff1 = this.conEff1;
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
            egret.setTimeout(function () {
                gTween.fadeOut(conEff1, 100, 1);
            }, this, duration - 100);
        };
        return ComHouse;
    }(com.ComFile));
    com.ComHouse = ComHouse;
    __reflect(ComHouse.prototype, "com.ComHouse");
})(com || (com = {}));
//# sourceMappingURL=ComHouse.js.map