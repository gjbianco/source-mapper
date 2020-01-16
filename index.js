// change these options as needed ----------------

// the base path to the project's source
const PROJECT_LOCATION = process.env.SOURCE_LOCATION || '.';

// the name of the application
// this script assumes the sourcemaps are in `<PROJECT_LOCATION>/dist/<APP_NAME>`
const APP_NAME = process.env.SOURCE_APP || 'ui-monitoring-poc';

// the base name of the file
// other examples: main-es5, polyfills-es2015
const BASE_FILENAME = process.env.SOURCE_FILENAME || 'main-es2015';

// hash part of the built minified file
// you NEED to make sure you're on the same commit
// and that the hashes match in the /dist folder
const BUILD_HASH = process.env.SOURCE_HASH || '1234567890abcde12345';

// line from minified file -- likely won't change
const LINE = parseInt(process.env.SOURCE_LINE, 10) || 1;

// column from the minified file
const COLUMN = parseInt(process.env.SOURCE_COLUMN, 10) || 1;

// -----------------------------------------------

const fs = require('fs');
const path = require('path');
const sourceMap = require('source-map');

const generatedFile = path.join(
  `${PROJECT_LOCATION}/dist/${APP_NAME}`,
  `${BASE_FILENAME}.${BUILD_HASH}.js.map`
);

console.log(`
Looking up ${LINE}:${COLUMN} in file ${generatedFile}
`);

fs.readFile(generatedFile, (err, rawSourceMap) => {
  if (err) {
    console.error('error reading file: ' + err);
  } else {
    processSourceMap(rawSourceMap.toString(), { line: LINE, column: COLUMN });
  }
});

function processSourceMap(sourceMapData, positionObj) {
  new sourceMap.SourceMapConsumer(sourceMapData)
    .then(function(smc) {
      const position = smc.originalPositionFor(positionObj);

      // should see some output like:
      // { source: 'original.js', line: 57, column: 9, name: 'myfunc' }
      console.log(position);
    })
    .catch(err => {
      console.error('error processing sourcemap: ' + err);
    });
}
