import { RouterProvider } from 'react-router-dom'
import router from './router'
import Spinner from '@/components/Spinner'

function App() {
  return (
    <>
      <RouterProvider
        router={router}
        fallbackElement={<Spinner fulled />}>
      </RouterProvider>
    </>
  )
}

export default App
