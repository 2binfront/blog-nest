import { isArray } from 'class-validator';
import { createHash, randomUUID } from 'crypto';
import {
  ActivityCreatorDto,
  ActivityTagDto,
  AnonymousUserDto,
  ArticleDto,
  AssetTypeDto,
  AssetUserDto,
  CommentDto,
  CreateUserBadgeDto,
  DepartmentDto,
  ImageDto,
  PaginationParam,
  PostDto,
  PosterDto,
  ScoreHistoryUserDto,
} from 'src/dtos';

export * from './file';

export const WEEK = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

export const drawText = (ctx: any, fontSize: number, font = 'simsun', text: string, locationX: number, locationY: number) => {
  ctx.fontSize = fontSize + `px , ${font} sans-serif`;
  ctx.fillText(text, locationX, locationY);
};

interface DrawTextOptions {
  draw: any;
  width: number;
  word: string;
  ttf: string;
  fontsize: number;
  cutsize: number;
  height: number;
  left?: number;
  fill?: string | CanvasGradient | CanvasPattern;
  maxLength?: number;
}
interface DrawTextLinesOptions {
  draw: any;
  width: number;
  word: string;
  ttf: string;
  fontsize: number;
  cutsize: number;
  height: number;
  left?: number;
  fill?: string | CanvasGradient | CanvasPattern;
  maxLength?: number;
  lineCount?: number;
}

export function getRandomValue<T>(prizes: T[]): T {
  const totalWeight = prizes.reduce((total, prize) => total + (prize as any).probability, 0);
  const random = Math.random() * totalWeight;
  let prize = null;
  let currentWeight = 0;
  for (const p of prizes) {
    currentWeight += (p as any).probability;
    // console.log('in circle', random, currentWeight, (p as any).count);
    if (random < currentWeight) {
      prize = p;
      break;
    }
  }

  if (!prize?.count) return getRandomValue(prizes);
  else return prize;
}

// 自定义函数生成指定长度的随机字符串
function generateRandomString(length: number): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export function gen_asset_number(): string {
  return `cowave-${new Date().getFullYear()}-${generateRandomString(8)}`;
}

export function drawWords(options: DrawTextOptions): [number, number] {
  const { draw, width, word, ttf, fontsize, cutsize, height, left = undefined, fill = 'black', maxLength = 0 } = options;

  const font = `${fontsize}px ${ttf}`;
  draw.font = font;

  let wordList = word.split('');
  if (maxLength > 0 && wordList.length > maxLength) {
    wordList = wordList.slice(0, maxLength);
  }

  let length = 0;
  let _word = '';

  for (const w of wordList) {
    if (length >= cutsize - 3) {
      _word += '...';
      length += 2;
      break;
    }
    _word += w;
    length += w.charCodeAt(0) > 127 ? 2 : 1; // Assume non-ASCII chars take 2 width
  }

  const calculatedLeft = (width - (fontsize / 2) * length) / 2;
  draw.textAlign = 'left';
  draw.textBaseline = 'top';
  draw.fillStyle = fill;
  draw.fillText(_word, left !== undefined ? left : calculatedLeft, height);

  const metrics = draw.measureText(_word);
  return [metrics.width, fontsize];
}

