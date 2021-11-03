import React, { Component } from 'react'
import BodyComponent from './BodyComponent'
import FooterComponent from './FooterComponent'
import HeaderComponent from './HeaderComponent'

export default class HomeComponent extends Component {
    render() {
        return (
            <div>
                <div className="bg-dark">
                    <HeaderComponent />
                </div>
                <div>
                    <BodyComponent />
                </div>
                <div className="bg-dark">
                    <FooterComponent />
                </div>
            </div>
        )
    }
}
