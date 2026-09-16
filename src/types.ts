export interface GridCell {
  char: string;
  pinyin: string;
  isPunctuation?: boolean;
}

export interface ThemeItem {
  id: string;
  titleZh: string;
  titlePinyin: string;
  date: string;
  rawText: string;
  gradeStamp?: string;
  createdAt?: number;
}

export interface NotebookPageData {
  id: string;
  themeId: string;
  pageNumber: number; // Global notebook page number (1, 2, 3...)
  partIndex: number;  // Page part within theme (1, 2, etc.)
  totalParts: number; // Total pages for this theme
  titleZh: string;
  titlePinyin: string;
  date: string;
  gradeStamp?: string;
  cells: GridCell[]; // Exactly up to 42 cells per page
}

export interface NotebookMeta {
  schoolName: string;
  studentClass: string;
  studentName: string;
  subject: string;
}

export const CELLS_PER_PAGE = 42; // 7 columns x 6 rows
