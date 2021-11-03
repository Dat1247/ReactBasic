import React, { Component } from 'react'

export default class ItemComponent extends Component {
    render() {
        return (
            <div style={{width: "100%"}} className="card">
                <div className="card-header">
                    <img src="" alt="image" />
                </div>
                <div className="card-body p-3 text-center">
                    <h3>Card title</h3>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga atque consectetur ullam iure voluptatum ipsa!</p>
                    <button class="btn btn-primary">Find Card</button>
                </div>
            </div>
        )
    }
}
