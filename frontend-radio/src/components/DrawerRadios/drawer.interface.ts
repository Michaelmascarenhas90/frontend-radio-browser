import type { RadioData } from '../../types/radios.interface'

export type DrawerRadiosProps = {
  drawerOpen: boolean
  handleDrawer: () => void
  isMobile: boolean
  filterRadios: string
  setFilterRadios: (value: string) => void
  filterLanguage: string
  setFilterLanguage: (value: string) => void
  setFilterCodeCountry: (value: string) => void
  filterCodeCountry: string
  getFavorites: () => void
  resetFilters: () => void
  radios: RadioData[]
  nextPage: () => void
  prevPage: () => void
}
