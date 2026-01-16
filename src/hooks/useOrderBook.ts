"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { fetchOrderBook } from "@/lib/binance";
import type { ParsedOrderBook } from "@/types/binance";

interface UseOrderBookOptions {
	symbol: string;
	limit?: number;
	pollingInterval?: number;
}

interface UseOrderBookResult {
	data: ParsedOrderBook | null;
	isLoading: boolean;
	error: Error | null;
	refetch: () => Promise<void>;
}

export function useOrderBook({
	symbol,
	limit = 10,
	pollingInterval = 1500,
}: UseOrderBookOptions): UseOrderBookResult {
	const [data, setData] = useState<ParsedOrderBook | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);
	const intervalRef = useRef<NodeJS.Timeout | null>(null);

	const fetchData = useCallback(async () => {
		try {
			const orderBook = await fetchOrderBook(symbol, limit);
			setData(orderBook);
			setError(null);
		} catch (err) {
			setError(err instanceof Error ? err : new Error("Unknown error"));
		} finally {
			setIsLoading(false);
		}
	}, [symbol, limit]);

	useEffect(() => {
		// Reset state cuando cambia el símbolo
		setIsLoading(true);
		setError(null);

		// Fetch inicial
		fetchData();

		// Setup polling
		intervalRef.current = setInterval(fetchData, pollingInterval);

		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
			}
		};
	}, [fetchData, pollingInterval]);

	return { data, isLoading, error, refetch: fetchData };
}
