// src/interfaces/Crypto.ts
export interface CryptoData {
  id: string;
  rank: number;
  name: string;
  symbol: string;
  price_usd: string; // API mengembalikan sebagai string
  // Tambahkan properti lain jika diperlukan, meskipun tidak akan ditampilkan
  // price_btc: string;
  // market_cap_usd: string;
  // available_supply: string;
  // total_supply: string;
  // max_supply: string | null;
  // percent_change_1h: string;
  // percent_change_24h: string;
  // percent_change_7d: string;
  // last_updated: string;
}

export interface TickerResponse {
  data: CryptoData[];
  info: {
    coins_num: number;
    time: number;
  };
}