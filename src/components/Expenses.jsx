import React, { useState, useEffect } from 'react';
import { formatDate } from '../utils';

const API_BASE_URL = 'http://localhost:8080/api/v1';

export default function Expenses() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/transactions`);
      if (!response.ok) {
        throw new Error('Failed to fetch transactions');
      }
      const data = await response.json();
      setTransactions(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching transactions:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="panel">Loading transactions...</div>;
  }

  if (error) {
    return <div className="panel error">Error: {error}</div>;
  }

  return (
    <div className="panel">
      <h3>Expenses</h3>
      <div className="transactions">
        <table className="transactions-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Category</th>
              <th>Type</th>
              <th className="amount-column">Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(transaction => (
              <tr key={transaction.id} className={transaction.type.toLowerCase()}>
                <td>{formatDate(transaction.date)}</td>
                <td>{transaction.description}</td>
                <td>{transaction.category}</td>
                <td>{transaction.type}</td>
                <td className="amount-column">
                  {transaction.type === 'CREDIT' ? '+' : '-'}${Math.abs(transaction.amount).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}