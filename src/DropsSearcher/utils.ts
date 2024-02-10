export function extractRanchSentence(text: string): string {
  const lastSentenceRegex = new RegExp('^(?:.*[.]\\s)?(.*?Ranch.*?[.]).*$', 'gm');
  const results = lastSentenceRegex.exec(text);
  if (results) {
    return results[1];
  } else {
    return text;
  }
}