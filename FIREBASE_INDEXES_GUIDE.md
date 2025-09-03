# Firebase Indexes Guide for Bandhan App

## Overview
Your app has several Firebase queries that require composite indexes. This guide will help you create all the necessary indexes.

## Required Indexes

### 1. Guests Collection Index
**Collection:** `guests`
**Fields:** 
- `userId` (Ascending)
- `createdAt` (Descending)

**Why needed:** The query filters by `userId` and orders by `createdAt` in descending order.

**Steps to create:**
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `bandhan-a347b`
3. Go to **Firestore Database** → **Indexes** tab
4. Click **Create Index**
5. Fill in:
   - Collection ID: `guests`
   - Fields:
     - `userId` (Ascending)
     - `createdAt` (Descending)
6. Click **Create**

### 2. Checklist Items Collection Index
**Collection:** `checklistItems`
**Fields:**
- `userId` (Ascending)
- `timeline` (Ascending)

**Why needed:** The query filters by `userId` and orders by `timeline` in ascending order.

**Steps to create:**
1. In the same Indexes tab
2. Click **Create Index**
3. Fill in:
   - Collection ID: `checklistItems`
   - Fields:
     - `userId` (Ascending)
     - `timeline` (Ascending)
4. Click **Create**

### 3. Budget Categories Collection Index
**Collection:** `budgetCategories`
**Fields:**
- `userId` (Ascending)
- `percentage` (Descending)

**Why needed:** The query filters by `userId` and orders by `percentage` in descending order.

**Steps to create:**
1. Click **Create Index** again
2. Fill in:
   - Collection ID: `budgetCategories`
   - Fields:
     - `userId` (Ascending)
     - `percentage` (Descending)
3. Click **Create**

### 4. Vendors Collection Index
**Collection:** `vendors`
**Fields:**
- `userId` (Ascending)
- `createdAt` (Descending)

**Why needed:** The query filters by `userId` and orders by `createdAt` in descending order.

**Steps to create:**
1. Click **Create Index** again
2. Fill in:
   - Collection ID: `vendors`
   - Fields:
     - `userId` (Ascending)
     - `createdAt` (Descending)
3. Click **Create**

## Alternative: Quick Index Creation Links

If you want to create indexes quickly, you can use these direct links (replace `YOUR_PROJECT_ID` with `bandhan-a347b`):

### Guests Index:
```
https://console.firebase.google.com/v1/r/project/YOUR_PROJECT_ID/firestore/indexes?create_composite=Ckxwcm9qZWN0cy9iYW5kaGFuLWEzNDdiL2RhdGFiYXNlcy8oZGVmYXVsdCkvY29sbGVjdGlvbkdyb3Vwcy9ndWVzdHMvaW5kZXhlcy9fEAEaCgoGdXNlcklkEAEaDQoJY3JlYXRlZEF0EAIaDAoIX19uYW1lX18QAg
```

## Index Status
After creating indexes:
- Status will show as "Building" initially
- This can take a few minutes
- Once complete, status will show as "Enabled"
- Your queries will work without errors

## Testing
After creating all indexes:
1. Restart your app
2. Try adding/loading guests, checklist items, budget categories, and vendors
3. Check the console for any remaining index errors

## Troubleshooting
- **Index still building:** Wait a few more minutes
- **Permission denied:** Check your Firestore security rules
- **Collection not found:** Make sure the collection names match exactly

## Next Steps
Once all indexes are created:
1. Your Firebase queries will work properly
2. You can remove the debugging code from the login screen
3. Focus on testing the Google OAuth integration

## Google OAuth Configuration

### Redirect URI Setup
For Google OAuth to work properly, add these redirect URIs to your Google OAuth 2.0 Client ID:

**Primary Redirect URI:**
```
http://localhost:8081/--/login
```

**Additional Development URIs:**
```
http://127.0.0.1:8081/--/login
http://10.211.200.154:8081/--/login
http://localhost:19000/--/login
```

### Steps to Update Google OAuth:
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project: `bandhan-a347b`
3. Navigate to **APIs & Services** → **Credentials**
4. Edit your OAuth 2.0 Client ID
5. In **Authorized redirect URIs**, add the URIs above
6. Click **Save**
7. Restart your app and try Google sign-in again

**Note:** The `bandhan://login` scheme is no longer used for OAuth redirects. We're now using standard HTTP localhost URLs that Google OAuth accepts.
