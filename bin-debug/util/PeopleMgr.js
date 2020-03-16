var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var util;
(function (util) {
    /**
     * 人物组件管理器
     */
    var PeopleMgr = (function () {
        function PeopleMgr() {
            this.birthPos = [];
            this.diePos = [];
            this.allPos = [];
            this._config = {
                "0": {
                    x: 1220,
                    y: -82,
                    dir: 0 /* LEFT_BOTTOM */
                },
                "100": {
                    x: 350,
                    y: 440,
                    dir: 2 /* RIGHT_BOTTOM */
                },
                "101": {
                    x: 520,
                    y: 550,
                    dir: 2 /* RIGHT_BOTTOM */
                },
                "102": {
                    x: 770,
                    y: 690,
                    dir: 2 /* RIGHT_BOTTOM */
                },
                "103": {
                    x: 908,
                    y: 820,
                    dir: 0 /* LEFT_BOTTOM */
                },
                "104": {
                    x: 420,
                    y: 1120,
                    dir: 2 /* RIGHT_BOTTOM */
                },
                "105": {
                    x: 990,
                    y: 1460,
                    dir: 2 /* RIGHT_BOTTOM */
                },
                "200": {
                    x: 260,
                    y: 490,
                    dir: 2 /* RIGHT_BOTTOM */
                },
                "201": {
                    x: 440,
                    y: 600,
                    dir: 2 /* RIGHT_BOTTOM */
                },
                "202": {
                    x: 690,
                    y: 740,
                    dir: 2 /* RIGHT_BOTTOM */
                },
                "203": {
                    x: 810,
                    y: 850,
                    dir: 0 /* LEFT_BOTTOM */
                },
                "204": {
                    x: 306,
                    y: 1092,
                    dir: 2 /* RIGHT_BOTTOM */
                },
                "205": {
                    x: 840,
                    y: 1460,
                    dir: 2 /* RIGHT_BOTTOM */
                },
            };
            this.peoplePosCfg = {
                "0": {
                    "birthPos": [[1, 0]],
                    "diePos": [[1, 0]],
                    "allPos": [[0, 0], [1, 0], [0, 1], [1, 1]] //所有点
                },
                "1": {
                    "birthPos": [[1, 0]],
                    "diePos": [[1, 0]],
                    "allPos": [[0, 0], [1, 0], [0, 1], [1, 1]] //所有点
                },
                "2": {
                    "birthPos": [[1, 0]],
                    "diePos": [[1, 0]],
                    "allPos": [[0, 0], [1, 0], [0, 1], [1, 1]] //所有点
                },
                "3": {
                    "birthPos": [[1, 0]],
                    "diePos": [[1, 0]],
                    "allPos": [[0, 0], [1, 0], [0, 1], [1, 1]] //所有点
                }
            }; //人物定点配置
            this.maxRow = 4;
            this.maxCol = 3;
            this._aiPool = [];
        }
        PeopleMgr.prototype.updatePos = function () {
            this.updateBirthPos();
            this.updateDiePos();
            this.updateAllPos();
        };
        PeopleMgr.prototype.updateBirthPos = function () {
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
        PeopleMgr.prototype.updateDiePos = function () {
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
        PeopleMgr.prototype.updateAllPos = function () {
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
        PeopleMgr.prototype.getBirthPos = function (id) {
            var cfg = this.peoplePosCfg[id];
            if (!cfg) {
                return;
            }
            return cfg.birthPos;
        };
        PeopleMgr.prototype.getDiePos = function (id) {
            var cfg = this.peoplePosCfg[id];
            if (!cfg) {
                return;
            }
            return cfg.diePos;
        };
        PeopleMgr.prototype.getAllPos = function (id) {
            var cfg = this.peoplePosCfg[id];
            if (!cfg) {
                return;
            }
            return cfg.allPos;
        };
        PeopleMgr.prototype.getPos = function (posId) {
            return this._config[posId];
        };
        PeopleMgr.prototype.hasPosId = function (posId) {
            return this.getPos(posId) != void 0;
        };
        PeopleMgr.prototype.getMaxId = function (posId) {
            // const hundred: number = Math.floor(posId / 100);
            return 105; //hundred === 1 ? 105 : 205;
        };
        PeopleMgr.prototype.getNextPosId = function (posId) {
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
        PeopleMgr.prototype.createAi = function () {
            var ai;
            if (this._aiPool && this._aiPool.length > 0) {
                ai = this._aiPool.shift();
            }
            else {
                ai = new com.ComPeople();
            }
            return ai;
        };
        PeopleMgr.prototype.removeAi = function (ai) {
            gTween.rmTweens(ai);
            gComMgr.rmObj(ai);
            this._aiPool.push(ai);
        };
        return PeopleMgr;
    }());
    util.PeopleMgr = PeopleMgr;
    __reflect(PeopleMgr.prototype, "util.PeopleMgr");
})(util || (util = {}));
//# sourceMappingURL=PeopleMgr.js.map