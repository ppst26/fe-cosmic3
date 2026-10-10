export function uniquePermutations(value: string): string[] {
  if (value.length <= 1) return [value];
  const result = new Set<string>();
  for (let i = 0; i < value.length; i += 1) {
    const rest = value.slice(0, i) + value.slice(i + 1);
    for (const tail of uniquePermutations(rest)) {
      result.add(value[i] + tail);
    }
  }
  return [...result];
}
