import rimraf from 'rimraf';
import mkdirp from 'mkdirp';
import changeCase from 'change-case';
import { build, normalizeRaid } from './utils';

const outDir = 'dist';
rimraf.sync(`./${outDir}`);
mkdirp.sync(`./${outDir}`);

build(
  './src/chars',
  `./${outDir}/chars.json`,
  ([fileName, item]) => {
    const extra = {};
    extra.released = fileName;

    return Object.assign({}, extra, item);
  },
  {
    after(data) {
      return data.reverse();
    }
  }
);

build('./src/raid', `./${outDir}/raid.json`, ([fileName, item]) => {
  const extra = {};
  extra.alias = changeCase.paramCase(normalizeRaid(item.name_en));
  extra.category = fileName;

  return Object.assign({}, extra, item);
});
