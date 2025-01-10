import { Routes, Route } from 'react-router'

import Home from '../pages/Home'

const RoutesAll = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  )
}

export default RoutesAll
