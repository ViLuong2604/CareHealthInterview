export type CoinType = {
  ath: number;
  ath_change_percentage: number;
  ath_date: Date | string;
  atl: number;
  atl_change_percentage: number;
  atl_date: Date | string;
  circulating_supply: number;
  current_price: number;
  fully_diluted_valuation: number;
  high_24h: number;
  id: string;
  image: string;
  last_updated: Date | string;
  low_24h: number;
  market_cap: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  market_cap_rank: number;
  max_supply: number;
  name: string;
  price_change_24h: number;
  price_change_percentage_24h: number;
  roi?: string | number;
  symbol: string;
  total_supply: number;
  total_volume: number;
};

export type ContextType = {
  currency?: string;
  setCurrency?: any;
  symbol?: string;
};
