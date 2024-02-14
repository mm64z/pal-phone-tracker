export function extractRanchSentence(text: string): string {
  const lastSentenceRegex = new RegExp('^(?:.*[.]\\s)?Sometimes (.*?) when assigned to Ranch.*?[.].*$', 'igm');
  const results = lastSentenceRegex.exec(text);
  if (results) {
    return results[1];
  } else {
    return text;
  }
}