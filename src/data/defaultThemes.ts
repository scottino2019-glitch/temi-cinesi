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
  {
    id: 'theme-pengyou',
    titleZh: '朋友',
    titlePinyin: 'Péng yǒu',
    date: '2026年3月',
    rawText: '大家好。今天，我想谈谈我最好的朋友。好朋友是理解我们、支持我们，并在好坏时光都陪伴着我们的人。每当我有话要说时，我最好的朋友总是会倾听我的心声。我们喜欢聊天、欢笑并共度时光。当我们要面对困难时，我们也会互相帮助。真正的朋友不需要是完美的。真正的朋友是诚实、体贴且值得信赖的人。我们有时可能会有分歧，但我们尊重彼此，并原谅对方的错误。我很感激能有一位让我的生活变得更快乐的朋友。良好的友谊是值得我们永远珍惜的美好礼物。谢谢大家的聆听。',
    gradeStamp: '名',
},
  {
    id: 'theme-meimei',
    titleZh: '妹妹',
    titlePinyin: 'mèimei',
    date: '2026年3月',
    rawText: '我有一个顽皮而可爱的妹妹，他有一双明亮的大眼睛，樱桃小嘴嵌在红彤彤的脸上，总有几分淘气的神情。',
    gradeStamp: '妹',
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
