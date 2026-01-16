"use client";

import { useState } from "react";
import { AssetSelector } from "@/components/AssetSelector";
import { OrderBook } from "@/components/OrderBook";
import { useOrderBook } from "@/hooks/useOrderBook";
import { TRADING_PAIRS } from "@/types/binance";

export default function Home() {
	const [selectedSymbol, setSelectedSymbol] = useState(TRADING_PAIRS[0].symbol);

	const { data, isLoading, error } = useOrderBook({
		symbol: selectedSymbol,
		limit: 10,
		pollingInterval: 1500,
	});

	return (
		<main className="min-h-screen bg-background p-4 md:p-8">
			<div className="mx-auto max-w-4xl">
				<div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
					<div>
						<h1 className="text-2xl font-bold text-foreground">
							Orderbook Viewer
						</h1>
						<p className="text-sm text-muted-foreground">
							Datos en tiempo real de Binance
						</p>
					</div>
					<AssetSelector
						selectedSymbol={selectedSymbol}
						onSymbolChange={setSelectedSymbol}
					/>
				</div>

				<OrderBook
					data={data}
					isLoading={isLoading}
					error={error}
					symbol={selectedSymbol}
				/>

				<div className="mt-4 rounded-lg border border-border bg-muted/30 p-4">
					<p className="text-xs text-muted-foreground">
						Los datos se actualizan automáticamente cada 1.5 segundos mediante
						polling a la API pública de Binance. Las barras de profundidad
						muestran el volumen relativo de cada nivel.
					</p>
				</div>
			</div>
		</main>
	);
}
