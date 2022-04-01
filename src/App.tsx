import clsx from 'clsx'

import type { Box } from './store/reducer.ui'
import { useSelector } from './store/store'

interface BoxComponentProps {
  box: Box
  className?: string
}

function BoxComponent({ box, className }: BoxComponentProps) {
  return (
    <div className={clsx('flex p-2 gap-2 min-w-[80px]', className)}>
      {box.c?.map((b, index) => (
        <BoxComponent
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          box={b}
          className="border border-gray-900 bg-gray-700"
        />
      ))}
    </div>
  )
}

function App(): JSX.Element {
  const boxes = useSelector((state) => state.ui.boxes)

  return (
    <div className="h-full grid grid-cols-12 bg-gray-800">
      <div className="col-span-2" />

      <div className="col-span-7 grid grid-rows-6 border-l border-gray-900">
        <div className="row-span-1" />
        <div className="row-span-5 border-t border-gray-900">
          <BoxComponent box={boxes} className="h-full" />
        </div>
      </div>

      <div className="col-span-3 border-l border-gray-900" />
    </div>
  )
}

export default App
