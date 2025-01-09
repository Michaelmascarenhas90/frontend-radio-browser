import { AppBar, Container, IconButton, Toolbar, Typography } from '@mui/material'
import { MenuRounded } from '@mui/icons-material'
import { HeaderProps } from './hearder.interface'

const Header = ({ onCloseDrawer }: HeaderProps) => {


  return (
    <AppBar position='static' sx={{ background: 'transparent' }}>
      <Toolbar>
        <IconButton>
          <MenuRounded color='primary' onClick={onCloseDrawer} />
        </IconButton>
        <Container >
          <Typography color='primary' variant='h5' component='h1' textAlign={'center'}>
            Radio Browser
          </Typography>

        </Container>
      </Toolbar>
    </AppBar>
  )
}

export default Header
