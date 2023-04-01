export function formatDuration(durationInMinutes = 0.0) {
  const hours = Math.floor(durationInMinutes / 60)
  const minutes = Math.floor(durationInMinutes % 60)
  const seconds = Math.round((durationInMinutes % 1) * 60)

  const formattedHours = hours > 0 ? String(hours).padStart(2, '0') + ':' : ''
  const formattedMinutes = String(minutes).padStart(2, '0')
  const formattedSeconds = String(seconds).padStart(2, '0')

  return formattedHours + formattedMinutes + ':' + formattedSeconds
}

export function getElapsedTime(publishTime: string): string {
  const now = new Date()
  const publishDate = new Date(publishTime)
  const elapsedSeconds = Math.floor((now.getTime() - publishDate.getTime()) / 1000)

  if (elapsedSeconds < 60) {
    return 'agora mesmo'
  } else if (elapsedSeconds < 60 * 60) {
    const minutes = Math.floor(elapsedSeconds / 60)
    return `${minutes} ${minutes === 1 ? 'minuto' : 'minutos'} atrás`
  } else if (elapsedSeconds < 60 * 60 * 24) {
    const hours = Math.floor(elapsedSeconds / (60 * 60))
    return `${hours} ${hours === 1 ? 'hora' : 'horas'} atrás`
  } else if (elapsedSeconds < 60 * 60 * 24 * 7) {
    const days = Math.floor(elapsedSeconds / (60 * 60 * 24))
    return `${days} ${days === 1 ? 'dia' : 'dias'} atrás`
  } else if (elapsedSeconds < 60 * 60 * 24 * 30) {
    const weeks = Math.floor(elapsedSeconds / (60 * 60 * 24 * 7))
    return `${weeks} ${weeks === 1 ? 'semana' : 'semanas'} atrás`
  } else if (elapsedSeconds < 60 * 60 * 24 * 365) {
    const months = Math.floor(elapsedSeconds / (60 * 60 * 24 * 30))
    return `${months} ${months === 1 ? 'mês' : 'meses'} atrás`
  } else {
    const years = Math.floor(elapsedSeconds / (60 * 60 * 24 * 365))
    return `${years} ${years === 1 ? 'ano' : 'anos'} atrás`
  }
}

export function calculateRelevance(positiveVotes: number, negativeVotes: number): number {
  let result = 0

  // Verifica se há pelo menos 10 votos para calcular o score de Wilson
  if (positiveVotes + negativeVotes >= 10) {
    const n = positiveVotes + negativeVotes
    const p = positiveVotes / n
    const z = 1.96 // Valor crítico para um intervalo de confiança de 95%
    const score = (p + (z * z) / (2 * n) - z * Math.sqrt((p * (1 - p) + (z * z) / (4 * n)) / n)) / (1 + (z * z) / n)

    // Exibe o score de Wilson como uma porcentagem
    const relevancePercentage = Math.round(score * 100)
    result = relevancePercentage
  }

  return result
}

export const levels = [
  { threshold: 5, level: 1 },
  { threshold: 10, level: 2 },
  { threshold: 16, level: 3 },
  { threshold: 23, level: 4 },
  { threshold: 31, level: 5 },
  { threshold: 40, level: 6 },
  { threshold: 50, level: 7 },
  { threshold: 61, level: 8 },
  { threshold: 73, level: 9 },
  { threshold: 86, level: 10 },
  { threshold: 100, level: 11 },
  { threshold: 115, level: 12 },
  { threshold: 131, level: 13 },
  { threshold: 148, level: 14 },
  { threshold: 166, level: 15 },
  { threshold: 185, level: 16 },
  { threshold: 205, level: 17 },
  { threshold: 226, level: 18 },
  { threshold: 248, level: 19 },
  { threshold: 271, level: 20 },
  { threshold: 295, level: 21 },
  { threshold: 320, level: 22 },
  { threshold: 346, level: 23 },
  { threshold: 373, level: 24 },
  { threshold: 401, level: 25 },
  { threshold: 430, level: 26 },
  { threshold: 460, level: 27 },
  { threshold: 491, level: 28 },
  { threshold: 523, level: 29 },
  { threshold: 556, level: 30 },
  { threshold: 590, level: 31 },
  { threshold: 625, level: 32 },
  { threshold: 661, level: 33 },
  { threshold: 698, level: 34 },
  { threshold: 736, level: 35 },
  { threshold: 775, level: 36 },
  { threshold: 815, level: 37 },
  { threshold: 856, level: 38 },
  { threshold: 898, level: 39 },
  { threshold: 941, level: 40 },
  { threshold: 985, level: 41 },
  { threshold: 1030, level: 42 },
  { threshold: 1076, level: 43 },
  { threshold: 1123, level: 44 },
  { threshold: 1171, level: 45 },
  { threshold: 1220, level: 46 },
  { threshold: 1270, level: 47 },
  { threshold: 1321, level: 48 },
  { threshold: 1373, level: 49 },
  { threshold: 1426, level: 50 },
  { threshold: 1480, level: 51 },
  { threshold: 1535, level: 52 },
  { threshold: 1591, level: 53 },
  { threshold: 1648, level: 54 },
  { threshold: 1706, level: 55 },
  { threshold: 1765, level: 56 },
  { threshold: 1825, level: 57 },
  { threshold: 1886, level: 58 },
  { threshold: 1948, level: 59 },
  { threshold: 2011, level: 60 },
  { threshold: 2075, level: 61 },
  { threshold: 2140, level: 62 },
  { threshold: 2206, level: 63 },
  { threshold: 2273, level: 64 },
  { threshold: 2341, level: 65 },
  { threshold: 2410, level: 66 },
  { threshold: 2480, level: 67 },
  { threshold: 2551, level: 68 },
  { threshold: 2623, level: 69 },
  { threshold: 2696, level: 70 },
  { threshold: 2770, level: 71 },
  { threshold: 2845, level: 72 },
  { threshold: 2921, level: 73 },
  { threshold: 2998, level: 74 },
  { threshold: 3076, level: 75 },
  { threshold: 3155, level: 76 },
  { threshold: 3235, level: 77 },
  { threshold: 3316, level: 78 },
  { threshold: 3398, level: 79 },
  { threshold: 3481, level: 80 },
  { threshold: 3565, level: 81 },
  { threshold: 3650, level: 82 },
  { threshold: 3736, level: 83 },
  { threshold: 3823, level: 84 },
  { threshold: 3911, level: 85 },
  { threshold: 4000, level: 86 },
  { threshold: 4090, level: 87 },
  { threshold: 4181, level: 88 },
  { threshold: 4273, level: 89 },
  { threshold: 4366, level: 90 },
  { threshold: 4460, level: 91 },
  { threshold: 4555, level: 92 },
  { threshold: 4651, level: 93 },
  { threshold: 4748, level: 94 },
  { threshold: 4846, level: 95 },
  { threshold: 4945, level: 96 },
  { threshold: 5045, level: 97 },
  { threshold: 5146, level: 98 },
  { threshold: 5248, level: 99 },
  { threshold: 5351, level: 100 },
]
export function calculateLevel(hoursWatched: number) {
  const levelObj = levels.find((level) => hoursWatched < level.threshold)

  return levelObj ? levelObj.level - 1 : levels.length
}
