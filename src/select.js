import { getVisibleElementsInViewPort } from 'dom-element-types';
import {
  selectableSelectors,
  getSelectableSelector,
} from './helpers/element_selectors';

const selectableFilters = Object.keys(selectableSelectors);

const filters = {
  en: {
    audio: 'audio',
    image: 'image',
    link: 'link',
    media: 'media',
    text: 'text',
    video: 'video',
  },
  es: {
    audio: 'audio',
    image: 'imagen',
    link: 'vínculo',
    media: 'multimedia',
    text: 'texto',
    video: 'video',
  },
  pt: {
    audio: 'áudio',
    image: 'imagem',
    link: 'link',
    media: 'mídia',
    text: 'texto',
    video: 'vídeo',
  },
};

const i18n = {
  en: {
    command: 'selecionar',
    commandHelp: 'Selecionar um',
    element: 'element',
    audio: 'Audio',
    audioDescription: 'Use the command "select", "select audio" or "select media"',
    image: 'Image',
    imageDescription: 'Use the command "select" or "select image"',
    link: 'Link',
    linkDescription: 'Use the command "select" or "select link"',
    selectLink: 'select this',
    text: 'Text',
    textDescription: 'Use the command "select" or "select text" to select this text',
    video: 'Video',
    videoDescription: 'Use the command "select", "select video" or "select media"',
  },
  es: {
    command: 'seleccionar',
    commandHelp: 'Seleccionar un',
    element: '',
    audio: 'Audio',
    audioDescription: 'Usar comando "seleccionar", "seleccionar audio" o "seleccionar multimedia"',
    image: 'Imagen',
    imageDescription: 'Usar comando "seleccionar" o "seleccionar imagen"',
    link: 'Vínculo',
    linkDescription: 'Usar comando "seleccionar" o "seleccionar vínculo"',
    selectLink: 'seleccionar este vínculo',
    text: 'Texto',
    textDescription: 'Usar comando "seleccionar" o "seleccionar texto" para seleccionar esta linea de texto',
    video: 'Video',
    videoDescription: 'Usar comando "seleccionar", "seleccionar video" o "seleccionar multimedia"',
  },
  pt: {
    command: 'selecionar',
    commandHelp: 'Selecionar algo',
    element: 'elemento',
    audio: 'Áudio',
    audioDescription: 'Use o comando "selecionar", "selecionar áudio" ou "selecionar mídia"',
    image: 'Imagem',
    imageDescription: 'Use o comando "selecionar" ou "selecionar imagem"',
    link: 'Link',
    linkDescription: 'Use o comando "selecionar" ou "selecionar linl"',
    selectLink: 'selecionar link',
    text: 'Texto',
    textDescription: 'Use o comando "selecionar" ou "selecionar texto" para selecionar este texto',
    video: 'Vídeo',
    videoDescription: 'Use o comando "selecionar", "selecionar vídeo" ou "selecionar mídia"',
  },
};

function getI18nHtmlExample(lang) {
  const texts = i18n[lang];
  return `
    <h4>${texts.audio}</h4>
    <p class="box">
      ${texts.audioDescription}<br/>
      <audio controls>
        <source src="https://handsfreeforweb.com/hfw-assets/audio.mp3" type="audio/mpeg">
      </audio>
    </p>
    <h4>${texts.image}</h4>
    <p class="box">
      ${texts.imageDescription}<br/>
      <img src="https://handsfreeforweb.com/hfw-assets/image.png" />
    </p>
    <h4>${texts.link}</h4>
    <p class="box">
      ${texts.linkDescription}<br/>
      <a href="#">${texts.selectLink}</a>
    </p>
    <h4>${texts.text}</h4>
    <p class="box">
      ${texts.textDescription}
    </p>
    <h4>${texts.video}</h4>
    <p class="box">
      ${texts.videoDescription}<br/>
      <video width="320" height="240" controls>
        <source src="https://handsfreeforweb.com/hfw-assets/video.mp4" type="video/mp4">
      </video>
    </p>
  `;
}

const filterElementMap = selectableFilters.map(filter => ({
  name: `i18n-command.select-${filter}`,
  help: `i18n-help.select-${filter}`,
  switchToContext: 'pickLabel',
  group: 'i18n-group.select',
  action: state => select(state, filter),
}));

function getI18nCommands(lang) {
  const map = {};
  selectableFilters.forEach((filter) => {
    map[`command.select-${filter}`] = `${i18n[lang].command} ${filters[lang][filter]}`;
    map[`help.select-${filter}`] = `${i18n[lang].commandHelp} ${filters[lang][filter]} ${i18n[lang].element}`;
  });
  return map;
}

function selectElement(el) {
  return {
    selectedElement: el,
  };
}

function select({ contextState }, filter) {
  const selector = getSelectableSelector(filter);
  const elements = getVisibleElementsInViewPort(selector);

  if (elements.length > 1) {
    return {
      context: 'pickLabel',
      labels: selector,
      selectedElementHandler: selectElement,
    };
  } if (elements.length === 1) {
    return {
      selectedElement: elements[0],
    };
  }
  return {};
}

export default {
  name: 'i18n-name',
  description: 'i18n-description',
  icon: 'fa fa-bars',
  contexts: [{
    context: 'root',
    htmlExample: 'i18n-html-example',
    commands: [{
      name: 'i18n-command.select',
      action: select,
      help: 'i18n-help.select',
      group: 'i18n-group.select',
    },
    ...filterElementMap,
    ],
    i18n: {
      en: {
        'command.select': 'select',
        'help.select': 'Useful to focus an element',
        'group.select': 'Select an element',
        'html-example': getI18nHtmlExample('en'),
        ...getI18nCommands('en'),
      },
      es: {
        'command.select': 'seleccionar',
        'help.select': 'Selecciona el elemento indicado',
        'group.select': 'Selecciona un elemento',
        'html-example': getI18nHtmlExample('es'),
        ...getI18nCommands('es'),
      },
      pt: {
        'command.select': 'selecionar',
        'help.select': 'Utilizado para selecionar um elemento desejado.',
        'group.select': 'Selecione um elemento',
        'html-example': getI18nHtmlExample('pt'),
        ...getI18nCommands('pt'),
      },
    },
  }],
  i18n: {
    en: {
      name: 'Select',
      description: 'This module allows you to select an element and then be able to execute commands related with the selected element',
    },
    es: {
      name: 'Seleccionar',
      description: 'Este módulo permite seleccionar un elemento y luego poder ejecutar opciones basadas en el elemento seleccionado',
    },
    pt: {
      name: 'Selecionar',
      description: 'Este comando permite selecionar um elemento e depois executar ações relacionados ao elemento selecionado.',
    },
  },
};
