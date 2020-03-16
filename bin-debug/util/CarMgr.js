var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var util;
(function (util) {
    /**
     * 小车组件管理器
     */
    var CarMgr = (function () {
        function CarMgr() {
            this.birthPos = [];
            this.diePos = [];
            this.allPos = [];
            this._config = {
                "0": {
                    x: 1120,
                    y: -161,
                    dir: 0 /* LEFT_BOTTOM */
                },
                "100": {
                    x: 154,
                    y: 390,
                    dir: 2 /* RIGHT_BOTTOM */
                },
                "101": {
                    x: 772,
                    y: 760,
                    dir: 0 /* LEFT_BOTTOM */
                },
                "102": {
                    x: 296,
                    y: 1092,
                    dir: 2 /* RIGHT_BOTTOM */
                },
                "103": {
                    x: 882,
                    y: 1462,
                    dir: 2 /* RIGHT_BOTTOM */
                },
            };
            this.carPosCfg = {
                "0": {
                    "birthPos": [[0, 0], [0, 1], [0, 2], [1, 2]],
                    "diePos": [[0, 0], [0, 1], [0, 2], [1, 2]],
                    "allPos": [[0, 0], [1, 0], [0, 1], [1, 1], [0, 2], [1, 2]] //所有点
                },
                "1": {
                    "birthPos": [[2, 2]],
                    "diePos": [[2, 2]],
                    "allPos": [[2, 0], [2, 1], [2, 2]] //所有点
                },
                "2": {
                    "birthPos": [[3, 2]],
                    "diePos": [[3, 2]],
                    "allPos": [[3, 0], [3, 1], [3, 2]] //所有点
                },
                "3": {
                    "birthPos": [],
                    "diePos": [],
                    "allPos": [] //所有点
                }
            }; //车子定点配置
            this.maxRow = 4;
            this.maxCol = 3;
            this._aiPool = [];
        }
        CarMgr.prototype.updatePos = function () {
            this.updateBirthPos();
            this.updateDiePos();
            this.updateAllPos();
        };
        CarMgr.prototype.updateBirthPos = function () {
            var id = GameMgr.currHouseId;
            if (id > 1) {
                id--;
            }
            var birthPos = this.getBirthPos(id);
            if (!birthPos || birthPos.length == 0) {
                return;
            }
            if (this.birthPos.length == 0) {
                this.birthPos = birthPos;
            }
            else {
                this.birthPos = this.birthPos.concat(birthPos);
            }
        };
        CarMgr.prototype.updateDiePos = function () {
            var id = GameMgr.currHouseId;
            if (id > 1) {
                id--;
            }
            var diePos = this.getDiePos(id);
            if (!diePos || diePos.length == 0) {
                return;
            }
            if (this.diePos.length == 0) {
                this.diePos = diePos;
            }
            else {
                this.diePos = this.diePos.concat(diePos);
            }
        };
        CarMgr.prototype.updateAllPos = function () {
            var id = GameMgr.currHouseId;
            // if (id > 1) {
            //     id--;
            // }
            var allPos = this.getAllPos(id);
            if (!allPos || allPos.length == 0) {
                return;
            }
            if (this.allPos.length == 0) {
                this.allPos = allPos;
            }
            else {
                this.allPos = this.allPos.concat(allPos);
            }
        };
        CarMgr.prototype.getBirthPos = function (id) {
            var cfg = this.carPosCfg[id];
            if (!cfg) {
                return;
            }
            return cfg.birthPos;
        };
        CarMgr.prototype.getDiePos = function (id) {
            var cfg = this.carPosCfg[id];
            if (!cfg) {
                return;
            }
            return cfg.diePos;
        };
        CarMgr.prototype.getAllPos = function (id) {
            var cfg = this.carPosCfg[id];
            if (!cfg) {
                return;
            }
            return cfg.allPos;
        };
        CarMgr.prototype.getPos = function (posId) {
            return this._config[posId];
        };
        CarMgr.prototype.hasPosId = function (posId) {
            return this.getPos(posId) != void 0;
        };
        CarMgr.prototype.getMaxId = function (posId) {
            // const hundred: number = Math.floor(posId / 100);
            return 105; //hundred === 1 ? 105 : 205;
        };
        CarMgr.prototype.getNextPosId = function (posId) {
            if (!this.hasPosId(posId)) {
                return;
            }
            if (posId === 0) {
                return 100; //gMath.getRandomAnswer(100, 200);
            }
            var maxId = this.getMaxId(posId);
            if (posId < maxId) {
                return posId + 1;
            }
        };
        CarMgr.prototype.createAi = function () {
            var ai;
            if (this._aiPool && this._aiPool.length > 0) {
                ai = this._aiPool.shift();
            }
            else {
                ai = new com.ComCar();
            }
            return ai;
        };
        CarMgr.prototype.removeAi = function (ai) {
            gTween.rmTweens(ai);
            gComMgr.rmObj(ai);
            this._aiPool.push(ai);
        };
        return CarMgr;
    }());
    util.CarMgr = CarMgr;
    __reflect(CarMgr.prototype, "util.CarMgr");
})(util || (util = {}));
//# sourceMappingURL=CarMgr.js.map