import type { OrderBookResponse, ParsedOrderBook } from "@/types/binance";

const BASE_URL = "https://api.binance.com/api/v3";

export function getOrderBookUrl(symbol: string, limit = 10): string {
	return `${BASE_URL}/depth?symbol=${symbol}&limit=${limit}`;
}

export async function fetchOrderBook(
	symbol: string,
	limit = 10
): Promise<ParsedOrderBook> {
	const response = await fetch(getOrderBookUrl(symbol, limit));

	if (!response.ok) {
		throw new Error(`Error fetching orderbook: ${response.statusText}`);
	}

	const data: OrderBookResponse = await response.json();

	return {
		lastUpdateId: data.lastUpdateId,
		bids: data.bids.map(([price, quantity]) => ({ price, quantity })),
		asks: data.asks.map(([price, quantity]) => ({ price, quantity })),
	};
}

// Calcular el spread entre el mejor bid y ask
export function calculateSpread(
	bestBid: string | undefined,
	bestAsk: string | undefined
): { absolute: number; percentage: number } | null {
	if (!bestBid || !bestAsk) return null;

	const bid = Number.parseFloat(bestBid);
	const ask = Number.parseFloat(bestAsk);
	const absolute = ask - bid;
	const percentage = (absolute / ask) * 100;

	return { absolute, percentage };
}

// Formatear precio con decimales apropiados
export function formatPrice(price: string): string {
	const num = Number.parseFloat(price);
	if (num >= 1000)
		return num.toLocaleString("en-US", {
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		});
	if (num >= 1) return num.toFixed(4);
	return num.toFixed(6);
}

// Formatear cantidad
export function formatQuantity(quantity: string): string {
	const num = Number.parseFloat(quantity);
	if (num >= 1000)
		return num.toLocaleString("en-US", {
			minimumFractionDigits: 4,
			maximumFractionDigits: 4,
		});
	return num.toFixed(6);
}
