import { ThemeItem, NotebookMeta, NotebookPageData, CELLS_PER_PAGE } from '../types';
import { parseTextToGridCells } from '../utils/pinyinHelper';

export const INITIAL_NOTEBOOK_META: NotebookMeta = {
  schoolName: '中文学校',
  studentClass: '三年级',
  studentName: '习作练习',
  subject: '作文 · 《父爱》',
};

export const DEFAULT_THEMES: ThemeItem[] = [
  {
    id: 'theme-fuai',
    titleZh: '父爱',
    titlePinyin: 'fù ài',
    date: '2026年3月',
    rawText: '大家好。今天，我想谈谈我的父亲。父亲是我生命中非常重要的人。他努力工作照顾我们的家庭，总是尽力让我们快乐。他教导我要诚实、善良和负责。每当我遇到问题时，我都可以和他交谈并寻求他的建议。他鼓励我好好学习，追逐我的梦想。有时他可能很忙，但他总是会抽出时间陪伴家人。我感谢他的爱、支持和指导。我的父亲不仅是我的父母，也是我的老师和榜样。谢谢聆听。',
    gradeStamp: '优',
    createdAt: 1710500000000,
  },
];

/**
 * Splits a theme's text into pages of up to CELLS_PER_PAGE (42) cells.
 * If a theme has 169 characters, it spans across pages automatically!
 */
export function generateNotebookPages(themes: ThemeItem[]): NotebookPageData[] {
  const pages: NotebookPageData[] = [];
  let globalPageNum = 1;

  for (const theme of themes) {
    const allCells = parseTextToGridCells(theme.rawText).filter((c) => c.char !== '\n');
    const totalChars = allCells.length;
    const totalParts = Math.max(1, Math.ceil(totalChars / CELLS_PER_PAGE));

    for (let partIndex = 1; partIndex <= totalParts; partIndex++) {
      const startIdx = (partIndex - 1) * CELLS_PER_PAGE;
      const endIdx = Math.min(startIdx + CELLS_PER_PAGE, totalChars);
      const pageCells = allCells.slice(startIdx, endIdx);

      pages.push({
        id: `${theme.id}-p${partIndex}`,
        themeId: theme.id,
        pageNumber: globalPageNum,
        partIndex,
        totalParts,
        titleZh: theme.titleZh,
        titlePinyin: theme.titlePinyin,
        date: theme.date,
        gradeStamp: partIndex === totalParts ? theme.gradeStamp : undefined,
        cells: pageCells,
      });

      globalPageNum++;
    }
  }

  return pages;
}
