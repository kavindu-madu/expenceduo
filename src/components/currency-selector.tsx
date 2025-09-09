"use client";

import React, { useState } from 'react';
import { useCurrency } from '@/contexts/currency-context';
import { CURRENCIES } from '@/lib/currencies';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Search, Globe } from 'lucide-react';

export const CurrencySelector: React.FC = () => {
  const { currency, setCurrency, formatAmount } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCurrencies = CURRENCIES.filter(curr =>
    curr.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    curr.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    curr.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCurrencyChange = (currencyCode: string) => {
    const selectedCurrency = CURRENCIES.find(c => c.code === currencyCode);
    if (selectedCurrency) {
      setCurrency(selectedCurrency);
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">{currency.code}</span>
          <span className="sm:hidden">{currency.symbol}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Select Currency
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search currencies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Current Currency Display */}
          <div className="p-3 bg-muted rounded-lg">
            <div className="text-sm text-muted-foreground">Current Currency</div>
            <div className="font-medium">
              {currency.symbol} {currency.name} ({currency.code})
            </div>
            <div className="text-sm text-muted-foreground">
              Example: {formatAmount(1234.56)}
            </div>
          </div>

          {/* Currency List */}
          <div className="max-h-96 overflow-y-auto space-y-1">
            {filteredCurrencies.map((curr) => (
              <button
                key={curr.code}
                onClick={() => handleCurrencyChange(curr.code)}
                className={`w-full p-3 text-left rounded-lg border transition-colors hover:bg-muted ${
                  curr.code === currency.code 
                    ? 'bg-primary text-primary-foreground border-primary' 
                    : 'border-border'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-medium">{curr.symbol}</span>
                    <div>
                      <div className="font-medium">{curr.name}</div>
                      <div className="text-sm text-muted-foreground">{curr.code}</div>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {curr.position === 'before' 
                      ? `${curr.symbol}1,234.56`
                      : `1,234.56 ${curr.symbol}`
                    }
                  </div>
                </div>
              </button>
            ))}
          </div>

          {filteredCurrencies.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No currencies found matching "{searchTerm}"
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
