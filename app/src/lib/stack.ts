/**
 * 値をスタックするクラス
 */
class Stack<T> {
	private items: T[] = [];

	push(item: T): void {
		this.items.push(item);
	}

	pop(): T | undefined {
		if (this.isEmpty()) {
			return undefined;
		}
		return this.items.pop();
	}

	peek(): T | undefined {
		if (this.isEmpty()) {
			return undefined;
		}
		return this.items[this.items.length - 1];
	}

	isEmpty(): boolean {
		return this.items.length === 0;
	}

	size(): number {
		return this.items.length;
	}

	clear(): void {
		this.items = [];
	}
}
export default Stack;
