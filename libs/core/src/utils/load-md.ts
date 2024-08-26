import * as fs from 'fs';
import * as path from 'path';
const rootPath = {
    main: 'src',
    core: 'libs/core/src',
};
export const loadMD = (p: string, r: keyof typeof rootPath = 'main') =>
    fs.readFileSync(path.join(process.cwd(), rootPath[r], p), 'utf8');
