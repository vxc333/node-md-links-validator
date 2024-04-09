function extractLinks(arrayLinks) {
  return arrayLinks.map((objLink) => Object.values(objLink).join());
}

async function checkStatus(listOfURLs) {
  const arrStatus = await Promise.all(
    listOfURLs.map(async (url) => {
      try {
        const response = await fetch(url, { method: "HEAD" });
        return `${response.status} - ${response.statusText}`;
      } catch (erro) {
        return handleError(erro);
      }
    })
  );
  return arrStatus;
}

function handleError(erro) {
  if (erro.cause.code == "ENOTFOUND") {
    return "Link não encontrado";
  } else {
    return "Ocorreu algum erro";
  }
}

export default async function validatedList(listOfLinks) {
  const links = extractLinks(listOfLinks);
  const status = await checkStatus(links);
  return listOfLinks.map((obj, index) => ({
    ...obj,
    status: status[index],
  }));
}
