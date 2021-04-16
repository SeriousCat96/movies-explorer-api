module.exports.validation = {
  email: {
    unique: 'Пользователь с таким email уже существует',
    required: 'Поле \'email\' является обязательным',
    minlength: 'Email должнен содержать не менее 3 символов',
    maxlength: 'Email должнен содержать не более 320 символов',
    invalid: 'Email имеет неверный формат',
  },
  password: {
    minlength: 'Пароль должнен содержать не менее 6 символов',
    required: 'Поле \'password\' является обязательным',
  },
  name: {
    required: 'Поле \'name\' является обязательным',
    minlength: 'Имя должно содержать не менее 2 символов',
    maxlength: 'Имя должно содержать не более 30 символов',
  },
  country: {
    required: 'Поле \'country\' является обязательным',
  },
  director: {
    required: 'Поле \'director\' является обязательным',
  },
  duration: {
    required: 'Поле \'duration\' является обязательным',
  },
  year: {
    required: 'Поле \'year\' является обязательным',
  },
  description: {
    required: 'Поле \'description\' является обязательным',
  },
  image: {
    required: 'Поле \'image\' является обязательным',
    invalid: 'Ссылка имеет неверный формат',
  },
  trailer: {
    required: 'Поле \'trailer\' является обязательным',
    invalid: 'Ссылка имеет неверный формат',
  },
  thumbnail: {
    required: 'Поле \'thumbnail\' является обязательным',
    invalid: 'Ссылка имеет неверный формат',
  },
  owner: {
    required: 'Поле \'owner\' является обязательным',
  },
  movieId: {
    required: 'Поле \'movieId\' является обязательным',
  },
  nameRU: {
    required: 'Поле \'nameRU\' является обязательным',
  },
  nameEN: {
    required: 'Поле \'nameEN\' является обязательным',
  },
};

module.exports.http = {
  badRequest: {
    message: 'Введены некорректные данные',
    params: {
      _id: 'Введен невалидный _id',
    },
  },
  unauthorized: {
    message: 'Необходима авторизация',
  },
  forbidden: {
    card: 'Нельзя удалить чужую карточку',
  },
  notFound: {
    message: 'Запрашиваемый ресурс не найден',
    format: (src) => `${src} не существует`,
  },
  conflict: {
    message: 'Указанные данные уже существуют',
    format: (entries) => {
      const prefix = Object.keys(entries).join(', ');
      const postfix = entries.length > 1 ? 'существуют' : 'существует';
      return `${prefix} уже ${postfix}`;
    },
  },
};
