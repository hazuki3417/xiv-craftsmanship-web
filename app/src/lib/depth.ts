/**
 * 階層の深さを管理するクラス
 */
class Depth {
	private depth: number;
	constructor() {
		this.depth = 0;
	}
	increase() {
		this.depth++;
	}
	decrease() {
		this.depth--;
	}
	getDepth() {
		return this.depth;
	}
}
export default Depth;
