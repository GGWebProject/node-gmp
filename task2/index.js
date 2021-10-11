import csv from 'csvtojson';
import readline from 'readline';
import path from 'path';
import { pipeline } from 'stream';
import { createFileReadableStream } from './readStream';
import { createFileWritableStream } from './writeStream';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const startMessage = `
Hello! 
It's converter from csv to txt.
Delimiter of a csv file should be ";"
Pls enter a absolute path to csv file.\n
`;
const secondMessage = `
Delimiter of a csv file should be ";"
Pls enter a absolute path to csv file.\n
`;

const start = (isFirstStart = false) => {
  const helloMessage = isFirstStart
    ? startMessage
    : secondMessage;

    rl.question(helloMessage, (answer) => {
      converter(answer);
    })
};

const getFileDescriptionsFromPath = (filePath) => {
  const extension = path.extname(filePath);

  return {
    name: path.basename(filePath, extension),
    path: path.dirname(filePath),
  };
}

async function converter(filePath) {
  const fileDescriptions = getFileDescriptionsFromPath(filePath);

  const pathOfConvertedFile = `${fileDescriptions.path}/${fileDescriptions.name}.txt`

  const readableStream = createFileReadableStream(filePath);
  const writableStream = createFileWritableStream(pathOfConvertedFile);

  pipeline(
    readableStream,
    csv({ delimiter: ';' }),
    writableStream,
    err => {
      if (err) {
        console.log('Try again.');
      } else {
        console.log(`Finish! Result: ${pathOfConvertedFile}\n`);
      }

      start();
    }
  )

}

start(true);


