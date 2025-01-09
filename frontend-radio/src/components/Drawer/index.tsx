import { Box, Drawer as DrawerMui, Typography } from '@mui/material'
import type { DrawerProps as DrawerPropsMui } from '@mui/material'
import { Close } from '@mui/icons-material';
import { ReactNode } from 'react'


type DrawerProps = {
  contentDrawer: ReactNode,
  onClose: () => void,
  open: boolean,
  isMobile: boolean
} & DrawerPropsMui


const Drawer = ({ contentDrawer, onClose, open, isMobile }: DrawerProps) => {
  return (
    <DrawerMui
      // sx={{ bgcolor: 'red' }}
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: isMobile ? "100%" : "30%",
          backgroundColor: (theme) => theme.palette.background.default,
          padding: '8px'
        }
      }}
    >
      <Box sx={{ padding: '16px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <Typography>Lista de Radios</Typography>
        <Close onClick={() => onClose()} />
      </Box>
      {contentDrawer}
    </DrawerMui>
  )
}

export default Drawer