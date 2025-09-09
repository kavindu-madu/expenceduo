import Link from 'next/link';
import { Users, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CurrencySelector } from '@/components/currency-selector';
import type { User } from '@/lib/types';

interface DashboardHeaderProps {
  user: User;
}

export default function DashboardHeader({ user }: DashboardHeaderProps) {
  return (
    <header className="bg-card border-b sticky top-0 z-10">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-primary/10 rounded-lg">
             <Users className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold font-headline text-foreground">
            <span className="font-normal text-muted-foreground">Welcome, </span>
            {user}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <CurrencySelector />
          <Button asChild variant="outline">
            <Link href="/">
              <LogOut className="mr-2 h-4 w-4" />
              Switch User
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
