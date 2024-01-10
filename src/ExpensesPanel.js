import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
export default function ExpensesPanel({ onClickExit, onSetExpenses }) {
  return (
    <div className="w-[100%] h-[100vh] flex justify-center items-center   fixed md:absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]">
      <div className="flex flex-col items-center   w-[50%]">
        <InfoExpenses />
        <FormExpenses
          onSetExpenses={onSetExpenses}
          deactiveExpensePanel={onClickExit}
        />
      </div>
      <ExpensesButton onClickExit={onClickExit} />
    </div>
  );
}

function FormExpenses({ onSetExpenses, deactiveExpensePanel }) {
  const [expensesData, setExpensesData] = useState({
    expensesValue: "",
    nameExpenses: "",
    optionsExpenses: "Savings",
  });
  const [errors, setErrors] = useState({
    expensesValue: "",
    nameExpenses: "",
  });
  function handleInputsValue(e) {
    const { name, value } = e.target;
    setExpensesData({ ...expensesData, [name]: value, id: uuidv4() });
  }
  function handleForm(e) {
    e.preventDefault();
    const validationErrors = {};
    if (!expensesData.expensesValue || expensesData.expensesValue < 0) {
      validationErrors.expensesValue = "Expenses value is required";
    }
    if (!expensesData.nameExpenses.trim()) {
      validationErrors.nameExpenses = "Name of Expenses is required";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      onSetExpenses((expense) => [...expense, expensesData]);
      deactiveExpensePanel((active) => !active);
    } else {
      onSetExpenses((expense) => [...expense]);
    }
  }

  return (
    <form
      onSubmit={(e) => handleForm(e)}
      className="flex flex-col gap-y-0 mt-10 w-[100%]"
    >
      <input
        type="number"
        name="expensesValue"
        placeholder="Insert Your Expenses"
        className="md:input-form input-form-mobile  border-b-2 border-lightTitle flex items-center justify-center"
        onChange={(e) => handleInputsValue(e)}
        value={expensesData.expensesValue}
      />
      {errors.expensesValue && (
        <p className="text-red mt-3">{errors.expensesValue}</p>
      )}

      <input
        type="text"
        name="nameExpenses"
        placeholder="Name For Expenses"
        className="md:input-form-expenses input-form-mobile  border-b-2 border-lightTitle"
        onChange={(e) => handleInputsValue(e)}
        value={expensesData.nameExpenses}
      />
      {errors.nameExpenses && (
        <p className="text-red mt-3">{errors.nameExpenses}</p>
      )}

      <select
        name="optionsExpenses"
        className="bg-mainBase text-center border-b-2 border-lightTitle text-lightTitle pb-3 text-[20px] pt-3 mt-20"
        onChange={(e) => handleInputsValue(e)}
        value={expensesData.optionsExpenses}
      >
        <option value="Debts">Debts</option>
        <option value="Food">Food</option>
        <option value="Hobbie">Hobbie</option>
        <option value="Rent">Rent</option>
        <option value="Savings">Savings</option>
        <option value="Medicine">Medicine</option>
        <option value="Subscription">Subscription</option>
        <option value="Various">Various</option>
      </select>
      <button className="w-[100%] bg-yellow py-3 text-center text-mainBase text-[20px] rounded mt-20">
        Start Calculation
      </button>
    </form>
  );
}

function ExpensesButton({ onClickExit }) {
  return (
    <button
      onClick={() => {
        onClickExit((exit) => !exit);
      }}
      className="absolute top-10 right-10 md:top-[0] md:right-10 bg-yellow w-[40px] h-[40px] text-lightTitle rounded-full flex justify-center items-center"
    >
      &#10006;
    </button>
  );
}

function InfoExpenses() {
  return (
    <>
      <h3 className="w-[100%] text-center text-lightTitle text-[32px]">
        Monthly<span className="text-green"> Budget</span>
      </h3>
      <p className="text-lightTitle">Insert Below Your Current Spent</p>
    </>
  );
}
