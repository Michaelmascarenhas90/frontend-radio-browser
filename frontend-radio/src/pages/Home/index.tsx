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
import Drawer from '../../components/Drawer'
import { fetchRadios } from '../../service/fetchRadios'
import CardRadio from '../../components/CardRadio'
import SkeletonCard from '../../components/Skeleton'
import { FavoriteProps } from '../../components/CardRadio/card.interface'
import { SearchOutlined } from '@mui/icons-material'

const Home = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 760)
  const [drawerOpen, setDrawerOpen] = useState<boolean>(true)
  const [radios, setRadios] = useState<RadioData[]>([])
  const [favorites, setFavorites] = useState<FavoriteProps[]>([])
  const [favoriteFiltered, setFavoriteFiltered] = useState<FavoriteProps[]>([])
  const [openFilter, setOpenFilter] = useState<boolean>(false)
  const [filter, setFilter] = useState<string>('')
  const theme = useTheme()

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
    if (filter.length > 0) {
      const filtered = favorites.filter((radio) =>
        radio.name.toLowerCase().includes(filter.toLowerCase())
      )
      setFavoriteFiltered(filtered)

    } else {
      setFavoriteFiltered([])
    }
  }, [filter, favorites])


  console.log({texto: filter, qtdResultados: favoriteFiltered.length})
  return (
    <body
      style={{
        height: '100vh',
        width: '100vw',
        backgroundColor: theme.palette.background.default,
        overflow: 'auto',
      }}
    >
      <Header onCloseDrawer={() => handleDrawer()} />
      <Drawer
        open={drawerOpen}
        onClose={() => handleDrawer()}
        isMobile={isMobile}
        contentDrawer={
          radios.length > 0 ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {radios.map((radio) => {
                return (
                  <CardRadio
                    key={radio.changeuuid}
                    radioId={radio.changeuuid}
                    name={radio.name}
                    imageUrl={radio.favicon}
                    tags={radio.tags}
                    country={radio.country}
                    countryCode={radio.countrycode}
                    radioUrl={radio.url_resolved}
                    updateFavorites={() => getRadio()}
                  />
                )
              })}
            </Box>
          ) : (
            Array.from({ length: 3 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
          )
        }
      />

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
            <IconButton onClick={() => setOpenFilter((prev) => !prev)}>
              <SearchOutlined
                fontSize="large"
                sx={{ color: (theme) => theme.palette.text.primary }}
              />
            </IconButton>
          </Box>
          {openFilter && (
            <TextField
              label="Buscar Rádio"
              color="primary"
              focused
              placeholder="Busque sua rádio favorita"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          )}
          <>
            {
              filter.length > 0
              ?
              (
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

              )
              : 
              (
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
                
              )
            }
          </>
        </Box>
      </Container>
    </body>
  )
}

export default Home
