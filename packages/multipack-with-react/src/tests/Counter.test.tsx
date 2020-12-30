import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Counter from '../Counter'

describe('Counter', () => {
  it('should trigger increment method on increment btn click', () => {
    const increment = jest.fn()
    const { getByTestId } = render(
      <Counter count={21} onIncrement={increment} onDecrement={() => {}} />,
    )

    fireEvent.click(getByTestId('increment'))

    expect(increment).toHaveBeenCalled()
  })

  it('should render correct initial count', () => {
    const { getByTestId } = render(
      <Counter count={21} onIncrement={() => {}} onDecrement={() => {}} />,
    )

    expect(getByTestId('counter').innerHTML).toMatch('21')
  })

  it('should trigger increment method on increment btn click', () => {
    const decrement = jest.fn()
    const { getByTestId } = render(
      <Counter count={21} onIncrement={() => {}} onDecrement={decrement} />,
    )

    fireEvent.click(getByTestId('decrement'))

    expect(decrement).toHaveBeenCalled()
  })
})
