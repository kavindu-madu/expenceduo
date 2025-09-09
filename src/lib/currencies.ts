export interface Currency {
  code: string;
  name: string;
  symbol: string;
  position: 'before' | 'after';
  decimalPlaces: number;
}

export const CURRENCIES: Currency[] = [
  // Sri Lankan Rupee (Default)
  { code: 'LKR', name: 'Sri Lankan Rupee', symbol: 'රු.', position: 'before', decimalPlaces: 2 },
  
  // Major World Currencies
  { code: 'USD', name: 'US Dollar', symbol: '$', position: 'before', decimalPlaces: 2 },
  { code: 'EUR', name: 'Euro', symbol: '€', position: 'before', decimalPlaces: 2 },
  { code: 'GBP', name: 'British Pound', symbol: '£', position: 'before', decimalPlaces: 2 },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥', position: 'before', decimalPlaces: 0 },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', position: 'before', decimalPlaces: 2 },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', position: 'before', decimalPlaces: 2 },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF', position: 'after', decimalPlaces: 2 },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', position: 'before', decimalPlaces: 2 },
  { code: 'SEK', name: 'Swedish Krona', symbol: 'kr', position: 'after', decimalPlaces: 2 },
  { code: 'NOK', name: 'Norwegian Krone', symbol: 'kr', position: 'after', decimalPlaces: 2 },
  { code: 'DKK', name: 'Danish Krone', symbol: 'kr', position: 'after', decimalPlaces: 2 },
  { code: 'PLN', name: 'Polish Zloty', symbol: 'zł', position: 'after', decimalPlaces: 2 },
  { code: 'CZK', name: 'Czech Koruna', symbol: 'Kč', position: 'after', decimalPlaces: 2 },
  { code: 'HUF', name: 'Hungarian Forint', symbol: 'Ft', position: 'after', decimalPlaces: 0 },
  { code: 'RUB', name: 'Russian Ruble', symbol: '₽', position: 'after', decimalPlaces: 2 },
  
  // Asian Currencies
  { code: 'INR', name: 'Indian Rupee', symbol: '₹', position: 'before', decimalPlaces: 2 },
  { code: 'PKR', name: 'Pakistani Rupee', symbol: '₨', position: 'before', decimalPlaces: 2 },
  { code: 'BDT', name: 'Bangladeshi Taka', symbol: '৳', position: 'before', decimalPlaces: 2 },
  { code: 'NPR', name: 'Nepalese Rupee', symbol: '₨', position: 'before', decimalPlaces: 2 },
  { code: 'MVR', name: 'Maldivian Rufiyaa', symbol: 'Rf', position: 'before', decimalPlaces: 2 },
  { code: 'THB', name: 'Thai Baht', symbol: '฿', position: 'before', decimalPlaces: 2 },
  { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$', position: 'before', decimalPlaces: 2 },
  { code: 'MYR', name: 'Malaysian Ringgit', symbol: 'RM', position: 'before', decimalPlaces: 2 },
  { code: 'IDR', name: 'Indonesian Rupiah', symbol: 'Rp', position: 'before', decimalPlaces: 0 },
  { code: 'PHP', name: 'Philippine Peso', symbol: '₱', position: 'before', decimalPlaces: 2 },
  { code: 'VND', name: 'Vietnamese Dong', symbol: '₫', position: 'after', decimalPlaces: 0 },
  { code: 'KRW', name: 'South Korean Won', symbol: '₩', position: 'before', decimalPlaces: 0 },
  { code: 'HKD', name: 'Hong Kong Dollar', symbol: 'HK$', position: 'before', decimalPlaces: 2 },
  { code: 'TWD', name: 'Taiwan Dollar', symbol: 'NT$', position: 'before', decimalPlaces: 2 },
  
  // Middle East & Africa
  { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ', position: 'before', decimalPlaces: 2 },
  { code: 'SAR', name: 'Saudi Riyal', symbol: '﷼', position: 'before', decimalPlaces: 2 },
  { code: 'QAR', name: 'Qatari Riyal', symbol: '﷼', position: 'before', decimalPlaces: 2 },
  { code: 'KWD', name: 'Kuwaiti Dinar', symbol: 'د.ك', position: 'before', decimalPlaces: 3 },
  { code: 'BHD', name: 'Bahraini Dinar', symbol: 'د.ب', position: 'before', decimalPlaces: 3 },
  { code: 'OMR', name: 'Omani Rial', symbol: '﷼', position: 'before', decimalPlaces: 3 },
  { code: 'JOD', name: 'Jordanian Dinar', symbol: 'د.ا', position: 'before', decimalPlaces: 3 },
  { code: 'LBP', name: 'Lebanese Pound', symbol: 'ل.ل', position: 'before', decimalPlaces: 2 },
  { code: 'EGP', name: 'Egyptian Pound', symbol: '£', position: 'before', decimalPlaces: 2 },
  { code: 'ZAR', name: 'South African Rand', symbol: 'R', position: 'before', decimalPlaces: 2 },
  { code: 'NGN', name: 'Nigerian Naira', symbol: '₦', position: 'before', decimalPlaces: 2 },
  { code: 'KES', name: 'Kenyan Shilling', symbol: 'KSh', position: 'before', decimalPlaces: 2 },
  { code: 'GHS', name: 'Ghanaian Cedi', symbol: '₵', position: 'before', decimalPlaces: 2 },
  { code: 'MAD', name: 'Moroccan Dirham', symbol: 'د.م.', position: 'before', decimalPlaces: 2 },
  { code: 'TND', name: 'Tunisian Dinar', symbol: 'د.ت', position: 'before', decimalPlaces: 3 },
  
  // Americas
  { code: 'BRL', name: 'Brazilian Real', symbol: 'R$', position: 'before', decimalPlaces: 2 },
  { code: 'MXN', name: 'Mexican Peso', symbol: '$', position: 'before', decimalPlaces: 2 },
  { code: 'ARS', name: 'Argentine Peso', symbol: '$', position: 'before', decimalPlaces: 2 },
  { code: 'CLP', name: 'Chilean Peso', symbol: '$', position: 'before', decimalPlaces: 0 },
  { code: 'COP', name: 'Colombian Peso', symbol: '$', position: 'before', decimalPlaces: 2 },
  { code: 'PEN', name: 'Peruvian Sol', symbol: 'S/', position: 'before', decimalPlaces: 2 },
  { code: 'UYU', name: 'Uruguayan Peso', symbol: '$U', position: 'before', decimalPlaces: 2 },
  { code: 'VEF', name: 'Venezuelan Bolívar', symbol: 'Bs', position: 'before', decimalPlaces: 2 },
  
  // Others
  { code: 'TRY', name: 'Turkish Lira', symbol: '₺', position: 'after', decimalPlaces: 2 },
  { code: 'ILS', name: 'Israeli Shekel', symbol: '₪', position: 'before', decimalPlaces: 2 },
  { code: 'NZD', name: 'New Zealand Dollar', symbol: 'NZ$', position: 'before', decimalPlaces: 2 },
  { code: 'ISK', name: 'Icelandic Krona', symbol: 'kr', position: 'after', decimalPlaces: 0 },
  { code: 'RON', name: 'Romanian Leu', symbol: 'lei', position: 'after', decimalPlaces: 2 },
  { code: 'BGN', name: 'Bulgarian Lev', symbol: 'лв', position: 'after', decimalPlaces: 2 },
  { code: 'HRK', name: 'Croatian Kuna', symbol: 'kn', position: 'after', decimalPlaces: 2 },
  { code: 'RSD', name: 'Serbian Dinar', symbol: 'дин', position: 'after', decimalPlaces: 2 },
  { code: 'UAH', name: 'Ukrainian Hryvnia', symbol: '₴', position: 'after', decimalPlaces: 2 },
  { code: 'BYN', name: 'Belarusian Ruble', symbol: 'Br', position: 'after', decimalPlaces: 2 },
];

export const DEFAULT_CURRENCY = CURRENCIES[0]; // Sri Lankan Rupee

export const getCurrencyByCode = (code: string): Currency | undefined => {
  return CURRENCIES.find(currency => currency.code === code);
};

export const formatCurrency = (amount: number, currency: Currency): string => {
  const formattedAmount = amount.toFixed(currency.decimalPlaces);
  
  if (currency.position === 'before') {
    return `${currency.symbol}${formattedAmount}`;
  } else {
    return `${formattedAmount} ${currency.symbol}`;
  }
};
