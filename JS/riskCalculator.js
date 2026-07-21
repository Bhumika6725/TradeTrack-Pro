// ==========================================
// TradeTrack Pro - Risk Calculator
// ==========================================

// Inputs
// ==============================
// Apply Saved Theme
// ==============================

window.addEventListener("DOMContentLoaded", () => {

if(localStorage.getItem("isLoggedIn") !== "true"){

    window.location.href = "index.html";

}
const capital = document.getElementById("capital");
const riskPercent = document.getElementById("riskPercent");
const entryPrice = document.getElementById("entryPrice");
const stopLoss = document.getElementById("stopLoss");

const calculateBtn = document.getElementById("calculateBtn");

// Outputs

const riskAmount = document.getElementById("riskAmount");
const riskPerShare = document.getElementById("riskPerShare");
const quantity = document.getElementById("quantity");
const positionSize = document.getElementById("positionSize");


// ==========================================
// Calculate Function
// ==========================================

function calculateRisk() {

    let cap = Number(capital.value);
    let risk = Number(riskPercent.value);
    let entry = Number(entryPrice.value);
    let sl = Number(stopLoss.value);

    // Validation

    if (cap <= 0 || risk <= 0 || entry <= 0 || sl <= 0) {

        riskAmount.innerHTML = "₹0";
        riskPerShare.innerHTML = "₹0";
        quantity.innerHTML = "0";
        positionSize.innerHTML = "₹0";

        return;

    }

    let totalRisk = cap * risk / 100;

    let perShareRisk = Math.abs(entry - sl);

    if (perShareRisk === 0) {

        alert("Entry Price and Stop Loss cannot be the same.");

        return;

    }

    let qty = Math.floor(totalRisk / perShareRisk);

    let totalPosition = qty * entry;

    // Display

    riskAmount.innerHTML = "₹" + totalRisk.toFixed(2);

    riskPerShare.innerHTML = "₹" + perShareRisk.toFixed(2);

    quantity.innerHTML = qty;

    positionSize.innerHTML = "₹" + totalPosition.toFixed(2);

}


// ==========================================
// Events
// ==========================================

calculateBtn.addEventListener("click", calculateRisk);

capital.addEventListener("input", calculateRisk);
riskPercent.addEventListener("input", calculateRisk);
entryPrice.addEventListener("input", calculateRisk);
stopLoss.addEventListener("input", calculateRisk);