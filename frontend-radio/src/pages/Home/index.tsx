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

const Home = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 760)
  const [drawerOpen, setDrawerOpen] = useState<boolean>(true)
  const [radios, setRadios] = useState<RadioData[]>([])
  const [filterRadios, setFilterRadios] = useState<string>('')
  const [radiosFiltered, setRadiosFiltered] = useState<RadioData[]>([])

  const [favorites, setFavorites] = useState<FavoriteProps[]>([])
  const [favoriteFiltered, setFavoriteFiltered] = useState<FavoriteProps[]>([])
  const [openFilterFavorite, setOpenFilterFavorite] = useState<boolean>(false)
  const [filterFavorite, setFilterFavorite] = useState<string>('')
  const theme = useTheme()

  const handleSetFilterRadios = (event: string) => {
    setFilterRadios(event)
  }

  const handleDrawer = () => {
    setDrawerOpen((prev) => !prev)
  }

  const getRadio = async () => {
    try {
      const response = await fetchRadios()
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

  useEffect(() => {
    getRadio()
  }, [])

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

  const handleFilteredRadios = useCallback(() => {
    if (filterRadios.length > 0) {
      const filteredRadiosAll = radios.filter((radio) =>
        radio.name.toLowerCase().includes(filterRadios.toLowerCase())
      )
      setRadiosFiltered(filteredRadiosAll)
    } else {
      setRadiosFiltered([])
    }
  }, [filterRadios, radios])

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

  useEffect(() => {
    handleFilteredRadios()
  }, [handleFilteredRadios])

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
        filterRadios={filterRadios}
        getRadio={() => getRadio()}
        isMobile={isMobile}
        radios={radios}
        radiosFiltered={radiosFiltered}
        setFilterRadios={(e) => handleSetFilterRadios(e)}
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
