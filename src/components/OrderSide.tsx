"use client";

import { OrderRow } from "./OrderRow";
import type { OrderBookEntry } from "@/types/binance";
import { useMemo } from "react";

interface OrderSideProps {
	entries: OrderBookEntry[];
	type: "bid" | "ask";
	title: string;
}

export function OrderSide({ entries, type, title }: OrderSideProps) {
	const maxQuantity = useMemo(() => {
		return Math.max(...entries.map((e) => Number.parseFloat(e.quantity)), 0);
	}, [entries]);

	const displayEntries = type === "ask" ? [...entries].reverse() : entries;

	const titleColor = type === "bid" ? "text-emerald-400" : "text-red-400";

	return (
		<div className="flex flex-col">
			<div className="flex items-center justify-between border-b border-border px-3 py-2">
				<h3 className={`text-sm font-semibold ${titleColor}`}>{title}</h3>
				<div className="flex gap-8 text-xs text-muted-foreground">
					<span>Precio</span>
					<span>Cantidad</span>
				</div>
			</div>
			<div className="flex flex-col">
				{displayEntries.map((entry, index) => (
					<OrderRow
						key={`${entry.price}-${index}`}
						entry={entry}
						type={type}
						maxQuantity={maxQuantity}
					/>
				))}
			</div>
		</div>
	);
}
