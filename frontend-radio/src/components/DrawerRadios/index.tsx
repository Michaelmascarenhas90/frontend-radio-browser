import { Box, Container, IconButton, TextField } from '@mui/material'
import type { RadioData } from '../../types/radios.interface'
import Drawer from '../../components/Drawer'
import CardRadio from '../../components/CardRadio'
import SkeletonCard from '../../components/Skeleton'
import { ArrowBack, ArrowForward } from '@mui/icons-material'

export type DrawerRadiosProps = {
  drawerOpen: boolean
  handleDrawer: () => void
  isMobile: boolean
  filterRadios: string
  setFilterRadios: (value: string) => void
  getRadio: () => void
  radios: RadioData[]
  nextPage: () => void
  prevPage: () => void
}

const DrawerRadios = ({
  drawerOpen,
  handleDrawer,
  isMobile,
  filterRadios,
  setFilterRadios,

  getRadio,
  radios,
  nextPage,
  prevPage,
}: DrawerRadiosProps) => {
  return (
    <Drawer
      open={drawerOpen}
      onClose={() => handleDrawer()}
      isMobile={isMobile}
      contentDrawer={
        <>
          <Box
            marginBottom={'16px'}
            width={'100%'}
            display={'flex'}
            justifyContent={'center'}
            flexDirection={'column'}
          >
            <TextField
              label="Buscar Rádio"
              color="primary"
              focused
              placeholder="Busque sua rádio"
              value={filterRadios}
              onChange={(e) => setFilterRadios(e.target.value)}
            />
            <Box
              display={'flex'}
              flexDirection={'row'}
              justifyContent={'space-between'}
              bgcolor={(theme) => theme.palette.background.paper}
              borderRadius={'13px'}
              marginTop={'16px'}
              marginBottom={'16px'}
            >
              <IconButton onClick={() => prevPage()}>
                <ArrowBack
                  sx={{
                  color: (theme) => theme.palette.text.primary,
                  }}
                />
              </IconButton>
                  
              <IconButton onClick={() => nextPage()}>
                <ArrowForward
                  sx={{
                  color: (theme) => theme.palette.text.primary,
                  }}
                />
              </IconButton>

            </Box>
          </Box>
          <Container>
          
               <>
                {radios.length > 0 ? (
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '16px',
                    }}
                  >
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
                )}
              </>   
          </Container>
        </>
      }
    />
  )
}

export default DrawerRadios
