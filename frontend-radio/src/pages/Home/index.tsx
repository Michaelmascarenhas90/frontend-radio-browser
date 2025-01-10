import { useCallback, useEffect, useState } from 'react'
import { Box, Container, Typography, useTheme } from '@mui/material'
import Header from '../../components/Header'
import type { RadioData } from '../../types/radios.interface'
import Drawer from '../../components/Drawer'
import { fetchRadios } from '../../service/fetchRadios'
import CardRadio from '../../components/CardRadio'
import SkeletonCard from '../../components/Skeleton'
import { FavoriteProps } from '../../components/CardRadio/card.interface'

const Home = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 760)
  const [drawerOpen, setDrawerOpen] = useState<boolean>(true)
  const [radios, setRadios] = useState<RadioData[]>([])
  const [favorites, setFavorites] = useState<FavoriteProps[]>([])
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
    const favoritesStorage = JSON.parse(localStorage.getItem('favorites') || '[]')
    return setFavorites(favoritesStorage)
  }, [])


  useEffect(() => {
    getRadio()
    getFavorites()
  }, [getFavorites, radios])

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    window.addEventListener('resize', handleResize)
  }, [])

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
            gap: '16px'
          }}
        >
          <Typography
            variant="h4"
            sx={{
              color: (theme) => theme.palette.text.primary,
              marginTop: '16px'
            }}
          >
            Favoritas
          </Typography>

          <Box
            sx={{
              width: '100%',
              minHeight: '80px',
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '16px'
            }}
          >
            {
              favorites.length > 0 
              ? (favorites.map((radio) => (
                
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
                
              ))) 
              : (<Typography variant='h5'>não tem nada aqui...</Typography>)}
        </Box>
        </Box>
      </Container>
    </body>
  )
}

export default Home
