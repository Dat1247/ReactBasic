import React, { Component } from 'react'
import BannerComponent from './BannerComponent'
import ItemComponent from './ItemComponent'

export default class BodyComponent extends Component {
    render() {
        return (
            <div className="container mb-2">
                <BannerComponent />
                <div className="d-flex justify-content-between">
                    <div style={{width: "260px"}}>
                        <ItemComponent />
                    </div>
                    <div style={{width: "260px"}}>
                        <ItemComponent />
                    </div>
                    <div style={{width: "260px"}}>
                        <ItemComponent />
                    </div>
                    <div style={{width: "260px"}}>
                        <ItemComponent />
                    </div>
                </div>
            </div>
        )
    }
}
