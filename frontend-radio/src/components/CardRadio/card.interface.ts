export type CardProps = {
  name: string
  imageUrl: string
  countryCode: string
  country?: string | null
  radioUrl: string
  tags: string
  radioId: string
  updateFavorites: () => void
}
