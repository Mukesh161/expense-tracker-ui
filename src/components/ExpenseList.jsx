import React, { useState, useEffect } from 'react'
import './ExpenseList.css'

const API_BASE_URL = 'http://localhost:8080/api/v1';

const FILTER_TYPES = {
  DATE_RANGE: 'date_range',
  MONTH_YEAR: 'month_year'
};

export default function ExpenseList() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterType, setFilterType] = useState(FILTER_TYPES.DATE_RANGE);
  
  // Get today and 30 days ago for default date range
  const today = new Date().toISOString().split('T')[0];
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  
  const [startDate, setStartDate] = useState(thirtyDaysAgo);
  const [endDate, setEndDate] = useState(today);

  // Month-Year filter state
  const currentDate = new Date();
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear().toString());
  const [selectedMonth, setSelectedMonth] = useState((currentDate.getMonth() + 1).toString().padStart(2, '0'));

  useEffect(() => {
    fetchTransactions();
  }, [filterType, startDate, endDate, selectedYear, selectedMonth]); // Refetch when filter params change

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      let url;
      
      if (filterType === FILTER_TYPES.DATE_RANGE) {
        url = `${API_BASE_URL}/transactions/DateRange?start=${startDate}&end=${endDate}`;
      } else {
        url = `${API_BASE_URL}/transactions/month?year=${selectedYear}&month=${selectedMonth}`;
      }

      const response = await fetch(url);
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

  return (
    <div className="panel">
      <div className="panel-header">
        <h3>Expenses</h3>
        <div className="filter-section">
          <div className="filter-type-selector">
            <label>
              <input
                type="radio"
                name="filterType"
                value={FILTER_TYPES.DATE_RANGE}
                checked={filterType === FILTER_TYPES.DATE_RANGE}
                onChange={(e) => setFilterType(e.target.value)}
              />
              Date Range
            </label>
            <label>
              <input
                type="radio"
                name="filterType"
                value={FILTER_TYPES.MONTH_YEAR}
                checked={filterType === FILTER_TYPES.MONTH_YEAR}
                onChange={(e) => setFilterType(e.target.value)}
              />
              Month/Year
            </label>
          </div>

          {filterType === FILTER_TYPES.DATE_RANGE ? (
            <div className="date-filter">
              <div className="date-inputs">
                <label>
                  From:
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    max={endDate}
                  />
                </label>
                <label>
                  To:
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    min={startDate}
                    max={today}
                  />
                </label>
              </div>
            </div>
          ) : (
            <div className="month-year-filter">
              <label>
                Month:
                <select 
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                >
                  <option value="01">January</option>
                  <option value="02">February</option>
                  <option value="03">March</option>
                  <option value="04">April</option>
                  <option value="05">May</option>
                  <option value="06">June</option>
                  <option value="07">July</option>
                  <option value="08">August</option>
                  <option value="09">September</option>
                  <option value="10">October</option>
                  <option value="11">November</option>
                  <option value="12">December</option>
                </select>
              </label>
              <label>
                Year:
                <select 
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                >
                  {Array.from({ length: 10 }, (_, i) => 
                    currentDate.getFullYear() - 5 + i
                  ).map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </label>
            </div>
          )}
        </div>
      </div>
      {loading ? (
        <p>Loading transactions...</p>
      ) : error ? (
        <p className="error">Error: {error}</p>
      ) : transactions.length === 0 ? (
        <p>No transactions yet.</p>
      ) : (
        <ul className="expense-list">
          {transactions.map(transaction => (
            <li key={transaction.id} className="expense-item">
              <div className="meta">
                <div className="title">{transaction.description}</div>
                <div className="date">
                  {new Date(transaction.date).toLocaleDateString()} • 
                  {transaction.category} • 
                  <span className={transaction.type.toLowerCase()}>
                    {transaction.type}
                  </span>
                </div>
              </div>
              <div className={`amount ${transaction.type.toLowerCase()}`}>
                {transaction.type === 'CREDIT' ? '+' : '-'}${Math.abs(transaction.amount).toFixed(2)}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
