
export function findAllOccurrence(str: string, attempt: string): number[] {
  const results = []
  for(let i = 0; i < str.length; i++) {
    if (str[i] === attempt) results.push(i);
  }
  return results
}

export function getRandomInt(max: number): number {
  return Math.floor(Math.random() * Math.floor(max));
}