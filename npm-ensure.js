const red = text => `\u001B[31m${text}\u001B[0m`;

// If "npm" is not being run, print an error message and cause a failure
if (!process.env.npm_execpath.includes('npm')) {
  console.error('\n', red('Ops! The project uses "npm" for package management.'), '\n\n');

  // eslint-disable-next-line no-process-exit
  process.exit(1);
}
