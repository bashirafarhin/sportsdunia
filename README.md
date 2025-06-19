## ✅ Features Implemented

### 1. 🔐 User Authentication
- Login & registration using email/password.
- Role-based access (`admin` / `user`) with protected routes.
- Admin-only dashboard access.
- Offline support using `localStorage` to persist user session and role.

### 2. 🗞 News & Blog Integration
- Fetches articles using the News API.
- Displays author, date, and type for each article.
- Supports pagination.

### 3. 🔍 Filtering & Search
- Filter by author, date range, and type (article/blog).
- Global keyword search bar.
- Client-side filtering for type and author.

### 4. 🎨 Responsive Design
- Fully responsive layout using Tailwind CSS.
- Works smoothly on both mobile and desktop screens.

### 5. 🌓 Dark Mode
- Custom `useDarkMode` hook with `localStorage` persistence.
- Toggle available in UI.
- Fully themed with Tailwind's `dark:` classes.

### 6. 📶 Offline Mode
- If offline, falls back to cached data in `localStorage`.
- If API fails, attempts to show cached results with graceful error messages.

### 7. 💸 Admin Payout Dashboard
- Admin can set payout rates per article/blog.
- Automatically calculates payouts based on article count.
- Inline editable table for authors and payout values.
- Payout data saved in localStorage.

### 8. 📤 Export Features
- Admins can export payout details:
  - 📄 PDF
  - 📊 CSV
  - 🔗 Google Sheets (manual integration-ready)

---

## 🧪 Admin Credentials (for testing)

```js
ADMIN_EMAIL = "admin@admin.com"
ADMIN_PASSWORD = "admin"
```

## Install Dependencies

- To run client:
```
cd ./client
npm i
npm run dev
```
- To run server:
```
cd ./server
npm i
nodemon server.js
```