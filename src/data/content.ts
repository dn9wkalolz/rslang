import Images from './media';

export const homepageContent = {
  hero: {
    title: 'Начни изучать <b> английский </b> прямо сейчас',
    description: 'Наше приложение позволяет выучить 4000 наиболее употребляемых английских слов по современной методике интервального повторения',
    button: 'Начать',
    img: Images.HomepageBanner,
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
        img: Images.Pie,
        key: 'pie',
      },
      {
        text: 'Игровая форма обучения',
        img: Images.Game,
        key: 'game',
      },
      {
        text: 'Занятия в любом месте',
        img: Images.Globe,
        key: 'globe',
      },
      {
        text: 'В любое время',
        img: Images.Time,
        key: 'time',
      },
    ],
    image: Images.HomepageFeatures,
  },
  games: {
    title: 'Игры',
    quizes: [
      {
        title: 'Саванна',
        subtitle: 'Способствует употреблению  выученных слов в разговоре',
        description: 'Успей выбрать правильный перевод до того как слово коснётся земли',
        img: Images.HomepageSavannah,
        key: 'savannah',
        link: '/games/savannah',
      },
      {
        title: 'Аудиовызов',
        subtitle: 'Улучшает восприятие английской речи',
        description: 'После проигрывания английского  слова, нужно выбрать правильный перевод',
        img: Images.HomepageAudioCall,
        key: 'audiocall',
        link: '/games/audiocall',
      },
      {
        title: 'Спринт',
        subtitle: 'Развивает словарный запас',
        description: 'Нужно выбрать правильный или неправильный перевод английского слова указан на экране',
        img: Images.HomepageSprint,
        key: 'sprint',
        link: '/games/sprint',
      },
      {
        title: 'Переводчик',
        subtitle: 'Тренирует правописание',
        description: 'Переводи русские слова на английский язык',
        img: Images.HomepageTranslator,
        key: 'translator',
        link: '/games/translator',
      },
    ],
    image: Images.HomepageGames,
  },
  team: {
    title: 'Над проектом работали',
    developers: [
      {
        name: 'Алексей',
        game: 'Разработка игры "Аудиовызов"',
        page: 'Реализация авторизации',
        img: Images.Dev1,
        key: 'dev1',
      },
      {
        name: 'Валерия',
        game: 'Разработка игр "Саванна" и "Переводчик"',
        page: 'Реализация страницы "Главная"',
        img: Images.Dev3,
        key: 'dev3',
      },
      {
        name: 'Сергей',
        game: 'Разработка игры "Спринт"',
        page: 'Реализация страниц "Словарь" и "Учебник"',
        img: Images.Dev4,
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
  burger: Images.Burger,
  logo: {
    img: Images.Logo,
    imagAlt: 'RSLang',
    link: '/',
  },
  settings: {
    img: Images.Settings,
    imgAlt: 'Настройки',
    name: 'Настройки',
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
    img: Images.RSSLogo,
    imgAlt: 'RSSchool',
    link: 'https://rs.school/js/',
  },
  githubLogo: Images.GitHubLogo,
  year: '2021 год',
  developers: [
    {
      name: 'Алексей',
      github: 'https://github.com/AlDemi',
      key: 'AlDemi',
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
  levels: ['Уровень 1', 'Уровень 2', 'Уровень 3', 'Уровень 4', 'Уровень 5', 'Уровень 6'],
  loading: 'Идет загрузка...',
  checkButton: 'Проверим?',
  nextButton: 'Следующее слово',
  results: 'Результаты',
  learned: 'Верно',
  tolearn: 'Ошибок',
  screen: {
    img: Images.Fullscreen,
    imgAlt: 'Во весь экран',
  },
  play: {
    img: Images.Play,
    imgAlt: 'Прослушать',
  },
  wrong: {
    img: Images.WrongIcon,
    imgAlt: 'Ошибок',
  },
  right: {
    img: Images.CheckIcon,
    imgAlt: 'Верно',
  },
  restart: 'Сыграть еще раз',
};

export const SavannahContent = {
  title: 'Саванна',
};

export const audiocallGameContent = {
  ...ownGameContent,
  description: 'Тренировка, развивающая навыки речи и перевода.',
  title: 'Аудиовызов',
  continueButton: 'Продолжить',
};

export const leoSprintContent = {
  right: 'Верно',
  wrong: 'Неверно',
  timer: {
    img: Images.Time,
    imgAlt: 'Таймер',
  },
  result: {
    img: Images.Score,
    imgAlt: 'Счет',
  },
};

export const textBookContent = {
  title: 'Спринт',
  groups: ['Раздел 1', 'Раздел 2', 'Раздел 3', 'Раздел 4', 'Раздел 5', 'Раздел 6'],
  sections: [
    { id: 0, name: 'Изучаемые слова', category: '{"$or":[{"userWord.difficulty":"hard"}, {"userWord.difficulty":"learned"}]}' },
    { id: 1, name: 'Сложные слова', category: '{"userWord.difficulty":"hard"}' },
    { id: 2, name: 'Удаленные слова', category: '{"userWord.difficulty":"deleted"}' },
  ],
};

export const DIFFICULTY = {
  RESTORED: 'restored',
  HARD: 'hard',
  DELETED: 'deleted',
  LEARNED: 'learned',
};

export const STARTWINDOWURLFILTERSTRING = '{"$or":[{"userWord.difficulty":"hard"}, {"userWord.difficulty":"learned"}, {"userWord.difficulty":"restored"}, {"userWord":null}]}';

export const baseUrl = 'https://rslang-61.herokuapp.com/';
