import {
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from '@mui/material'
// import { useTheme } from '@mui/material/styles'
import { PlayArrow } from '@mui/icons-material'
import type { CardProps } from './card.interface'

const CardRadio = ({
  name,
  imageUrl,
  country,
  countryCode,
  tags,
}: CardProps) => {
  return (
    <Card
      sx={{
        backgroundColor: (theme) => theme.palette.background.paper,
        display: 'flex',
        maxWidth: '350px',
        padding: '8px',
        justifyContent: 'center',
        marginBottom: '8px',
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography
            component="div"
            variant="subtitle1"
            sx={{
              width: '130px',
              color: 'primary',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
            }}
          >
            {country}, {countryCode}
          </Typography>
          <Typography
            variant="subtitle1"
            component="div"
            sx={{
              width: '130px',
              color: 'primary',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
            }}
          >
            {name}
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
          <IconButton aria-label="play/pause">
            <PlayArrow
              sx={{
                height: 38,
                width: 38,
                color: (theme) => theme.palette.text.primary,
              }}
            />
          </IconButton>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          width: '100px',
          height: '100%',
        }}
      >
        <CardMedia
          component="img"
          sx={{
            maxWidth: '100%',
            maxHeight: '100%',
            borderRadius: '100%',
          }}
          image={imageUrl}
          alt={tags}
        />
      </Box>
    </Card>
  )
}

export default CardRadio
