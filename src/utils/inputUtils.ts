// Tools for detecting and removing those general header and footer texts from Project Gutenberg books
const gutenbergHeaderRegex =
  /(\*\*\* START OF .* PROJECT GUTENBERG .* \*\*\*\n*)/;
const gutenbergFooterRegex =
  /(\n*\*\*\* END OF .* PROJECT GUTENBERG .* \*\*\*)/;

export const isProbablyGutenbergEbook = (text: string) =>
  gutenbergHeaderRegex.test(text);

export function removeProjectGutenbergHeaderAndFooter(text: string) {
  let strippedText = text;
  const headerParts = text.split(gutenbergHeaderRegex);

  if (headerParts.length > 2) {
    strippedText = headerParts[2];
  }

  const footerParts = strippedText.split(gutenbergFooterRegex);
  strippedText = footerParts[0];

  return strippedText;
}
