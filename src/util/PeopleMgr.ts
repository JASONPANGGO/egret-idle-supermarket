namespace util {
    /**
     * 人物组件管理器
     */
    export class PeopleMgr {

        birthPos: number[][] = [];
        diePos: number[][] = [];
        allPos: number[][] = [];

        private _config: {} = {
            "0": {
                x: 1220,
                y: -82,
                dir: gConst.aiDir.LEFT_BOTTOM
            },
            "100": {
                x: 350,
                y: 440,
                dir: gConst.aiDir.RIGHT_BOTTOM
            },
            "101": {
                x: 520,
                y: 550,
                dir: gConst.aiDir.RIGHT_BOTTOM
            },
            "102": {
                x: 770,
                y: 690,
                dir: gConst.aiDir.RIGHT_BOTTOM
            },
            "103": {
                x: 908,
                y: 820,
                dir: gConst.aiDir.LEFT_BOTTOM
            },
            "104": {
                x: 420,
                y: 1120,
                dir: gConst.aiDir.RIGHT_BOTTOM
            },
            "105": {
                x: 990,
                y: 1460,
                dir: gConst.aiDir.RIGHT_BOTTOM
            },
            "200": {
                x: 260,
                y: 490,
                dir: gConst.aiDir.RIGHT_BOTTOM
            },
            "201": {
                x: 440,
                y: 600,
                dir: gConst.aiDir.RIGHT_BOTTOM
            },
            "202": {
                x: 690,
                y: 740,
                dir: gConst.aiDir.RIGHT_BOTTOM
            },
            "203": {
                x: 810,
                y: 850,
                dir: gConst.aiDir.LEFT_BOTTOM
            },
            "204": {
                x: 306,
                y: 1092,
                dir: gConst.aiDir.RIGHT_BOTTOM
            },
            "205": {
                x: 840,
                y: 1460,
                dir: gConst.aiDir.RIGHT_BOTTOM
            },
        };

        private peoplePosCfg: Object = {
            "0": {
                "birthPos": [[1, 0]], //出生点
                "diePos": [[1, 0]], //死亡点
                "allPos": [[0, 0], [1, 0], [0, 1], [1, 1]] //所有点
            },
            "1": {
                "birthPos": [[1, 0]], //出生点
                "diePos": [[1, 0]], //死亡点
                "allPos": [[0, 0], [1, 0], [0, 1], [1, 1]] //所有点
            },
            "2": {
                "birthPos": [[1, 0]], //出生点
                "diePos": [[1, 0]], //死亡点
                "allPos": [[0, 0], [1, 0], [0, 1], [1, 1]] //所有点
            },
            "3": {
                "birthPos": [[1, 0]], //出生点
                "diePos": [[1, 0]], //死亡点
                "allPos": [[0, 0], [1, 0], [0, 1], [1, 1]] //所有点
            }
        }; //人物定点配置

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
            const cfg: { birthPos: number[][] } = this.peoplePosCfg[id];
            if (!cfg) {
                return;
            }
            return cfg.birthPos;
        }

        getDiePos(id: number): number[][] {
            const cfg: { diePos: number[][] } = this.peoplePosCfg[id];
            if (!cfg) {
                return;
            }
            return cfg.diePos;
        }

        getAllPos(id: number): number[][] {
            const cfg: { allPos: number[][] } = this.peoplePosCfg[id];
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

        private _aiPool: com.ComPeople[] = [];

        createAi() {
            let ai: com.ComPeople;
            if (this._aiPool && this._aiPool.length > 0) {
                ai = this._aiPool.shift();
            } else {
                ai = new com.ComPeople();
            }
            return ai;
        }

        removeAi(ai: com.ComPeople) {
            gTween.rmTweens(ai);
            gComMgr.rmObj(ai);
            this._aiPool.push(ai);
        }
    }
}