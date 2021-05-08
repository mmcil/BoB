import { ensureNotNull } from '../../helpers/assertions';

import { BarPrice } from '../../model/bar';
import { ChartModel } from '../../model/chart-model';
import { Coordinate } from '../../model/coordinate';
import { PlotRowValueIndex } from '../../model/plot-data';
import { PriceScale } from '../../model/price-scale';
import { Series } from '../../model/series';
import { TimedValue, TimePointIndex, visibleTimedValues } from '../../model/time-data';
import { TimeScale } from '../../model/time-scale';
import { CompositeRenderer } from '../../renderers/composite-renderer';
import { HistogramItem, PaneRendererHistogram, PaneRendererHistogramData } from '../../renderers/histogram-renderer';
import { IPaneRenderer } from '../../renderers/ipane-renderer';

import { SeriesPaneViewBase } from './series-pane-view-base';

function createEmptyHistogramData(barSpacing: number): PaneRendererHistogramData {
	return {
		items: [],
		barSpacing,
		histogramBase: NaN,
		visibleRange: null,
	};
}

function createRawItem(time: TimePointIndex, price: BarPrice, color: string): HistogramItem {
	return {
		time: time,
		price: price,
		x: NaN as Coordinate,
		y: NaN as Coordinate,
		color,
	};
}

export class SeriesHistogramPaneView extends SeriesPaneViewBase<'Histogram', TimedValue> {
	private _compositeRenderer: CompositeRenderer = new CompositeRenderer();
	private _histogramData: PaneRendererHistogramData = createEmptyHistogramData(0);
	private _renderer: PaneRendererHistogram;

	public constructor(series: Series<'Histogram'>, model: ChartModel) {
		super(series, model, false);
		this._renderer = new PaneRendererHistogram();
	}

	public renderer(height: number, width: number): IPaneRenderer | null {
		if (!this._series.visible()) {
			return null;
		}

		this._makeValid();
		return this._compositeRenderer;
	}

	protected _fillRawPoints(): void {
		const barSpacing = this._model.timeScale().barSpacing();

		this._histogramData = createEmptyHistogramData(barSpacing);

		let targetIndex = 0;
		let itemIndex = 0;

		const defaultColor = this._series.options().color;

		for (const row of this._series.bars().rows()) {
			const value = row.value[PlotRowValueIndex.Close] as BarPrice;

			const color = row.color !== undefined ? row.color : defaultColor;
			const item = createRawItem(row.index, value, color);
			targetIndex++;
			if (targetIndex < this._histogramData.items.length) {
				this._histogramData.items[targetIndex] = item;
			} else {
				this._histogramData.items.push(item);
			}
			this._items[itemIndex++] = { time: row.index, x: 0 as Coordinate };
		}

		this._renderer.setData(this._histogramData);
		this._compositeRenderer.setRenderers([this._renderer]);
	}

	protected _clearVisibleRange(): void {
		super._clearVisibleRange();

		this._histogramData.visibleRange = null;
	}

	protected _convertToCoordinates(priceScale: PriceScale, timeScale: TimeScale, firstValue: number): void {
		if (this._itemsVisibleRange === null) {
			return;
		}

		const barSpacing = timeScale.barSpacing();
		const visibleBars = ensureNotNull(timeScale.visibleStrictRange());
		const histogramBase = priceScale.priceToCoordinate(this._series.options().base, firstValue);

		timeScale.indexesToCoordinates(this._histogramData.items);
		priceScale.pointsArrayToCoordinates(this._histogramData.items, firstValue);
		this._histogramData.histogramBase = histogramBase;
		this._histogramData.visibleRange = visibleTimedValues(this._histogramData.items, visibleBars, false);
		this._histogramData.barSpacing = barSpacing;
		// need this to update cache
		this._renderer.setData(this._histogramData);
	}
}
