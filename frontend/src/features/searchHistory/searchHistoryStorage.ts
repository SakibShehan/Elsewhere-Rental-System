const STORAGE_KEY = 'elsewhere:search-history:v1'
const MAX_SEARCH_PROMPTS = 5

function normalizePrompts(values: unknown[]): string[] {
  const prompts: string[] = []
  const seen = new Set<string>()

  for (const value of values) {
    if (typeof value !== 'string') continue

    const prompt = value.trim()
    const key = prompt.toLocaleLowerCase()

    if (!prompt || seen.has(key)) continue
    seen.add(key)
    prompts.push(prompt)

    if (prompts.length === MAX_SEARCH_PROMPTS) break
  }

  return prompts
}

export function loadSearchPrompts(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw === null) return []

    const parsed: unknown = JSON.parse(raw)
    return Array.isArray(parsed) ? normalizePrompts(parsed) : []
  } catch {
    return []
  }
}

export function saveSearchPrompts(prompts: string[]): void {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(normalizePrompts(prompts)),
    )
  } catch {
    // The search history remains available in Redux for the current session.
  }
}
