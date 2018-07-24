import YAML from 'js-yaml';
import { readdirSync, readFileSync, writeFileSync } from 'fs';

export function build(entry, outFile, format, opts = {}) {
  let data = readdirSync(`./${entry}`);
  if (opts.before) {
    data = opts.before(data);
  }
  data = data.reduce((data, file) => {
    const [fileName, ext] = file.split('.');
    if (ext !== 'yaml') {
      return;
    }

    let items = YAML.safeLoad(readFileSync(`./${entry}/${file}`, 'utf8'));
    return data.concat(items.map(item => format([fileName, item])));
  }, []);
  if (opts.after) {
    data = opts.after(data);
  }
  writeFileSync(outFile, JSON.stringify(data, null, 2));
}

export function normalizeRaid(name = 'unknown') {
  return name.replace('Lvl', 'lv').replace(/[ _]/g, '');
}
