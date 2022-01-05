import clsx from 'clsx'

import { clickedDummyButton } from './store/actions'
import { useDispatch, useSelector } from './store/store'

function App(): JSX.Element {
  const dispatch = useDispatch()
  const colour = useSelector((state) => state.ui.colour)

  return (
    <div className="p-8">
      <button
        className={clsx(
          'text-white font-bold p-4 rounded-3xl',
          colour === 'GREEN' ? 'bg-green-700' : 'bg-red-700',
        )}
        onClick={() => dispatch(clickedDummyButton())}
        type="button"
      >
        Click Me
      </button>
    </div>
  )
}

export default App
