const GOOGLE_SHEET_API = "YOUR_WEB_APP_URL_HERE";

(async () => {
  const currentDomain = window.location.hostname;

  try {
    // Fetch data (GET is fine here)
    const res = await fetch(`${GOOGLE_SHEET_API}?link=${currentDomain}`);
    const data = await res.json();

    if (data.username && data.password) {
      // Floating toggle button
      const toggle = document.createElement("div");
      toggle.id = "client-toggle";
      toggle.textContent = "🔐";
      document.body.appendChild(toggle);

      // Sidebar
      const sidebar = document.createElement("div");
      sidebar.id = "client-sidebar";
      sidebar.innerHTML = `
        <h3>Client Details</h3>

        <label>Username</label>
        <input type="text" id="client-username" value="${data.username}" />

        <label>Password</label>
        <input type="text" id="client-password" value="${data.password}" />

        <label>Status</label>
        <select id="client-status">
          <option value="Live" ${data.status === "Live" ? "selected" : ""}>Live</option>
          <option value="Pending" ${data.status === "Pending" ? "selected" : ""}>Pending</option>
          <option value="Not Working" ${data.status === "Not Working" ? "selected" : ""}>Not Working</option>
        </select>

        <label>Notes</label>
        <textarea id="client-notes">${data.notes || ""}</textarea>

        <button id="saveChanges">💾 Save Changes</button>
        <p id="saveMsg"></p>
      `;
      document.body.appendChild(sidebar);

      // Toggle sidebar
      toggle.addEventListener("click", () => {
        sidebar.classList.toggle("active");
      });

      // Save Changes (CORS-safe via background.js)
      document.getElementById("saveChanges").addEventListener("click", () => {
        const payload = {
          link: currentDomain,
          username: document.getElementById("client-username").value,
          password: document.getElementById("client-password").value,
          notes: document.getElementById("client-notes").value,
          status: document.getElementById("client-status").value
        };

        const msg = document.getElementById("saveMsg");
        msg.textContent = "Saving...";
        msg.style.color = "#aaa";

        chrome.runtime.sendMessage(
          {
            type: "SAVE_TO_SHEET",
            url: GOOGLE_SHEET_API,
            payload: payload
          },
          (response) => {
            if (response && response.success) {
              msg.textContent = "✅ " + response.result;
              msg.style.color = "#00e676";
            } else {
              msg.textContent = "❌ Error: " + (response?.error || "Save failed");
              msg.style.color = "#f44336";
            }
            setTimeout(() => (msg.textContent = ""), 3000);
          }
        );
      });
    }
  } catch (err) {
    console.error("Error fetching credentials", err);
  }
})();
