import get from 'lodash/get';
import minimist from 'minimist';

const argv = minimist(process.argv.slice(2));

if (!argv._.length) {
  console.log(`usage: node ./build/scripts/create-plugin-tables.js <plugin-name>`);
  process.exit();
}

const pluginName = argv._[0];

(async () => {
  try {
    const createTable = require(`../plugins/${pluginName}/create-tables.js`).default;
    await createTable();
    console.log(`created tables of "${pluginName}" plugin`);
  } catch (err) {
    console.log('failed to create tables', get(err, 'message'));
  }
})();
