export interface DownloadableTheme {
  id: string;
  titleZh: string;
  titleIt: string;
  fileName: string;
  fileUrl: string;
  date?: string;
  description?: string;
  hskLevel?: string;
}

/**
 * Elenco dei temi HTML autonomi disponibili per il download.
 * Per aggiungere un nuovo tema:
 * 1. Metti il file .html in /public/temi/<nome-file>.html
 * 2. Aggiungi una riga a questo elenco qui sotto.
 */
export const downloadableThemes: DownloadableTheme[] = [
  {
    id: 'fuai',
    titleZh: '父爱',
    titleIt: "L'amore del padre",
    fileName: 'fuai.html',
    fileUrl: '/temi/fuai.html',
    date: '16/09/2026',
    hskLevel: 'HSK 3',
    description: 'Foglio A4 autonomo a 12 colonne con pinyin e traduzione in italiano',
  },
];
