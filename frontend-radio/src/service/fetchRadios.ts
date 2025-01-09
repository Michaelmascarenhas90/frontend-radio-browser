import type { RadioData } from "../types/radios.interface"

const baseUrl = 'https://de1.api.radio-browser.info/json/stations/search?limit=10'

export const fetchRadios = async (): Promise<RadioData[]> => {
  const response = await fetch(baseUrl)

  if (!response) {
    throw new Error('nenhum dado foi encontrado')
  }

  const data: RadioData[] = await response.json()
  return data
}
