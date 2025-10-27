import React, { useState } from "react";

const API_BASE_URL = "http://localhost:8080/api/v1/transactions";

export default function AddExpense({ onAdd }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [category, setCategory] = useState("Misc");
  const [type, setType] = useState("DEBIT");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    if (!description.trim() || !amount) return;

    setError(null);
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          description: description.trim(),
          amount: Number(amount),
          date,
          category,
          type,
        }),
      });

      const responseText = await response.text(); // First get the raw response text
      console.log("Response status:", response.status);
      console.log("Response text:", responseText);

      if (!response.ok) {
        throw new Error(`Failed to save transaction: ${responseText}`);
      }

      // Only try to parse as JSON if we have content
      const savedTransaction = responseText ? JSON.parse(responseText) : null;
      if (savedTransaction) {
        onAdd(savedTransaction);

        // Reset form
        setDescription("");
        setAmount("");
        setDate(new Date().toISOString().slice(0, 10));
        setCategory("Misc");
        setType("DEBIT");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

    return (
      <div className="panel">
        <h3>Add Expense</h3>
        <form className="form" onSubmit={submit}>
          <label>
            Description
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={loading}
            />
          </label>
          <label>
            Amount
            <input
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              disabled={loading}
            />
          </label>
          <label>
            Date
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              disabled={loading}
            />
          </label>
          <label>
            Category
            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              disabled={loading}
            />
          </label>
          <label>
            Type
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              disabled={loading}
            >
              <option value="DEBIT">Debit</option>
              <option value="CREDIT">Credit</option>
            </select>
          </label>
          {error && <div className="error">{error}</div>}
          <div className="form-actions">
            <button type="submit" className="primary" disabled={loading}>
              {loading ? "Adding..." : "Add"}
            </button>
          </div>
        </form>
      </div>
    );
  
}
