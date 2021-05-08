import { PricedValue } from '../model/price-scale';
import { SeriesItemsIndexesRange, TimedValue } from '../model/time-data';

import { LinePoint, LineStyle, LineType, LineWidth, setLineStyle } from './draw-line';
import { ScaledRenderer } from './scaled-renderer';
import { walkLine } from './walk-line';

export type LineItem = TimedValue & PricedValue & LinePoint;

export interface PaneRendererLineData {
	lineType: LineType;

	items: LineItem[];

	barWidth: number;

	lineColor: string;
	lineWidth: LineWidth;
	lineStyle: LineStyle;

	visibleRange: SeriesItemsIndexesRange | null;
}

export class PaneRendererLine extends ScaledRenderer {
	protected _data: PaneRendererLineData | null = null;

	public setData(data: PaneRendererLineData): void {
		this._data = data;
	}

	protected _drawImpl(ctx: CanvasRenderingContext2D): void {
		if (this._data === null || this._data.items.length === 0 || this._data.visibleRange === null) {
			return;
		}

		ctx.lineCap = 'butt';
		ctx.lineWidth = this._data.lineWidth;

		setLineStyle(ctx, this._data.lineStyle);

		ctx.strokeStyle = this._data.lineColor;
		ctx.lineJoin = 'round';

		ctx.beginPath();
		if (this._data.items.length === 1) {
			const point = this._data.items[0];
			ctx.moveTo(point.x - this._data.barWidth / 2, point.y);
			ctx.lineTo(point.x + this._data.barWidth / 2, point.y);
		} else {
			walkLine(ctx, this._data.items, this._data.lineType, this._data.visibleRange);
		}

		ctx.stroke();
	}
}
