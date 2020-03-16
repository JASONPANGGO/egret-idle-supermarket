namespace data {
	/**
	 * 卡牌组件数据
	 */
	export class CardData {
		public id: number; //卡牌ID
		public num: number; //卡牌数字
		public type: gConst.cardPattern; //卡牌花型
		public isOpen: boolean; //是否打开

		/**
		 * 构造组件数据
		 * @param {number} num 卡牌数字
		 * @param {gConst.cardPattern} type 卡牌花型
		 * @param {boolean} isOpen 是否打开
		 */
		public constructor(num: number, type: gConst.cardPattern, isOpen: boolean = false) {
			this.id = gAutoId.id;
			this.num = num;
			this.type = type;
			this.isOpen = isOpen;
		}
	}
}