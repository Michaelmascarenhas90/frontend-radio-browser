import { useCallback, useEffect, useState } from 'react'
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from '@mui/material'
import {
  Favorite,
  FavoriteBorderOutlined,
  PlayArrow,
} from '@mui/icons-material'
import type { CardProps, FavoriteProps } from './card.interface'

const toggleFavorite = ({
  name,
  countryCode,
  imageUrl,
  radioId,
  radioUrl,
  tags,
  country
}: FavoriteProps) => {
  const saveFavoriteString = localStorage.getItem('favorites') || '[]'
  const savedFavorites: FavoriteProps[] = JSON.parse(saveFavoriteString);

  const isFavorite = savedFavorites.find((favorite) => favorite.radioId === radioId);

  if (isFavorite) {
    const newFavorites = savedFavorites.filter((favorite) => favorite.radioId !== radioId)
    localStorage.setItem('favorites', JSON.stringify(newFavorites))
  } else {

    const newFavorite: FavoriteProps = {
      name,
      radioId,
      radioUrl,
      countryCode,
      country,
      imageUrl,
      tags
    }

    savedFavorites.push(newFavorite)
    localStorage.setItem('favorites', JSON.stringify(savedFavorites))
  }
}

const CardRadio = ({
  name,
  imageUrl,
  country,
  countryCode,
  tags,
  radioUrl,
  radioId,
  updateFavorites
}: CardProps) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false)

  const verifyFavorites = useCallback(() => {
  const favoritesString = localStorage.getItem('favorites') || '[]';
  const favorites: FavoriteProps[] = JSON.parse(favoritesString);

  const isFavorite = favorites.some((favorite) => favorite.radioId === radioId);
  setIsFavorite(isFavorite);
}, [radioId]);

  const handleFavoriteRadio = () => {
    const favoriteObj = {
      name,
      radioId,
      radioUrl,
      countryCode,
      country,
      imageUrl,
      tags
    }
    toggleFavorite(favoriteObj)
    verifyFavorites()
    updateFavorites()
  }

  useEffect(() => {
    verifyFavorites()
  }, [verifyFavorites])

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
      {isFavorite ? (
        <Favorite fontSize="medium" onClick={handleFavoriteRadio} />
      ) : (
        <FavoriteBorderOutlined
          fontSize="medium"
          onClick={handleFavoriteRadio}
        />
      )}
    </Card>
  )
}

export default CardRadio
