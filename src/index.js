import fs from "fs";

// Função que vai extrair os links do arquivo .md
function extractLinks(text) {
  const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
  const catches = [...text.matchAll(regex)];
  const result = catches.map((capture) => ({ [capture[1]]: capture[2] }));
  return result.length !== 0 ? result : "Não há links no arquivo!";
}


// Função responsável pela leitura dos arquivos
async function getFile(filePath) {
  try {
    const encoding = "utf-8";
    const text = await fs.promises.readFile(filePath, encoding);
    return extractLinks(text);
  } catch (erro) {
    throw new Error(erro);
  } finally {
    console.log("operação concluída");
  }
}

export default getFile;
