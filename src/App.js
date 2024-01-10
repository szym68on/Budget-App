import RegisterFormPanel from "./RegisterForm.js";
import ExpensesPanel from "./ExpensesPanel.js";
import { useState } from "react";
import { OptionalPanel } from "./OptionalPanel.js";
import { Calculation } from "./CalculationPanel.js";
import { ListExpenses } from "./ListExpenses.js";
import { useContext } from "react";
import { OptionContext } from "./OptionContext.js";
import { v4 as uuidv4 } from "uuid";
function App() {
  const [isRegister, setIsRegister] = useState(false);
  const [formStartDate, setFormStartDate] = useState({
    username: "",
    income: 0,
    userGoal: "",
  });
  const [activeExpenses, setActiveExpenses] = useState(false);
  const [expenses, setExpenses] = useState([]);

  function resetState() {
    setFormStartDate({
      username: "",
      income: 0,
      userGoal: "",
    });
    setExpenses([]);
  }

  return (
    <div className="w-[100vw] min-h-[100vh]  bg-mainBase overflow-hidden relative">
      {!isRegister ? (
        <RegisterFormPanel
          onClickRegister={setIsRegister}
          onChangeFormData={setFormStartDate}
          formData={formStartDate}
        />
      ) : (
        <div
          className={`w-[95%] h-full mx-auto py-10 px-10 overflow-hidden ${
            activeExpenses ? "opacity-[0.01]" : ""
          }`}
        >
          <NavBar
            username={formStartDate.username}
            setActiveExpenses={setActiveExpenses}
          />
          <MainPanel
            income={formStartDate.income}
            userGoal={formStartDate.userGoal}
            onClickOpenExpenses={setActiveExpenses}
            expenses={expenses}
            onSetExpenses={setExpenses}
            setIsRegister={setIsRegister}
            resetState={resetState}
          />
        </div>
      )}
      {activeExpenses && (
        <ExpensesPanel
          onClickExit={setActiveExpenses}
          onSetExpenses={setExpenses}
        />
      )}
    </div>
  );
}

function MainPanel({
  income,
  userGoal,
  onClickOpenExpenses,
  expenses,
  onSetExpenses,
  setIsRegister,
  resetState,
}) {
  const options = useContext(OptionContext);

  return (
    <main className="flex flex-col gap-y-5 md:flex-row md:gap-y-0 mt-16 w-full md:gap-x-20 ">
      <OptionContext.Provider value={options}>
        <ListExpenses expenses={expenses} onSetExpenses={onSetExpenses} />
        <Calculation
          income={income}
          onClickOpenExpenses={onClickOpenExpenses}
          expenses={expenses}
          setIsRegister={setIsRegister}
          resetState={resetState}
        />
        <OptionalPanel userGoal={userGoal} onSetExpenses={onSetExpenses} />
      </OptionContext.Provider>
    </main>
  );
}

function NavBar({ username, setActiveExpenses }) {
  return (
    <nav className="flex flex-col md:flex-row md:justify-between md:items-center gap-y-3 md:gap-y-0  border-b pb-3 md:border-b-2 md:pb-5 border-lightTitle">
      <LogoAndTitle />
      <InfoUserAndExpenses
        username={username}
        setActiveExpenses={setActiveExpenses}
      />
    </nav>
  );
}

function LogoAndTitle() {
  return (
    <div className="flex items-center gap-x-3">
      <svg
        width="34"
        height="37"
        viewBox="0 0 34 37"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-[34px] h-[37px] md:w-[64px] md:h-[72px]"
      >
        <path
          d="M17.9656 8.0477C21.6058 8.0477 22.9555 9.77822 23.0782 12.3231H27.5978C27.4546 8.82134 25.3073 5.60461 21.0332 4.5663V0.107666H14.898V4.50522C14.1004 4.6681 13.3642 4.93276 12.6484 5.23815L15.7365 8.31237C16.3909 8.1495 17.1476 8.0477 17.9656 8.0477ZM3.58885 1.9807L0.705322 4.85133L7.74031 11.8548C7.74031 16.0895 10.9306 18.4105 15.7365 19.8152L22.9146 26.9613C22.2193 27.9589 20.7673 28.8139 17.9656 28.8139C13.7528 28.8139 12.0963 26.9409 11.8713 24.5385H7.3722C7.61761 28.9972 10.9715 31.5013 14.898 32.3361V36.754H21.0332V32.3768C22.9964 32.0103 24.7756 31.257 26.064 30.0966L30.604 34.6163L33.4875 31.7456L3.58885 1.9807Z"
          fill="white"
          fillOpacity="0.31"
        />
      </svg>
      <div className="flex flex-col">
        <span className="text-yellow text-[12px] md:text-[16px]">Expenses</span>
        <h1 className="text-lightTitle text-[32px] md:text-[48px] leading-none">
          Monthly <span className="text-green">Budget</span>
        </h1>
      </div>
    </div>
  );
}

function InfoUserAndExpenses({ username, setActiveExpenses }) {
  return (
    <div className="md:flex md:gap-x-10 md:items-center">
      <ButtonExpenses setActiveExpenses={setActiveExpenses} />
      <InfoUser username={username} />
    </div>
  );
}

function ButtonExpenses({ setActiveExpenses }) {
  return (
    <div
      onClick={() => setActiveExpenses((exp) => !exp)}
      className="hidden md:block bg-yellow px-8 py-2 text-center uppercase rounded cursor-pointer text-transparent tracking-wide"
    >
      New Expenses
    </div>
  );
}

function InfoUser({ username }) {
  return (
    <p className="text-white text-[12px] md:text-[16px]">Welcome {username}</p>
  );
}

export default App;
