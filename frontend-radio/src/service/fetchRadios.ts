import type { RadioData } from '../types/radios.interface'

const baseUrl =
  'https://de1.api.radio-browser.info/json/stations/search'

export type FetchRadiosProps = {
  name?: string,
  limit: string,
  offset: string,
  language?: string,
  coutrycode?: string
}

export const fetchRadios = async ({
  limit,
  name,
  offset,
  language,
  coutrycode
}: FetchRadiosProps): Promise<RadioData[]> => {

  const queryParams = new URLSearchParams();
  if (limit) queryParams.append('limit', limit.toString());
  if (name) queryParams.append('name', name);
  if (offset) queryParams.append('offset', offset.toString());
  if (language) queryParams.append('language', language);
  if (coutrycode) queryParams.append('countryCode', coutrycode);

  // Construir a URL completa
  const url = `${baseUrl}?${queryParams.toString()}`;

  const response = await fetch(url);

  if (!response) {
    throw new Error('nenhum dado foi encontrado')
  }

  const data: RadioData[] = await response.json()
  return data
}
