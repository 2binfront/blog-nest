import * as path from 'path';
import * as fs from 'fs';

/**
 * 处理inputPath为无符号链接无歧义绝对路径后返回
 * @param inputPath
 * @returns
 */
export function resolveRealPath(inputPath: string): string {
  const realPath = fs.realpathSync(inputPath);
  const absolutePath = path.resolve(realPath);
  return absolutePath;
}
