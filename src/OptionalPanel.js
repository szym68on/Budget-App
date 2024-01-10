import { useContext } from "react";
import { OptionContext } from "./OptionContext";
import { v4 as uuidv4 } from "uuid";
export function OptionalPanel({ userGoal, onSetExpenses }) {
  return (
    <div className="bg-boxColor w-[100%] md:w-[30%] flex flex-col items-center mt-20 md:mt-0 py-2 rounded relative max-h-[700px]">
      <TitleViewComponent>Options</TitleViewComponent>
      <OptionListPanel userGoal={userGoal} onSetExpenses={onSetExpenses} />
    </div>
  );
}

function OptionListPanel({ userGoal, onSetExpenses }) {
  const options = useContext(OptionContext);

  return (
    <div className="bg-lightTitle w-[90%] flex flex-col items-center mt-5">
      <p className="font-semibold">Choose Any Fix Expenses</p>
      {options.map((option) => (
        <ItemOption
          key={option.id}
          id={option.id}
          name={option.name}
          imgPath={option.imgPath}
          price={option.price}
          onSetExpenses={onSetExpenses}
        />
      ))}

      <GoalComponent userGoal={userGoal} />
    </div>
  );
}

function GoalComponent({ userGoal }) {
  return (
    <div className="mt-10 border-dashed border-t-[1px] border-lightContent bg-white w-[100%] flex flex-col  ">
      <h3 className="pt-5 text-[26px] text-center">GOALS</h3>
      <p className="font-semibold  border-l-4 border-green pl-1 mb-7 md:mb-0">
        {userGoal}
      </p>
    </div>
  );
}

function ItemOption({ id, name, imgPath, price, onSetExpenses }) {
  function handleAddExpenses() {
    const obj = {
      id: uuidv4(),
      nameExpenses: name,
      expensesValue: price,
      optionsExpenses: "Subscription",
    };

    onSetExpenses((expenses) => [...expenses, obj]);
  }

  return (
    <div className="flex w-[90%] justify-between mt-7 items-center">
      <div className="flex items-center gap-x-2">
        <img src={imgPath} alt="ocio"></img>
        <p>{name}</p>
      </div>
      <button
        onClick={handleAddExpenses}
        id={id}
        className="bg-green px-5 rounded-full h-[30px]"
      >
        Select
      </button>
    </div>
  );
}

function TitleViewComponent({ children }) {
  return (
    <h2 className="text-mainBase text-[25px] md:text-[32px] border-dashed border-b-[1px] border-lightContent pb-3 block w-[80%] text-center">
      {children}
    </h2>
  );
}
