const revertString = (string) => [...string].reverse().join('');

const writeValue = (value) => process.stdout.write(`${value}\n`);

process.stdin.setEncoding("ascii").on('data', (value) => {
  const revertedValue = revertString(value);

  writeValue(revertedValue);
})
