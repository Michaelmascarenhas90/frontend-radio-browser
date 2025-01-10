import { Box, Container, TextField, Typography } from '@mui/material'
import type { RadioData } from '../../types/radios.interface'
import Drawer from '../../components/Drawer'
import CardRadio from '../../components/CardRadio'
import SkeletonCard from '../../components/Skeleton'

export type DrawerRadiosProps = {
  drawerOpen: boolean
  handleDrawer: () => void
  isMobile: boolean
  filterRadios: string
  setFilterRadios: (value: string) => void
  radiosFiltered: RadioData[]
  getRadio: () => void
  radios: RadioData[]
}

const DrawerRadios = ({
  drawerOpen,
  handleDrawer,
  isMobile,
  filterRadios,
  setFilterRadios,
  radiosFiltered,
  getRadio,
  radios,
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
          >
            <TextField
              label="Buscar Rádio"
              color="primary"
              focused
              placeholder="Busque sua rádio"
              value={filterRadios}
              onChange={(e) => setFilterRadios(e.target.value)}
            />
          </Box>
          <Container>
            {filterRadios.length > 0 ? (
              <>
                {radiosFiltered.length > 0 ? (
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '16px',
                    }}
                  >
                    {radiosFiltered.map((radio) => {
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
                  <Typography variant="h5">não tem nada aqui...</Typography>
                )}
              </>
            ) : (
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
            )}
          </Container>
        </>
      }
    />
  )
}

export default DrawerRadios
