// ======================================
// TradeTrack Pro
// Add Trade JavaScript
// ======================================
// ==============================
// Apply Saved Theme
// ==============================



console.log("JS Loaded");
// ---------- Form Elements ----------
if(localStorage.getItem("isLoggedIn") !== "true"){

    window.location.href = "index.html";

}

const tradeForm = document.getElementById("tradeForm");

const stock = document.getElementById("stock");
const type = document.getElementById("type");
const entry = document.getElementById("entry");
const exit = document.getElementById("exit");
const quantity = document.getElementById("quantity");
const strategy = document.getElementById("strategy");
const emotion = document.getElementById("emotion");
const date = document.getElementById("date");
const notes = document.getElementById("notes");

const pnl = document.getElementById("pnl");

// ---------- Auto Today's Date ----------

date.value = new Date().toISOString().split("T")[0];

// ---------- Live Profit / Loss ----------

function calculatePnL() {

    const entryPrice = Number(entry.value);
    const exitPrice = Number(exit.value);
    const qty = Number(quantity.value);

    if (!entryPrice || !exitPrice || !qty) {

        pnl.innerHTML = "₹0";
        pnl.style.color = "#2563eb";
        return;

    }

    let result = 0;

    if (type.value === "BUY") {

        result = (exitPrice - entryPrice) * qty;

    } else {

        result = (entryPrice - exitPrice) * qty;

    }

    pnl.innerHTML = "₹" + result.toFixed(2);

    if (result >= 0) {

        pnl.style.color = "#16a34a";

    } else {

        pnl.style.color = "#dc2626";

    }

}

// ---------- Live Events ----------

entry.addEventListener("input", calculatePnL);
exit.addEventListener("input", calculatePnL);
quantity.addEventListener("input", calculatePnL);
type.addEventListener("change", calculatePnL);



// ---------- Save Trade ----------

tradeForm.addEventListener("submit", function (e) {

    e.preventDefault();

    console.log("Submit Working");

    // Current User
    const currentUser = JSON.parse(localStorage.getItem("currentUser")) || {};

    // Trade Object
    const trade = {

        id: Date.now(),

        username: currentUser.username || "Guest",

        stock: stock.value.trim(),

        type: type.value,

        entry: Number(entry.value),

        exit: Number(exit.value),

        quantity: Number(quantity.value),

        strategy: strategy.value.trim(),

        emotion: emotion.value.trim(),

        date: date.value,

        notes: notes.value.trim(),

        pnl: Number(pnl.innerHTML.replace("₹", ""))

    };

    // Get Existing Trades
    let trades = [];

    try {

        trades = JSON.parse(localStorage.getItem("trades")) || [];

    } catch (error) {

        console.log(error);

        trades = [];

    }

    // Save
    trades.push(trade);

    localStorage.setItem("trades", JSON.stringify(trades));

    console.log("Saved Trades:", trades);

    alert("✅ Trade Saved Successfully!");

    tradeForm.reset();

    pnl.innerHTML = "₹0";

    pnl.style.color = "#2563eb";

    date.value = new Date().toISOString().split("T")[0];

});