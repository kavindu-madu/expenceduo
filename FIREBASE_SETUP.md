# Firebase Setup Instructions

This project has been configured to use Firebase Realtime Database for data persistence.

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyAviMxXCRq2Kha7SUxvC7yyp7E1B_x7sZ8
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=expduo-f0d72.firebaseapp.com
NEXT_PUBLIC_FIREBASE_DATABASE_URL=https://expduo-f0d72-default-rtdb.firebaseio.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=expduo-f0d72
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=expduo-f0d72.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=564307808180
NEXT_PUBLIC_FIREBASE_APP_ID=1:564307808180:web:b2c9ae7c9c83e798b6ace1
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-RC74HBHHNY
```

## Firebase Realtime Database Rules

Make sure to set up proper security rules in your Firebase Console. Here's a basic rule for development:

```json
{
  "rules": {
    "expenses": {
      ".read": true,
      ".write": true,
      ".indexOn": ["user", "date"]
    }
  }
}
```

**Note:** The application is configured to work without database indexes by filtering data on the client side. However, for better performance with large datasets, you can add the index rules above.

For production, you should implement proper authentication and authorization rules.

## Database Structure

The expenses are stored in the following structure:

```
expenses/
  ├── {expenseId}/
  │   ├── user: "Samila" | "Amaya"
  │   ├── amount: number
  │   ├── reason: string
  │   ├── type: "Expense" | "Income"
  │   └── date: ISO string
```

## Features Implemented

- ✅ Firebase Realtime Database integration
- ✅ CRUD operations for expenses
- ✅ User-specific expense filtering
- ✅ Real-time data synchronization
- ✅ Error handling and validation
- ✅ TypeScript support
- ✅ Multi-currency support (50+ currencies)
- ✅ Sri Lankan Rupee (රු.) as default currency
- ✅ Currency selector with search functionality
- ✅ Persistent currency selection
- ✅ Real-time currency formatting across all components

## Running the Application

1. Install dependencies: `npm install`
2. Create `.env.local` file with the environment variables above
3. Start the development server: `npm run dev`
4. Open [http://localhost:9002](http://localhost:9002) in your browser

The application will now use Firebase Realtime Database instead of mock data, providing persistent storage across sessions.

## Currency Support

The application includes comprehensive currency support with:

### Default Currency
- **Sri Lankan Rupee (රු.)** is set as the default currency
- Symbol: `රු.` (positioned before the amount)
- Decimal places: 2

### Available Currencies
The system supports 50+ currencies including:
- **Major World Currencies**: USD, EUR, GBP, JPY, AUD, CAD, CHF, CNY
- **Asian Currencies**: INR, PKR, BDT, NPR, MVR, THB, SGD, MYR, IDR, PHP, VND, KRW, HKD, TWD
- **Middle East & Africa**: AED, SAR, QAR, KWD, BHD, OMR, JOD, LBP, EGP, ZAR, NGN, KES, GHS, MAD, TND
- **Americas**: BRL, MXN, ARS, CLP, COP, PEN, UYU, VEF
- **Others**: TRY, ILS, NZD, ISK, RON, BGN, HRK, RSD, UAH, BYN

### Currency Features
- **Real-time switching**: Change currency anytime from the header
- **Persistent selection**: Your currency choice is saved in localStorage
- **Search functionality**: Search currencies by name, code, or symbol
- **Proper formatting**: Each currency displays with correct symbol position and decimal places
- **Global updates**: All amounts update instantly when currency changes

### Usage
1. Click the currency selector button in the top-right corner
2. Search for your desired currency
3. Select the currency - all amounts will update immediately
4. Your selection is automatically saved for future visits
