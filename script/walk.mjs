import {basename, dirname} from 'node:path/win32';
import {globSync} from 'glob';

export function walk(dir) {
  const obj = {};
  globSync(`${dir}/**/index.html`, {nodir: true}).forEach((file) => {
    const dirBasename = basename(dirname(file));
    obj[dirBasename] = file;
  })
}