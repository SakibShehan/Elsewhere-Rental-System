export interface MoodDetectionResponse {
  mood: string
  reason: string
}

export interface MoodProperty {
  id: number
  name: string
  location: string
  mood: string
  rating: number
  reviewCount: number
  pricePerNight: number
  categories: string[]
}

export interface MoodPropertiesResponse {
  mood: string
  count: number
  properties: MoodProperty[]
}

async function getJson<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, init)
  const body: unknown = await response.json()

  if (!response.ok) {
    const message =
      typeof body === 'object' &&
      body !== null &&
      'error' in body &&
      typeof body.error === 'object' &&
      body.error !== null &&
      'message' in body.error &&
      typeof body.error.message === 'string'
        ? body.error.message
        : `Request failed (${response.status})`

    throw new Error(message)
  }

  return body as T
}

export function detectMood(text: string): Promise<MoodDetectionResponse> {
  return getJson<MoodDetectionResponse>('/api/ai/mood', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  })
}

export async function fetchMoods(): Promise<string[]> {
  const response = await getJson<{ moods: string[] }>('/api/moods')
  return response.moods
}

export function fetchPropertiesByMood(
  mood: string,
): Promise<MoodPropertiesResponse> {
  const query = new URLSearchParams({ mood })
  return getJson<MoodPropertiesResponse>(`/api/properties?${query}`)
}
