import React from 'react'
import propTypes from 'prop-types'
import { render, wait } from 'react-testing-library'
import 'dom-testing-library/extend-expect'

import Fetch from '../index'


const TestComponent = ({ url }) => (
  <div>
    <h1 data-testid="component">This use the fetch component</h1>

    <Fetch url={url}>
      {({ error, loading, data }) => {
        if (loading) return <h1>Currently Loading</h1>
        if (error) return <h1 data-testid="error-response">An Error occured</h1>

        if (data) {
          const { title } = data
          return <h1 data-testid="data-response">{ title }</h1>
        }

        return null
      }}
    </Fetch>
  </div>
)

TestComponent.propTypes = {
  url: propTypes.string.isRequired,
}

test('Fetch component should return api data', async () => {
  const { getByTestId } = render(<TestComponent url="https://jsonplaceholder.typicode.com/posts/1" />)

  expect(getByTestId('component').textContent).toBe('This use the fetch component')

  await wait(() => getByTestId('data-response'))
  expect(getByTestId('data-response').textContent).toBe('sunt aut facere repellat provident occaecati excepturi optio reprehenderit')
})

test('Fetch component should throw an error if invalid parameter', async () => {
  const { getByTestId } = render(<TestComponent url="useless" />)

  expect(getByTestId('component').textContent).toBe('This use the fetch component')

  await wait(() => getByTestId('error-response'))
  expect(getByTestId('error-response').textContent).toBe('An Error occured')
})
