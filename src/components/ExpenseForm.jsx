import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { Plus, Minus } from 'lucide-react';
import ExpenseList from './ExpenseList';
import { authContext } from '../context/AuthContextProvider';
import { useNavigate } from 'react-router-dom';
import './ExpenseForm.css';

const expenseSchema = z.object({
  description: z
    .string()
    .trim()
    .min(3, 'Description must be at least 3 characters'),
  category: z.enum(['Food', 'Petrol', 'Rent', 'Education', 'Other'], {
    errorMap: () => ({ message: 'Please select a category' }),
  }),
  amount: z.coerce.number().positive('Amount must be a positive number'),
});

function ExpenseForm({ onAddExpense }) {
  const { isLoggedIn } = useContext(authContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [expenseList, setexpenseList] = useState(() => {
    if (!isLoggedIn) {
      return [];
    }
    const savedExpenses = localStorage.getItem(`expenses`);
    return savedExpenses ? JSON.parse(savedExpenses) : [];
  });

  useEffect(() => {
    if (isLoggedIn) {
      localStorage.setItem(`expenses`, JSON.stringify(expenseList));
    } else {
      navigate('/login');
    }
  }, [expenseList, isLoggedIn]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(expenseSchema),
  });

  const onFormSubmit = async (data) => {
    try {
      //   await onAddExpense(data);
      setexpenseList((prev) => [...prev, data]);
      toast.success('Expense Saved!');
      reset();
      setIsOpen(false);
    } catch (err) {
      toast.error('Failed to save expense.');
    }
  };

  return (
    <>
      <div className={`parent-card expense-card  ${isOpen ? 'is-open' : ''}`}>
        <header className="card-header">
          <div className="header-info">
            <h2>Daily Expense Entry</h2>
          </div>
          <button
            type="button"
            className="toggle-trigger-btn"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <Minus size={20} /> : <Plus size={20} />}
            {isOpen ? 'Cancel' : 'Add Expense'}
          </button>
        </header>

        <div className="collapsible-wrapper">
          <div className="collapsible-content">
            <form onSubmit={handleSubmit(onFormSubmit)} noValidate>
              <div className="form-field">
                <label htmlFor="description">Description</label>
                <input
                  id="description"
                  type="text"
                  placeholder="e.g., Monthly Internet Bill"
                  {...register('description')}
                  className={errors.description ? 'input-error' : ''}
                />
                {errors.description && (
                  <span className="error-msg">
                    {errors.description.message}
                  </span>
                )}
              </div>

              <div className="form-grid">
                <div className="form-field">
                  <label htmlFor="category">Category</label>
                  <select
                    id="category"
                    {...register('category')}
                    className={errors.category ? 'input-error' : ''}
                  >
                    <option value=""> -Choose Category- </option>
                    <option value="Food">Food & Dining</option>
                    <option value="Petrol">Fuel & Travel</option>
                    <option value="Rent">Rent</option>
                    <option value="Education">Education</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.category && (
                    <span className="error-msg">{errors.category.message}</span>
                  )}
                </div>
                <div className="form-field">
                  <label htmlFor="amount">Amount (₹)</label>
                  <input
                    id="amount"
                    type="number"
                    placeholder="0.00"
                    {...register('amount')}
                    className={errors.amount ? 'input-error' : ''}
                  />
                  {errors.amount && (
                    <span className="error-msg">{errors.amount.message}</span>
                  )}
                </div>
              </div>
              <button
                type="submit"
                className="submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Processing...' : 'Save Expense'}
              </button>
            </form>
          </div>
        </div>
      </div>
      <ExpenseList expenses={expenseList} />
    </>
  );
}

export default ExpenseForm;
