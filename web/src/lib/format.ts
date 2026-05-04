export function formatBRL(value: number): string {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  })
}

export function installments(value: number, count: number, withInterest = false): string {
  const each = value / count
  return `${count}x de ${formatBRL(each)}${withInterest ? '' : ' sem juros'}`
}

export function discountPercent(price: number, comparePrice: number): number {
  if (comparePrice <= 0 || price >= comparePrice) return 0
  return Math.round(((comparePrice - price) / comparePrice) * 100)
}
