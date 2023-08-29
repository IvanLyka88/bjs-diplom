//Страница «Личный кабинет пользователя»
"use strict";

const logoutButton = new LogoutButton();
logoutButton.action = () => {
  ApiConnector.logout((response) => {
    console.log(response);
    if (response.success) {
      location.reload();
    }
  });
};
ApiConnector.current((response) => {
  console.log(response);
  if (response.success) {
    ProfileWidget.showProfile(response.data);
  }
});

const ratesBoard = new RatesBoard();
function getNowCurrent() {
  ApiConnector.getStocks((response) => {
    console.log(response);
    if (response.success) {
      ratesBoard.clearTable();
      ratesBoard.fillTable(response.data);
    }
  });
}
getNowCurrent();
setInterval(getNowCurrent, 60000);

const moneyManager = new MoneyManager();
moneyManager.addMoneyCallback = (data) => {
  ApiConnector.addMoney(data, (response) => {
    console.log(response);

    if (response.success) {
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(response.success, "Кошелек пополнен!");
    } else {
      moneyManager.setMessage(response.success, response.error);
    }
  });
};

moneyManager.conversionMoneyCallback = (data) => {
  ApiConnector.convertMoney(data, (response) => {
    console.log(response);

    if (response.success) {
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(response.success, "Успешно!");
    } else {
      moneyManager.setMessage(response.success, response.error);
    }
  });
};

moneyManager.sendMoneyCallback = (data) => {
  ApiConnector.transferMoney(data, (response) => {
    console.log(response);

    if (response.success) {
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(response.success, 'Перевод осуществлен успешно!');
    } else {
      moneyManager.setMessage(response.success, response.error);
    }
  });
};

const favoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites((response) => {
  console.log(response);
  if (response.success) {
    favoritesWidget.clearTable();
    favoritesWidget.fillTable(response.data);
    moneyManager.updateUsersList(response.data);
  }
});

favoritesWidget.addUserCallback = (data) => {
  ApiConnector.addUserToFavorites(data, (response) => {
    console.log(response);
    if (response.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(response.data);
      moneyManager.updateUsersList(response.data);
      moneyManager.setMessage(response.success, 'Новый пользователь успешно добавлен!');
    } else {
      moneyManager.setMessage(response.success, response.error);
    }
  });
};

favoritesWidget.removeUserCallback = (data) => {
  ApiConnector.removeUserFromFavorites(data, (response) => {
    console.log(response);

    if (response.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(response.data);
      moneyManager.updateUsersList(response.data);
      moneyManager.setMessage(response.success, 'Пользователь успешно удален!');
    } else {
      moneyManager.setMessage(response.success, response.error);
    }
  });
};

