namespace data {
	/**
	 * 对话控件数据
	 */
	export class ChatData {
		public id: number; //对话ID
		public speakerId: 1 | -1; //对话者ID
		public type: gConst.chatType; //对话类型
		public later: string; //纹理后缀
		public itemType: string; //选项类型

		/**
		 * 构造组件数据
		 * @param {1|-1} speakerId 对话者ID
		 * @param {gConst.chatType} type 对话类型
		 * @param {string} later 纹理后缀
		 */
		public constructor(speakerId: 1 | -1, type: gConst.chatType, later: string, itemType: string = "") {
			this.id = gAutoId.id;
			this.speakerId = speakerId;
			this.type = type;
			this.later = later;
			this.itemType = itemType;
		}
	}
}