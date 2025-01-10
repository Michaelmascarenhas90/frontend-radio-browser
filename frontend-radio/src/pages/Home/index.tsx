import { useCallback, useEffect, useState } from 'react'
import {
  Box,
  Container,
  IconButton,
  TextField,
  Typography,
  useTheme,
} from '@mui/material'
import Header from '../../components/Header'
import type { RadioData } from '../../types/radios.interface'
import { fetchRadios } from '../../service/fetchRadios'
import CardRadio from '../../components/CardRadio'
import { FavoriteProps } from '../../components/CardRadio/card.interface'
import { SearchOutlined } from '@mui/icons-material'
import DrawerRadios from '../../components/DrawerRadios'
import { useSearchParams } from 'react-router'

const LIMIT_ITEMS = '10'

const Home = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 760)
  const [drawerOpen, setDrawerOpen] = useState<boolean>(true)
  const [radios, setRadios] = useState<RadioData[]>([])

  const [favorites, setFavorites] = useState<FavoriteProps[]>([])
  const [favoriteFiltered, setFavoriteFiltered] = useState<FavoriteProps[]>([])
  const [openFilterFavorite, setOpenFilterFavorite] = useState<boolean>(false)
  const [filterFavorite, setFilterFavorite] = useState<string>('')
  const [searchParams, setSearchParams] = useSearchParams()

  // filtros para request
  const currentPage = searchParams.get('page') || '1'
  const searchText = searchParams.get('name') || ''
  const language = searchParams.get('language') || ''
  const countrycode = searchParams.get('countrycode') || ''

  const theme = useTheme()

  const handleSetFilterRadios = (nameSearch: string) => {
    updateSearchParams('name', nameSearch)
  }

  const handleFilterLanguage = (language: string) => {
    updateSearchParams('language', language)
  }

  const handleFilterCodeCountry = (countrycode: string) => {
    updateSearchParams('countrycode', countrycode)
  }

  const updateSearchParams = (key: string, value?: string) => {
    const params = new URLSearchParams(searchParams)
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    setSearchParams(params)
  }

  const setPage = (value: number) => {
    const valueString = value.toString()
    updateSearchParams('page', valueString)
  }

  const handleDrawer = () => {
    setDrawerOpen((prev) => !prev)
  }

  const clearParams = () => {
    setSearchParams({});
  }

  const getRadio = async (
    page: string,
    name: string,
    language: string,
    countrycode: string
  ) => {
    try {
      const response = await fetchRadios({
        limit: LIMIT_ITEMS,
        offset: page,
        name,
        language,
        countrycode,
      })
      setRadios(response)
    } catch (error) {
      console.error(`Erro in getRadio: ${error}`)
    }
  }

  const getFavorites = useCallback(() => {
    const favoritesStorage = JSON.parse(
      localStorage.getItem('favorites') || '[]'
    )
    return setFavorites(favoritesStorage)
  }, [])

  const handleRadios = useCallback(() => {
    getRadio(currentPage, searchText, language, countrycode)
  }, [countrycode, currentPage, language, searchText])

  useEffect(() => {
    handleRadios()
  }, [handleRadios])

  const handleFilteredFavorites = useCallback(() => {
    if (filterFavorite.length > 0) {
      const filtered = favorites.filter((radio) =>
        radio.name.toLowerCase().includes(filterFavorite.toLowerCase())
      )
      setFavoriteFiltered(filtered)
    } else {
      setFavoriteFiltered([])
    }
  }, [favorites, filterFavorite])

  useEffect(() => {
    getFavorites()
  }, [getFavorites])

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    window.addEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    handleFilteredFavorites()
  }, [handleFilteredFavorites])

  return (
    <body
      style={{
        height: '100vh',
        width: '100vw',
        backgroundColor: theme.palette.background.default,
        overflow: 'auto',
      }}
    >
      <DrawerRadios
        drawerOpen={drawerOpen}
        handleDrawer={() => handleDrawer()}
        filterRadios={searchText}
        getFavorites={() => getFavorites()}
        resetFilters={() => clearParams()}
        isMobile={isMobile}
        radios={radios}
        setFilterRadios={(e) => handleSetFilterRadios(e)}
        setFilterCodeCountry={(e) => handleFilterCodeCountry(e)}
        filterCodeCountry={countrycode}
        filterLanguage={language}
        setFilterLanguage={(e) => handleFilterLanguage(e)}
        prevPage={() => setPage(Number(currentPage) - 1)}
        nextPage={() => setPage(Number(currentPage) + 1)}
      />

      <Header onCloseDrawer={() => handleDrawer()} />
      <Container>
        <Box
          sx={{
            width: '100%',
            minHeight: '80px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              alignContent: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography
              variant="h4"
              sx={{
                color: (theme) => theme.palette.text.primary,
                marginTop: '16px',
              }}
            >
              Favoritas
            </Typography>
            <IconButton onClick={() => setOpenFilterFavorite((prev) => !prev)}>
              <SearchOutlined
                fontSize="large"
                sx={{ color: (theme) => theme.palette.text.primary }}
              />
            </IconButton>
          </Box>
          {openFilterFavorite && (
            <TextField
              label="Buscar Rádio"
              color="primary"
              focused
              placeholder="Busque sua rádio favorita"
              value={filterFavorite}
              onChange={(e) => setFilterFavorite(e.target.value)}
            />
          )}
          <>
            {filterFavorite.length > 0 ? (
              <Box
                sx={{
                  width: '100%',
                  minHeight: '80px',
                  display: 'flex',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '16px',
                }}
              >
                {favoriteFiltered.length > 0 ? (
                  favoriteFiltered.map((radio) => (
                    <CardRadio
                      key={radio.radioId}
                      radioId={radio.radioId}
                      name={radio.name}
                      imageUrl={radio.imageUrl}
                      tags={radio.tags}
                      country={radio.country}
                      countryCode={radio.countryCode}
                      radioUrl={radio.radioUrl}
                      updateFavorites={() => getFavorites()}
                    />
                  ))
                ) : (
                  <Typography variant="h5">não tem nada aqui...</Typography>
                )}
              </Box>
            ) : (
              <Box
                sx={{
                  width: '100%',
                  minHeight: '80px',
                  display: 'flex',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '16px',
                }}
              >
                {favorites.length > 0 ? (
                  favorites.map((radio) => (
                    <CardRadio
                      key={radio.radioId}
                      radioId={radio.radioId}
                      name={radio.name}
                      imageUrl={radio.imageUrl}
                      tags={radio.tags}
                      country={radio.country}
                      countryCode={radio.countryCode}
                      radioUrl={radio.radioUrl}
                      updateFavorites={() => getFavorites()}
                    />
                  ))
                ) : (
                  <Typography variant="h5">não tem nada aqui...</Typography>
                )}
              </Box>
            )}
          </>
        </Box>
      </Container>
    </body>
  )
}

export default Home
