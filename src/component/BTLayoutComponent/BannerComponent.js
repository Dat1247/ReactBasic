import React, { Component } from 'react'

export default class BannerComponent extends Component {
    render() {
        return (
            <div className="bg-light px-3 py-5 my-2 border">
                <h2>A Warm Welcome</h2>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus eligendi impedit quis? Natus labore quibusdam soluta sequi accusamus dolor illum.</p>
                <button class="btn btn-primary">Call the action</button>
            </div>
        )
    }
}
