import homepageImages from './media';

const homepageContent = {
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
      },
      {
        title: 'Аудиовызов',
        subtitle: 'Улучшает восприятие английской речи',
        description: 'После проигрывания английского  слова, нужно выбрать правильный перевод',
        img: homepageImages.HomepageAudioCall,
        key: 'audiocall',
      },
      {
        title: 'Спринт',
        subtitle: 'Развивает словарный запас',
        description: 'Нужно выбрать правильный или неправильный перевод английского слова указан на экране',
        img: homepageImages.HomepageSprint,
        key: 'sprint',
      },
      {
        title: 'Переводчик',
        subtitle: 'Тренирует правописание',
        description: 'Переводи русские слова на английский язык',
        img: homepageImages.HomepageTranslator,
        key: 'translator',
      },
    ],
    image: homepageImages.HomepageGames,
  },
};

export default homepageContent;
