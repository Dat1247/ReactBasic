import React, { Component } from 'react'
import HeaderDemo from './HeaderDemo'
import Product from './Product'

export default class BTChiaLayout extends Component {
  render() {
    return (
      <div>
        <HeaderDemo/>
        <Product/>
      </div>
    )
  }
}
