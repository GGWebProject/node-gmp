import fs from 'fs';

export const createFileWritableStream = (resultPath) => {
  const fileWritableStream = fs.createWriteStream(resultPath);

  fileWritableStream.on('error', () => {
    console.log('Can\'t write file. :(');
  });

  fileWritableStream.on('data', () => {
    console.log(`Start writing file: ${resultPath}`);
  });

  fileWritableStream.on('finish', () => {
    console.log(`Writing file is finished`);
  });

  return fileWritableStream;
}

