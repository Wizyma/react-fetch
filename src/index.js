import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import fetch from 'isomorphic-fetch'

export default class Fetch extends Component {
    state = {
      loading: true,
      data: undefined,
      error: undefined,
    }

    componentDidMount() {
      this.makeRequest()
    }

    updateState = async (error, response) => {
      this.setState({
        data: response ? await response.json() : undefined,
        error,
        loading: false,
      })
    }

    makeRequest = async () => {
      const {
        url, body, credentials, headers, method,
      } = this.props

      this.setState({ loading: true })

      try {
        const response = await fetch(url, {
          body,
          credentials,
          headers,
          method,
        })

        return this.updateState(undefined, response)
      } catch (ex) {
        return this.updateState(ex, undefined)
      }
    }

    render() {
      const props = {
        ...this.state,
      }

      return (
        <Fragment>
          {this.props.children(props)}
        </Fragment>
      )
    }
}

Fetch.propTypes = {
  children: PropTypes.func,
  credentials: PropTypes.oneOf(['omit', 'same-origin', 'include']),
  headers: PropTypes.object,
  method: PropTypes.oneOf([
    'get',
    'post',
    'put',
    'patch',
    'delete',
    'options',
    'head',
    'GET',
    'POST',
    'PUT',
    'PATCH',
    'DELETE',
    'OPTIONS',
    'HEAD',
  ]),
  url: PropTypes.string.isRequired,
  type: PropTypes.oneOf([
    'json',
    'text',
    'blob',
    'arrayBuffer',
    'formData',
  ]),
  render: PropTypes.func,
}

Fetch.defaultProps = {
  method: 'get',
  type: 'json',
}
