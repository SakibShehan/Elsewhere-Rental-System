import { useAppDispatch, useAppSelector } from '@/app/hooks'
import {
  selectIsSaved,
  selectSavedCount,
  toggleFavorite,
} from '@/features/favorites/favoritesSlice'
import { properties } from '@/data/property'
import type { Property } from '@/types/property'

function TestRow({ property }: { property: Property }) {
  const dispatch = useAppDispatch()
  const saved = useAppSelector((state) => selectIsSaved(state, property.id))

  return (
    <li>
      {property.name}{' '}
      <button onClick={() => dispatch(toggleFavorite(property.id))}>
        {saved ? '♥ Saved' : '♡ Save'}
      </button>
    </li>
  )
}

function App() {
  const count = useAppSelector(selectSavedCount)

  return (
    <main className="container">
      <h1>Elsewhere</h1>
      <p>Saved ({count})</p>
      <ul>
        {properties.map((property) => (
          <TestRow key={property.id} property={property} />
        ))}
      </ul>
    </main>
  )
}

export default App