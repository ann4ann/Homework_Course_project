import React, { useEffect, useState } from "react";
import TextField from "../components/textField";
import { validator } from "../utils/validator";

// Валидацию можно создать 2 способами:
// в момент отправки формы (добавляем в     handleSubmit=(e)=>{... validate() ...})
// при изменении состояния (тогда в     useEffect(() => {... validate() ...}, [data]);)
// Лучше всего комбинировать - в зависимости от сценариев:
// 1 сц.: пользователь заполнил одно поле и перешел к другому - ошибка по предыдущему полю
// 2 сц.: пользователь снял выделение с формы
// 3 сц.: пользователь нажал кнопку submit
const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  // чтобы контролировать несколько полей, можно создать для каждого useState, но это не оптимально
  // const [password, setPassword] = useState("");
  // const handleChange = (e) => {
  //     setEmail(e.target.value);
  //     // console.log(e.target.value, "changed");
  // };
  const handleChange = ({ target }) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }));
    // console.log(target.name, target.value);
  };
  const validatorConfig = {
    email: {
      isRequired: {
        message: "Электронная почта обязательна для заполнения"
      },
      isEmail: {
        message: "Email введен некорректно"
      }
    },
    password: {
      isRequired: { message: "Пароль обязателен для заполнения" },
      isCapitalSymbol: {
        message: "Пароль должен содержать хотя бы одну заглавную букву"
      },
      isContainDigit: { message: "Пароль должен содержать хотя бы одну цифру" },
      min: { message: "Пароль должен состоять минимум из 8 символов", value: 8 }
    }
  };
  useEffect(() => {
    validate();
  }, [data]);

  const validate = () => {
    const errors = validator(data, validatorConfig);
    // for (const fieldName in data) {
    //     if (data[fieldName].trim() === "") {
    //         errors[fieldName] = `${fieldName} обязательно для заполнения`;
    //     }
    // }   // вместо этого:
    // validator();
    setErrors(errors);
    // return Object.keys(errors).length === 0?true:false  // эквивалентно v
    // return Object.keys(errors).length === 0 || false; // также зд можно вообще обойтись без false
    return Object.keys(errors).length === 0;
  };

  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = (e) => {
    // отменяем обновление страницы (действие по умолчанию) при нажатии кнопки
    e.preventDefault();
    // console.log(e); // -> target -> action: "http://localhost:3000/login" - то, что отменили с пом. preventDefault()

    // проверяем форму перед отправкой v
    // validate();
    // if (Object.keys(errors).length !== 0) return;  // или так
    const isValid = validate();
    if (!isValid) return;

    console.log(data); // вернет объект со значениями из формы
    // !!!!! есть нюанс - может сработать submit до того, как мы получим все значения из полей
  };

  return (
    // доступ к значениям полей получаем через атрибут value или onChange
    // value - то значение, которое передаем в поле
    // onChange - даные об изменении содержания поля
    // контролируемое поле в Реакт - когда в нем есть value и onChange
    // Неконтролируемое - без них
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          <h3 className="mb-4">Login</h3>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Электронная почта"
              name="email"
              value={data.email}
              onChange={handleChange}
              error={errors.email}
            />
            <TextField
              label="Пароль"
              type="password"
              name="password"
              value={data.password}
              onChange={handleChange}
              error={errors.password}
            />
            {/* кнопке необязательно добавлять type:"submit", т.к. он у всех кнопок в форме по дефолту
            если кнапка не submit, ей необходимо добавить type:"button" */}
            <button
              type="submit"
              disabled={!isValid}
              className="btn btn-primary w-100 mx-auto">
              Submit
            </button>
            {/* <div>
                <label htmlFor="email">Email</label>
                <input
                    type="text"
                    id="email"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={data.password}
                    onChange={handleChange}
                />
            </div> */}
            {/* <div>
                <div>
                    <label htmlFor="radio1">Radio 1</label>
                    <input type="radio" id="radio1" name="radio" />
                </div>
                <div>
                    <label htmlFor="radio2">Radio 2</label>
                    <input type="radio" id="radio2" name="radio" />
                </div>
            </div> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
