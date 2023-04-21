export interface Totals {
  totalGeral: number
  totalPorCategoria: TotalByCategory
}

export interface TotalByCategory {
  frontend: number
  teste: number
  backend: number
  'banco de dados': number
  deploy: number
  lógica: number
  mobile: number
  ferramentas: number
  acessibilidade: number
}
