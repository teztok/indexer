import { downloadFromIpfs } from '../tasks/fetch-metadata/fetch-metadata';

async function run() {
  try {
    const result = await downloadFromIpfs('https://ipfs.io/ipfs/QmcLf6nw97esziCJVpzwXKwC7xb7677y3JYEDETQU2qt7j');
    console.log('result', result);
  } catch (err) {
    console.log('err', err);
  }
}

run();
