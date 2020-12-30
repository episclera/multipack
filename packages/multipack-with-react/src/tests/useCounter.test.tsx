import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import useCounter from '../useCounter'
import Counter from '../Counter'

const Component: React.FC = () => {
  const { count, increment, decrement } = useCounter(0)
  return (
    <div data-testid='test'>
      <Counter count={count} onIncrement={increment} onDecrement={decrement} />
    </div>
  )
}

describe('useCounter', () => {
  it('should increment counter ', () => {
    const { getByTestId } = render(<Component />)

    fireEvent.click(getByTestId('increment'))

    expect(getByTestId('test').innerHTML).toMatch('1')
  })

  it('should render correct initial count', () => {
    const { getByTestId } = render(<Component />)

    expect(getByTestId('test').innerHTML).toMatch('0')
  })

  it('should decrement counter', () => {
    const { getByTestId } = render(<Component />)

    fireEvent.click(getByTestId('decrement'))

    expect(getByTestId('test').innerHTML).toMatch('-1')
  })
})
