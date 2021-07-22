import API from "../firebase/API";

// ADD_EXPENSE
export const addExpense = expense => ({
  type: "ADD_EXPENSE",
  expense,
});

export const startAddExpense = (expenseData = {}) => {
  return (dispatch, getState) => {
    const { uid } = getState().auth;
    const {
      description = "",
      note = "",
      amount = 0,
      createdAt = 0,
    } = expenseData;
    const expense = { description, note, amount, createdAt };

    API.expenses.create(expense, uid).then(id =>
      dispatch(
        addExpense({
          id,
          ...expense,
        })
      )
    );
  };
};

// REMOVE_EXPENSE
export const removeExpense = id => ({
  type: "REMOVE_EXPENSE",
  id,
});

export const startRemoveExpense = ({ id } = {}) => {
  return (dispatch, getState) => {
    const { uid } = getState().auth;
    API.expenses.remove(uid, id).then(() => dispatch(removeExpense(id)));
  };
};

// EDIT_EXPENSE
export const editExpense = (id, updates) => ({
  type: "EDIT_EXPENSE",
  id,
  updates,
});

export const startEditExpense = (id, updates) => {
  return (dispatch, getState) => {
    const { uid } = getState().auth;
    return API.expenses
      .update(uid, id, updates)
      .then(() => dispatch(editExpense(id, updates)));
  };
};

// SET_EXPENSES
export const setExpenses = expenses => ({
  type: "SET_EXPENSES",
  expenses,
});

export const startSetExpenses = () => {
  return (dispatch, getState) => {
    const { uid } = getState().auth;
    return API.expenses
      .get(uid)
      .then(expenses => dispatch(setExpenses(expenses)));
  };
};
