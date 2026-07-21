// ==========================================
// TradeTrack Pro
// Trade History
// ==========================================
// ==============================
// Apply Saved Theme
// ==============================

if(localStorage.getItem("isLoggedIn") !== "true"){

    window.location.href = "index.html";

}
const tradeTable = document.getElementById("tradeTable");

// =========================
// Load Trades
// =========================

function loadTrades() {

    let trades = JSON.parse(localStorage.getItem("trades")) || [];

    tradeTable.innerHTML = "";

    if (trades.length === 0) {

        tradeTable.innerHTML = `
            <tr>
                <td colspan="15">No Trades Found 📭</td>
            </tr>
        `;

        return;
    }

    trades.forEach((trade, index) => {

        const pnlClass = trade.pnl >= 0 ? "profit" : "loss";

        tradeTable.innerHTML += `

        <tr>

            <td>${trade.stock}</td>

            <td>${trade.type}</td>

            <td>₹${trade.entry}</td>

            <td>₹${trade.exit}</td>

            <td>${trade.quantity}</td>


            <td class="${pnlClass}">
                ₹${trade.pnl}
            </td>

            <td>${trade.strategy}</td>

            <td>${trade.emotion}</td>

            <td>${trade.date}</td>

            <td>

                <button
                    class="edit-btn"
                    onclick="editTrade(${index})">

                    Edit

                </button>

                <button
                    class="delete-btn"
                    onclick="deleteTrade(${index})">

                    Delete

                </button>

            </td>

        </tr>

        `;

    });

}

// =========================
// Delete Trade
// =========================

function deleteTrade(index) {

    if (!confirm("Delete this trade?")) {

        return;

    }

    let trades = JSON.parse(localStorage.getItem("trades")) || [];

    trades.splice(index, 1);

    localStorage.setItem("trades", JSON.stringify(trades));

    loadTrades();

}

// =========================
// Edit Trade
// =========================

function editTrade(index) {

    let trades = JSON.parse(localStorage.getItem("trades")) || [];

    localStorage.setItem("editTradeIndex", index);

    localStorage.setItem("editTradeData", JSON.stringify(trades[index]));

    alert("Opening trade for editing...");

    window.location.href = "addtrade.html";

}

// =========================
// Load Page
// =========================

loadTrades();