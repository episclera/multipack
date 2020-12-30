import React from 'react'
import { CounterProps } from '../types'

const Counter: React.FC<CounterProps> = ({
  onDecrement,
  onIncrement,
  count,
}: CounterProps) => (
  <div data-testid='counter'>
    <button data-testid='decrement' type='button' onClick={onDecrement}>
      -
    </button>
    <span>{count}</span>
    <button data-testid='increment' type='button' onClick={onIncrement}>
      +
    </button>
  </div>
)

export default Counter
