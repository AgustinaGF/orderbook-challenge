# Orderbook Viewer Challenge

A real-time orderbook viewer built with React and Next.js that consumes the Binance public API.

## 🚀 Quick Start

### Using Docker (Recommended)

```bash
docker build -t orderbook-challenge .
docker run -p 3000:3000 orderbook-challenge
```

**Note for Linux users:** If you get permission errors, use `sudo` before each command or add your user to the docker group with `sudo usermod -aG docker $USER` and restart your session.

Then open [http://localhost:3000](http://localhost:3000) in your browser.

### Local Development

```bash
npm install
npm run dev
```

## 📋 Features

### Core Functionality

- **Asset Selector**: Dropdown with 5 trading pairs (BTCUSDT, ETHUSDT, SOLUSDT, BNBUSDT, XRPUSDT)
- **Orderbook Display**: Shows 10 levels of bids and asks with price and quantity
- **Live Updates**: Polls Binance API every 1.5 seconds
- **Error Handling**: Graceful loading and error states

### Bonus Features

- **Spread Indicator**: Shows the difference between best bid and ask (absolute and percentage)
- **Depth Visualization**: Horizontal bars showing relative volume at each price level

## 🏗️ Design Decisions & Trade-offs

### Architecture

- **Custom Hook (`useOrderBook`)**: Encapsulates all data fetching logic, polling, and state management. This separates concerns and makes the hook reusable and testable.
- **Component Composition**: Split into small, focused components (`OrderBook`, `OrderSide`, `OrderRow`, `AssetSelector`) for better maintainability and reusability.

### Polling vs WebSocket

- Chose **polling** over WebSocket for simplicity and reliability. The 1.5-second interval provides a good balance between data freshness and API rate limits.
- Trade-off: Slightly higher latency compared to WebSocket, but more straightforward error handling and reconnection logic.

### State Management

- Used React's built-in `useState` and `useCallback` hooks instead of external state management libraries.
- Trade-off: Simpler setup, but would need to consider more robust solutions (like Zustand or React Query) for larger applications.

### Styling

- Used Tailwind CSS with CSS custom properties for theming (dark mode support).
- Depth bars use percentage-based widths calculated from the maximum quantity in each side.

### Performance Optimizations

- `useMemo` for computing max quantity to avoid recalculation on every render
- Refs for interval management to prevent memory leaks
- State reset on symbol change to ensure clean transitions

## 🛠️ Tech Stack

- **Framework**: React 18+ with Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **API**: Binance Public REST API
