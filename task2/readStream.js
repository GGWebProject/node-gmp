import fs from 'fs';

export const createFileReadableStream = (filePath) => {
  const fileReadableStream = fs.createReadStream(filePath);

  fileReadableStream.on('error', () => {
    console.log('Can\'t read file. Pls make sure that path is correct');
  });

  fileReadableStream.on('data', () => {
    console.log(`Start reading file: ${filePath}`);
  });

  fileReadableStream.on('finish', () => {
    console.log(`Reading file is finished`);
  });

  return fileReadableStream;
};
