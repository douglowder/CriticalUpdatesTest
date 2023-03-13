const path = require('path');
const fs = require('fs/promises');
const spawnAsync = require('@expo/spawn-async');

const pushUpdateAsync = async (message, critical, projectRoot) => {
  console.log('Modifying app.json...');
  const appJsonPath = path.resolve(projectRoot, 'app.json');
  const appJsonOriginalText = await fs.readFile(appJsonPath, { encoding: 'utf-8' });
  const appJsonOriginal = JSON.parse(appJsonOriginalText);
  const appJson = {
    expo: {
      ...appJsonOriginal.expo,
      extra: {
        ...appJsonOriginal.expo.extra,
        message,
        critical,
      },
    },
  };
  const appJsonText = JSON.stringify(appJson, null, 2);
  await fs.rm(appJsonPath);
  await fs.writeFile(appJsonPath, appJsonText, { encoding: 'utf-8' });

  console.log('Publishing update...');

  await spawnAsync('eas', ['update', `--message=${message}`, '--branch=main'], {
    stdio: 'inherit',
    path: projectRoot,
  });

  console.log('Restoring original app.json...');
  await fs.rm(appJsonPath);
  await fs.writeFile(appJsonPath, appJsonOriginalText, { encoding: 'utf-8' });

  console.log('Done.');
};

//////////////////////

const params = process.argv.filter((a, i) => i > 0);
const projectRoot = path.resolve(__dirname, '..');

let message = 'Testing updates';
let critical = false;

while (params.length) {
  if (params[0] === '--message' || params[0] === '-m') {
    params.shift();
    message = params[0];
  }
  if (params[0] === '--critical' || params[0] === '-c') {
    params.shift();
    critical = params[0] === 'true';
  }
  params.shift();
}

console.log(`message = ${message}`);
console.log(`critical = ${critical}`);

pushUpdateAsync(message, critical, projectRoot).catch((error) =>
  console.log(`Error in script: ${error}`)
);