export function drawWordsLines(options: DrawTextLinesOptions): void {
  const { draw, width, word, ttf, fontsize, cutsize, height, left = undefined, fill = 'black', maxLength = 0, lineCount = 2 } = options;

  const font = `${fontsize}px ${ttf}`;
  draw.font = font;

  let wordList = word.replace(/\n/g, '');
  //   if (maxLength > 0 && wordList.length > maxLength) {
  //     wordList = wordList.slice(0, maxLength);
  //   }

  let length = 0;
  let _word = '';
  let l = 0;

  for (let i = 0; i < lineCount; i++) {
    wordList = wordList.slice(l);
    for (const w of wordList) {
      if (length >= cutsize - 1) {
        if (i === lineCount - 1) {
          _word += '...';
        }
        break;
      }
      _word += w;
      length += 1; // Assume each character is of width 1 unit
      //   length += w.charCodeAt(0) > 127 ? 2 : 1; // Assume non-ASCII chars take 2 width
    }

    const calculatedLeft = (width - (fontsize / 2) * length) / 2;
    draw.textAlign = 'left';
    draw.textBaseline = 'top';
    draw.fillStyle = fill;
    draw.fillText(_word, left !== undefined ? left : calculatedLeft, height + (fontsize + 12) * i);

    l = _word.length;
    _word = '';
    length = 0;
  }
}
const ExcelJS = require('exceljs');
/**
 * 在缓冲区生成excel文件
 * @param header 表头
 * @param col 表头对应字段名称
 * @param data 传入数据数组
 * @param fileName 文件名称
 * @returns buffer中的excel文件
 */
export const make_excel_res = async (header: string[], col: string[], data: any, fileName: string) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet(fileName);
  worksheet.columns = header.map((v, idx) => {
    return { header: v, key: col[idx], width: 15 };
  });
  // 加粗首行
  worksheet.getRow(1).font = { bold: true };

  for (let _ of data) {
    _ = pickKeys(_, col);
  }
  worksheet.addRows(data);
  return await workbook.xlsx.writeBuffer();
};
/**
 * 返回值中的属性值均为字符串
 * @param header 表头
 * @param keys 对应表头的字段数组
 * @param file
 * @param firstSheet
 * @param getSheetName
 * @param hasMergedTitle
 * @returns
 */
export const parseExcel = async (header, keys, file, firstSheet = true, getSheetName = false, hasMergedTitle = false) => {
  // 创建一个新的 ExcelJS 工作簿实例
  const workbook = new ExcelJS.Workbook();

  // 读取上传的文件内容
  await workbook.xlsx.load(file.buffer);

  // 获取工作表
  const worksheet = workbook.worksheets[firstSheet ? 0 : workbook.worksheets.length - 1]; // 默认取第一个工作表
  const sheetName = worksheet.name;
  const headerIdx = hasMergedTitle ? 2 : 1;

  // 获取合并单元格的范围
  const mergedCells = worksheet.mergedCells;

  // 找到第一行的合并单元格内容
  let mergedTitle: string | null = null;
  if (hasMergedTitle) {
    worksheet.getRow(1).values.forEach((cell, colNumber) => {
      if (colNumber == 1) {
        mergedTitle = cell;
      }
    });
  }

  // 存储数据的数组
  const data: any[] = [];
  const excelHeaders: string[] = worksheet.getRow(headerIdx).values as string[];

  // 构建列名到字段名的映射
  const columnMapping: any = {};
  header.forEach((v, idx) => {
    columnMapping[v] = keys[idx];
  });
  // 遍历工作表中的每一行
  worksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
    if (rowNumber === 1 && hasMergedTitle) {
      // 跳过合并标题行
      return;
    }
    if (rowNumber === headerIdx) {
      // 跳过列名行
      return;
    }

    // 从每行中提取数据并存储
    const rowData: any = {};
    row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
      if (columnMapping.hasOwnProperty(excelHeaders[colNumber])) rowData[columnMapping[excelHeaders[colNumber]]] = cell.text; // 根据需要修改列名称
    });
    data.push(rowData);
  });
  return getSheetName
    ? {
        sheetName,
        data,
        mergedTitle,
      }
    : data;
};

