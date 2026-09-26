import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import Home from './pages/Home'
import Shop from './pages/Shop'
import ProductPage from './pages/Product'
import Checkout from './pages/Checkout'
import Quiz from './pages/Quiz'
import StartHere from './pages/StartHere'
import Visit from './pages/Visit'
import Events from './pages/Events'
import GiftCards from './pages/GiftCards'
import Policies from './pages/Policies'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="shop/:slug" element={<ProductPage />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="quiz" element={<Quiz />} />
        <Route path="start-here" element={<StartHere />} />
        <Route path="visit" element={<Visit />} />
        <Route path="events" element={<Events />} />
        <Route path="gift-cards" element={<GiftCards />} />
        <Route path="policies" element={<Policies />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
