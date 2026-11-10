import { appLocales } from './app-locales.mjs';

const labels = {
  en: { content: 'Content', preview: 'Preview', export: 'Export' },
  'zh-Hans': { content: '内容', preview: '预览', export: '导出' },
  'zh-Hant': { content: '內容', preview: '預覽', export: '匯出' },
  ja: { content: 'コンテンツ', preview: 'プレビュー', export: '書き出し' },
  ko: { content: '콘텐츠', preview: '미리보기', export: '내보내기' },
  de: { content: 'Inhalt', preview: 'Vorschau', export: 'Export' },
  fr: { content: 'Contenu', preview: 'Aperçu', export: 'Exporter' },
  es: { content: 'Contenido', preview: 'Vista previa', export: 'Exportar' }
};

export const interfaceLocales = Object.fromEntries(Object.entries(labels).map(([code, copy]) => [code, {
  ...copy, appTitle: appLocales[code].name, appCopy: appLocales[code].description
}]));
