var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var scene;
(function (scene_1) {
    /**
     * 游戏场景
     */
    var GameScene = (function (_super) {
        __extends(GameScene, _super);
        function GameScene() {
            var _this = _super.call(this) || this;
            _this.isLoadRes = null; //是否已loadRes()资源
            _this.isFirstOpen = true; //是否第一次打开场景
            _this.firstTouch = true;
            _this.gridDic = {};
            _this.skillProgress = 0;
            _this.selectionItems = gConst.boardItems;
            /* =========== 漂浮物代码-end =========== */
            /* =========== 业务代码-start =========== */
            _this.currentHousePoint = 1;
            _this.goldSpace = 10;
            _this.isOpenChat = true;
            _this.particleInterval = 6000;
            _this.skinName = skins.GameScene;
            // this.initBg();
            // this.initCamera(false)
            _this.camera = new util.CameraMgr(_this.conBg);
            return _this;
        }
        /**
         * 打开场景
         * @param {any[]} args open()传参会通过init()传过去
         */
        GameScene.prototype.open = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var mainView = GameMgr.mainView;
            this.init.apply(this, args);
            if (this.isFirstOpen) {
                mainView.initResizeView(this.isFirstOpen);
            }
            this.createChildren2();
            if (!this.isLoadRes) {
                this.isLoadRes = true;
                this.load();
            }
            mainView.resizeView(void 0, this.isFirstOpen);
            // mainView.resizeView();
            GameMgr.stage.removeEventListener(egret.Event.RESIZE, mainView.resizeView, mainView);
            GameMgr.stage.addEventListener(egret.Event.RESIZE, mainView.resizeView, mainView);
            this.start();
            this.update();
            this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
            this.addEventListener(egret.Event.ENTER_FRAME, this.update, this);
            this.removeEvent();
            this.addEvent();
            if (this.isFirstOpen) {
                this.isFirstOpen = false;
            }
        };
        /** 结束界面 */
        GameScene.prototype.end = function () {
            var mainView = GameMgr.mainView;
            this.isLoadRes = false;
            GameMgr.stage.removeEventListener(egret.Event.RESIZE, mainView.resizeView, mainView);
            this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
            this.removeEvent();
            gComMgr.rmEvent(this);
            this.stop();
        };
        /* =========== 框架结构代码-start =========== */
        /**
         * 初始化
         * @param {any[]} args open()传参会通过init()传过去
         */
        GameScene.prototype.init = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // console.info("init", ...args);
        };
        /** 首次打开场景时调用 */
        GameScene.prototype.load = function () {
            // console.info("load");
        };
        /** 每次打开场景都会调用 */
        GameScene.prototype.start = function () {
            // console.info("start");
            this.openFirst();
            this.autoEnd();
            this.updateSelectionItems();
        };
        /** 每次结束场景都会调用 */
        GameScene.prototype.stop = function () {
            // console.info("stop");
        };
        /** 每帧都会调用 */
        GameScene.prototype.update = function () {
            // console.info("update");
            // this.moveBg(this.bg_0);
            // this.moveBg(this.bg_1);
            // this.shadowBg();
        };
        /** 注册事件 */
        GameScene.prototype.addEvent = function () {
            // console.info("addEvent");
            this.pboard_con.addEventListener(egret.TouchEvent.TOUCH_TAP, this.checkSelect, this);
            // GameMgr.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchStage, this);
            // GameMgr.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchStageStart, this);
            // GameMgr.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchStageMove, this);
            // GameMgr.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.touchStageEnd, this);
            // this.addEventListener(gConst.eventType.ONE_STEP_COMPLETE, this.openTran, this);
            // this.addEventListener(gConst.eventType.ONE_STEP_FAIL, this.playTranEnd, this);
            // this.addEventListener(gConst.eventType.UPDATE_GOLD, this.updateGold, this);
        };
        /** 移除事件 */
        GameScene.prototype.removeEvent = function () {
            // console.info("removeEvent");
            this.pboard_con.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.checkSelect, this);
            // GameMgr.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchStage, this);
            // GameMgr.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchStageStart, this);
            // GameMgr.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchStageMove, this);
            // GameMgr.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.touchStageEnd, this);
            // this.removeEventListener(gConst.eventType.ONE_STEP_COMPLETE, this.openTran, this);
            // this.removeEventListener(gConst.eventType.ONE_STEP_FAIL, this.playTranEnd, this);
            // this.removeEventListener(gConst.eventType.UPDATE_GOLD, this.updateGold, this);
        };
        /** 游戏结束 */
        GameScene.prototype.gameEnd = function () {
            Mapi.gameEnd();
            // GameMgr.isEnd = true;
            this.UiFirst.updateDir({
                horDir: gConst.direction.RIGHT_TOP,
                verDir: gConst.direction.CENTER_TOP
            }, {
                horDir: gConst.direction.RIGHT_TOP,
                verDir: gConst.direction.CENTER_BOTTOM
            });
            this.UiFirst.gameEnd();
        };
        /**
         * 创建组件接口
         * @description 每次创建、重玩时调用
         */
        GameScene.prototype.createChildren2 = function () {
        };
        /** 窗口大小改变时调用 */
        GameScene.prototype.resizeView = function () {
            // console.info("resizeView", this.width, this.height, GameMgr.screenType, GameMgr.mobileType);
            this.dispatchEventWith(gConst.eventType.RESIZE_VIEW);
            this.updataParticlesEmitter();
            var baseScale = gConst.mobileByScale[GameMgr.screenType][GameMgr.mobileType];
            var conBg = this.conBg;
            var con = this.con;
            var cameraOffsetY;
            if (GameMgr.screenType == 1 /* VERTICAL */) {
                //竖屏
                // con.width = gConst.screen.WIDTH;
                // con.height = gConst.screen.HEIGHT;
                cameraOffsetY = 100;
                if (!this.hLayout) {
                    this.hLayout = new eui.HorizontalLayout();
                    this.hLayout.gap = 10;
                }
                this.pboard_con.layout = this.hLayout;
                // this.pboard_con.
                this.con_guide.y = 0.6 * this.height;
                this.con_guide.horizontalCenter = '0';
                con.y = 0.6 * this.height;
                con.horizontalCenter = '0';
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
                // con.width = gConst.screen.HEIGHT;
                // con.height = gConst.screen.WIDTH;
                cameraOffsetY = -20;
                if (!this.vLayout) {
                    this.vLayout = new eui.VerticalLayout();
                    this.vLayout.gap = 10;
                }
                this.pboard_con.layout = this.vLayout;
                this.con_guide.y = 0.7 * this.height;
                this.con_guide.horizontalCenter = '0';
                con.y = NaN;
                con.horizontalCenter = NaN;
                con.right = 30;
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
            // bg.scaleX = bg.scaleY = bgScale;
            var currentHousePoint = this['housepoint_' + this.currentHousePoint];
            var scaleByCamera = Math.max(this.width / 2 / this.housepoint_1.x, this.height / 2 / this.housepoint_1.y, 1);
            conBg.scaleX = conBg.scaleY = Math.max(this.width / conBg.width, this.height / conBg.height) * scaleByCamera;
            this.updateCamera(conBg, { x: currentHousePoint.x, y: currentHousePoint.y + cameraOffsetY }, scaleByCamera, false);
        };
        /** 屏幕横竖屏转换时调用 */
        GameScene.prototype.rotateView = function () {
            // console.info("GameScene.rotateView", GameMgr.screenType);
            this.dispatchEventWith(gConst.eventType.ROTATE_VIEW);
            if (GameMgr.screenType == 1 /* VERTICAL */) {
            }
            else {
            }
            // this.updateHandScreen();
        };
        /** 重玩游戏 */
        GameScene.prototype.replay = function () {
            this.destroy();
            GameMgr.init();
            GameMgr.gameview = new scene.GameScene();
            GameMgr.gameview.open();
            if (this.parent) {
                this.parent.addChild(GameMgr.gameview);
                this.parent.removeChild(this);
            }
            Mapi.gameRetry();
        };
        /** 销毁 */
        GameScene.prototype.destroy = function () {
            if (this.UiFirst) {
                this.UiFirst.destroy();
            }
            if (this.UiStart) {
                this.UiStart.destroy();
            }
            if (this.UiTran) {
                this.UiTran.destroy();
            }
            if (this.UiTranEnd) {
                this.UiTranEnd.destroy();
            }
            if (this.UiEnd) {
                this.UiEnd.destroy();
            }
            if (this.UiEndFail) {
                this.UiEndFail.destroy();
            }
            if (this.UiChat) {
                this.UiChat.destroy();
            }
            if (this.UiCongrats) {
                this.UiCongrats.destroy();
            }
            // if (this.UiPeople) {
            // 	this.UiPeople.destroy();
            // }
            this.removeEvent();
        };
        /** 点击下载(用户点击下载，调用SDK函数) */
        GameScene.prototype.clickInstall = function (event) {
            if (event) {
                event.stopPropagation();
            }
            Mapi.install();
        };
        /** 自动结束 */
        GameScene.prototype.autoEnd = function () {
            var autoEndTime = GameMgr.getConfig("autoEndTime");
            if (autoEndTime != void 0 && autoEndTime > 0) {
                egret.clearTimeout(this.endDelay);
                this.endDelay = egret.setTimeout(this.openEnd, this, autoEndTime * 1000);
            }
        };
        /** 玩家多久未操作，结束游戏 */
        GameScene.prototype.endToNoOperation = function () {
            if (GameMgr.isEnd) {
                return;
            }
            if (!gGuideMgr.lastGuideFinish()) {
                return;
            }
            var endToNoOperationTimer = gConst.endToNoOperationTimer;
            if (endToNoOperationTimer != void 0 && endToNoOperationTimer > 0) {
                egret.clearTimeout(this.endToNoOperationDelay);
                this.endToNoOperationDelay = egret.setTimeout(this.openEndFail, this, endToNoOperationTimer);
            }
        };
        /**
         * 创建所有粒子
         * @param {egret.DisplayObjectContainer} parent 粒子父级
         * @param {string[]} resName 粒子资源名称组
         * @param {string} cfgName 粒子配置名称
         * @param {number} idx 粒子层级
         * @param {boolean} autoStart = true 粒子自动开始播放
         * @param {number} x = 0 粒子X坐标
         * @param {number} y = 0 粒子Y坐标
         * @returns {number} 当前粒子ID
         */
        GameScene.prototype.createParticles = function (parent, resName, cfgName, idx, autoStart, x, y) {
            if (autoStart === void 0) { autoStart = true; }
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (!this.particleMgr) {
                this.particleMgr = new util.ParticleMgr(this);
            }
            return this.particleMgr.createParticles(parent, resName, cfgName, idx, autoStart, x, y);
        };
        /**
         * 获取粒子
         * @param {number} id 粒子ID
         */
        GameScene.prototype.getParticle = function (id) {
            if (!this.particleMgr) {
                return;
            }
            return this.particleMgr.getParticle(id);
        };
        /**
         * 开始播放所有粒子
         * @param {number} duration 粒子出现总时间
         */
        GameScene.prototype.startParticles = function (duration) {
            if (!this.particleMgr) {
                return;
            }
            this.particleMgr.startParticles(duration);
        };
        /**
         * 开始播放粒子
         * @param {number} id 当前粒子ID
         * @param {number} duration 粒子出现总时间
         */
        GameScene.prototype.startParticle = function (id, duration) {
            if (!this.particleMgr) {
                return;
            }
            this.particleMgr.startParticle(id, duration);
        };
        /**
         * 停止创建所有粒子
         * @param {boolean} clear 是否清除掉现有粒子
         */
        GameScene.prototype.stopParticles = function (clear) {
            if (!this.particleMgr) {
                return;
            }
            this.particleMgr.stopParticles(clear);
        };
        /**
         * 停止创建粒子
         * @param {number} id 当前粒子ID
         * @param {boolean} clear 是否清除掉现有粒子
         */
        GameScene.prototype.stopParticle = function (id, clear) {
            if (!this.particleMgr) {
                return;
            }
            this.particleMgr.stopParticle(id, clear);
        };
        /**
         * 设置所有粒子层级
         */
        GameScene.prototype.setParticlesIndex = function (idx) {
            if (!this.particleMgr) {
                return;
            }
            this.particleMgr.setParticlesIndex(idx);
        };
        /**
         * 更新所有粒子发射位置
         */
        GameScene.prototype.updataParticlesEmitter = function () {
            if (!this.particleMgr) {
                return;
            }
            this.particleMgr.updataParticlesEmitter();
        };
        /**
         * 设置所有粒子位置
         */
        GameScene.prototype.setParticlesPos = function (x, y) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (!this.particleMgr) {
                return;
            }
            this.particleMgr.setParticlesPos(x, y);
        };
        /**
         * 设置所有粒子系统最大粒子数，超过该数量将不会继续创建粒子，取值范围[1,Number.MAX_VALUE]
         * @param {number} id 当前粒子ID
         */
        GameScene.prototype.setMaxParticles = function (id, max) {
            if (!this.particleMgr) {
                return;
            }
            this.particleMgr.setMaxParticles(id, max);
        };
        /**
         * 显示闪烁物
         * @param {egret.DisplayObjectContainer} con 闪烁物容器
         * @param {string[]} starAnswers 闪烁物资源名称配置
         * @param {number} cfg.intervalMax 下次显示闪烁物，时间间隔范围，最大值
         * @param {number} cfg.intervalMin 下次显示闪烁物，时间间隔范围，最小值
         * @param {number} cfg.scaleMax 闪烁物缩放值范围，最大值
         * @param {number} cfg.scaleMin 闪烁物缩放值范围，最小值
         * @param {boolean} cfg.isRotate 闪烁物是否旋转
         * @param {boolean} cfg.isAdaptiveScale 闪烁物是否自适应父级缩放
         * @param {number} cfg.starMaxCnt 闪烁物是否自适应父级缩放
         */
        GameScene.prototype.showStar = function (con, starAnswers, cfg) {
            if (!this.starMgr) {
                this.starMgr = new util.StarMgr(con);
            }
            this.starMgr.show(starAnswers, cfg);
        };
        /**
         * 更新闪烁物数据
         * @param {string[]} starAnswers 闪烁物资源名称配置
         * @param {number} cfg.intervalMax 下次显示闪烁物，时间间隔范围，最大值
         * @param {number} cfg.intervalMin 下次显示闪烁物，时间间隔范围，最小值
         * @param {number} cfg.scaleMax 闪烁物缩放值范围，最大值
         * @param {number} cfg.scaleMin 闪烁物缩放值范围，最小值
         * @param {boolean} cfg.isRotate 闪烁物是否旋转
         * @param {boolean} cfg.isAdaptiveScale 闪烁物是否自适应父级缩放
         * @param {number} cfg.starMaxCnt 闪烁物是否自适应父级缩放
         */
        GameScene.prototype.updateStarData = function (starAnswers, cfg) {
            if (!this.starMgr) {
                return;
            }
            this.starMgr.updateData(starAnswers, cfg);
        };
        /**
         * 隐藏闪烁物
         * @param {boolean} clearAll = true 是否清除所有
         */
        GameScene.prototype.hideStar = function (clearAll) {
            if (clearAll === void 0) { clearAll = true; }
            if (!this.starMgr) {
                return;
            }
            this.starMgr.hide(clearAll);
        };
        /**
         * 显示漂浮物
         * @param {egret.DisplayObjectContainer} con 漂浮物容器
         * @param {...} cfg 漂浮物数据
         */
        GameScene.prototype.showFloat = function (con, cfg) {
            if (!this.floatMgr) {
                this.floatMgr = new util.FloatMgr(con);
            }
            this.floatMgr.show(cfg);
        };
        /**
         * 更新漂浮物数据
         * @param {...} cfg 漂浮物数据
         * @param {boolean} isInitDefault = true 是否初始化默认值
         */
        GameScene.prototype.updateFloatData = function (cfg) {
            if (!this.floatMgr) {
                return;
            }
            this.floatMgr.updateData(cfg);
        };
        /**
         * 隐藏漂浮物
         * @param {boolean} clearAll = true 是否清除所有
         */
        GameScene.prototype.hideFloat = function (clearAll) {
            if (clearAll === void 0) { clearAll = true; }
            if (!this.floatMgr) {
                return;
            }
            this.floatMgr.hide(clearAll);
        };
        GameScene.prototype.initBg = function () {
            var con = this.con;
            var conBg = this.conBg;
            // this.extraBgS = conScene.scaleX;
            // gComMgr.setObjSize(conBg, true);
            // gComMgr.setObjSize(conScene, true);
            // this.initCamera(false)
        };
        GameScene.prototype.updateSelectionItems = function () {
            var _this = this;
            this.pboard_con.removeChildren();
            this.selectionItems.forEach(function (item, index) {
                if (index < 3) {
                    var board = new eui.Image();
                    var boardContainer = new eui.Group();
                    board.name = item.name;
                    board.source = 'pboard_' + item.id + '_png';
                    boardContainer.addChild(board);
                    gComMgr.setItemAnchor(board);
                    _this.pboard_con.addChild(boardContainer);
                    board.visible = false;
                    gTween.toBigShow(board, 500, 1, 1, egret.Ease.backOut);
                }
            });
            this.pboard_con.addEventListener(egret.TouchEvent.TOUCH_TAP, this.checkSelect, this);
            gTween.toTopShow(this.con_guide, 300, 30, void 0, 1);
            this.showGuide();
        };
        GameScene.prototype.findBoard = function (name) {
            for (var i = 0; i < this.selectionItems.length; i++) {
                if (this.selectionItems[i].name === name) {
                    this.selectionItems.splice(i, 1);
                }
            }
        };
        GameScene.prototype.checkSelect = function (event) {
            var _this = this;
            if (event.type === egret.TouchEvent.TOUCH_TAP) {
                if (!event.target.name)
                    return;
                console.log(event.target.name);
                this.pboard_con.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.checkSelect, this);
                var boardName_1 = event.target.name;
                this.findBoard(boardName_1);
                gSoundMgr.playEff('smselect');
                this.hideGuide();
                gTween.toBottomHide(this.con_guide, 300, 30, void 0, 1, egret.Ease.backOut);
                this.pboard_con.$children.forEach(function (child) {
                    var board = child.$children[0];
                    if (board.name === boardName_1) {
                        gSoundMgr.playEff('smbuilding');
                        gTween.toScale(board, 0.8, 200, 1, void 0, void 0, {
                            callback: function () {
                                _this.buildHouse(boardName_1);
                                gTween.toScale(board, 1, 200, 0.8, void 0, { duration: 200 }, {
                                    callback: function () {
                                        board.alpha = 1;
                                        // 建造房子
                                        gTween.fadeOut(board, 300, 1, void 0, void 0, {
                                            callback: function () {
                                                board.alpha = 1;
                                                board.visible = false;
                                                egret.setTimeout(function () {
                                                    if (_this.currentHousePoint < 3) {
                                                        _this.currentHousePoint++;
                                                        _this.moveToNextHouse();
                                                    }
                                                    else {
                                                        _this.openEnd();
                                                    }
                                                }, _this, 1200);
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                    else {
                        gTween.fadeOut(board, 300, 1);
                    }
                });
            }
        };
        GameScene.prototype.moveToNextHouse = function () {
            var _this = this;
            var currentHousePoint = this['housepoint_' + this.currentHousePoint];
            // this.updateCamera(this.conBg, { x: currentHousePoint.x, y: currentHousePoint.y }, void 0, true)
            this.camera.upCamera(true, { x: currentHousePoint.x, y: currentHousePoint.y }, void 0, function () {
                _this.updateSelectionItems();
            });
        };
        GameScene.prototype.buildHouse = function (boardName) {
            var currentHousePoint = this['housepoint_' + this.currentHousePoint];
            gTween.fadeOut(currentHousePoint, 300);
            var currentHousePoint_con = this['housepoint_' + this.currentHousePoint + '_con'];
            var bone = new com.ComBones();
            bone.setData(currentHousePoint_con, boardName);
            bone.play('newAnimation');
        };
        GameScene.prototype.updateCamera = function (scene, target, scale, isAni) {
            if (isAni === void 0) { isAni = false; }
            if (!this.camera) {
                this.camera = new util.CameraMgr(scene);
            }
            this.camera.upCamera(isAni, target, scale);
        };
        GameScene.prototype.gameStart = function () {
            // console.info("gameStart");
            // if (this.gameStared) {
            // 	return;
            // }
            this.gameStared = true;
            this.openStarted = false;
            // this.UiFirst.conBtn.visible = true;
            // this.black.visible = false;
            // gSoundMgr.playEff("smbar");
            // this.showGuide();
            // this.showHand();
            if (GameMgr.firstToMaxLv) {
                GameMgr.auto = true;
            }
            var currHouseId = GameMgr.currHouseId;
            if (currHouseId > GameMgr.maxCanBuildId) {
                // this.hideGuide();
                // this.openTran();
                egret.setTimeout(this.openTran, this, 1000);
                this.startPartilcle(Math.max(currHouseId - 1, 0));
            }
            else {
                this.showGuide();
                if (currHouseId != 0) {
                    // gCar.updatePos();
                    if (currHouseId == 1) {
                        GameMgr.gold += gConst.firstAddGold; //首次弹窗获得金币数
                    }
                    this.startPartilcle(Math.max(currHouseId - 1, 0));
                }
            }
        };
        GameScene.prototype.hasUiFirstLogo = function () {
            return this.UiFirst && this.UiFirst.parent && this.UiFirst.conLogo && this.UiFirst.conLogo.parent;
        };
        GameScene.prototype.resizeUiFirst = function (event) {
            // const conLogo = this.UiFirst.conLogo;
            // const conGold = this.conGold;
            // if (!conGold || !conGold.parent) {
            // 	return;
            // }
            // let pos = gComMgr.toGlobal(conLogo);
            // pos = gComMgr.toLocal(conGold.parent, pos.x, pos.y);
            // conGold.x = pos.x;
            // conGold.y = pos.y + (conLogo.height - conLogo.anchorOffsetY) * conLogo.scaleY
            // 	+ conGold.anchorOffsetY * conGold.scaleY + this.goldSpace;
        };
        /** 打开顶层页面 */
        GameScene.prototype.openFirst = function () {
            this.UiFirst = gUiMgr.create(ui.UiFirst);
            this.UiFirst.addEventListener(gConst.eventType.RESIZE_VIEW, this.resizeUiFirst, this);
            this.UiFirst.open({
                horDir: gConst.direction.LEFT_TOP,
                verDir: gConst.direction.CENTER_TOP
            }, {
                horDir: gConst.direction.CENTER_BOTTOM,
                verDir: gConst.direction.CENTER_BOTTOM
            });
        };
        /** 关闭顶层页面 */
        GameScene.prototype.closeFirst = function () {
            if (!this.UiFirst) {
                return;
            }
            this.UiFirst.removeEventListener(gConst.eventType.RESIZE_VIEW, this.resizeUiFirst, this);
            this.UiFirst.close();
        };
        /** 打开启动页面 */
        GameScene.prototype.openStart = function (chatId) {
            if (chatId === void 0) { chatId = 1; }
            if (this.openStarted) {
                return;
            }
            this.openStarted = true;
            this.hideGuide();
            this.UiStart = gUiMgr.create(ui.UiStart);
            // this.UiStart.once(gConst.eventType.IN_COMPLETE, () => {
            // 	this.isGameStar = true;
            // }, this);
            // this.UiStart.addEventListener(gConst.eventType.TOUCH_TAP, this.clickItem, this);
            this.UiStart.once(gConst.eventType.CLOSE, this.gameStart, this);
            this.UiStart.open(chatId);
            if (chatId == 3) {
                return;
            }
            if (GameMgr.screenType == 0 /* HORIZONTAL */) {
                // this.conGold.visible = false;
                var UiFirst = this.UiFirst;
                var conLogo = void 0;
                if (UiFirst) {
                    conLogo = UiFirst.conLogo;
                }
                if (conLogo) {
                    conLogo.visible = false;
                }
            }
        };
        /** 关闭启动页面 */
        GameScene.prototype.closeStart = function () {
            // if (!this.openStarted) {
            // 	return;
            // }
            // this.openStarted = false;
            if (!this.UiStart) {
                return;
            }
            this.UiStart.hide(void 0, true);
        };
        /** 打开过场页面 */
        GameScene.prototype.openTran = function (event) {
            if (GameMgr.isEnd) {
                return;
            }
            this.UiTran = gUiMgr.create(ui.UiTran);
            // this.UiTran.once(gConst.eventType.IN_COMPLETE, this.nextScene, this);
            this.UiTran.once(gConst.eventType.CLOSE, this.playTranEnd, this);
            this.UiTran.open();
            // gSoundMgr.playEff("smvip");
        };
        /** 关闭过场页面 */
        GameScene.prototype.closeTran = function () {
            if (!this.UiTran) {
                return;
            }
            this.UiTran.close();
        };
        /** 打开对话页面 */
        GameScene.prototype.openChat = function () {
            if (GameMgr.isEnd) {
                return;
            }
            this.UiChat = gUiMgr.create(ui.UiChat);
            this.UiChat.open();
        };
        /** 关闭对话页面 */
        GameScene.prototype.closeChat = function () {
            egret.clearTimeout(this.openChatDelay);
            this.isOpenChat = false;
            if (!this.UiChat) {
                return;
            }
            this.UiChat.close();
        };
        /** 打开人物页面 */
        // private openPeople(id?: number, wordId?: number) {
        // 	if (GameMgr.isEnd) {
        // 		return;
        // 	}
        // 	this.UiPeople = gUiMgr.create(ui.UiPeople) as ui.UiPeople;
        // 	this.UiPeople.open(id, wordId);
        // }
        /** 关闭人物页面 */
        // private closePeople() {
        // 	if (!this.UiPeople) {
        // 		return;
        // 	}
        // 	this.UiPeople.hide(true);
        // }
        /** 打开恭喜页面 */
        GameScene.prototype.openCongrats = function () {
            // console.info("openCongrats");
            // gTween.fadeIn(this.black, 300, 0.5);
            this.UiCongrats = gUiMgr.create(ui.UiCongrats);
            // this.UiCongrats.once(gConst.eventType.CLOSE, this.nextPass, this);
            // this.UiCongrats.once(gConst.eventType.GAME_END, this.gameEnd, this);
            this.UiCongrats.open();
            gSoundMgr.playEff("sm_success");
        };
        /** 关闭恭喜页面 */
        GameScene.prototype.closeCongrats = function () {
            if (!this.UiCongrats) {
                return;
            }
            this.UiCongrats.close();
        };
        GameScene.prototype.playTranEnd = function (event) {
            var _this = this;
            // console.info("playTranEnd", event.data);
            if (this.playTranEnded) {
                return;
            }
            this.playTranEnded = true;
            // const comGold = this.comGold;
            // Mapi.sendAction(this.clickType + 1);
            // let data: { isReplay: boolean };
            // if (event && event.data) {
            // 	data = event.data;
            // }
            GameMgr.isVip = true;
            this.stopPartilcle();
            // this.allFastPlay();
            // comGold.playLampsByScale();
            egret.setTimeout(function () {
                _this.openTranEnd();
            }, this, gConst.victoryInEndTimer);
            // this.openTranEnd();
        };
        /** 打开结束过场页面 */
        GameScene.prototype.openTranEnd = function () {
            if (GameMgr.isEnd) {
                return;
            }
            this.openEnd();
            // this.UiTranEnd = gUiMgr.create(ui.UiTranEnd) as ui.UiTranEnd;
            // this.UiTranEnd.once(gConst.eventType.IN_COMPLETE, this.nextScene, this);
            // this.UiTranEnd.once(gConst.eventType.SHOW_CURTAIN_FULL, this.showEnd, this);
            // this.UiTranEnd.once(gConst.eventType.CLOSE, this.openEnd, this);
            // const data: { isReplay: boolean } = event ? event.data : void 0;
            // this.UiTranEnd.open(/*data*/);
            this.UiStart.once(gConst.eventType.SHOW_CURTAIN_FULL, this.showEnd, this);
            this.UiStart.showParticles();
        };
        /** 关闭结束过场页面 */
        GameScene.prototype.closeTranEnd = function () {
            if (!this.UiTranEnd) {
                return;
            }
            this.UiTranEnd.close();
        };
        /** 打开结束界面 */
        GameScene.prototype.openEnd = function (isShowEnd) {
            if (isShowEnd === void 0) { isShowEnd = true; }
            // console.info("openEnd");
            egret.clearTimeout(this.endDelay);
            egret.clearTimeout(this.endToNoOperationDelay);
            if (GameMgr.isEnd) {
                return;
            }
            GameMgr.isEnd = true;
            this.hideGuide();
            // this.hideHands();
            this.removeEvent();
            // GameMgr.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP, Mapi.install, Mapi);
            // this.closePeople();
            // this.closeStart();
            this.UiFirst.close();
            this.UiEnd = gUiMgr.create(ui.UiEnd);
            this.UiEnd.hide();
            this.UiEnd.open();
            gTween.fadeIn(this.UiEnd, 300, 1);
            // gTween.fadeOut(this.conBg, 300, 1)
            // gTween.fadeOut(this.con, 300, 1)
            this.conBg.visible = false;
            this.con.visible = false;
            // egret.setTimeout(this.showEnd, this, 500);
            // GameMgr.endType = gConst.endType.VICTORY;
            // this.showHead();
            // this.comPanel.stopBar();
            // this.allStopPlay();
            Mapi.gameEnd();
            if (isShowEnd) {
                this.showEnd();
            }
        };
        /** 显示结束界面 */
        GameScene.prototype.showEnd = function () {
            // console.info("showEnd");
            // this.UiFirst.gameEnd();
            // this.closeFirst();
            // this.closeStart();
            // const comGold = this.comGold;
            // gComMgr.fadeOutDestory(comGold, 300, () => {
            // 	gComMgr.destory(this.conGold);
            // });
            // this.header.destroy();
            // this.nav.destroy();
            // gComMgr.destory(this.con);
            // gComMgr.destory(this.conBg);
            // gComMgr.fadeOutDestory(this.con, 300, () => {
            // 	gComMgr.destory(this.conBg);
            // });
            // gComMgr.destory(this.hand);
            // gComMgr.fadeOutDestory(this.conWin);
            // gComMgr.fadeOutDestory(this.conBody, 300, () => {
            // 	this.lamp.destroy();
            // 	this.oldMan.destroy();
            // });
            // this.progress.destroy(true);
            // this.closeChat();
            // this.closePeople();
            // this.UiEnd.hide();
            // this.UiEnd.open();
            // this.UiEnd.show();
            // egret.setTimeout(this.UiEnd.show, this.UiEnd, 500);
            // if (GameMgr.endType == gConst.endType.VICTORY) {
            // 	gSoundMgr.playEff("sm_win");
            // } else {
            // 	gSoundMgr.playEff("sm_fail");
            // }
            // this.openStart(3);
            this.gameEnd();
            this.showEndOther();
        };
        /** 结束界面其它元素展示 */
        GameScene.prototype.showEndOther = function () {
            // console.info("showEndOther");
            if (!this.UiEnd) {
                return;
            }
            this.UiEnd.showOther();
        };
        /** 关闭结束界面 */
        GameScene.prototype.closeEnd = function () {
            if (!this.UiEnd) {
                return;
            }
            this.UiEnd.close();
        };
        /** 打开结束界面（失败） */
        GameScene.prototype.openEndFail = function () {
            // console.info("openEndFail");
            // egret.clearTimeout(this.endDelay);
            // egret.clearTimeout(this.endToNoOperationDelay);
            // // if (GameMgr.isEnd) {
            // // 	return;
            // // }
            // GameMgr.isEnd = true;
            // this.hideGuide();
            // this.removeEvent();
            // this.UiEndFail = gUiMgr.create(ui.UiEndFail) as ui.UiEndFail;
            // this.UiEndFail.hide();
            // this.UiEndFail.open();
            // this.showEndFail();
            this.openEnd();
        };
        /** 显示结束界面（失败） */
        GameScene.prototype.showEndFail = function () {
            // console.info("showEndFail");
            // this.UiFirst.gameEnd();
            // this.closeFirst();
            // this.header.destroy();
            // gComMgr.rmObj(this.bg_0);
            // gComMgr.rmObj(this.bg_1);
            // gComMgr.rmObj(this.con_tree);
            // gComMgr.rmObj(this.bg_2);
            // this.boy.destroy();
            // this.girl.destroy();
            // gComMgr.rmObj(this.con);
            // gComMgr.rmObj(this.g_paper);
            this.closeChat();
            // if (this.UiChat) {
            // 	this.UiChat.hideChat();
            // }
            this.UiEndFail.show();
            this.UiFirst.updateDir({
                horDir: gConst.direction.RIGHT_TOP,
                verDir: gConst.direction.CENTER_TOP
            }, {
                horDir: gConst.direction.RIGHT_TOP,
                verDir: gConst.direction.CENTER_TOP
            });
            this.showEndFailOther();
        };
        /** 结束界面（失败）其它元素展示 */
        GameScene.prototype.showEndFailOther = function () {
            // console.info("showEndFailOther");
            if (!this.UiEndFail) {
                return;
            }
            this.UiEndFail.showOther();
        };
        /** 关闭结束界面（失败） */
        GameScene.prototype.closeEndFail = function () {
            if (!this.UiEndFail) {
                return;
            }
            this.UiEndFail.close();
        };
        GameScene.prototype.createMask = function () {
            var lightMask = this.lightMask = new com.ComLightMask();
            this.addChild(lightMask);
            lightMask.visible = false;
        };
        GameScene.prototype.updateMask = function () {
            var lightMask = this.lightMask;
            if (!lightMask) {
                return;
            }
            // if (!lightMask.visible) {
            // 	return;
            // }
            if (!this.isShowMask) {
                return;
            }
            var maskParent = lightMask.parent;
            if (!maskParent) {
                return;
            }
            var obj = gGuideMgr.guideObj;
            if (!obj) {
                return;
            }
            var target = obj.chat;
            lightMask.setMaskSize(this.width, this.height, .5);
            var baseScale = gConst.mobileByScale[GameMgr.screenType][GameMgr.mobileType];
            var w = target.width * baseScale;
            var h = target.height * baseScale;
            lightMask.setLightSize(w, 1, h, 70);
            var pos = this.retObjPos(target, maskParent);
            lightMask.setLightPos(pos.x - w / 2, pos.y - h / 2);
            return true;
        };
        GameScene.prototype.retObjPos = function (obj, parent) {
            if (!obj || !parent) {
                return;
            }
            var baseScale = gConst.mobileByScale[GameMgr.screenType][GameMgr.mobileType];
            var pos = gComMgr.toGlobal(obj);
            var x = pos.x + (obj.width / 2 - obj.anchorOffsetX) * obj.scaleX * baseScale;
            var y = pos.y + (obj.height / 2 - obj.anchorOffsetY) * obj.scaleY * baseScale;
            pos = gComMgr.toLocal(parent, x, y, pos);
            return pos;
        };
        /** 显示遮罩 */
        GameScene.prototype.showMask = function (inCallBack, inThisObj, outCallBack, outThisObj) {
            if (this.showMasked) {
                return;
            }
            var lightMask = this.lightMask;
            if (!lightMask) {
                return;
            }
            // lightMask.visible = true;
            // gTween.toScale(lightMask.cirleLight, 0, 500, 10, void 0, { duration: 50 }, {
            // 	callback: () => {
            // 		if (inCallBack) {
            // 			inCallBack.call(inThisObj);
            // 		}
            // 		gTween.toScale(lightMask.cirleLight, 10, 500, 0, void 0, void 0, {
            // 			callback: outCallBack,
            // 			thisObj: outThisObj
            // 		});
            // 	}
            // });
            this.isShowMask = true;
            if (this.updateMask()) {
                this.showMasked = true;
                gTween.fadeIn(lightMask, 300, 1);
            }
        };
        /** 隐藏遮罩 */
        GameScene.prototype.hideMask = function () {
            if (!this.showMasked) {
                return;
            }
            var lightMask = this.lightMask;
            if (!lightMask) {
                return;
            }
            this.showMasked = false;
            this.isShowMask = false;
            gTween.fadeOut(lightMask, 200);
            var word = this.guideWord;
            if (!word || !word.parent) {
                return;
            }
            gTween.fadeOut(word, 200);
        };
        /** 显示引导 */
        GameScene.prototype.showGuide = function () {
            if (this.showGuided) {
                return;
            }
            this.showGuided = true;
            // if (GameMgr.isEnd) {
            // 	return;
            // }
            // const id: number = gGuideMgr.stepId;
            // if (id == void 0 || id > gGuideMgr.maxStep) {
            // 	return;
            // }
            // const guide = gGuideMgr.getGuideById(id);
            // if (!guide) {
            // 	return;
            // }
            // if (guide.finish) {
            // 	gGuideMgr.stepId++;
            // 	this.showGuide();
            // 	return;
            // }
            // if (!guide.target || guide.target.length <= 0) {
            // 	return;
            // }
            // const target1: com.ComHouse = this.getCurrHouse();
            // if (!target1 || target1.id == GameMgr.maxHourseId) {
            // 	return;
            // }
            // const target1: egret.DisplayObject | egret.DisplayObjectContainer = this.gridDic[guide.target[0]] //this.guideTarget;
            // let target2: egret.DisplayObject | egret.DisplayObjectContainer, target3: egret.DisplayObject | egret.DisplayObjectContainer, target4: egret.DisplayObject | egret.DisplayObjectContainer;
            // if (guide.target.length > 1) {
            // 	target2 = this.gridDic[guide.target[1]];
            // 	if (guide.target.length > 2) {
            // 		target3 = this.gridDic[guide.target[2]];
            // 		if (guide.target.length > 3) {
            // 			target4 = this.gridDic[guide.target[3]];
            // 		}
            // 	}
            // }
            // this.currGuidePropsType = target1.propsType;
            // const time: number = gGuideMgr.isFirstGuideByProps(this.currGuidePropsType) ? gConst.firstGuideTimer : gConst.afterGuideTimer;
            // const time: number = this.firstTouch ? gConst.firstGuideTimer : gConst.afterGuideTimer;
            // if (!this.light) {
            // 	this.light = new com.ComLight();
            // }
            // this.showLightDelay = egret.setTimeout(() => {
            // 	target1.parent.addChild(this.light);
            // 	this.light.open(target1);
            // }, this, time);
            //引导遮罩
            // if (!this.showMsked) {
            // 	this.showMsked = true;
            // 	const guidemsk = this.guideBlack;
            // 	guidemsk.source = `pMask${id}_png`;
            // 	guidemsk.visible = false;
            // 	this.showMskDelay = egret.setTimeout(() => {
            // 		gTween.fadeIn(guidemsk, 300, 1);
            // 	}, this, time);
            // }
            //头像
            // if (!this.showHeaded) {
            // 	this.showHeaded = true;
            // 	const head = this.head;
            // 	const conHead = this.conHead;
            // 	this.showHeadDelay = egret.setTimeout(() => {
            // 		gTween.fadeIn(conHead, 300, 1);
            // 		head.playGuide();
            // 	}, this, time);
            // }
            //冒泡对话
            // if (!this.showBubbled) {
            // 	this.showBubbled = true;
            // 	const word = this.word;
            // 	word.source = `lang_guide${id}_png`;
            // 	const conBubble = this.conBubble;
            // 	this.showBubbleDelay = egret.setTimeout(() => {
            // 		gTween.showBubble(conBubble, 500, { orgS: 1, orgA: 1 });
            // 	}, this, time);
            // }
            if (!this.guide) {
                this.guide = new com.ComGuide();
                this.guide.open();
                this.guide.setData(100, { target1: void 0, moveTime: 150, isReturn: true }, GameMgr.gameview, { pressT: 200, liftT: 300, waitT: 100, direction: gConst.direction.RIGHT_BOTTOM, offR: 15 });
            }
            this.guide.updateData({ targetArg: { target1: this.pboard_con.$children[0], target2: this.pboard_con.$children[1], target3: this.pboard_con.$children[2] } });
            // if (id == 1) {
            // 	this.guide.hand.anchorOffsetY = 168;
            // 	this.guide.setMcData([new data.McData("1", 19, "hand1_{1}_png")], -1);
            // } else {
            // 	this.guide.hand.anchorOffsetY = 130;
            // 	this.guide.setMcData([new data.McData("1", 13, "hand2_{1}_png")], -1);
            // }
            // this.showGuided = true;
            // this.guide.setData(time, { target1: target1.guidePos/*, target2: target2, target3: target3, target4: target4, moveTime: guide.moveTime*/ }, this, { pressT: 200, liftT: 300, waitT: 100, direction: gConst.direction.RIGHT_BOTTOM, offR: 15/*, offS: 1.5*/ });
            this.guide.play();
            // this.openChatDelay = egret.setTimeout(this.openChat, this, time /*, this.chatId*/);
        };
        /** 隐藏引导 */
        GameScene.prototype.hideGuide = function () {
            this.firstTouch = false;
            // this.closeChat();
            // egret.clearTimeout(this.showLightDelay);
            // if (this.light) {
            // 	this.light.hide();
            // }
            if (!this.guide) {
                return;
            }
            if (!this.showGuided) {
                return;
            }
            this.showGuided = false;
            this.guide.over();
            // const target1: com.ComHouse = this.getCurrHouse();
            // let propsType = target1 && target1.propsType ? target1 && target1.propsType : this.currGuidePropsType;
            // gGuideMgr.updateFirstGuideByProps(propsType)
        };
        GameScene.prototype.startPartilcle = function (id) {
            this.particleByHouseId = id;
            var scale = GameMgr.isVip ? gConst.vipPartilcleTimeScale : 1;
            this.updateParticles();
            egret.clearInterval(this.particleDelay);
            this.particleDelay = egret.setInterval(this.updateParticles, this, this.particleInterval / scale);
        };
        GameScene.prototype.stopPartilcle = function () {
            this.stopPartilcled = true;
            egret.clearInterval(this.particleDelay);
        };
        /** 更新粒子 */
        GameScene.prototype.updateParticles = function () {
            this.startPartilcled = true;
            if (this.stopPartilcled) {
                return;
            }
            var id = this.particleByHouseId;
            if (id == GameMgr.maxHourseId) {
                return;
            }
            var cfgName = "make";
            var duration = 1000;
            var particleId0 = this.particleId0;
            // const conParticles = this.conParticles;
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
            // particleId0 =/* this.particleId0 =*/ this.createParticles(conParticles, resName, cfgName, void 0, false);
            // }
            var cfg = RES.getRes(cfgName + "_json");
            var maxParticles = 30;
            if (cfg) {
                if (cfg.duration != void 0) {
                    duration = cfg.duration;
                }
                if (cfg.maxParticles != void 0) {
                    maxParticles = cfg.maxParticles;
                }
            }
            this.setMaxParticles(particleId0, maxParticles / resName.length);
            this.startParticle(particleId0, duration);
        };
        return GameScene;
    }(eui.Component));
    scene_1.GameScene = GameScene;
    __reflect(GameScene.prototype, "scene.GameScene");
})(scene || (scene = {}));
//# sourceMappingURL=GameScene.js.map