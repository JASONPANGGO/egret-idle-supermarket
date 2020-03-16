var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var util;
(function (util) {
    /**
     * 卡牌组件管理器
     */
    var CardMgr = (function () {
        function CardMgr() {
        }
        // getPos(posId: number): { x: number, y: number, dir: gConst.aiDir } {
        //     return this._config[posId];
        // }
        // private hasPosId(posId: number): boolean {
        //     return this.getPos(posId) != void 0;
        // }
        CardMgr.prototype.getMaxId = function (posId) {
            // const hundred: number = Math.floor(posId / 100);
            return 105; //hundred === 1 ? 105 : 205;
        };
        CardMgr.createAi = function () {
            var ai;
            if (this._aiPool && this._aiPool.length > 0) {
                ai = this._aiPool.shift();
            }
            else {
                ai = new com.ComCard();
            }
            return ai;
        };
        CardMgr.removeAi = function (ai) {
            gTween.rmTweens(ai);
            gComMgr.rmObj(ai);
            this._aiPool.push(ai);
        };
        return CardMgr;
    }());
    /** 牌堆 */
    CardMgr.pile = [
        [
            -1,
            -1,
            new data.CardData(10, 3 /* PLUM_BLOSSOM */),
            new data.CardData(11, 3 /* PLUM_BLOSSOM */),
        ],
        [
            -1,
            new data.CardData(3, 3 /* PLUM_BLOSSOM */),
            new data.CardData(8, 3 /* PLUM_BLOSSOM */),
            new data.CardData(12, 3 /* PLUM_BLOSSOM */),
        ],
        [
            new data.CardData(3, 3 /* PLUM_BLOSSOM */, true),
            new data.CardData(4, 3 /* PLUM_BLOSSOM */, true),
            new data.CardData(6, 3 /* PLUM_BLOSSOM */, true),
            new data.CardData(13, 3 /* PLUM_BLOSSOM */, true),
        ]
    ];
    /** 底牌 */
    CardMgr.cards = [new data.CardData(2, 3 /* PLUM_BLOSSOM */, true)];
    /** 左补给 */
    CardMgr.supplyLeft = [
        new data.CardData(5, 3 /* PLUM_BLOSSOM */),
        new data.CardData(7, 3 /* PLUM_BLOSSOM */),
    ];
    /** 右补给 */
    CardMgr.supplyRight = [
        new data.CardData(16, 3 /* PLUM_BLOSSOM */, true),
        new data.CardData(16, 3 /* PLUM_BLOSSOM */, true),
    ];
    // getNextPosId(posId: number) {
    //     if (!this.hasPosId(posId)) {
    //         return;
    //     }
    //     if (posId === 0) {
    //         return 100 //gMath.getRandomAnswer(100, 200);
    //     }
    //     let maxId: number = this.getMaxId(posId);
    //     if (posId < maxId) {
    //         return posId + 1;
    //     }
    // }
    CardMgr._aiPool = [];
    util.CardMgr = CardMgr;
    __reflect(CardMgr.prototype, "util.CardMgr");
})(util || (util = {}));
//# sourceMappingURL=CardMgr.js.map