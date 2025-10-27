import React, { useState, useEffect } from 'react'

const API_BASE_URL = 'http://localhost:8080/api/v1';

export default function Dashboard() {
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

  // Calculate totals
  const totalCredit = transactions
    .filter(t => t.type === 'CREDIT')
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const totalDebit = transactions
    .filter(t => t.type === 'DEBIT')
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const netBalance = totalCredit - totalDebit;
  const last = transactions[0];

  // Calculate monthly totals
  const byMonth = transactions.reduce((acc, t) => {
    const d = new Date(t.date);
    const key = `${d.getFullYear()}-${('0' + (d.getMonth()+1)).slice(-2)}`;
    if (!acc[key]) {
      acc[key] = { credit: 0, debit: 0 };
    }
    if (t.type === 'CREDIT') {
      acc[key].credit += Number(t.amount);
    } else {
      acc[key].debit += Number(t.amount);
    }
    return acc;
  }, {})

  if (loading) {
    return <div className="panel">Loading dashboard data...</div>;
  }

  if (error) {
    return <div className="panel error">Error: {error}</div>;
  }

  return (
    <div className="panel">
      <h3>Dashboard</h3>
      <div className="stats">
        <div className="stat">
          <div className="label">Total Income</div>
          <div className="value credit">+${totalCredit.toFixed(2)}</div>
        </div>
        <div className="stat">
          <div className="label">Total Expenses</div>
          <div className="value debit">-${totalDebit.toFixed(2)}</div>
        </div>
        <div className="stat">
          <div className="label">Net Balance</div>
          <div className={`value ${netBalance >= 0 ? 'credit' : 'debit'}`}>
            {netBalance >= 0 ? '+' : '-'}${Math.abs(netBalance).toFixed(2)}
          </div>
        </div>
        <div className="stat">
          <div className="label">Transactions</div>
          <div className="value">{transactions.length}</div>
        </div>
        <div className="stat">
          <div className="label">Last Transaction</div>
          <div className="value">
            {last ? (
              <span className={last.type.toLowerCase()}>
                {last.description} - {last.type === 'CREDIT' ? '+' : '-'}${Number(last.amount).toFixed(2)}
              </span>
            ) : '—'}
          </div>
        </div>
      </div>

      <section className="history">
        <h4>Monthly Summary</h4>
        <ul className="monthly-summary">
          {Object.entries(byMonth)
            .sort((a,b) => b[0].localeCompare(a[0]))
            .map(([month, totals]) => (
              <li key={month} className="month-item">
                <span className="month">{month}</span>
                <div className="month-totals">
                  <span className="credit">+${totals.credit.toFixed(2)}</span>
                  <span className="debit">-${totals.debit.toFixed(2)}</span>
                  <span className={totals.credit - totals.debit >= 0 ? 'credit' : 'debit'}>
                    Net: {totals.credit - totals.debit >= 0 ? '+' : '-'}$
                    {Math.abs(totals.credit - totals.debit).toFixed(2)}
                  </span>
                </div>
              </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
