// ------------------- CONFIG & STATE -------------------
const GEMINI_API_KEY =
  "GEMINI_VIRTUAL_KEY_FOR_BUDGET_KARO_001"; // demo key placeholder

const appState = {
  transactions: [],
  bills: [],
  banks: [],
  profile: {},
  theme: "dark",
  language: "en",
  lastOldTaxTotal: 0,
  lastNewTaxTotal: 0,
};

let barChart, pieChart;

// ------------- EXTENDED i18n for 22 Indian languages -------------
const i18n = {
  en: {
    dashboard: "Dashboard",
    subtitle: "Unified view of spending, savings and goals",
    summaryInflows: "Total Inflows",
    summaryOutflows: "Total Outflows",
    summaryNet: "Net Position",
    themeLabel: "Theme",
    languageLabel: "Language",
  },
  hi: {
    dashboard: "डैशबोर्ड",
    subtitle: "आय और खर्च को एक ही स्थान पर ट्रैक करें",
    summaryInflows: "कुल आय (इनफ्लो)",
    summaryOutflows: "कुल व्यय (आउटफ्लो)",
    summaryNet: "शुद्ध स्थिति",
    themeLabel: "थीम",
    languageLabel: "भाषा",
  },
  bn: {
    dashboard: "ড্যাশবোর্ড",
    subtitle: "এক জায়গায় আয় ও ব্যয় ট্র্যাক করুন",
    summaryInflows: "মোট ইনফ্লো",
    summaryOutflows: "মোট আউটফ্লো",
    summaryNet: "নিট পজিশন",
    themeLabel: "থিম",
    languageLabel: "ভাষা",
  },
  te: {
    dashboard: "డ్యాష్‌బోర్డ్",
    subtitle: "ఆదాయం - ఖర్చులను ఒకే చోట ట్రాక్ చేయండి",
    summaryInflows: "మొత్తం ఇన్‌ఫ్లో",
    summaryOutflows: "మొత్తం ఔట్‌ఫ్లో",
    summaryNet: "నికర స్థితి",
    themeLabel: "థీమ్",
    languageLabel: "భాష",
  },
  mr: {
    dashboard: "डॅशबोर्ड",
    subtitle: "उत्पन्न आणि खर्च एका ठिकाणी पाहा",
    summaryInflows: "एकूण इनफ्लो",
    summaryOutflows: "एकूण आऊटफ्लो",
    summaryNet: "निव्वळ स्थिती",
    themeLabel: "थीम",
    languageLabel: "भाषा",
  },
  ta: {
    dashboard: "டாஷ்போர்டு",
    subtitle: "வரவும் செலவும் ஒரே இடத்தில் கண்காணிக்கவும்",
    summaryInflows: "மொத்த வரவு",
    summaryOutflows: "மொத்த செலவு",
    summaryNet: "நிகர நிலை",
    themeLabel: "தீம்",
    languageLabel: "மொழி",
  },
  gu: {
    dashboard: "ડેશબોર્ડ",
    subtitle: "એક સ્થાન પર આવક અને ખર્ચ ટ્રેક કરો",
    summaryInflows: "કુલ ઇન્ફ્લો",
    summaryOutflows: "કુલ આઉટફ્લો",
    summaryNet: "નેટ સ્થિતિ",
    themeLabel: "થીમ",
    languageLabel: "ભાષા",
  },
  kn: {
    dashboard: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
    subtitle: "ಆದಾಯ ಮತ್ತು ವೆಚ್ಚಗಳನ್ನುೊಂದೇ ಜಾಗದಲ್ಲಿ ನೋಡಿ",
    summaryInflows: "ಒಟ್ಟು ಇನ್‌ಫ್ಲೋ",
    summaryOutflows: "ಒಟ್ಟು ಔಟ್‌ಫ್ಲೋ",
    summaryNet: "ನಿವ್ವಳ ಸ್ಥಿತಿ",
    themeLabel: "ಥೀಮ್",
    languageLabel: "ಭಾಷೆ",
  },
  ml: {
    dashboard: "ഡാഷ്ബോർഡ്",
    subtitle: "വരുമാനവും ചെലവും ഒന്നിച്ച് നിരീക്ഷിക്കുക",
    summaryInflows: "മൊത്തം വരവ്",
    summaryOutflows: "മൊത്തം ചെലവ്",
    summaryNet: "ശുദ്ധ നില",
    themeLabel: "തീം",
    languageLabel: "ഭാഷ",
  },
  or: {
    dashboard: "ଡ୍ୟାସବୋର୍ଡ",
    subtitle: "ଆୟ ଓ ଖର୍ଚ୍ଚକୁ ଏକେ ସ୍ଥାନରେ ଦେଖନ୍ତୁ",
    summaryInflows: "ମୋଟ ଇନ୍‌ଫ୍ଲୋ",
    summaryOutflows: "ମୋଟ ଆଉଟ୍‌ଫ୍ଲୋ",
    summaryNet: "ନିଷ୍ପତ୍ତି",
    themeLabel: "ଥିମ୍",
    languageLabel: "ଭାଷା",
  },
  pa: {
    dashboard: "ਡੈਸ਼ਬੋਰਡ",
    subtitle: "ਇਕੋ ਥਾਂ ਤੇ ਆਮਦਨ ਤੇ ਖਰਚ ਦੇਖੋ",
    summaryInflows: "ਕੁੱਲ ਇਨਫਲੋ",
    summaryOutflows: "ਕੁੱਲ ਆਉਟਫਲੋ",
    summaryNet: "ਸ਼ੁੱਧ ਪੋਜ਼ੀਸ਼ਨ",
    themeLabel: "ਥੀਮ",
    languageLabel: "ਭਾਸ਼ਾ",
  },
  as: {
    dashboard: "ড্যাশব'ৰ্ড",
    subtitle: "একেটা স্থানত আয় আৰু খৰচ চাওক",
    summaryInflows: "মুঠ ইনফ্লো",
    summaryOutflows: "মুঠ আউটফ্লো",
    summaryNet: "নিট অৱস্থা",
    themeLabel: "থীম",
    languageLabel: "ভাষা",
  },
  ur: {
    dashboard: "ڈیش بورڈ",
    subtitle: "ایک جگہ پر آمدن اور اخراجات دیکھیں",
    summaryInflows: "کل ان فلو",
    summaryOutflows: "کل آؤٹ فلو",
    summaryNet: "خالص پوزیشن",
    themeLabel: "تھیم",
    languageLabel: "زبان",
  },
  ne: {
    dashboard: "ड्यासबोर्ड",
    subtitle: "एकै ठाउँमा आय र खर्च हेर्नुहोस्",
    summaryInflows: "कुल इनफ्लो",
    summaryOutflows: "कुल आउटफ्लो",
    summaryNet: "शुद्ध अवस्था",
    themeLabel: "थिम",
    languageLabel: "भाषा",
  },
  sd: {
    dashboard: "ڊيش بورڊ",
    subtitle: "آمدني ۽ خرچ هڪ هنڌ ڏسو",
    summaryInflows: "ڪل انفلو",
    summaryOutflows: "ڪل آئوٽ فلو",
    summaryNet: "خالص حيثيت",
    themeLabel: "ٿيم",
    languageLabel: "ٻولي",
  },
  sa: {
    dashboard: "प्रदर्शफलकम्",
    subtitle: "आयव्यययोः एकीकृतं दर्शनम्",
    summaryInflows: "समग्र प्रवाहः",
    summaryOutflows: "समग्र निर्गमः",
    summaryNet: "शुद्धस्थितिः",
    themeLabel: "वर्णरचना",
    languageLabel: "भाषा",
  },
  bo: {
    dashboard: "ड्यासबोर्ड",
    subtitle: "आय खर्चको एउटै दृश्य (डेमो)",
    summaryInflows: "जम्मा इनफ्लो",
    summaryOutflows: "जम्मा आउटफ्लो",
    summaryNet: "शुद्ध स्थिति",
    themeLabel: "थिम",
    languageLabel: "भाषा",
  },
  sat: {
    dashboard: "ᱫᱮᱥᱵᱚᱨᱰ",
    subtitle: "ᱛᱟᱹᱲᱚ ᱟᱨ ᱯᱟᱱᱛᱤ ᱧᱮᱞ ᱠᱟᱨᱟ",
    summaryInflows: "ᱢᱩᱛᱟ ᱚᱱᱯᱨᱟᱹᱣ",
    summaryOutflows: "ᱢᱩᱛᱟ ᱚᱱᱯᱨᱤᱭᱟᱹᱣ",
    summaryNet: "ᱥᱩᱦᱤᱧ ᱢᱩᱛᱟ",
    themeLabel: "ᱛᱷᱤᱢ",
    languageLabel: "ᱯᱟᱱᱛᱤ",
  },
  mai: {
    dashboard: "ड्यासबोर्ड",
    subtitle: "एक जगह आय-व्यय के तस्वीर",
    summaryInflows: "कुल इनफ्लो",
    summaryOutflows: "कुल आउटफ्लो",
    summaryNet: "शुद्ध स्थिति",
    themeLabel: "थीम",
    languageLabel: "भाषा",
  },
  doi: {
    dashboard: "डैशबोर्ड",
    subtitle: "एके ठांउ आमदनी-खर्च देखो",
    summaryInflows: "कुल इनफ्लो",
    summaryOutflows: "कुल आउटफ्लो",
    summaryNet: "शुद्ध पोजीशन",
    themeLabel: "थीम",
    languageLabel: "भाषा",
  },
  kok: {
    dashboard: "डॅशबोर्ड",
    subtitle: "एकाच ठिकाणी आवक-जावक बघा",
    summaryInflows: "एकूण इनफ्लो",
    summaryOutflows: "एकूण आऊटफ्लो",
    summaryNet: "नेटन स्थिती",
    themeLabel: "थीम",
    languageLabel: "भाषा",
  },
  mni: {
    dashboard: "ড্যাসবোর্ড",
    subtitle: "ইনকাম অমসু এক্সপেন্স অদোম লৈবা",
    summaryInflows: "মতো ইনফ্লো",
    summaryOutflows: "মতো আউটফ্লো",
    summaryNet: "নেট পজিশন",
    themeLabel: "থিম",
    languageLabel: "লোন",
  },
};

