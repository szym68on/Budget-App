import { useState } from "react";
export function ListExpenses({ expenses, onSetExpenses }) {
  const [optionList, setOptionList] = useState("All");

  function removeElement(id) {
    const actualExpenses = expenses.filter((exp) => exp.id !== id);
    onSetExpenses(actualExpenses);
  }

  const listFilterExpenses =
    optionList === "All"
      ? expenses
      : expenses.filter((exp) => exp.optionsExpenses === optionList);

  return (
    <div className=" md:flex md:flex-col  md:w-[40%]">
      <FilterExpenses optionList={optionList} setOptionList={setOptionList} />
      {!listFilterExpenses.length > 0 ? (
        <DescriptionListExpenses />
      ) : (
        listFilterExpenses.map((exp) => (
          <ListItem
            key={exp.id}
            expenseValue={exp.expensesValue}
            nameExpenses={exp.nameExpenses}
            optionExpenses={exp.optionsExpenses}
            id={exp.id}
            removeElement={removeElement}
          />
        ))
      )}
    </div>
  );
}

function ListItem({
  expenseValue,
  nameExpenses,
  optionExpenses,
  id,
  removeElement,
}) {
  const [isHover, setIsHover] = useState(false);

  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const date = new Date();
  const year = date.getFullYear();
  const nameMonth = month[date.getMonth()];
  const day = date.getDate();

  function handleChangeEdit() {
    setIsHover(true);
  }
  function handleChangeItem() {
    setIsHover(false);
  }

  function handleRemoveElement(id) {
    removeElement(id);
  }

  return (
    <div
      className="flex justify-between items-center text-lightTitle mt-10 border-dashed border-t-[1px] pt-5"
      id={id}
      onMouseEnter={handleChangeEdit}
      onMouseLeave={handleChangeItem}
    >
      {isHover ? (
        <div className="bg-lightTitle w-[100%] h-[70px] flex justify-center items-center text-[26px]">
          <button onClick={() => handleRemoveElement(id)} className="text-red">
            Delete 🗑️
          </button>
        </div>
      ) : (
        <>
          <div className="flex gap-x-3 items-center">
            <img src={`./img/${optionExpenses}.svg`} alt="siemanko"></img>
            <div>
              <h5 className="text-[20px] md:text-[22px]">{optionExpenses}</h5>
              <p className="text-[14px]">Name Expense: {nameExpenses}</p>
              <p className="text-[14px]">
                Date: {day} {nameMonth},{year}
              </p>
            </div>
          </div>
          <p className=" text-[20px] md:text-[22px]">${expenseValue}.00</p>
        </>
      )}
    </div>
  );
}

function FilterExpenses({ optionList, setOptionList }) {
  return (
    <div className="flex justify-between items-center gap-x-10">
      <p className="text-yellow text-[21px]">Description</p>
      <div className="border border-yellow  py-1 flex items-center justify-center rounded">
        <p className="text-white border-r border-white px-3 ">
          Filter Expenses
        </p>
        <select
          value={optionList}
          className="mx-3 bg-mainBase text-yellow"
          onChange={(e) => setOptionList(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Debts">Debts</option>
          <option value="Food">Food</option>
          <option value="Hobbie">Hobbie</option>
          <option value="Rent">Rent</option>
          <option value="Savings">Savings</option>
          <option value="Medicine">Medicine</option>
          <option value="Subscription">Subscription</option>
          <option value="Various">Various</option>
        </select>
      </div>
    </div>
  );
}

function DescriptionListExpenses() {
  return (
    <>
      <h2 className="text-lightTitle mt-20 text-center text-[42px]">
        Looks Like You Haven't <br></br> Added Any{" "}
        <span className="text-green">Expenses Yet</span>
      </h2>
      <h4 className="text-lightTitle text-center py-10 text-[22px]">
        No Worries, Just Hit The <span className="text-green">'Add' </span>
        Button
        <br></br>To Get Started
      </h4>
      <span className="flex justify-center">
        <svg
          width="90px"
          height="90px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.5 18C8.32843 18 9 18.6716 9 19.5C9 20.3284 8.32843 21 7.5 21C6.67157 21 6 20.3284 6 19.5C6 18.6716 6.67157 18 7.5 18Z"
            stroke="#FFFDE7"
            strokeWidth="1.5"
          />
          <path
            d="M16.5 18.0001C17.3284 18.0001 18 18.6716 18 19.5001C18 20.3285 17.3284 21.0001 16.5 21.0001C15.6716 21.0001 15 20.3285 15 19.5001C15 18.6716 15.6716 18.0001 16.5 18.0001Z"
            stroke="#FFFDE7"
            strokeWidth="1.5"
          />
          <path
            d="M2 3L2.26121 3.09184C3.5628 3.54945 4.2136 3.77826 4.58584 4.32298C4.95808 4.86771 4.95808 5.59126 4.95808 7.03836V9.76C4.95808 12.7016 5.02132 13.6723 5.88772 14.5862C6.75412 15.5 8.14857 15.5 10.9375 15.5H12M16.2404 15.5C17.8014 15.5 18.5819 15.5 19.1336 15.0504C19.6853 14.6008 19.8429 13.8364 20.158 12.3075L20.6578 9.88275C21.0049 8.14369 21.1784 7.27417 20.7345 6.69708C20.2906 6.12 18.7738 6.12 17.0888 6.12H11.0235M4.95808 6.12H7"
            stroke="#FFFDE7"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </span>
    </>
  );
}