export const parseMergeCellExcel = async (header, keys, file, firstSheet = true) => {
  // 创建一个新的 ExcelJS 工作簿实例
  const workbook = new ExcelJS.Workbook();

  // 读取上传的文件内容
  await workbook.xlsx.load(file.buffer);

  // 获取工作表
  const worksheet = workbook.worksheets[firstSheet ? 0 : workbook.worksheets.length - 1]; // 默认取第一个工作表
  console.log(worksheet.name);

  // 存储数据的数组
  const dataArray: any[] = [];
  const excelHeaders: string[] = worksheet.getRow(1).values as string[];

  // 构建列名到字段名的映射
  const columnMapping: any = {};
  header.forEach((v, idx) => {
    columnMapping[v] = keys[idx];
  });
  // 遍历工作表中的每一行
  worksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
    if (rowNumber === 1) {
      // 跳过标题行
      return;
    }
    // 从每行中提取数据并存储
    const rowData: any = {};
    row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
      if (columnMapping.hasOwnProperty(excelHeaders[colNumber])) rowData[columnMapping[excelHeaders[colNumber]]] = cell.text; // 根据需要修改列名称
    });
    dataArray.push(rowData);
  });
  return dataArray;
};

/**
 * 从obj中按序选择keys数组中的属性并返回新对象
 * @param obj
 * @param keys
 * @returns
 */
export function pickKeys(obj, keys) {
  return keys.reduce((result, key) => {
    if (obj.hasOwnProperty(key)) {
      result[key] = obj[key];
    }
    return result;
  }, {});
}

/**
 * md5加密
 * @param pwd
 * @returns
 */
export const md5HashPws = (pwd: string) => {
  const hash = createHash('md5');
  hash.update(pwd, 'utf8');
  return hash.digest('hex');
};

// 裁剪函数
export const trimObjectByType = <T>(dtoType: new () => T, obj: Partial<T>): T => {
  const keys = Object.keys(new dtoType()) as Array<keyof T>;
  const trimmedObj: Partial<T> = {};
  keys.forEach((key) => {
    trimmedObj[key] = obj[key];
  });

  return trimmedObj as T;
};

/**
 * 获取传入时间-1天的凌晨零点日期
 * @param curDate
 * @returns
 */
export const yesterdayMidnight = (curDate: Date = new Date()): Date => {
  const curDateCopy = new Date(curDate);
  // setdate会自动处理边界情况
  curDateCopy.setDate(curDateCopy.getDate() - 1);
  curDateCopy.setHours(0, 0, 0, 0);
  return curDateCopy;
};

/**
 * 获取传入时间+1个月后的时间
 * js中month-getMonth和weekday-getDay从0开始
 * @param curDate
 * @returns
 */
export const next_month = (curDate: Date = new Date()): Date => {
  const month = curDate.getMonth() + 1;
  const year = curDate.getFullYear();
  const nextMonth = month === 12 ? 1 : month + 1;
  const nextYear = month === 12 ? year + 1 : year;
  return new Date(nextYear, nextMonth - 1, curDate.getDate(), curDate.getHours(), curDate.getMinutes());
};

/**
 *  封装分页返回结果，需要单独传入total的原因时data已经是分页的结果，prisma没办法在分页查询的同时获取数据总量
 * @param data 分页查询后的数据
 * @param total 分页前数据总个数
 * @param p 传入的分页参数
 * @returns
 */
export const paging = (data: any, total: number, p: PaginationParam = { size: 10, page: 1 }) => {
  const total_pages = Math.ceil(total / (p.size || 1));
  return {
    total,
    page: p.page,
    size: p.size,
    next: p.page < total_pages ? `?page=${p.page + 1}&size=${p.size}` : null,
    previous: p.page > 1 ? `?page=${p.page - 1}&size=${p.size}` : null,
    total_pages,
    data,
  };
};

export const customPaging = (data: any, p: PaginationParam) => {
  const total_pages = Math.ceil(data.length / p.size);
  return {
    total: data.length,
    page: p.page,
    size: p.size,
    next: p.page < total_pages ? `?page=${p.page + 1}&size=${p.size}` : null,
    previous: p.page > 1 ? `?page=${p.page - 1}&size=${p.size}` : null,
    total_pages,
    data: p.page && p.size ? data.slice((p.page - 1) * p.size, p.page * p.size) : data,
  };
};
type FieldsOf<T> = {
  [K in keyof T]: true;
};

