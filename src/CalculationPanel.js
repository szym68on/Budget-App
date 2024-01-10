import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);

export function Calculation({
  income,
  onClickOpenExpenses,
  expenses,
  setIsRegister,
  resetState,
}) {
  return (
    <div className="bg-boxColor w-[100%] md:w-[20%] flex flex-col items-center mt-20 md:mt-0 py-2 rounded relative max-h-[700px]">
      <TitleViewComponent>Calculation</TitleViewComponent>
      <CalculationIncome income={income} />
      <ChartDonut income={income} expenses={expenses} />
      <CalculationInfoList income={income} expenses={expenses} />
      <ResetExpensesButton
        setIsRegister={setIsRegister}
        resetState={resetState}
      />
      <OpenExpensesButton onClickOpenExpenses={onClickOpenExpenses} />
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

function CalculationIncome({ income }) {
  return (
    <div className="flex flex-col items-center bg-lightTitle mt-5 w-[80%]">
      <p className="font-bold text-[12px] pt-2">INCOME</p>
      <p className="text-[22px] md:text-[32px] pb-2">${income}.00</p>
    </div>
  );
}

function ChartDonut({ income, expenses }) {
  const spentMoney = expenses.reduce(
    (acc, exp) => acc + Number(exp.expensesValue),
    0
  );
  const totalMoney = Number(income) - spentMoney;

  const data = {
    datasets: [
      {
        label: "",
        data: [totalMoney, spentMoney],
        backgroundColor: [
          `${totalMoney > 0 ? "#51D289" : "#dc2626"}`,
          "#D9D9D9",
        ],
      },
    ],
  };

  const data2 = {
    datasets: [
      {
        label: "",
        data: [spentMoney],
        backgroundColor: ["#dc2626"],
      },
    ],
  };

  const options = {};

  const textCenter = {};
  // const textCenter = {
  //   id: "textCenter",
  //   beforeDatasetsDraw(chart, args, pluginOptions) {
  //     const { ctx, data } = chart;

  //     ctx.save();
  //     ctx.font = "20px sans-serif";
  //     ctx.fillStyle = "black";
  //     ctx.textAlign = "center";
  //     ctx.textBaseLine = "middle";
  //     ctx.fillText(
  //       `${expenses.length === 0 ? "100" : percentage}%Spent`,
  //       chart.getDatasetMeta(0).data[0].x,
  //       chart.getDatasetMeta(0).data[0].y
  //     );
  //   },
  // };

  return (
    <div className="w-[70%] h-[70%] mt-5">
      <Doughnut
        data={totalMoney > 0 ? data : data2}
        options={options}
      ></Doughnut>
    </div>
  );
}

function CalculationInfoList({ income, expenses }) {
  const spentMoney = expenses.reduce(
    (acc, exp) => acc + Number(exp.expensesValue),
    0
  );
  const totalMoney = Number(income) - spentMoney;

  return (
    <div className=" w-[80%] flex justify-between mt-10 border-dashed border-b-[1px] pb-5 border-lightContent">
      <ItemCalculationInfo>
        <p>Avaiable</p>
        <p className={`${totalMoney > 0 ? "text-green" : "text-red"}`}>
          {totalMoney > 0 ? "$" : "-$"}
          {Math.abs(totalMoney)}
        </p>
      </ItemCalculationInfo>
      <ItemCalculationInfo>
        <p>Spent</p>
        <p className="text-yellow">${spentMoney}</p>
      </ItemCalculationInfo>
    </div>
  );
}
function ItemCalculationInfo({ children }) {
  return (
    <div className="bg-mainBase text-center text-lightTitle w-[45%] px-8 py-1 gap-x-3 rounded text-[16px] md:text-[20px] flex flex-col items-center">
      {children}
    </div>
  );
}

function ResetExpensesButton({ setIsRegister, resetState }) {
  function handleResetApp() {
    setIsRegister((reg) => !reg);
    resetState();
  }

  return (
    <button
      onClick={handleResetApp}
      className="mt-10 mb-10 w-[90%] bg-yellow rounded py-4 text-mainBase text-[20px] text-center"
    >
      Reset Expenses
    </button>
  );
}

function OpenExpensesButton({ onClickOpenExpenses }) {
  return (
    <div
      onClick={() => {
        onClickOpenExpenses((exit) => !exit);
      }}
      className=" md:hidden absolute top-[98%] right-1 bg-yellow  w-[40px] h-[40px] flex justify-center items-center rounded-full cursor-pointer"
    >
      <p className="text-[32px] transform translate-y-[-4px]">+</p>
    </div>
  );
}
