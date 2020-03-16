namespace data {
	/**
	 * 开锁组件数据
	 */
	export class UnlockData {
		public id: number; //关卡ID
		public pinOnes: { id: number, x: number, keyPinH: number, finish: boolean }[] = []; //所有锁芯
		public keyPos: number[]; //钥匙上的点
		public finishPos: number[]; //钥匙上，完成的点

		/**
		 * 构造动画数据
		 * @param {number} id 关卡ID
		 * @param {{ id: number, x: number, keyPinH: number, finish: boolean }[]} pinOnes 所有锁芯
		 * @param {number} keyPos 钥匙上的点
		 * @param {number} finishPos 钥匙上，完成的点
		 */
		public constructor(id: number, pinOnes: { id: number, x: number, keyPinH: number, finish: boolean }[], keyPos: number[], finishPos: number[]) {
			this.id = id;
			this.pinOnes = pinOnes;
			this.keyPos = keyPos;
			this.finishPos = finishPos;
		}
	}
}