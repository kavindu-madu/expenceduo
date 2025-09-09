import { useCurrency } from '@/contexts/currency-context';

export const useCurrencyFormat = () => {
  const { formatAmount, currency } = useCurrency();
  
  return {
    formatAmount,
    currency,
    symbol: currency.symbol,
    code: currency.code,
    name: currency.name,
  };
};
