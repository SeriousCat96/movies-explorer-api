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
    message: {
      ru: 'Введены некорректные данные',
      en: 'Invalid data',
    },
    params: {
      _id: {
        ru: 'Введен невалидный _id',
        en: 'Invalid _id',
      },
    },
  },
  unauthorized: {
    message: {
      ru: 'Необходима авторизация',
      en: 'Authorization required',
    },
  },
  forbidden: {
    movie: {
      ru: 'Нельзя удалить чужой фильм',
      en: 'Can\'t remove another user movie',
    },
  },
  notFound: {
    message: {
      ru: 'Запрашиваемый ресурс не найден',
      en: 'Resource not found',
    },
    movie: {
      ru: 'Фильма не существует',
      en: 'Movie not found',
    },
    user: {
      ru: 'Пользователя не существует',
      en: 'User not found',
    },
  },
  conflict: {
    message: {
      ru: 'Указанные данные уже существуют',
      en: 'Passed data already exists',
    },
    ru: {
      format: (entries) => {
        const prefix = Object.keys(entries).join(', ');
        const postfix = entries.length > 1 ? 'существуют' : 'существует';
        return `${prefix} уже ${postfix}`;
      },
    },
    en: {
      format: (entries) => {
        const prefix = Object.keys(entries).join(', ');
        const postfix = entries.length > 1 ? 'exists' : 'exist';
        return `${prefix} already ${postfix}`;
      },
    },
  },
  internalServerError: {
    message: {
      ru: 'Ошибка сервера',
      en: 'Internal server error',
    },
  },
};
