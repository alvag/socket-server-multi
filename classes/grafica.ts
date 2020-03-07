export class GraficaData {
	private months: string[] = ['enero', 'febrero', 'marzo', 'abril'];
	private values: number[] = [0, 0, 0, 0];

	constructor() {}

	getData() {
		return [
			{ data: this.values, label: 'Ventas' }
		];
	}

	incrementValue(month: string, value: number) {
		month = month.toLowerCase().trim();

		for (let i in this.months ) {
			if (this.months[i] === month) {
				this.values[i] += value;
			}
		}

		return this.getData();
	}
}
