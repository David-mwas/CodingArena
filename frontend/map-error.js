import fs from 'fs';
import { SourceMapConsumer } from 'source-map';

const rawSourceMap = JSON.parse(fs.readFileSync('dist/assets/index-DyO3RZk5.js.map', 'utf8'));

SourceMapConsumer.with(rawSourceMap, null, consumer => {
  const pos = consumer.originalPositionFor({ line: 231, column: 1906 });
  console.log(pos);
});
