import clsx from 'clsx'

import { clickedDummyButton } from './store/actions'
import { useDispatch, useSelector } from './store/store'

function App(): JSX.Element {
  const dispatch = useDispatch()
  const colour = useSelector((state) => state.ui.colour)

  return (
    <div className="h-full grid grid-cols-12">
      <div className="col-span-10 grid grid-rows-2">
        <div className="grid grid-cols-12">
          <div className="bg-blue-500 col-span-3" />
          <div className="bg-red-500 col-span-9" />
        </div>

        <div className="grid grid-cols-12">
          <div className="bg-red-500 col-span-2" />
          <div className="bg-yellow-500 col-span-10" />
        </div>
      </div>

      <div className="col-span-2 bg-blue-500">
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
    </div>
  )
}

export default App
