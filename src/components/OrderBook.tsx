"use client";

import { OrderSide } from "./OrderSide";
import { calculateSpread, formatPrice } from "@/lib/binance";
import type { ParsedOrderBook } from "@/types/binance";

interface OrderBookProps {
	data: ParsedOrderBook | null;
	isLoading: boolean;
	error: Error | null;
	symbol: string;
}

export function OrderBook({ data, isLoading, error, symbol }: OrderBookProps) {
	// Loading state
	if (isLoading && !data) {
		return (
			<div className="flex h-96 items-center justify-center rounded-lg border border-border bg-card">
				<div className="flex flex-col items-center gap-2">
					<div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
					<span className="text-sm text-muted-foreground">
						Cargando orderbook...
					</span>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex h-96 items-center justify-center rounded-lg border border-destructive/50 bg-destructive/10">
				<div className="flex flex-col items-center gap-2 text-center">
					<span className="text-lg">⚠️</span>
					<span className="text-sm text-destructive">
						Error al cargar datos
					</span>
					<span className="text-xs text-muted-foreground">{error.message}</span>
				</div>
			</div>
		);
	}

	if (!data) return null;

	const spread = calculateSpread(data.bids[0]?.price, data.asks[0]?.price);

	return (
		<div className="overflow-hidden rounded-lg border border-border bg-card">
			<div className="flex items-center justify-between border-b border-border bg-muted/50 px-4 py-3">
				<h2 className="text-lg font-semibold">{symbol} Orderbook</h2>
				{spread && (
					<div className="flex items-center gap-2 text-sm">
						<span className="text-muted-foreground">Spread:</span>
						<span className="font-mono text-foreground">
							{formatPrice(spread.absolute.toString())} (
							{spread.percentage.toFixed(3)}%)
						</span>
					</div>
				)}
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2">
				<div className="border-b border-border md:border-b-0 md:border-r">
					<OrderSide entries={data.asks} type="ask" title="Asks (Venta)" />
				</div>

				<div>
					<OrderSide entries={data.bids} type="bid" title="Bids (Compra)" />
				</div>
			</div>

			<div className="border-t border-border bg-muted/30 px-4 py-2">
				<span className="text-xs text-muted-foreground">
					Última actualización: #{data.lastUpdateId}
				</span>
			</div>
		</div>
	);
}
