"use client";

import { TRADING_PAIRS, type TradingPair } from "@/types/binance";

interface AssetSelectorProps {
	selectedSymbol: string;
	onSymbolChange: (symbol: string) => void;
}

export function AssetSelector({
	selectedSymbol,
	onSymbolChange,
}: AssetSelectorProps) {
	return (
		<div className="flex items-center gap-3">
			<label htmlFor="pair-selector" className="text-sm text-muted-foreground">
				Par de trading:
			</label>
			<select
				id="pair-selector"
				value={selectedSymbol}
				onChange={(e) => onSymbolChange(e.target.value)}
				className="rounded-md border border-border bg-card px-3 py-2 text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
			>
				{TRADING_PAIRS.map((pair: TradingPair) => (
					<option key={pair.symbol} value={pair.symbol}>
						{pair.baseAsset}/{pair.quoteAsset}
					</option>
				))}
			</select>
		</div>
	);
}