/**
 *  生成字段类型
 * @param dto 实例
 * @returns
 */
export const generateFields = <T>(dto: new () => T): FieldsOf<T> => {
  const keys = Object.keys(new dto()) as (keyof T)[];
  const res: any = Object.fromEntries(keys.map((field) => [field, true])) as FieldsOf<T>;
  if (res.department) {
    res.department = { select: generateFields(DepartmentDto) };
  }
  if (res.user_badges) {
    res.user_badges = {
      select: {
        id: true,
        expired: true,
        badge: true,
      },
    };
  }
  //   if (res.image) {
  //     res.image = { select: generateFields(ImageDto) };
  //   }
  return res;
};

export const generateForumFields = <T>(dto: new () => T): FieldsOf<T> => {
  const keys = Object.keys(new dto()) as (keyof T)[];
  const res: any = Object.fromEntries(keys.map((field) => [field, true])) as FieldsOf<T>;
  if (res.receiver) {
    res.receiver = { select: generateForumFields(ScoreHistoryUserDto) };
  }
  if (res.sender) {
    res.sender = { select: generateForumFields(ScoreHistoryUserDto) };
  }
  if (res.article) {
    res.article = { select: generateForumFields(ArticleDto) };
  }
  if (res.comment) {
    res.comment = { select: generateForumFields(CommentDto) };
  }
  if (res.anonymous_user) {
    res.anonymous_user = { select: generateForumFields(AnonymousUserDto) };
  }
  if (res.posters) {
    res.posters = { select: generateFields(PosterDto) };
  }
  if (res.user) {
    res.user = { select: generateForumFields(ScoreHistoryUserDto) };
  }
  if (res.parent_comment) {
    res.parent_comment = { select: generateFields(CommentDto) };
  }
  if (res.comment_upvotes) {
    res.comment_upvotes = { select: { user: { select: generateFields(ScoreHistoryUserDto) } } };
  }
  //   if (res.image && res.anonymous_user) {
  //     res.image = { select: generateFields(ImageDto) };
  //   }
  return res;
};

export const generateAssetFields = <T>(dto: new () => T): FieldsOf<T> => {
  const keys = Object.keys(new dto()) as (keyof T)[];
  const res: any = Object.fromEntries(keys.map((field) => [field, true])) as FieldsOf<T>;
  if (res.user) {
    res.user = { select: generateFields(AssetUserDto) };
  }
  if (res.owner) {
    res.owner = { select: generateFields(AssetUserDto) };
  }
  if (res.type) {
    res.type = { select: generateFields(AssetTypeDto) };
  }
  if (res.images) {
    res.images = { select: { image: { select: generateFields(ImageDto) } } };
  }
  return res;
};

export function generateActivityFields<T>(dto: new () => T): FieldsOf<T> {
  const keys = Object.keys(new dto()) as (keyof T)[];
  const res: any = Object.fromEntries(keys.map((field) => [field, true])) as FieldsOf<T>;
  if (res.banner) {
    res.banner = { select: { image: { select: generateFields(ImageDto) } } };
  }
  if (res.posters) {
    res.posters = { select: { image: { select: generateFields(ImageDto) } } };
  }
  if (res.tag) {
    res.tag = { select: generateFields(ActivityTagDto) };
  }
  if (res.creator) {
    res.creator = { select: generateFields(ActivityCreatorDto) };
  }
  return res;
}

export function extract_property(data: any, property: string) {
  if (isArray(data)) {
    for (const item of data) {
      if (item.hasOwnProperty(property)) {
        Object.assign(item, item[property]);
        item[property] = undefined;
      }
    }
  }
}

export const deepcopy = (obj: any) => {
  return JSON.parse(JSON.stringify(obj));
};
