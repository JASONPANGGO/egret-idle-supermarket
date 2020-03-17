namespace scene {
	/**
	 * 游戏场景
	 */
	export class GameScene extends eui.Component {

		public conBg: eui.Group;
		public con: eui.Group;

		private UiFirst: ui.UiFirst;
		private UiStart: ui.UiStart;
		private UiTran: ui.UiTran;
		private UiTranEnd: ui.UiTranEnd;
		private UiEnd: ui.UiEnd;
		private UiEndFail: ui.UiEndFail;
		private UiChat: ui.UiChat;
		private UiCongrats: ui.UiCongrats;

		public isLoadRes: boolean = null; //是否已loadRes()资源
		public isFirstOpen: boolean = true; //是否第一次打开场景

		private firstTouch: boolean = true;

		private paper_drop: com.ComMovieClip;

		private endDelay: number;
		private endToNoOperationDelay: number;

		private gridDic: Object = {};

		private skillProgress: number = 0;


		// 游戏场景

		// 三个建造房子的地
		public housepoint_1_con: eui.Group;
		public housepoint_2_con: eui.Group;

		public housepoint_3_con: eui.Group;


		public housepoint_1: eui.Image;
		public housepoint_2: eui.Image;
		public housepoint_3: eui.Image;

		// 放卡牌的容器
		public pboard_con: eui.Group;
		private selectionItems: { id: number, name: string }[] = gConst.boardItems

		// 选择你喜欢的商店
		public con_guide: eui.Image;


		public constructor() {
			super();
			this.skinName = skins.GameScene;
			// this.initBg();
			// this.initCamera(false)

			this.camera = new util.CameraMgr(this.conBg)
		}

		/**
		 * 打开场景
		 * @param {any[]} args open()传参会通过init()传过去
		 */
		public open(...args: any[]) {
			const mainView = GameMgr.mainView;

			this.init(...args);
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
		}

		/** 结束界面 */
		public end() {
			const mainView = GameMgr.mainView;

			this.isLoadRes = false;
			GameMgr.stage.removeEventListener(egret.Event.RESIZE, mainView.resizeView, mainView);
			this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
			this.removeEvent();
			gComMgr.rmEvent(this);
			this.stop();
		}

		/* =========== 框架结构代码-start =========== */
		/**
		 * 初始化
		 * @param {any[]} args open()传参会通过init()传过去
		 */
		public init(...args: any[]) {
			// console.info("init", ...args);
		}

		/** 首次打开场景时调用 */
		protected load() {
			// console.info("load");
		}

		/** 每次打开场景都会调用 */
		protected start() {
			// console.info("start");

			this.openFirst();
			this.autoEnd();

			this.updateSelectionItems()

		}

		/** 每次结束场景都会调用 */
		protected stop() {
			// console.info("stop");
		}

		/** 每帧都会调用 */
		protected update() {
			// console.info("update");
			// this.moveBg(this.bg_0);
			// this.moveBg(this.bg_1);
			// this.shadowBg();
		}

		/** 注册事件 */
		protected addEvent() {
			// console.info("addEvent");
			this.pboard_con.addEventListener(egret.TouchEvent.TOUCH_TAP, this.checkSelect, this)

			// GameMgr.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchStage, this);
			// GameMgr.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchStageStart, this);
			// GameMgr.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchStageMove, this);
			// GameMgr.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.touchStageEnd, this);
			// this.addEventListener(gConst.eventType.ONE_STEP_COMPLETE, this.openTran, this);
			// this.addEventListener(gConst.eventType.ONE_STEP_FAIL, this.playTranEnd, this);
			// this.addEventListener(gConst.eventType.UPDATE_GOLD, this.updateGold, this);
		}

		/** 移除事件 */
		protected removeEvent() {
			// console.info("removeEvent");
			this.pboard_con.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.checkSelect, this)
			// GameMgr.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchStage, this);
			// GameMgr.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchStageStart, this);
			// GameMgr.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchStageMove, this);
			// GameMgr.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.touchStageEnd, this);
			// this.removeEventListener(gConst.eventType.ONE_STEP_COMPLETE, this.openTran, this);
			// this.removeEventListener(gConst.eventType.ONE_STEP_FAIL, this.playTranEnd, this);
			// this.removeEventListener(gConst.eventType.UPDATE_GOLD, this.updateGold, this);
		}

		/** 游戏结束 */
		private gameEnd(): void {
			Mapi.gameEnd();
			// GameMgr.isEnd = true;

			this.UiFirst.updateDir(
				{
					horDir: gConst.direction.RIGHT_TOP,
					verDir: gConst.direction.CENTER_TOP
				}, {
					horDir: gConst.direction.RIGHT_TOP,
					verDir: gConst.direction.CENTER_BOTTOM
				}
			);

			this.UiFirst.gameEnd();
		}

		/**
		 * 创建组件接口
		 * @description 每次创建、重玩时调用
		 */
		public createChildren2(): void {
		}


		private hLayout: eui.HorizontalLayout
		private vLayout: eui.VerticalLayout
		/** 窗口大小改变时调用 */
		public resizeView(): void {
			// console.info("resizeView", this.width, this.height, GameMgr.screenType, GameMgr.mobileType);
			this.dispatchEventWith(gConst.eventType.RESIZE_VIEW);
			this.updataParticlesEmitter();

			const baseScale: number = gConst.mobileByScale[GameMgr.screenType][GameMgr.mobileType];

			const conBg = this.conBg;
			const con = this.con;

			let cameraOffsetY: number

			if (GameMgr.screenType == gConst.screenType.VERTICAL) {
				//竖屏
				// con.width = gConst.screen.WIDTH;
				// con.height = gConst.screen.HEIGHT;
				cameraOffsetY = 100
				if (!this.hLayout) {
					this.hLayout = new eui.HorizontalLayout()
					this.hLayout.gap = 10
				}
				this.pboard_con.layout = this.hLayout


				// this.pboard_con.

				this.con_guide.y = 0.6 * this.height
				this.con_guide.horizontalCenter = '0'

				con.y = 0.6 * this.height
				con.horizontalCenter = '0'

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
				// con.width = gConst.screen.HEIGHT;
				// con.height = gConst.screen.WIDTH;
				cameraOffsetY = -20

				if (!this.vLayout) {
					this.vLayout = new eui.VerticalLayout()
					this.vLayout.gap = 10
				}
				this.pboard_con.layout = this.vLayout


				this.con_guide.y = 0.7 * this.height
				this.con_guide.horizontalCenter = '0'

				con.y = NaN
				con.horizontalCenter = NaN
				con.right = 30

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

			// bg.scaleX = bg.scaleY = bgScale;
			const currentHousePoint = this['housepoint_' + this.currentHousePoint]

			const scaleByCamera = Math.max(this.width / 2 / this.housepoint_1.x, this.height / 2 / this.housepoint_1.y, 1)

			conBg.scaleX = conBg.scaleY = Math.max(this.width / conBg.width, this.height / conBg.height) * scaleByCamera


			this.updateCamera(conBg, { x: currentHousePoint.x, y: currentHousePoint.y + cameraOffsetY }, scaleByCamera, false)

		}


		/** 屏幕横竖屏转换时调用 */
		public rotateView() {
			// console.info("GameScene.rotateView", GameMgr.screenType);
			this.dispatchEventWith(gConst.eventType.ROTATE_VIEW);

			if (GameMgr.screenType == gConst.screenType.VERTICAL) {
				//竖屏
			} else {
				//横屏
			}
			// this.updateHandScreen();
		}

		/** 重玩游戏 */
		public replay(): void {
			this.destroy();
			GameMgr.init();
			GameMgr.gameview = new scene.GameScene();
			GameMgr.gameview.open();

			if (this.parent) {
				this.parent.addChild(GameMgr.gameview);
				this.parent.removeChild(this);
			}
			Mapi.gameRetry();
		}

		/** 销毁 */
		private destroy() {
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
		}

		/** 点击下载(用户点击下载，调用SDK函数) */
		public clickInstall(event?: egret.TouchEvent): void {
			if (event) {
				event.stopPropagation();
			}
			Mapi.install();
		}

		/** 自动结束 */
		private autoEnd() {
			const autoEndTime: number = GameMgr.getConfig("autoEndTime");
			if (autoEndTime != void 0 && autoEndTime > 0) {
				egret.clearTimeout(this.endDelay);
				this.endDelay = egret.setTimeout(this.openEnd, this, autoEndTime * 1000);
			}
		}

		/** 玩家多久未操作，结束游戏 */
		private endToNoOperation() {
			if (GameMgr.isEnd) {
				return;
			}
			if (!gGuideMgr.lastGuideFinish()) {
				return;
			}
			const endToNoOperationTimer: number = gConst.endToNoOperationTimer;
			if (endToNoOperationTimer != void 0 && endToNoOperationTimer > 0) {
				egret.clearTimeout(this.endToNoOperationDelay);
				this.endToNoOperationDelay = egret.setTimeout(this.openEndFail, this, endToNoOperationTimer);
			}
		}
		/* =========== 框架结构代码-end =========== */

		/* =========== 粒子代码-start =========== */
		private particleMgr: util.ParticleMgr;

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
		public createParticles(parent: egret.DisplayObjectContainer, resName: string[], cfgName: string, idx?: number, autoStart: boolean = true, x: number = 0, y: number = 0): number {
			if (!this.particleMgr) {
				this.particleMgr = new util.ParticleMgr(this);
			}
			return this.particleMgr.createParticles(parent, resName, cfgName, idx, autoStart, x, y);
		}

		/**
		 * 获取粒子
		 * @param {number} id 粒子ID
		 */
		public getParticle(id: number) {
			if (!this.particleMgr) {
				return;
			}
			return this.particleMgr.getParticle(id);
		}

		/**
		 * 开始播放所有粒子
		 * @param {number} duration 粒子出现总时间
		 */
		public startParticles(duration?: number) {
			if (!this.particleMgr) {
				return;
			}
			this.particleMgr.startParticles(duration);
		}

		/**
		 * 开始播放粒子
		 * @param {number} id 当前粒子ID
		 * @param {number} duration 粒子出现总时间
		 */
		public startParticle(id: number | string, duration?: number) {
			if (!this.particleMgr) {
				return;
			}
			this.particleMgr.startParticle(id, duration);
		}

		/**
		 * 停止创建所有粒子
         * @param {boolean} clear 是否清除掉现有粒子
		 */
		public stopParticles(clear?: boolean) {
			if (!this.particleMgr) {
				return;
			}
			this.particleMgr.stopParticles(clear);
		}

		/**
		 * 停止创建粒子
		 * @param {number} id 当前粒子ID
         * @param {boolean} clear 是否清除掉现有粒子
		 */
		public stopParticle(id: number | string, clear?: boolean) {
			if (!this.particleMgr) {
				return;
			}
			this.particleMgr.stopParticle(id, clear);
		}

		/**
		 * 设置所有粒子层级
		 */
		public setParticlesIndex(idx: number) {
			if (!this.particleMgr) {
				return;
			}
			this.particleMgr.setParticlesIndex(idx);
		}

		/**
		 * 更新所有粒子发射位置
		 */
		private updataParticlesEmitter() {
			if (!this.particleMgr) {
				return;
			}
			this.particleMgr.updataParticlesEmitter();
		}

		/**
		 * 设置所有粒子位置
		 */
		public setParticlesPos(x: number = 0, y: number = 0) {
			if (!this.particleMgr) {
				return;
			}
			this.particleMgr.setParticlesPos(x, y);
		}

		/**
		 * 设置所有粒子系统最大粒子数，超过该数量将不会继续创建粒子，取值范围[1,Number.MAX_VALUE]
		 * @param {number} id 当前粒子ID
		 */
		public setMaxParticles(id: number | string, max: number) {
			if (!this.particleMgr) {
				return;
			}
			this.particleMgr.setMaxParticles(id, max);
		}
		/* =========== 粒子代码-end =========== */

		/* =========== 闪烁物代码-start =========== */
		private starMgr: util.StarMgr;
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
		public showStar(con: egret.DisplayObjectContainer, starAnswers?: string[], cfg?: { intervalMax?: number, intervalMin?: number, scaleMax?: number, scaleMin?: number, isRotate?: boolean, isAdaptiveScale?: boolean, starMaxCnt?: number }) {
			if (!this.starMgr) {
				this.starMgr = new util.StarMgr(con);
			}
			this.starMgr.show(starAnswers, cfg);
		}

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
		public updateStarData(starAnswers?: string[], cfg?: { intervalMax?: number, intervalMin?: number, scaleMax?: number, scaleMin?: number, isRotate?: boolean, isAdaptiveScale?: boolean, starMaxCnt?: number }) {
			if (!this.starMgr) {
				return;
			}
			this.starMgr.updateData(starAnswers, cfg);
		}

		/**
		 * 隐藏闪烁物
		 * @param {boolean} clearAll = true 是否清除所有
		 */
		public hideStar(clearAll: boolean = true) {
			if (!this.starMgr) {
				return;
			}
			this.starMgr.hide(clearAll);
		}
		/* =========== 闪烁物代码-end =========== */

		/* =========== 漂浮物代码-start =========== */
		private floatMgr: util.FloatMgr;

		/**
		 * 显示漂浮物
		 * @param {egret.DisplayObjectContainer} con 漂浮物容器
		 * @param {...} cfg 漂浮物数据
		 */
		public showFloat(con: egret.DisplayObjectContainer, cfg?: { floatAnswers: string[], dires?: string[], speedMax?: number, speedMin?: number, rotateMax?: number, rotateMin?: number, rotateDiff?: number, alphaMax?: number, alphaMin?: number, alphaDiff?: number, scaleMax?: number, scaleMin?: number, scaleDiff?: number, isAllAlpha?: boolean, isAdaptiveScale?: boolean, floatMaxCnt?: number }) {
			if (!this.floatMgr) {
				this.floatMgr = new util.FloatMgr(con);
			}
			this.floatMgr.show(cfg);
		}

		/**
		 * 更新漂浮物数据
		 * @param {...} cfg 漂浮物数据
		 * @param {boolean} isInitDefault = true 是否初始化默认值
		 */
		public updateFloatData(cfg?: { floatAnswers: string[], dires?: string[], speedMax?: number, speedMin?: number, rotateMax?: number, rotateMin?: number, rotateDiff?: number, alphaMax?: number, alphaMin?: number, alphaDiff?: number, scaleMax?: number, scaleMin?: number, scaleDiff?: number, isAllAlpha?: boolean, isAdaptiveScale?: boolean, floatMaxCnt?: number }) {
			if (!this.floatMgr) {
				return;
			}
			this.floatMgr.updateData(cfg);
		}

		/**
		 * 隐藏漂浮物
		 * @param {boolean} clearAll = true 是否清除所有
		 */
		public hideFloat(clearAll: boolean = true) {
			if (!this.floatMgr) {
				return;
			}
			this.floatMgr.hide(clearAll);
		}
		/* =========== 漂浮物代码-end =========== */

		/* =========== 业务代码-start =========== */

		private currentHousePoint: number = 1

		private camera: util.CameraMgr;
		private initBg() {
			const con = this.con;
			const conBg = this.conBg;

			// this.extraBgS = conScene.scaleX;
			// gComMgr.setObjSize(conBg, true);
			// gComMgr.setObjSize(conScene, true);
			// this.initCamera(false)
		}

		private updateSelectionItems() {
			this.pboard_con.removeChildren()

			this.selectionItems.forEach((item, index) => {
				if (index < 3) {
					const board: eui.Image = new eui.Image()
					const boardContainer: eui.Group = new eui.Group()
					board.name = item.name
					board.source = 'pboard_' + item.id + '_png'
					boardContainer.addChild(board)
					gComMgr.setItemAnchor(board)
					this.pboard_con.addChild(boardContainer)
					board.visible = false;
					gTween.toBigShow(board, 500, 1, 1, egret.Ease.backOut)
				}
			})
			this.pboard_con.addEventListener(egret.TouchEvent.TOUCH_TAP, this.checkSelect, this)
			gTween.toTopShow(this.con_guide, 300, 30, void 0, 1)
			this.showGuide()
		}

		private findBoard(name: string) {
			for (let i = 0; i < this.selectionItems.length; i++) {
				if (this.selectionItems[i].name === name) {
					this.selectionItems.splice(i, 1)
				}
			}
		}

		private checkSelect(event: egret.TouchEvent) {
			if (event.type === egret.TouchEvent.TOUCH_TAP) {
				if (!event.target.name) return
				console.log(event.target.name);
				this.pboard_con.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.checkSelect, this)
				const boardName = event.target.name
				this.findBoard(boardName)
				gSoundMgr.playEff('smselect')
				this.hideGuide()
				gTween.toBottomHide(this.con_guide, 300, 30, void 0, 1, egret.Ease.backOut)
				this.pboard_con.$children.forEach(child => {
					const board = child.$children[0]
					if (board.name === boardName) {
						gSoundMgr.playEff('smbuilding')
						gTween.toScale(board, 0.8, 200, 1, void 0, void 0, {
							callback: () => {
								this.buildHouse(boardName)
								gTween.toScale(board, 1, 200, 0.8, void 0, { duration: 200 }, {
									callback: () => {
										board.alpha = 1
										// 建造房子
										gTween.fadeOut(board, 300, 1, void 0, void 0, {
											callback: () => {
												board.alpha = 1
												board.visible = false
												egret.setTimeout(() => {
													if (this.currentHousePoint < 3) {
														this.currentHousePoint++
														this.moveToNextHouse()
													} else {
														this.openEnd()
													}
												}, this, 1200)
											}
										})
									}
								})
							}
						})
					} else {
						gTween.fadeOut(board, 300, 1)
					}
				})

			}
		}

		private moveToNextHouse() {
			const currentHousePoint = this['housepoint_' + this.currentHousePoint]
			// this.updateCamera(this.conBg, { x: currentHousePoint.x, y: currentHousePoint.y }, void 0, true)
			this.camera.upCamera(true, { x: currentHousePoint.x, y: currentHousePoint.y }, void 0, () => {
				this.updateSelectionItems()
			})
		}

		private buildHouse(boardName: string) {

			const currentHousePoint = this['housepoint_' + this.currentHousePoint]
			gTween.fadeOut(currentHousePoint, 300)
			const currentHousePoint_con = this['housepoint_' + this.currentHousePoint + '_con']
			let bone = new com.ComBones()
			bone.setData(currentHousePoint_con, boardName)
			bone.play('newAnimation')
		}

		private updateCamera(scene: egret.DisplayObject, target: { x: number, y: number }, scale: number, isAni: boolean = false) {
			if (!this.camera) {
				this.camera = new util.CameraMgr(scene)
			}
			this.camera.upCamera(isAni, target, scale)
		}

		// private lookYRatio: number;
		// private lookXRatio: number;

		// private initCamera(isAni: boolean = true) {
		// 	this.camera = new util.CameraMgr(this.conBg);

		// 	if (!this.camera) {
		// 		return;
		// 	}

		// 	this.camera.upCamera(false, { x: this.housepoint_1.x, y: this.housepoint_1.y })

		// }

		private isGameStar: boolean;
		private gameStared: boolean;

		private gameStart() {
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

			const currHouseId = GameMgr.currHouseId;
			if (currHouseId > GameMgr.maxCanBuildId) {
				// this.hideGuide();
				// this.openTran();
				egret.setTimeout(this.openTran, this, 1000);
				this.startPartilcle(Math.max(currHouseId - 1, 0));
			} else {
				this.showGuide();
				if (currHouseId != 0) {
					// gCar.updatePos();
					if (currHouseId == 1) {
						GameMgr.gold += gConst.firstAddGold; //首次弹窗获得金币数
						// this.updateGold(null, gConst.firstAddGold);
					}
					this.startPartilcle(Math.max(currHouseId - 1, 0));
				}
			}

		}

		private hasUiFirstLogo() {
			return this.UiFirst && this.UiFirst.parent && this.UiFirst.conLogo && this.UiFirst.conLogo.parent
		}

		private readonly goldSpace = 10;

		private resizeUiFirst(event: egret.Event) {
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
		}


		/** 打开顶层页面 */
		private openFirst() {
			this.UiFirst = gUiMgr.create(ui.UiFirst) as ui.UiFirst;
			this.UiFirst.addEventListener(gConst.eventType.RESIZE_VIEW, this.resizeUiFirst, this);
			this.UiFirst.open(
				{
					horDir: gConst.direction.LEFT_TOP,
					verDir: gConst.direction.CENTER_TOP
				}, {
					horDir: gConst.direction.CENTER_BOTTOM,
					verDir: gConst.direction.CENTER_BOTTOM
				}
			);
		}

		/** 关闭顶层页面 */
		private closeFirst() {
			if (!this.UiFirst) {
				return;
			}
			this.UiFirst.removeEventListener(gConst.eventType.RESIZE_VIEW, this.resizeUiFirst, this);
			this.UiFirst.close();
		}

		private openStarted: boolean;

		/** 打开启动页面 */
		private openStart(chatId: number = 1) {
			if (this.openStarted) {
				return;
			}
			this.openStarted = true;
			this.hideGuide();
			this.UiStart = gUiMgr.create(ui.UiStart) as ui.UiStart;
			// this.UiStart.once(gConst.eventType.IN_COMPLETE, () => {
			// 	this.isGameStar = true;
			// }, this);
			// this.UiStart.addEventListener(gConst.eventType.TOUCH_TAP, this.clickItem, this);
			this.UiStart.once(gConst.eventType.CLOSE, this.gameStart, this);
			this.UiStart.open(chatId);

			if (chatId == 3) {
				return;
			}
			if (GameMgr.screenType == gConst.screenType.HORIZONTAL) {
				// this.conGold.visible = false;

				const UiFirst = this.UiFirst;
				let conLogo: eui.Group;
				if (UiFirst) {
					conLogo = UiFirst.conLogo;
				}

				if (conLogo) {
					conLogo.visible = false;
				}
			}
		}

		/** 关闭启动页面 */
		private closeStart() {
			// if (!this.openStarted) {
			// 	return;
			// }
			// this.openStarted = false;
			if (!this.UiStart) {
				return;
			}
			this.UiStart.hide(void 0, true);
		}

		/** 打开过场页面 */
		private openTran(event?: egret.Event) {
			if (GameMgr.isEnd) {
				return;
			}
			this.UiTran = gUiMgr.create(ui.UiTran) as ui.UiTran;
			// this.UiTran.once(gConst.eventType.IN_COMPLETE, this.nextScene, this);
			this.UiTran.once(gConst.eventType.CLOSE, this.playTranEnd, this);
			this.UiTran.open();

			// gSoundMgr.playEff("smvip");
		}

		/** 关闭过场页面 */
		private closeTran() {
			if (!this.UiTran) {
				return;
			}
			this.UiTran.close();
		}

		private openChatDelay: number;
		private isOpenChat: boolean = true;

		/** 打开对话页面 */
		private openChat(/*id?: number*/) {
			if (GameMgr.isEnd) {
				return;
			}
			this.UiChat = gUiMgr.create(ui.UiChat) as ui.UiChat;
			this.UiChat.open(/*id*/);
		}

		/** 关闭对话页面 */
		private closeChat() {
			egret.clearTimeout(this.openChatDelay);
			this.isOpenChat = false;
			if (!this.UiChat) {
				return;
			}
			this.UiChat.close();
		}

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
		private openCongrats() {
			// console.info("openCongrats");
			// gTween.fadeIn(this.black, 300, 0.5);
			this.UiCongrats = gUiMgr.create(ui.UiCongrats) as ui.UiCongrats;
			// this.UiCongrats.once(gConst.eventType.CLOSE, this.nextPass, this);
			// this.UiCongrats.once(gConst.eventType.GAME_END, this.gameEnd, this);
			this.UiCongrats.open();
			gSoundMgr.playEff("sm_success");
		}

		/** 关闭恭喜页面 */
		private closeCongrats() {
			if (!this.UiCongrats) {
				return;
			}
			this.UiCongrats.close();
		}

		// private allFastPlay() {
		// 	this.comHouses.forEach((house) => {
		// 		house.fastPlay();
		// 	});
		// }

		// private allStopPlay() {
		// 	this.comHouses.forEach((house) => {
		// 		house.stopPlay();
		// 	});
		// }

		private playTranEnded: boolean;

		private playTranEnd(event?: egret.Event) {
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

			egret.setTimeout(() => {
				this.openTranEnd(/*data*/);
			}, this, gConst.victoryInEndTimer);
			// this.openTranEnd();
		}

		/** 打开结束过场页面 */
		private openTranEnd(/*data: { isReplay: boolean }*/) {
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
		}

		/** 关闭结束过场页面 */
		private closeTranEnd() {
			if (!this.UiTranEnd) {
				return;
			}
			this.UiTranEnd.close();
		}

		/** 打开结束界面 */
		private openEnd(isShowEnd: boolean = true) {
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

			this.UiFirst.close()

			this.UiEnd = gUiMgr.create(ui.UiEnd) as ui.UiEnd;
			this.UiEnd.hide();
			this.UiEnd.open();
			gTween.fadeIn(this.UiEnd, 300, 1)
			// gTween.fadeOut(this.conBg, 300, 1)
			// gTween.fadeOut(this.con, 300, 1)
			this.conBg.visible = false
			this.con.visible = false

			// egret.setTimeout(this.showEnd, this, 500);

			// GameMgr.endType = gConst.endType.VICTORY;
			// this.showHead();
			// this.comPanel.stopBar();
			// this.allStopPlay();

			Mapi.gameEnd();

			if (isShowEnd) {
				this.showEnd();
			}
		}

		/** 显示结束界面 */
		public showEnd() {
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
		}

		/** 结束界面其它元素展示 */
		public showEndOther() {
			// console.info("showEndOther");
			if (!this.UiEnd) {
				return;
			}
			this.UiEnd.showOther();
		}

		/** 关闭结束界面 */
		private closeEnd() {
			if (!this.UiEnd) {
				return;
			}
			this.UiEnd.close();
		}

		/** 打开结束界面（失败） */
		public openEndFail() {
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
		}

		/** 显示结束界面（失败） */
		public showEndFail() {
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

			this.UiFirst.updateDir(
				{
					horDir: gConst.direction.RIGHT_TOP,
					verDir: gConst.direction.CENTER_TOP
				}, {
					horDir: gConst.direction.RIGHT_TOP,
					verDir: gConst.direction.CENTER_TOP
				}
			);

			this.showEndFailOther();
		}

		/** 结束界面（失败）其它元素展示 */
		public showEndFailOther() {
			// console.info("showEndFailOther");
			if (!this.UiEndFail) {
				return;
			}
			this.UiEndFail.showOther();
		}

		/** 关闭结束界面（失败） */
		private closeEndFail() {
			if (!this.UiEndFail) {
				return;
			}
			this.UiEndFail.close();
		}



		private hand: com.ComBones;


		/** 隐藏遮罩，及指引对话 */
		// private hideMask() {
		// 	if (!this.showMsked) {
		// 		return;
		// 	}
		// 	this.showMsked = false;
		// 	egret.clearTimeout(this.showMskDelay);
		// 	const guidemsk = this.guideBlack;
		// 	gTween.fadeOut(guidemsk, 300, 1);
		// }

		/** 隐藏指引头像 */
		// private hideHead() {
		// 	if (!this.showHeaded) {
		// 		return;
		// 	}
		// 	this.showHeaded = false;
		// 	egret.clearTimeout(this.showHeadDelay);
		// 	const head = this.head;
		// 	const conHead = this.conHead;
		// 	gTween.fadeOut(conHead, 300, 1);
		// 	head.playIdle();
		// }

		/** 隐藏指引冒泡对话 */
		// private hideBubble() {
		// 	if (!this.showBubbled) {
		// 		return;
		// 	}
		// 	this.showBubbled = false;
		// 	egret.clearTimeout(this.showBubbleDelay);
		// 	const conBubble = this.conBubble;
		// 	gTween.hideBubble(conBubble, 300, { orgS: 1, orgA: 1 });
		// }

		/** 创建挖空遮罩 */
		private lightMask: com.ComLightMask; //挖空遮罩组件
		private createMask(): void {
			let lightMask = this.lightMask = new com.ComLightMask();
			this.addChild(lightMask);
			lightMask.visible = false;
		}

		private updateMask(): boolean {
			const lightMask = this.lightMask;
			if (!lightMask) {
				return;
			}
			// if (!lightMask.visible) {
			// 	return;
			// }
			if (!this.isShowMask) {
				return;
			}

			const maskParent = lightMask.parent;
			if (!maskParent) {
				return;
			}

			const obj = gGuideMgr.guideObj;
			if (!obj) {
				return;
			}

			const target = (obj as com.ComChat).chat;

			lightMask.setMaskSize(this.width, this.height, .5);

			const baseScale: number = gConst.mobileByScale[GameMgr.screenType][GameMgr.mobileType];
			const w = target.width * baseScale;
			const h = target.height * baseScale;
			lightMask.setLightSize(w, 1, h, 70);

			let pos = this.retObjPos(target, maskParent);
			lightMask.setLightPos(pos.x - w / 2, pos.y - h / 2);
			return true;
		}

		private retObjPos(obj: egret.DisplayObject | egret.DisplayObjectContainer, parent: egret.DisplayObjectContainer): egret.Point {
			if (!obj || !parent) {
				return;
			}
			const baseScale: number = gConst.mobileByScale[GameMgr.screenType][GameMgr.mobileType];
			let pos = gComMgr.toGlobal(obj);
			const x = pos.x + (obj.width / 2 - obj.anchorOffsetX) * obj.scaleX * baseScale;
			const y = pos.y + (obj.height / 2 - obj.anchorOffsetY) * obj.scaleY * baseScale;
			pos = gComMgr.toLocal(parent, x, y, pos);
			return pos;
		}

		private showMasked: boolean;
		private showMaskDelay: number;
		private guideWord: eui.Image;
		private isShowMask: boolean;

		/** 显示遮罩 */
		private showMask(inCallBack?: Function, inThisObj?: any, outCallBack?: Function, outThisObj?: any) {
			if (this.showMasked) {
				return;
			}
			const lightMask = this.lightMask;

			if (!lightMask) {
				return
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
		}

		/** 隐藏遮罩 */
		private hideMask() {
			if (!this.showMasked) {
				return;
			}

			const lightMask = this.lightMask;

			if (!lightMask) {
				return
			}

			this.showMasked = false;
			this.isShowMask = false;
			gTween.fadeOut(lightMask, 200);

			const word = this.guideWord;
			if (!word || !word.parent) {
				return;
			}
			gTween.fadeOut(word, 200);
		}

		private guide_pos: eui.Image; //引导的点
		private guide: com.ComGuide; //引导组件
		private showGuided: boolean; //引导显示状态
		private showMsked: boolean; //引导遮罩显示状态
		private showHeaded: boolean; //引导头像显示状态
		private showBubbled: boolean; //引导冒泡显示状态

		// private light: com.ComLight;
		// private showLightDelay: number;
		// private showMskDelay: number;
		// private showHeadDelay: number;
		// private showBubbleDelay: number; 

		private currGuidePropsType: gConst.propsType;

		/** 显示引导 */
		public showGuide() {
			if (this.showGuided) {
				return
			}
			this.showGuided = true
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

			this.guide.updateData({ targetArg: { target1: this.pboard_con.$children[0], target2: this.pboard_con.$children[1], target3: this.pboard_con.$children[2] } })

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
		}

		/** 隐藏引导 */
		public hideGuide() {
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
		}

		private particleId0: number;
		private startPartilcled: boolean;
		private stopPartilcled: boolean;
		private particleDelay: number;
		private particleInterval: number = 6000;
		private particleByHouseId: number;

		private startPartilcle(id: number) {
			this.particleByHouseId = id;
			const scale = GameMgr.isVip ? gConst.vipPartilcleTimeScale : 1;
			this.updateParticles();
			egret.clearInterval(this.particleDelay);
			this.particleDelay = egret.setInterval(this.updateParticles, this, this.particleInterval / scale);
		}

		private stopPartilcle() {
			this.stopPartilcled = true;
			egret.clearInterval(this.particleDelay);
		}

		/** 更新粒子 */
		private updateParticles() {
			this.startPartilcled = true;
			if (this.stopPartilcled) {
				return;
			}

			const id = this.particleByHouseId;
			if (id == GameMgr.maxHourseId) {
				return;
			}

			const cfgName = "make";
			let duration = 1000;
			let particleId0 = this.particleId0;

			// const conParticles = this.conParticles;

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
			// particleId0 =/* this.particleId0 =*/ this.createParticles(conParticles, resName, cfgName, void 0, false);
			// }

			const cfg = RES.getRes(`${cfgName}_json`);
			let maxParticles = 30;
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
		}

		/** 展示粒子 */
		// private showParticles(event: egret.Event) {
		// 	const resName: string[] = event.data;
		// 	const particleId_0 = this.createParticles(this.conParticles, ["p_streamer1", "p_streamer2", "p_streamer3", "p_streamer4", "p_streamer5", "p_streamer6", "p_streamer7", "p_streamer8"], "p_streamer", void 0, false);
		// 	this.startParticle(particleId_0, 1000);
		// }
		/* =========== 业务代码-end =========== */
	}
}