function applyTranslations() {
  const lang = appState.language;
  const t = i18n[lang] || i18n.en;

  const activeNav = document.querySelector(".nav-item.active");
  if (activeNav && activeNav.dataset.view === "dashboardView") {
    document.getElementById("pageTitle").innerText = t.dashboard;
    document.getElementById("pageSubtitle").innerText = t.subtitle;
  }

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (t[key]) el.textContent = t[key];
  });

  const themeLabel = document.querySelector(".theme-toggle-label");
  if (themeLabel && t.themeLabel) themeLabel.textContent = t.themeLabel;

  const langLabel = document.querySelector(".sidebar-section-label");
  if (langLabel && t.languageLabel) langLabel.textContent = t.languageLabel;
}

// ------------------- UTILITIES -------------------
const formatterINR = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 2,
});

function nowString() {
  const d = new Date();
  return d.toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function updateClock() {
  const el = document.getElementById("currentTimeLabel");
  if (el) el.innerText = nowString();
}
setInterval(updateClock, 30000);

// ------------------- THEME HANDLING -------------------
function setTheme(theme) {
  appState.theme = theme;
  document.documentElement.setAttribute("data-theme", theme);
  if (barChart || pieChart) {
    renderCharts();
  }
}

function toggleTheme() {
  const next = appState.theme === "dark" ? "light" : "dark";
  setTheme(next);
  localStorage.setItem("budgetKaroTheme", next);
}

function initTheme() {
  const saved = localStorage.getItem("budgetKaroTheme");
  if (saved === "light" || saved === "dark") {
    appState.theme = saved;
  } else {
    appState.theme = "dark";
  }
  setTheme(appState.theme);

  const toggle = document.getElementById("themeToggle");
  if (toggle) {
    toggle.addEventListener("click", toggleTheme);
  }
}

// ----- Hidden 2FA & OTP demo -----
function generateOtpDemo() {
  return Math.floor(100000 + Math.random() * 900000);
}
function demoSendOtpToChannel(channel, value) {
  console.log(
    "Demo OTP sent to",
    channel,
    value,
    "OTP:",
    generateOtpDemo()
  );
}
function setupTwoFactorDemo() {
  const mockSecret = "TWO_FACTOR_DEMO_SECRET";
  console.log("2FA demo initialized with secret:", mockSecret);
}

// ------------------- LOGIN HANDLING -------------------
function initLogin() {
  const loginBtn = document.getElementById("loginBtn");
  const userInput = document.getElementById("loginUser");
  const passInput = document.getElementById("loginPass");
  const forgotLink = document.getElementById("forgotPasswordLink");

  loginBtn.addEventListener("click", () => {
    const u = userInput.value.trim();
    const p = passInput.value.trim();
    if (u === "ALONEPROFESSOR" && p === "0705") {
      document.getElementById("loginView").style.display = "none";
      document.getElementById("appMain").style.display = "flex";
      updateClock();
      setupTwoFactorDemo();
    } else {
      alert("Invalid credentials for demo session.");
    }
  });

  forgotLink.addEventListener("click", () => {
    const channel = prompt(
      "Send OTP via 'phone' or 'email' (demo only):"
    );
    if (!channel) return;
    const value = prompt("Enter target phone/email (demo only):");
    if (!value) return;
    demoSendOtpToChannel(channel, value);
    alert("Demo OTP dispatched in console log.");
  });
}

// ------------------- NAVIGATION -------------------
function setActiveView(viewId) {
  document.querySelectorAll(".nav-item").forEach((nav) => {
    nav.classList.toggle("active", nav.dataset.view === viewId);
  });

  document.querySelectorAll(".panel .view").forEach((v) => {
    const isTarget = v.id === viewId;
    v.classList.toggle("active", isTarget);
    if (isTarget) {
      v.classList.add("category-animate");
      setTimeout(() => v.classList.remove("category-animate"), 430);
    }
  });

  const titleMap = {
    dashboardView: [
      i18n[appState.language]?.dashboard || "Dashboard",
      i18n[appState.language]?.subtitle ||
        "Unified view of spending, savings and goals",
    ],
    transactionsView: [
      "Transactions",
      "Capture debits, credits with timestamps",
    ],
    investView: ["Invest & SIP", "Model SIP / SWP scenarios"],
    taxView: ["Tax & Regimes", "Compare old vs new tax regimes"],
    billsView: [
      "Bills & Reminders",
      "Stay ahead of monthly obligations",
    ],
    profileView: [
      "Profile & Banks",
      "Maintain your personal context",
    ],
    tradingView: [
      "Trading (Demo)",
      "Illustrative multi-exchange snapshot",
    ],
  };

  const meta = titleMap[viewId];
  if (meta) {
    document.getElementById("pageTitle").innerText = meta[0];
    document.getElementById("pageSubtitle").innerText = meta[1];
  }
}

function initNav() {
  document.querySelectorAll(".nav-item").forEach((nav) => {
    nav.addEventListener("click", () => setActiveView(nav.dataset.view));
  });

  document.querySelectorAll(".section-tabs").forEach((tabGroup) => {
    tabGroup.addEventListener("click", (e) => {
      const btn = e.target.closest(".section-tab");
      if (!btn) return;
      const subviewId = btn.dataset.subview;

      tabGroup
        .querySelectorAll(".section-tab")
        .forEach((b) => b.classList.toggle("active", b === btn));

      const container = tabGroup.parentElement;
      container
        .querySelectorAll(".view")
        .forEach((v) => v.classList.toggle("active", v.id === subviewId));

      const activeView = container.querySelector(".view.active");
      if (activeView) {
        activeView.classList.add("category-animate");
        setTimeout(
          () => activeView.classList.remove("category-animate"),
          430
        );
      }
    });
  });
}

// ------------------- TRANSACTIONS -------------------
function addTransaction() {
  const type = document.getElementById("txType").value;
  const amount = parseFloat(
    document.getElementById("txAmount").value || "0"
  );
  const category = (
    document.getElementById("txCategory").value || "General"
  ).trim();
  const account = (
    document.getElementById("txAccount").value || "Primary"
  ).trim();
  const note = (document.getElementById("txNote").value || "").trim();

  if (!amount || amount <= 0) {
    alert("Please enter a valid INR amount.");
    return;
  }

  const now = new Date();
  const tx = {
    id: Date.now(),
    type,
    amount,
    category,
    account,
    note,
    date: now.toLocaleDateString("en-IN"),
    time: now.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };

  appState.transactions.unshift(tx);
  document.getElementById("txAmount").value = "";

  renderTransactions();
  renderDashboardSummary();
  renderCharts();
}

function renderTransactions() {
  const tbody = document.getElementById("txBody");
  const recentBody = document.getElementById("recentBody");
  tbody.innerHTML = "";
  recentBody.innerHTML = "";

  appState.transactions.forEach((tx) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${tx.date}</td>
      <td>${tx.time}</td>
      <td><span class="badge ${
        tx.type
      }">${tx.type === "debit" ? "Debit" : "Credit"}</span></td>
      <td>${tx.account}</td>
      <td>${tx.category}</td>
      <td>${tx.note || "-"}</td>
      <td>${formatterINR.format(tx.amount)}</td>`;
    tbody.appendChild(tr);
  });

  appState.transactions.slice(0, 6).forEach((tx) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${tx.date} ${tx.time}</td>
      <td><span class="badge ${
        tx.type
      }">${tx.type === "debit" ? "Debit" : "Credit"}</span></td>
      <td>${tx.account}</td>
      <td>${tx.category}</td>
      <td>${formatterINR.format(tx.amount)}</td>`;
    recentBody.appendChild(tr);
  });
}

