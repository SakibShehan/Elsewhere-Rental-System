// Created once, reused on every call
const compactNumber = new Intl.NumberFormat('en', {
  notation: 'compact',
  maximumFractionDigits: 1,
})

const usd = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

// 1200 → "1.2k", 856 → "856"
export function formatReviewCount(count: number): string {
  return compactNumber.format(count).toLowerCase()
}

// 180 → "$180"
export function formatPrice(amount: number): string {
  return usd.format(amount)
}