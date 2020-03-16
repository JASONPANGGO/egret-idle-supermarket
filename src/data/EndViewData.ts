namespace data {
	/**
	 * 结束界面数据
	 */
	export class EndViewData {
		/** 物品配置 */
		private static _config: {
			"1": { name: string, location: string, x: number, y: number, y2?: number, goalX: number, lastLayer: number, scaleX?: number, scaleY?: number },
			"2": { name: string, location: string, x: number, y: number, y2?: number, goalX: number, lastLayer: number, scaleX?: number, scaleY?: number },
			"3": { name: string, location: string, x: number, y: number, y2?: number, goalX: number, lastLayer: number, scaleX?: number, scaleY?: number },
			"4": { name: string, location: string, x: number, y: number, y2?: number, goalX: number, lastLayer: number, scaleX?: number, scaleY?: number }
		} = {
			"1": {
				name: "p_hen_left_png",
				location: "top",
				x: 268,
				y: 160,
				y2: 190,
				goalX: 600,
				lastLayer: 2,
				scaleX: -0.8,
				scaleY: 0.8
			},
			"2": {
				name: "p_machine1_2_png",
				location: "top",
				x: 500,
				y: 230,
				goalX: 1238,
				lastLayer: 2
			},
			"3": {
				name: "p_machine1_2_png",
				location: "bottom",
				x: -108,
				y: 196,
				goalX: 682,
				lastLayer: 1
			},
			"4": {
				name: "p_machine2_2_png",
				location: "bottom",
				x: 684,
				y: 210,
				goalX: 1624,
				lastLayer: 1
			}
		};

		public constructor() {

		}

		/** 物品配置 */
		public static config(type: 1 | 2 | 3 | 4): { name: string, location: string, x: number, y: number, y2?: number, goalX: number, lastLayer: number, scaleX?: number, scaleY?: number } {
			return this._config[type];
		}
	}
}