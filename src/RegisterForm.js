import { useState } from "react";
export default function RegisterFormPanel({
  onClickRegister,
  onChangeFormData,
  formData,
  errorsForm,
}) {
  return (
    <div className="w-[full] h-[100vh] flex ">
      <LeftSideViewRegisterForm />
      <div className=" w-[100%] md:w-[50%] py-20">
        <TitleRegisterView />
        <div className="w-[100%] flex flex-col items-center">
          <RegisterForm
            onClickRegister={onClickRegister}
            onChangeFormData={onChangeFormData}
            formData={formData}
            errorsForm={errorsForm}
          />
        </div>
      </div>
    </div>
  );
}

function RegisterForm({
  onClickRegister,
  onChangeFormData,
  formData,
  errorsForm,
}) {
  const [errorsStartForm, setErrorsStartForm] = useState({
    username: "",
    income: "",
    userGoal: "",
  });

  function handleChangeForm(e) {
    const { name, value } = e.target;
    onChangeFormData({ ...formData, [name]: value });
  }

  function handleIsRegister(e) {
    e.preventDefault();
    let isOk = false;
    const validationErrors = {};
    if (!formData.username.trim()) {
      validationErrors.username = "Username is required";
    }
    if (!formData.userGoal.trim()) {
      validationErrors.userGoal = "Goals are required";
    }
    if (!formData.income || formData.income < 0) {
      validationErrors.income = "Incorrect Number";
    }
    setErrorsStartForm(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      isOk = true;
    }
    onClickRegister(isOk);
  }

  return (
    <form className="flex flex-col  mt-10">
      <input
        type="number"
        name="income"
        placeholder="Insert Your Income"
        className="input-form mt-20"
        onChange={handleChangeForm}
        value={formData.income}
      />
      {errorsStartForm.income && (
        <p className="text-red mt-3">{errorsStartForm.income}</p>
      )}

      <input
        type="text"
        name="username"
        placeholder="Insert Your Name"
        className="input-form mt-20"
        onChange={handleChangeForm}
        value={formData.username}
      />
      {errorsStartForm.username && (
        <p className="text-red mt-3">{errorsStartForm.username}</p>
      )}
      <input
        type="text"
        name="userGoal"
        placeholder="Insert Your Goal..."
        className="input-form mt-20"
        onChange={handleChangeForm}
        value={formData.userGoal}
      />
      {errorsStartForm.userGoal ? (
        <p className="text-red mt-3 mb-20">{errorsStartForm.userGoal}</p>
      ) : (
        <span className="mb-20"></span>
      )}

      <button
        onClick={handleIsRegister}
        className="w-[100%] bg-yellow py-3 text-center text-mainBase text-[20px] rounded"
      >
        Start Calculation
      </button>
    </form>
  );
}

function LeftSideViewRegisterForm() {
  return (
    <div className="hidden md:flex bg-lightTitle w-[50%]  items-center justify-center">
      <h3 className="text-[42px] ml-20 text-mainBase">
        Calculate Smarter Spend Wiser
      </h3>
      <img src="./img/start_img.png" alt="start_img"></img>
    </div>
  );
}

function TitleRegisterView() {
  return (
    <h1 className="text-lightTitle text-[48px] md:text-[62px] w-[100%] text-center">
      Monthly <span className="text-green">Budget</span>
    </h1>
  );
}