function renderDashboardSummary() {
  const sumCredit = appState.transactions
    .filter((t) => t.type === "credit")
    .reduce((a, t) => a + t.amount, 0);
  const sumDebit = appState.transactions
    .filter((t) => t.type === "debit")
    .reduce((a, t) => a + t.amount, 0);
  const net = sumCredit - sumDebit;

  document.getElementById("sumCredit").innerText =
    formatterINR.format(sumCredit);
  document.getElementById("sumDebit").innerText =
    formatterINR.format(sumDebit);
  document.getElementById("sumNet").innerText = formatterINR.format(net);

  const netLabel = document.getElementById("netTrendLabel");
  if (net > 0) {
    netLabel.innerText = "Surplus – aligned to savings plan";
    netLabel.classList.remove("negative");
    netLabel.classList.add("positive");
  } else if (net < 0) {
    netLabel.innerText = "Deficit – review outgoing flows";
    netLabel.classList.remove("positive");
    netLabel.classList.add("negative");
  } else {
    netLabel.innerText = "Breakeven – monitor upcoming bills";
    netLabel.classList.remove("positive", "negative");
  }
}

// ------------- CHARTS (Bar & Pie) -------------
function renderCharts() {
  const barCanvas = document.getElementById("barChart");
  const pieCanvas = document.getElementById("pieChart");
  if (!barCanvas || !pieCanvas) return;

  const ctxBar = barCanvas.getContext("2d");
  const ctxPie = pieCanvas.getContext("2d");

  const byCategory = {};
  appState.transactions.forEach((tx) => {
    const key = tx.category || "General";
    if (!byCategory[key]) byCategory[key] = 0;
    const delta = tx.type === "debit" ? -tx.amount : tx.amount;
    byCategory[key] += delta;
  });
  const labels = Object.keys(byCategory);
  const values = Object.values(byCategory);

  if (barChart) barChart.destroy();
  barChart = new Chart(ctxBar, {
    type: "bar",
    data: {
      labels,
      datasets: [
        {
          label: "Net by Category",
          data: values,
        },
      ],
    },
    options: {
      animation: {
        duration: 600,
        easing: "easeOutQuart",
      },
      plugins: {
        legend: { display: false },
      },
      scales: {
        x: {
          grid: { display: false },
        },
        y: {
          grid: {
            color: "rgba(148,163,184,0.3)",
          },
        },
      },
    },
  });

  const credit = appState.transactions
    .filter((t) => t.type === "credit")
    .reduce((a, t) => a + t.amount, 0);
  const debit = appState.transactions
    .filter((t) => t.type === "debit")
    .reduce((a, t) => a + t.amount, 0);

  if (pieChart) pieChart.destroy();
  pieChart = new Chart(ctxPie, {
    type: "pie",
    data: {
      labels: ["Credit", "Debit"],
      datasets: [
        {
          data: [credit, debit],
        },
      ],
    },
    options: {
      animation: {
        duration: 700,
        easing: "easeOutBack",
      },
      plugins: {
        legend: { position: "bottom" },
      },
    },
  });
}

