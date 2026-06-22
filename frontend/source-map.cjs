const fs = require('fs');
const sourceMap = require('source-map');
const rawSourceMap = JSON.parse(fs.readFileSync('dist/assets/index-Cctqe4fc.js.map', 'utf8'));

sourceMap.SourceMapConsumer.with(rawSourceMap, null, consumer => {
  const pos = consumer.originalPositionFor({ line: 231, column: 1752 });
  console.log(pos);
});
