import React from 'react'
import { fireEvent, render, within } from 'react-testing-library'
import App from '../App'

describe('components/Dom', () => {
  const setup = () => {
    window.location.hash = "~(~(c~(~(t~'Testing123)~(t~'Testing456)~(t~'Testing789))))"
    const { getByTestId } = render(<App />)
    return {
      ...within(getByTestId('Dom')),
    }
  }

  it('should render boxes in order', () => {
    const { queryAllByTestId } = setup()
    const domBoxes = queryAllByTestId('DomBox')
    expect(domBoxes.length).toBe(4)
    within(domBoxes[0]).getByText('Box')
    within(domBoxes[1]).getByText('Testing123')
    within(domBoxes[2]).getByText('Testing456')
    within(domBoxes[3]).getByText('Testing789')
  })

  it('should not show up and down buttons when no box selected', () => {
    const { queryByText } = setup()
    expect(queryByText('UP')).toBeFalsy()
    expect(queryByText('DOWN')).toBeFalsy()
  })

  it('should show up and down buttons when box is selected', () => {
    const { queryAllByTestId, getByText } = setup()
    const domBoxes = queryAllByTestId('DomBox')
    const domBox2 = within(domBoxes[2]).getByText('Testing456')
    fireEvent.click(domBox2)
    getByText('UP')
    getByText('DOWN')
  })

  it('should move box up', () => {
    const { queryAllByTestId, getByText } = setup()
    const domBox2 = within(queryAllByTestId('DomBox')[2]).getByText('Testing456')
    fireEvent.click(domBox2)
    const upButton = getByText('UP')
    fireEvent.click(upButton)
    const domBoxes = queryAllByTestId('DomBox')
    expect(domBoxes.length).toBe(4)
    within(domBoxes[0]).getByText('Box')
    within(domBoxes[2]).getByText('Testing123')
    within(domBoxes[1]).getByText('Testing456')
    within(domBoxes[3]).getByText('Testing789')
  })
})
