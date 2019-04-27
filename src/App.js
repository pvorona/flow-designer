// @flow
import React, { Component } from 'react'
import './App.css';
import { connect } from 'react-redux'
import { PolymorphicComponent } from './PolymorphicComponent'

class App extends Component<any> {
  render() {
    const { root } = this.props

    return (
      <div className="container">
        <svg
          height='100%'
          width='100%'
        >
          {root.components.map(component =>
            <PolymorphicComponent
              key={component.id}
              id={component.id}
            />
          )}
        </svg>
      </div>
    )
  }
}

export default connect(
  ({ root }) => ({ root }),
)(App)
