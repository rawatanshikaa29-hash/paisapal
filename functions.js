import db from "./db.js";
export function addTransaction({ userId, type, amount, category, description, date }) {
    const stmt = db.prepare(
        "INSERT INTO transactions (user_id, type, amount, category, description, date) VALUES (?, ?, ?, ?, ?, ?)"
    );
    const result = stmt.run(userId, type, amount, category, description, date);
    return "Added id = " + result.lastInsertRowid;
}
export function getSpendingSummary({ userId, month }) {
    const stmt = db.prepare(
        "SELECT category, SUM(amount) AS total FROM transactions WHERE user_id = ? AND type = 'expense' AND date LIKE ? GROUP BY category"
    );
    const rows = stmt.all(userId, month + "%");
    return rows;
}