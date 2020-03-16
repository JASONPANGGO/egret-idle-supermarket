namespace util {
    /**
     * 小车组件管理器
     */
    export class CarMgr {

        birthPos: number[][] = [];
        diePos: number[][] = [];
        allPos: number[][] = [];

        private _config: {} = {
            "0": {
                x: 1120,
                y: -161,
                dir: gConst.aiDir.LEFT_BOTTOM
            },
            "100": {
                x: 154,
                y: 390,
                dir: gConst.aiDir.RIGHT_BOTTOM
            },
            "101": {
                x: 772,
                y: 760,
                dir: gConst.aiDir.LEFT_BOTTOM
            },
            "102": {
                x: 296,
                y: 1092,
                dir: gConst.aiDir.RIGHT_BOTTOM
            },
            "103": {
                x: 882,
                y: 1462,
                dir: gConst.aiDir.RIGHT_BOTTOM
            },
        };

        private carPosCfg: Object = {
            "0": {
                "birthPos": [[0, 0], [0, 1], [0, 2], [1, 2]], //出生点
                "diePos": [[0, 0], [0, 1], [0, 2], [1, 2]], //死亡点
                "allPos": [[0, 0], [1, 0], [0, 1], [1, 1], [0, 2], [1, 2]] //所有点
            },
            "1": {
                "birthPos": [[2, 2]], //出生点
                "diePos": [[2, 2]], //死亡点
                "allPos": [[2, 0], [2, 1], [2, 2]] //所有点
            },
            "2": {
                "birthPos": [[3, 2]], //出生点
                "diePos": [[3, 2]], //死亡点
                "allPos": [[3, 0], [3, 1], [3, 2]] //所有点
            },
            "3": {
                "birthPos": [], //出生点
                "diePos": [], //死亡点
                "allPos": [] //所有点
            }
        }; //车子定点配置

        public readonly maxRow: number = 4;
        public readonly maxCol: number = 3;

        public constructor() {

        }

        updatePos() {
            this.updateBirthPos();
            this.updateDiePos();
            this.updateAllPos();
        }

        private updateBirthPos() {
            let id = GameMgr.currHouseId;
            if (id > 1) {
                id--;
            }
            const birthPos = this.getBirthPos(id);
            if (!birthPos || birthPos.length == 0) {
                return;
            }
            if (this.birthPos.length == 0) {
                this.birthPos = birthPos;
            } else {
                this.birthPos = this.birthPos.concat(birthPos);
            }
        }

        private updateDiePos() {
            let id = GameMgr.currHouseId;
            if (id > 1) {
                id--;
            }
            const diePos = this.getDiePos(id);
            if (!diePos || diePos.length == 0) {
                return;
            }
            if (this.diePos.length == 0) {
                this.diePos = diePos;
            } else {
                this.diePos = this.diePos.concat(diePos);
            }
        }

        private updateAllPos() {
            let id = GameMgr.currHouseId;
            // if (id > 1) {
            //     id--;
            // }
            const allPos = this.getAllPos(id);
            if (!allPos || allPos.length == 0) {
                return;
            }
            if (this.allPos.length == 0) {
                this.allPos = allPos;
            } else {
                this.allPos = this.allPos.concat(allPos);
            }
        }

        getBirthPos(id: number): number[][] {
            const cfg: { birthPos: number[][] } = this.carPosCfg[id];
            if (!cfg) {
                return;
            }
            return cfg.birthPos;
        }

        getDiePos(id: number): number[][] {
            const cfg: { diePos: number[][] } = this.carPosCfg[id];
            if (!cfg) {
                return;
            }
            return cfg.diePos;
        }

        getAllPos(id: number): number[][] {
            const cfg: { allPos: number[][] } = this.carPosCfg[id];
            if (!cfg) {
                return;
            }
            return cfg.allPos;
        }

        getPos(posId: number): { x: number, y: number, dir: gConst.aiDir } {
            return this._config[posId];
        }

        private hasPosId(posId: number): boolean {
            return this.getPos(posId) != void 0;
        }

        getMaxId(posId: number): number {
            // const hundred: number = Math.floor(posId / 100);
            return 105 //hundred === 1 ? 105 : 205;
        }

        getNextPosId(posId: number) {
            if (!this.hasPosId(posId)) {
                return;
            }
            if (posId === 0) {
                return 100 //gMath.getRandomAnswer(100, 200);
            }
            let maxId: number = this.getMaxId(posId);
            if (posId < maxId) {
                return posId + 1;
            }
        }

        private _aiPool: com.ComCar[] = [];

        createAi() {
            let ai: com.ComCar;
            if (this._aiPool && this._aiPool.length > 0) {
                ai = this._aiPool.shift();
            } else {
                ai = new com.ComCar();
            }
            return ai;
        }

        removeAi(ai: com.ComCar) {
            gTween.rmTweens(ai);
            gComMgr.rmObj(ai);
            this._aiPool.push(ai);
        }
    }
}