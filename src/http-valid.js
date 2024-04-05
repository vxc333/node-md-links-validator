function extractLinks(arrayLinks) {
  return arrayLinks.map((objLink) => Object.values(objLink).join());
}

export default function validatedList(listOfLinks) {
  return extractLinks(listOfLinks);
}
