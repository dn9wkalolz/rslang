import homepageImages from './media';

export const homepageContent = {
  hero: {
    title: 'Начни изучать <b> английский </b> прямо сейчас',
    description: 'Наше приложение позволяет выучить 4000 наиболее употребляемых английских слов по современной методике интервального повторения',
    button: 'Начать',
    img: homepageImages.HomepageBanner,
    imgAlt: 'Начни изучать английский прямо сейчас',
  },
  video: {
    title: 'Узнай преимущества нашего приложения',
    youtube: 'https://www.youtube.com/embed/f4ioMGDQblI',
  },
  features: {
    title: 'Возможности нашего приложения',
    pluses: [
      {
        text: 'Статистика твоего прогресса',
        img: homepageImages.Pie,
        key: 'pie',
      },
      {
        text: 'Игровая форма обучения',
        img: homepageImages.Game,
        key: 'game',
      },
      {
        text: 'Занятия в любом месте',
        img: homepageImages.Globe,
        key: 'globe',
      },
      {
        text: 'В любое время',
        img: homepageImages.Time,
        key: 'time',
      },
    ],
    image: homepageImages.HomepageFeatures,
  },
  games: {
    title: 'Игры',
    quizes: [
      {
        title: 'Саванна',
        subtitle: 'Способствует употреблению  выученных слов в разговоре',
        description: 'Успей выбрать правильный перевод до того как слово коснётся земли',
        img: homepageImages.HomepageSavannah,
        key: 'savannah',
        link: '/games/savannah',
      },
      {
        title: 'Аудиовызов',
        subtitle: 'Улучшает восприятие английской речи',
        description: 'После проигрывания английского  слова, нужно выбрать правильный перевод',
        img: homepageImages.HomepageAudioCall,
        key: 'audiocall',
        link: '/games/audiocall',
      },
      {
        title: 'Спринт',
        subtitle: 'Развивает словарный запас',
        description: 'Нужно выбрать правильный или неправильный перевод английского слова указан на экране',
        img: homepageImages.HomepageSprint,
        key: 'sprint',
        link: '/games/sprint',
      },
      {
        title: 'Переводчик',
        subtitle: 'Тренирует правописание',
        description: 'Переводи русские слова на английский язык',
        img: homepageImages.HomepageTranslator,
        key: 'translator',
        link: '/games/translator',
      },
    ],
    image: homepageImages.HomepageGames,
  },
  team: {
    title: 'Над проектом работали',
    developers: [
      {
        name: 'Алексей',
        game: 'Разработка игры "Аудиовызов"',
        page: 'Реализация страницы "Статистика"',
        img: homepageImages.Dev1,
        key: 'dev1',
      },
      {
        name: 'Андрей',
        game: 'Разработка игры "Саванна"',
        page: 'Реализация страницы "Учебник"',
        img: homepageImages.Dev2,
        key: 'dev2',
      },
      {
        name: 'Валерия',
        game: 'Разработка игры "Переводчик"',
        page: 'Реализация страницы "Главная"',
        img: homepageImages.Dev3,
        key: 'dev3',
      },
      {
        name: 'Сергей',
        game: 'Разработка игры "Спринт"',
        page: 'Реализация страницы "Словарь"',
        img: homepageImages.Dev4,
        key: 'dev4',
      },
    ],
  },
  registration: {
    title: 'Зарегистрируйся прямо сейчас',
    button: 'Регистрация',
  },
};

export const header = {
  logo: {
    img: homepageImages.Logo,
    imagAlt: 'RSLang',
    link: '/',
  },
  settings: {
    img: homepageImages.Settings,
    imgAlt: 'Настройки',
  },
  pages: [
    {
      name: 'Главная',
      link: '/',
      key: 'home',
      exact: true,
    },
    {
      name: 'Учебник',
      link: '/textbook',
      key: 'textbook',
      exact: false,
    },
    {
      name: 'Мой словарь',
      link: '/vocabulary',
      key: 'vocabulary',
      exact: false,
    },
    {
      name: 'Игры',
      link: '/games',
      key: 'games',
      exact: false,
    },
    {
      name: 'Статистика',
      link: '/statistics',
      key: 'statistics',
      exact: false,
    },
  ],
  auth: {
    login: 'Вход',
    logout: 'Выход',
  },
};

export const footer = {
  course: {
    img: homepageImages.RSSLogo,
    imgAlt: 'RSSchool',
    link: 'https://rs.school/js/',
  },
  githubLogo: homepageImages.GitHubLogo,
  year: '2021 год',
  developers: [
    {
      name: 'Алексей',
      github: 'https://github.com/AlDemi',
      key: 'AlDemi',
    },
    {
      name: 'Андрей',
      github: 'https://github.com/AndreiMilashevich',
      key: 'AndreiMilashevich',
    },
    {
      name: 'Валерия',
      github: 'https://github.com/Valimisael',
      key: 'Valimisael',
    },
    {
      name: 'Сергей',
      github: 'https://github.com/dn9wkalolz',
      key: 'dn9wkalolz',
    },
  ],
};

export const ownGameContent = {
  title: 'Переводчик',
  chooseLevel: 'Выберите уровень сложности',
  levels: ['Изян', 'Легко', 'Норм', 'Уже сложнее', 'Сложно', 'Жесть'],
  loading: 'Идет загрузка...',
  checkButton: 'Проверим?',
  nextButton: 'Следующее слово',
  results: 'Ваши результаты:',
  learned: 'Изучено:',
  tolearn: 'Для повторения',
};

export const audiocallGameContent = {
  ...ownGameContent,
  description: 'Тренировка, развивающая навыки речи и перевода.',
  title: 'Аудиовызов',
  continueButton: 'Продолжить',
};
export const textBookContent = {
  groups: ['Раздел 1', 'Раздел 2', 'Раздел 3', 'Раздел 4', 'Раздел 5', 'Раздел 6'],
};
