"use client";

import { formatPrice, formatQuantity } from "@/lib/binance";
import type { OrderBookEntry } from "@/types/binance";

interface OrderRowProps {
	entry: OrderBookEntry;
	type: "bid" | "ask";
	maxQuantity: number;
}

export function OrderRow({ entry, type, maxQuantity }: OrderRowProps) {
	const quantity = Number.parseFloat(entry.quantity);
	const depthPercentage = (quantity / maxQuantity) * 100;

	const bgColor = type === "bid" ? "bg-emerald-500/20" : "bg-red-500/20";
	const textColor = type === "bid" ? "text-emerald-400" : "text-red-400";

	return (
		<div className="relative flex items-center justify-between px-3 py-1.5 font-mono text-sm">
			{/* Barra de profundidad */}
			<div
				className={`absolute inset-y-0 ${
					type === "bid" ? "right-0" : "left-0"
				} ${bgColor} transition-all duration-300`}
				style={{ width: `${Math.min(depthPercentage, 100)}%` }}
			/>

			{/* Contenido */}
			<span className={`relative z-10 ${textColor}`}>
				{formatPrice(entry.price)}
			</span>
			<span className="relative z-10 text-foreground/80">
				{formatQuantity(entry.quantity)}
			</span>
		</div>
	);
}
