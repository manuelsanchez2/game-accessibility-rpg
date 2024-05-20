import { SPEEDS } from '@/components/dialog/config'

export const i18nData = {
  en: {
    GENERAL: {
      LOADING: 'Loading...',
      SETTINGS: 'settings',
      RESET_ALL_SETTINGS: 'Reset all settings',
    },
    SETTINGS: {
      DISPLAY: 'DISPLAY',
      AUDIO: 'AUDIO',
      MOTION: 'MOTION',
      LANGUAGE: 'LANGUAGE',
    },
  },
  es: {
    GENERAL: {
      LOADING: 'Cargando...',
      SETTINGS: 'ajustes',
      RESET_ALL_SETTINGS: 'Restablecer todo',
    },
    SETTINGS: {
      DISPLAY: 'PANTALLA',
      AUDIO: 'AUDIO',
      MOTION: 'MOVIMIENTO',
      LANGUAGE: 'IDIOMA',
    },
  },
  ru: {
    GENERAL: {
      LOADING: 'Загрузка...',
      SETTINGS: 'настройки',
      RESET_ALL_SETTINGS: 'Сбросить все настройки',
    },
    SETTINGS: {
      DISPLAY: 'ДИСПЛЕЙ',
      AUDIO: 'АУДИО',
      MOTION: 'ДВИЖЕНИЕ',
      LANGUAGE: 'ЯЗЫК',
    },
  },
  it: {
    GENERAL: {
      LOADING: 'Caricamento...',
      SETTINGS: 'impostazioni',
      RESET_ALL_SETTINGS: 'Ripristina tutte le impostazioni',
    },
    SETTINGS: {
      DISPLAY: 'DISPLAY',
      AUDIO: 'AUDIO',
      MOTION: 'MOVIMENTO',
      LANGUAGE: 'LINGUA',
    },
  },
}

interface TextSampleProps {
  string: string
  speed: number
  page: number
  extra?: string
  color?: string
}

export interface TextSamples {
  en: TextSampleProps[]
  es: TextSampleProps[]
  ru: TextSampleProps[]
  it: TextSampleProps[]
}

export const TEXT_SAMPLES: TextSamples = {
  en: [
    {
      string: 'Hi! I am a simple NPC.',
      speed: SPEEDS.normal,
      page: 1,
    },
    {
      string: 'Look how cool I am, I can change colors!',
      speed: SPEEDS.normal,
      extra: 'underline',
      color: '!text-red-500',
      page: 1,
    },
    {
      string: 'Or even speak a bit faster.',
      speed: SPEEDS.fast,
      page: 1,
    },
    {
      string: 'Or come on a new page!',
      speed: SPEEDS.fast,
      page: 2,
    },
    {
      string:
        'Change the settings by clicking the icon on the top right corner of the screen.',
      speed: SPEEDS.fast,
      color: '!text-green-500',
      page: 2,
    },
  ],
  es: [
    {
      string: '¡Hola! Soy un simple NPC.',
      speed: SPEEDS.normal,
      page: 1,
    },
    {
      string: '¡Mira qué genial soy, puedo cambiar los colores del texto!',
      speed: SPEEDS.normal,
      extra: 'underline',
      color: '!text-red-500',
      page: 1,
    },
    {
      string: 'O incluso hablar un poco más rápido.',
      speed: SPEEDS.fast,
      page: 1,
    },
    {
      string: '¡O ir a una nueva página!',
      speed: SPEEDS.fast,
      page: 2,
    },
    {
      string:
        'Cambia la configuración haciendo clic en el icono en la esquina superior derecha de la pantalla.',
      speed: SPEEDS.fast,
      color: '!text-green-500',
      page: 2,
    },
  ],
  ru: [
    {
      string: 'Привет! Я простой NPC.',
      speed: SPEEDS.normal,
      page: 1,
    },
    {
      string: 'Посмотрите, насколько я крут, я могу менять цвета!',
      speed: SPEEDS.normal,
      extra: 'underline',
      color: '!text-red-500',
      page: 1,
    },
    {
      string: 'Или даже говорить немного быстрее.',
      speed: SPEEDS.fast,
      page: 1,
    },
    {
      string: 'Или перейти на новую страницу!',
      speed: SPEEDS.fast,
      page: 2,
    },
    {
      string:
        'Измените настройки, нажав на значок в правом верхнем углу экрана.',
      speed: SPEEDS.fast,
      color: '!text-green-500',
      page: 2,
    },
  ],
  it: [
    {
      string: 'Ciao! Sono un semplice NPC.',
      speed: SPEEDS.normal,
      page: 1,
    },
    {
      string: 'Guarda quanto sono figo, posso cambiare i colori!',
      speed: SPEEDS.normal,
      extra: 'underline',
      color: '!text-red-500',
      page: 1,
    },
    {
      string: 'O anche parlare un po più veloce.',
      speed: SPEEDS.fast,
      page: 1,
    },
    {
      string: 'O andare su una nuova pagina!',
      speed: SPEEDS.fast,
      page: 2,
    },
    {
      string:
        "Cambia le impostazioni facendo clic sull'icona nell'angolo in alto a destra dello schermo.",
      speed: SPEEDS.fast,
      color: '!text-green-500',
      page: 2,
    },
  ],
}