// ------------- DOWNLOAD TRANSACTIONS -------------
function downloadTransactions() {
  const debit = appState.transactions.filter((t) => t.type === "debit");
  const credit = appState.transactions.filter((t) => t.type === "credit");

  const buildTable = (title, rows) => `
    <h2>${title}</h2>
    <table border="1" cellspacing="0" cellpadding="4">
      <thead>
        <tr>
          <th>Date</th><th>Time</th><th>Account</th><th>Category</th><th>Note</th><th>Amount (INR)</th>
        </tr>
      </thead>
      <tbody>
        ${rows
          .map(
            (r) => `<tr>
          <td>${r.date}</td>
          <td>${r.time}</td>
          <td>${r.account}</td>
          <td>${r.category}</td>
          <td>${r.note || ""}</td>
          <td>${formatterINR.format(r.amount)}</td>
        </tr>`
          )
          .join("")}
      </tbody>
    </table>`;

  const html = `
    <html><head><meta charset="UTF-8"><title>Budget Karo Transactions</title>
    <style>
      body{font-family:system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;background:#f9fafb;padding:16px;}
      h1{margin-bottom:12px;}
      h2{margin-top:16px;}
      table{border-collapse:collapse;width:100%;margin-top:8px;}
      th,td{font-size:12px;border:1px solid #cbd5f5;padding:4px 6px;text-align:left;}
      thead{background:#e5e7eb;}
    </style>
    </head><body>
    <h1>Budget Karo – Debit / Credit Tables</h1>
    ${buildTable("Debit Transactions", debit)}
    ${buildTable("Credit Transactions", credit)}
    </body></html>`;

  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "budget_karo_transactions.html";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// ------------- SIP & SWP -------------
function calcSip() {
  const P = parseFloat(
    document.getElementById("sipAmount").value || "0"
  );
  const r =
    parseFloat(document.getElementById("sipRate").value || "0") / 100;
  const years = parseFloat(
    document.getElementById("sipYears").value || "0"
  );
  if (P <= 0 || years <= 0) {
    alert("Enter valid SIP amount and tenure.");
    return;
  }
  const n = 12;
  const months = years * 12;
  const i = r / n;
  const fv = P * ((Math.pow(1 + i, months) - 1) / i) * (1 + i);
  const invested = P * months;
  const gain = fv - invested;

  document.getElementById("sipInvested").innerText =
    formatterINR.format(invested);
  document.getElementById("sipFuture").innerText =
    formatterINR.format(fv);
  document.getElementById("sipGain").innerText =
    formatterINR.format(gain);
}

function calcSwp() {
  const corpus = parseFloat(
    document.getElementById("swpCorpus").value || "0"
  );
  const w = parseFloat(
    document.getElementById("swpWithdrawal").value || "0"
  );
  const r =
    parseFloat(document.getElementById("swpRate").value || "0") / 100;
  if (corpus <= 0 || w <= 0) {
    alert("Enter valid corpus and withdrawal.");
    return;
  }
  const i = r / 12;
  let balance = corpus;
  let months = 0;
  while (balance > 0 && months < 1000) {
    balance = balance * (1 + i) - w;
    months++;
  }
  document.getElementById("swpMonths").innerText = months.toString();
  document.getElementById("swpYears").innerText = (
    months / 12
  ).toFixed(1);
}

// ------------- TAX REGIME CALCULATORS -------------
function computeOldTax(taxable) {
  let tax = 0;
  let remaining = taxable;
  const bands = [
    [250000, 0],
    [250000, 0.05],
    [500000, 0.2],
    [Infinity, 0.3],
  ];
  for (const [slab, rate] of bands) {
    const amt = Math.min(remaining, slab);
    if (amt <= 0) break;
    tax += amt * rate;
    remaining -= amt;
  }
  return tax;
}

function computeNewTax(taxable) {
  let tax = 0;
  const slabs = [
    [300000, 0],
    [300000, 0.05],
    [300000, 0.1],
    [300000, 0.15],
    [300000, 0.2],
    [Infinity, 0.3],
  ];
  let rem = taxable;
  for (const [slab, rate] of slabs) {
    const amt = Math.min(rem, slab);
    if (amt <= 0) break;
    tax += amt * rate;
    rem -= amt;
  }
  return tax;
}

function calcOldRegime() {
  const inc = parseFloat(
    document.getElementById("oldIncome").value || "0"
  );
  const ded = parseFloat(
    document.getElementById("oldDeductions").value || "0"
  );
  const net = Math.max(0, inc - ded);
  const tax = computeOldTax(net);
  const cess = tax * 0.04;
  const total = tax + cess;

  appState.lastOldTaxTotal = total;

  document.getElementById("oldNet").innerText = formatterINR.format(net);
  document.getElementById("oldTax").innerText = formatterINR.format(tax);
  document.getElementById("oldCess").innerText = formatterINR.format(cess);
  document.getElementById("oldTotal").innerText =
    formatterINR.format(total);
  updateTaxComparisonNote();
}

function calcNewRegime() {
  const inc = parseFloat(
    document.getElementById("newIncome").value || "0"
  );
  const net = Math.max(0, inc);
  const tax = computeNewTax(net);
  const cess = tax * 0.04;
  const total = tax + cess;

  appState.lastNewTaxTotal = total;

  document.getElementById("newNet").innerText = formatterINR.format(net);
  document.getElementById("newTax").innerText = formatterINR.format(tax);
  document.getElementById("newCess").innerText = formatterINR.format(cess);
  document.getElementById("newTotal").innerText =
    formatterINR.format(total);
  updateTaxComparisonNote();
}

function updateTaxComparisonNote() {
  const oldT = appState.lastOldTaxTotal || 0;
  const newT = appState.lastNewTaxTotal || 0;
  const noteEl = document.getElementById("taxCompareNote");

  if (!oldT && !newT) {
    noteEl.textContent = "Compute both regimes to compare surplus.";
    return;
  }
  if (oldT && !newT) {
    noteEl.textContent =
      "New regime not evaluated yet for comparison.";
    return;
  }
  if (!oldT && newT) {
    noteEl.textContent =
      "Old regime not evaluated yet for comparison.";
    return;
  }

  if (oldT < newT) {
    noteEl.textContent =
      "Old regime yields lower total tax than New regime.";
  } else if (newT < oldT) {
    noteEl.textContent =
      "New regime yields lower total tax than Old regime.";
  } else {
    noteEl.textContent =
      "Both regimes are equal in total tax for the given values.";
  }
}

// ------------- BILLS / REMINDERS -------------
function addBill() {
  const name = (document.getElementById("billName").value || "").trim();
  const amount = parseFloat(
    document.getElementById("billAmount").value || "0"
  );
  const due = document.getElementById("billDue").value || "";
  if (!name || !amount || !due) {
    alert("Enter bill name, amount and due date.");
    return;
  }
  appState.bills.push({ name, amount, due });
  document.getElementById("billName").value = "";
  document.getElementById("billAmount").value = "";
  document.getElementById("billDue").value = "";
  renderBills();
}

function renderBills() {
  const list = document.getElementById("billsList");
  list.innerHTML = "";
  appState.bills.forEach((b) => {
    const li = document.createElement("li");
    li.innerHTML = `<span>${b.name} (due: ${b.due})</span><span>${formatterINR.format(
      b.amount
    )}</span>`;
    list.appendChild(li);
  });
}

// ------------- PROFILE & BANKS -------------
function saveProfile() {
  appState.profile = {
    name: document.getElementById("profileName").value,
    dob: document.getElementById("profileDob").value,
    phone: document.getElementById("profilePhone").value,
    email: document.getElementById("profileEmail").value,
  };
  alert("Profile saved locally for this browser session.");
}

function addBank() {
  const holder = (
    document.getElementById("bankHolder").value || ""
  ).trim();
  const acc = (
    document.getElementById("bankAccount").value || ""
  ).trim();
  const ifsc = (document.getElementById("bankIfsc").value || "").trim();
  if (!holder || !acc || !ifsc) {
    alert("Enter complete bank details.");
    return;
  }
  appState.banks.push({ holder, acc, ifsc });
  document.getElementById("bankHolder").value = "";
  document.getElementById("bankAccount").value = "";
  document.getElementById("bankIfsc").value = "";
  renderBanks();
}

function renderBanks() {
  const wrap = document.getElementById("bankListWrap");
  wrap.innerHTML = "";
  appState.banks.forEach((b) => {
    const div = document.createElement("div");
    div.className = "badge-bank";
    div.innerHTML = `<span><strong>${b.holder}</strong></span>
      <span>Acc: ${b.acc}</span>
      <span>IFSC: ${b.ifsc}</span>`;
    wrap.appendChild(div);
  });
}

// ------------- TRADING DEMO -------------
function initTradingDemo() {
  const rows = [
    {
      ex: "NSE",
      sym: "NIFTY50",
      ltp: "22,450.25",
      chg: "+0.85%",
      reg: "India",
    },
    {
      ex: "BSE",
      sym: "SENSEX",
      ltp: "74,120.10",
      chg: "+0.42%",
      reg: "India",
    },
    {
      ex: "NASDAQ",
      sym: "NDX",
      ltp: "19,820.30",
      chg: "-0.12%",
      reg: "USA",
    },
    {
      ex: "NYSE",
      sym: "DJI",
      ltp: "39,210.40",
      chg: "+0.25%",
      reg: "USA",
    },
    {
      ex: "LSE",
      sym: "FTSE100",
      ltp: "8,120.70",
      chg: "+0.05%",
      reg: "UK",
    },
    {
      ex: "TSE",
      sym: "NIKKEI225",
      ltp: "41,200.50",
      chg: "+1.15%",
      reg: "Japan",
    },
  ];
  const body = document.getElementById("tradingBody");
  rows.forEach((r) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${r.ex}</td><td>${r.sym}</td><td>${r.ltp}</td><td>${r.chg}</td><td>${r.reg}</td>`;
    body.appendChild(tr);
  });
}

// ------------- LANGUAGE SELECTOR -------------
function initLanguage() {
  const sel = document.getElementById("languageSelect");
  sel.addEventListener("change", () => {
    appState.language = sel.value;
    applyTranslations();
  });
  applyTranslations();
}

// ------------- INIT -------------
document.addEventListener("DOMContentLoaded", () => {
  initLogin();
  initNav();
  initTheme();
  initLanguage();
  initTradingDemo();
  updateClock();

  document
    .getElementById("addTxBtn")
    .addEventListener("click", addTransaction);
  document
    .getElementById("downloadTxBtn")
    .addEventListener("click", downloadTransactions);
  document
    .getElementById("calcSipBtn")
    .addEventListener("click", calcSip);
  document
    .getElementById("calcSwpBtn")
    .addEventListener("click", calcSwp);
  document
    .getElementById("calcOldTaxBtn")
    .addEventListener("click", calcOldRegime);
  document
    .getElementById("calcNewTaxBtn")
    .addEventListener("click", calcNewRegime);
  document
    .getElementById("addBillBtn")
    .addEventListener("click", addBill);
  document
    .getElementById("saveProfileBtn")
    .addEventListener("click", saveProfile);
  document
    .getElementById("addBankBtn")
    .addEventListener("click", addBank);

  renderDashboardSummary();
  renderCharts();
});
