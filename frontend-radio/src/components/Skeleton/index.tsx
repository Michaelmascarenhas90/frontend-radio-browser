import { Box, Card, CardContent, Skeleton } from '@mui/material'

const SkeletonCard = () => {
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
          <Skeleton animation={'wave'} />
          <Skeleton animation={'wave'} />
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
          <Skeleton variant="circular" width={40} height={40} />
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
        <Skeleton variant="rectangular" width={'100%'} height={'100%'} />
      </Box>
    </Card>
  )
}

export default SkeletonCard
