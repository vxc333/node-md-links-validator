import fs from "fs";
import getFile from "./index.js";
import validatedList from "./http-valid.js";

const path = process.argv;

function printList(valid, result, identifier = "") {
  if (valid) {
    console.log("Lista validada", identifier, validatedList(result));
  } else {
    console.log("Lista de links", identifier, result);
  }
}
async function wordProcessing(args) {
  // Peguei a posição 2 pq o "process.argv" retorna 2 valores anteriores a ele
  const path = args[2];
  const valid = args[3] === "--valid";

  try {
    fs.lstatSync(path);
  } catch (erro) {
    if (erro.code == "ENOENT") {
      console.log("Arquivo ou diretório não existe");
      return;
    }
  }

  if (fs.lstatSync(path).isFile()) {
    const result = await getFile(path);
    printList(valid, result);
  } else if (fs.lstatSync(path).isDirectory()) {
    const file = await fs.promises.readdir(path);
    file.forEach(async (fileName) => {
      const list = await getFile(`${path}/${fileName}`);
      printList(valid, list, fileName);
    });
  }
}

wordProcessing(path);
