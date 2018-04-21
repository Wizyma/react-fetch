# react-fetch

[![Build Status](https://travis-ci.org/Wizyma/react-fetch.svg?branch=master)](https://travis-ci.org/Wizyma/react-fetch)
[![codecov](https://codecov.io/gh/Wizyma/react-fetch/branch/master/graph/badge.svg)](https://codecov.io/gh/Wizyma/react-fetch)

React component that integrate the fetch api inspired by apollo-client 

## Usage 
```javascript
import React, { Component, Fragment } from 'react'
import Fetch from 'react-fetch'
import MyErrorComponent from './error-component'
import LoadingComponent from './loading'

class MyComponent extends Component {
  render() {
    return(
      <Fragment>
        <h1>My Fetch component will be a child who will load asynchronously the data !</h1>
        <Fetch url='https://jsonplaceholder.typicode.com/posts'>
          {({ error, data, loading }) => {
            if(error) return <MyErrorComponent />
            if(loading) return <LoadingComponent />

            if(data) {
              return (
                data.map(({ id, title, body }) => (
                  <div key={id}>
                    <h1>{title}</h1>
                    <p>{body}</p>
                  </div>
                ))
              )
            }
          }}
        </Fetch>
      </Fragment>
    )
  }
}
```
