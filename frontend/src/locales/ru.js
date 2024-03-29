export default {
  translation: {
    Navigate: {
      brand: 'Hexlet Chat',
      buttonLogOut: 'Выйти',
      buttonLogIn: 'Войти',
    },
    LoginPage: {
      login: 'Войти',
      username: 'Ваш ник',
      password: 'Пароль',
      register: 'Регистрация',
      cardFooter: 'Нет аккаунта? ',
      error: 'Неверные имя пользователя или пароль',
    },
    SignupPage: {
      registration: 'Регистрация',
      registrationBtn: 'Зарегистрироваться',
      username: 'Имя пользователя',
      password: 'Пароль',
      passwordConfirmation: 'Подтвердите пароль',
      error: {
        required: 'Обязательное поле',
        nameLength: 'От 3 до 20 символов',
        passwordLength: 'Не менее 6 символов',
        passwordMatch: 'Пароли должны совпадать',
        usernameExists: 'Такой пользователь уже существует',
      },
    },
    Page404: {
      h: 'Страница не найдена',
      p: 'Но вы можете перейти на главную страницу',
      mainPage: 'На главную',
    },
    Chat: {
      channel: 'Каналы',
      messageCounter_one: '{{count}} сообщение',
      messageCounter_few: '{{count}} сообщения',
      messageCounter_plural: '{{count}} сообщения',
      messageCounter_many: '{{count}} сообщений',
      placeholder: 'Введите сообщение...',
      inputLabel: 'Новое сообщение',
      buttonSubmit: 'Отправить',
      error: {
        network: 'Ошибка соединения',
      },
    },
    Channels: {
      channelManagement: 'Управление каналом',
      delete: 'Удалить',
      rename: 'Переименовать',
    },
    Modal: {
      name: 'Имя канала',
      add: 'Добавить канал',
      edit: 'Переименовать канал',
      remove: 'Удалить канал',
      sure: 'Уверены?',
      cancel: 'Отменить',
      delete: 'Удалить',
      deleting: 'Удаление',
      submit: 'Отправить',
      toastAdd: 'Канал создан',
      toastEdit: 'Канал переименован',
      toastDelete: 'Канал удалён',
      error: {
        nameRequired: 'Обязательное поле',
        nameLength: 'От 3 до 20 символов',
        nameDuplicate: 'Должно быть уникальным',
      },
    },
  },
};
