namespace util {
    /**
     * 卡牌组件管理器
     */
    export class CardMgr {

        /** 牌堆 */
        public static pile: [(data.CardData | -1)[]] = [
            [
                -1,
                -1,
                new data.CardData(10, gConst.cardPattern.PLUM_BLOSSOM),
                new data.CardData(11, gConst.cardPattern.PLUM_BLOSSOM),
            ],
            [
                -1,
                new data.CardData(3, gConst.cardPattern.PLUM_BLOSSOM),
                new data.CardData(8, gConst.cardPattern.PLUM_BLOSSOM),
                new data.CardData(12, gConst.cardPattern.PLUM_BLOSSOM),
            ],
            [
                new data.CardData(3, gConst.cardPattern.PLUM_BLOSSOM, true),
                new data.CardData(4, gConst.cardPattern.PLUM_BLOSSOM, true),
                new data.CardData(6, gConst.cardPattern.PLUM_BLOSSOM, true),
                new data.CardData(13, gConst.cardPattern.PLUM_BLOSSOM, true),
            ]
        ];

        /** 底牌 */
        public static cards: data.CardData[] = [new data.CardData(2, gConst.cardPattern.PLUM_BLOSSOM, true)];

        /** 左补给 */
        public static supplyLeft: data.CardData[] = [
            new data.CardData(5, gConst.cardPattern.PLUM_BLOSSOM),
            new data.CardData(7, gConst.cardPattern.PLUM_BLOSSOM),
        ];

        /** 右补给 */
        public static supplyRight: data.CardData[] = [
            new data.CardData(16, gConst.cardPattern.PLUM_BLOSSOM, true),
            new data.CardData(16, gConst.cardPattern.PLUM_BLOSSOM, true),
        ];

        public constructor() {

        }

        // getPos(posId: number): { x: number, y: number, dir: gConst.aiDir } {
        //     return this._config[posId];
        // }

        // private hasPosId(posId: number): boolean {
        //     return this.getPos(posId) != void 0;
        // }

        getMaxId(posId: number): number {
            // const hundred: number = Math.floor(posId / 100);
            return 105 //hundred === 1 ? 105 : 205;
        }

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

        private static _aiPool: com.ComCard[] = [];

        public static createAi() {
            let ai: com.ComCard;
            if (this._aiPool && this._aiPool.length > 0) {
                ai = this._aiPool.shift();
            } else {
                ai = new com.ComCard();
            }
            return ai;
        }

        public static removeAi(ai: com.ComCard) {
            gTween.rmTweens(ai);
            gComMgr.rmObj(ai);
            this._aiPool.push(ai);
        }
    }
}