# CredSync v3 — Two-Way Google Sheets Sync

### Overview
This version connects the Chrome extension directly to a Google Sheet.  
It can read and update **Username**, **Password**, **Notes**, and **Status** for each domain.

---

### Features
- Auto-detects the current domain and loads matching data from the sheet.  
- Allows editing of all fields.  
- Saves updates back to Google Sheets instantly.  
- Uses Google Apps Script for secure two-way sync.  
- No third-party APIs or paid services required.

---

### Google Sheet Structure
```

Link | Username | Password | Notes | Status

````

---

### Setup Steps
1. Open your Google Sheet and add the columns shown above.  
2. Go to **Extensions → Apps Script** and paste `Code.gs`.  
   - Deploy as **Web App**  
   - Execute as: *Me*  
   - Access: *Anyone with link*  
   - Click **Deploy** and copy the **Web App URL**  
3. In `sidebar.js`, update:
   ```js
   const GOOGLE_SHEET_API = "YOUR_WEB_APP_URL_HERE";
   ````

4. Open `chrome://extensions`

   * Enable **Developer Mode**
   * Click **Load unpacked**
   * Select this folder (`v3_two_way_sync`)

---

### Usage

* Visit any site that matches a `Link` value in your Google Sheet.
* Click the 🔐 icon to open the sidebar.
* Edit **Username**, **Password**, **Notes**, or **Status**.
* Click **Save Changes** to push updates to Google Sheets.

---

### Folder Contents

   ```
   manifest.json   → Extension config
   sidebar.js      → Main logic (fetch + save)
   sidebar.css     → UI styling
   icon.png        → Extension icon
   README.md       → This file
   ```

---

### Notes

* Communicates only with your Google Apps Script URL.
* No data stored locally unless you add it.
* Restrict Google Sheet sharing to trusted users.

---

**Version 3.0** | November 2025
**Author:** Vishwas Moorjani (Buy Your Mart)
