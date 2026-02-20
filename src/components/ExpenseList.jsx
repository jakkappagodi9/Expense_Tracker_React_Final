import React, { useState } from 'react';
import './ExpenseList.css';

function ExpenseList({ expenses = [] }) {
  return (
    <div className="expense-list-container">
      <div className="list-header">
        <h3>Recent Transactions</h3>
        <span>Total : {'1000'}</span>
      </div>

      <div className="table-responsive">
        <table className="expense-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Description</th>
              <th>Category</th>
              <th className="text-right">Amount (₹)</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.length > 0 ? (
              expenses.map((expense, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td className="description-cell">{expense.description}</td>
                  <td>
                    <span
                      className={`category-pill ${expense.category.toLowerCase()}`}
                    >
                      {expense.category}
                    </span>
                  </td>
                  <td className="amount-cell text-right">
                    ₹{Number(expense.amount)}
                  </td>
                  <td className="text-center">
                    <button className="delete-btn" title="Delete Expense">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="empty-state">
                  No expenses recorded yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ExpenseList;
