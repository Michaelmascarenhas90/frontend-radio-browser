import {
  Box,
  Button,
  Container,
  Fab,
  IconButton,
  TextField,
} from '@mui/material'
import type { DrawerRadiosProps } from './drawer.interface'
import Drawer from '../../components/Drawer'
import CardRadio from '../../components/CardRadio'
import SkeletonCard from '../../components/Skeleton'
import {
  Add,
  ArrowBack,
  ArrowForward,
  FilterAltOff,
  FilterList,
  FilterListOff,
} from '@mui/icons-material'
import { useState } from 'react'

const DrawerRadios = ({
  drawerOpen,
  handleDrawer,
  isMobile,
  filterRadios,
  setFilterRadios,
  setFilterLanguage,
  setFilterCodeCountry,
  getFavorites,
  radios,
  resetFilters,
  nextPage,
  prevPage,
}: DrawerRadiosProps) => {
  const [moreFilters, setMoreFilters] = useState<boolean>(false)
  const [searchLanguage, setSearchLanguage] = useState<string>('')
  const [searchCodeCountry, setSearchCodeCountry] = useState<string>('')

  const clearFilters = () => {
    setSearchLanguage('')
    setSearchCodeCountry('')
    resetFilters()
  }

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
            justifyContent={'space-around'}
            flexDirection={'column'}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                gap: '16px',
              }}
            >
              <Box
                width={'100%'}
                display={'flex'}
                flexDirection={'row'}
                justifyContent={'flex-start'}
                gap={'8px'}
              ></Box>
              <Box
                width={'100%'}
                display={'flex'}
                flexDirection={'row'}
                justifyContent={'flex-start'}
                gap={'8px'}
              >
                <TextField
                  label="Buscar Rádio"
                  color="primary"
                  focused
                  placeholder="Busque sua rádio"
                  value={filterRadios}
                  onChange={(e) => setFilterRadios(e.target.value)}
                />
                <Fab
                  color="primary"
                  aria-label="add"
                  onClick={() => setMoreFilters((prev) => !prev)}
                >
                  {moreFilters ? <FilterListOff /> : <FilterList />}
                </Fab>

                <Button
                  size={'small'}
                  variant="outlined"
                  sx={{
                    color: (theme) => theme.palette.text.primary,
                    borderColor: (theme) => theme.palette.text.primary,
                  }}
                >
                  Limpar Filtros
                </Button>
              </Box>
              {moreFilters && (
                <>
                  <Box
                    width={'100%'}
                    display={'flex'}
                    flexDirection={'row'}
                    justifyContent={'flex-start'}
                    gap={'8px'}
                  >
                    <TextField
                      label="Pocure por Idioma"
                      color="primary"
                      focused
                      placeholder="Portuguese, English, Chinese, Russian, etc..."
                      value={searchLanguage}
                      onChange={(e) =>
                        setSearchLanguage(e.target.value.toLowerCase())
                      }
                    />
                    <Fab
                      color="primary"
                      aria-label="add"
                      onClick={() => setFilterLanguage(searchLanguage)}
                    >
                      <Add />
                    </Fab>
                  </Box>
                  <Box
                    width={'100%'}
                    display={'flex'}
                    flexDirection={'row'}
                    justifyContent={'flex-start'}
                    gap={'8px'}
                  >
                    <TextField
                      label="Cod. do País"
                      color="primary"
                      focused
                      placeholder="BR, PT, EUA, RS"
                      value={searchCodeCountry}
                      onChange={(e) =>
                        setSearchCodeCountry(e.target.value.toUpperCase())
                      }
                    />
                    <Fab
                      color="primary"
                      aria-label="add"
                      onClick={() => setFilterCodeCountry(searchCodeCountry)}
                    >
                      <Add />
                    </Fab>
                  </Box>
                </>
              )}
            </div>

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
                        updateFavorites={() => getFavorites()}
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
