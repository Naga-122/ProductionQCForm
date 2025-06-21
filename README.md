
# ProductionQCForm

This is a lightweight, web-based **Production Quality Control Form** system that uses **Google Sheets as the database** and **Google Apps Script** as the backend.

Users can:
- Search serial numbers
- Fill/update pre-filled inspection forms
- Upload results back into a live Google Sheet

---

## 📁 Project Structure

```
/ProductionQCForm
├── search.html      # Entry point: user searches serial number
├── index.html       # Conditional form logic based on inspection path
├── success.html     # Confirmation page with auto redirect
├── Code.gs          # Google Apps Script backend (GET & POST)
├── README.md        # This file
```

---

## 🔧 Technologies Used

- ✅ HTML5 + Vanilla JavaScript (no frameworks)
- ✅ Google Apps Script (doGet, doPost)
- ✅ Google Sheets (backend database)
- ✅ ZXing Scanner (optional camera barcode support)

---

## 🔄 Page Flow

```
search.html → index.html (form) → success.html
```

### 1. `search.html`
- User enters or scans a serial number
- Backend checks Google Sheet via Apps Script:
  - If **found** → load `index.html?serial=XXXX` pre-filled
  - If **not found** → load blank `index.html` with serial number

### 2. `index.html`
- Shows conditional fields based on logic (e.g., YES/NO answers)
- Pre-fills if data is found
- On submit:
  - Updates existing row if Serial Number exists
  - Creates new row if not

### 3. `success.html`
- Displays success message
- Redirects user to `search.html`
- Prevents back navigation into form page

---

## 🧠 How It Works

### 🔹 Backend (`Code.gs`)
- `doGet(e)`: accepts `?serial=XXXX`, searches Google Sheet, returns JSON
- `doPost(e)`: accepts JSON form submission, updates matching serial number row or appends new one

### 🔹 Google Sheet
- Sheet Name: `ProductionData`
- Column headers must exactly match:
  ```
  Serial Number, S.O Number, Line, Loading, Loading Date, Loading Defect, Part Number,
  Leak Test, Leak Test Defect, Part Number, Testing, Testing Defect, Part Number,
  Upload Photo, Finishing, Finishing Date, Finishing Defect, Part Number
  ```

---

## 🚀 Hosting Options

You can:
- Host these files in **GitHub** (for versioning)
- Or use **Google Apps Script HtmlService** to serve the full frontend

---

## 📦 Deploying Backend

1. Open `Code.gs` inside [Google Apps Script](https://script.google.com)
2. Deploy as **Web App**:
   - Execute as: `Me`
   - Access: `Anyone`
3. Copy the Web App URL and plug it into all 3 HTML files as `scriptURL`

---

## 🔗 Example Hosted Pages

- Search Page: `https://script.google.com/macros/s/AKfycb.../exec`
- Form Page: `https://script.google.com/macros/s/AKfycb.../exec?page=index&serial=123456789012`
- Success Page: `https://script.google.com/macros/s/AKfycb.../exec?page=success`

---

## 🤝 Author

Developed by [Your Name] using best practices in Apps Script and frontend JS  
🔗 GitHub: [github.com/yourusername](https://github.com/yourusername)
