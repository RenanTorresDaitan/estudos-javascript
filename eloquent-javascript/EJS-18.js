const { readFile, readdir, stat } = require("fs").promises;

async function search() {
  if (process.argv.length <= 2) {
    return console.log(
      "\nSearch <regex> <files> \n \tUSAGE: Just like grep, the first argument is the regex, and the subsequent ones are files or directories to search for. \n\n\tExample: EJS-18.js test testfile.txt \n\t\t- Searches for the string \"test\" in the file \"testfile.txt\"."
    );
  }
  const arguments = process.argv.slice(3);
  if (arguments.length === 0){
      arguments.push(process.cwd()+"/");
  }
  const regex = new RegExp(process.argv[2]);
  for (let file of arguments) {
    const fileStat = await stat(file);
    if (fileStat.isDirectory()) {
      console.log(await readdir(file));
    } else {
      const fileContent = await readFile(file, "utf-8");
      if (fileContent.match(regex)) {
        console.log(file);
      }
    }
  }
}

search();
