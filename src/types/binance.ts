export interface OrderBookEntry {
	price: string;
	quantity: string;
}

export interface OrderBookResponse {
	lastUpdateId: number;
	bids: [string, string][];
	asks: [string, string][];
}

export interface ParsedOrderBook {
	lastUpdateId: number;
	bids: OrderBookEntry[];
	asks: OrderBookEntry[];
}

export interface TradingPair {
	symbol: string;
	baseAsset: string;
	quoteAsset: string;
}

export const TRADING_PAIRS: TradingPair[] = [
	{ symbol: "BTCUSDT", baseAsset: "BTC", quoteAsset: "USDT" },
	{ symbol: "ETHUSDT", baseAsset: "ETH", quoteAsset: "USDT" },
	{ symbol: "SOLUSDT", baseAsset: "SOL", quoteAsset: "USDT" },
	{ symbol: "BNBUSDT", baseAsset: "BNB", quoteAsset: "USDT" },
	{ symbol: "XRPUSDT", baseAsset: "XRP", quoteAsset: "USDT" },
];
