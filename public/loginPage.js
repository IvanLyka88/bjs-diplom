//Страница «Вход и регистрация
"use strict";

const userForm = new UserForm();

userForm.loginFormCallback = (data) => {
  ApiConnector.login(data, (response) => {
    console.log(response);

    if (response.success) {
      location.reload();
    } else {
      userForm.setLoginErrorMessage(
        `Пользователь c указанным логином ${data.login} и паролем не существует.`
      );
    }
  });
};

userForm.registerFormCallback = (data) => {
  ApiConnector.register(data, (response) => {
    console.log(response);

    if (response.success) {
      location.reload();
    } else {
      userForm.setRegisterErrorMessage(
        `Пользователь c указанным логином ${data.login} и паролем уже существует.`
      );
    }
  });
};

