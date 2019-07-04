import React, { Component } from 'react'
import { Consumer } from '../../Context'

export default class Orders extends Component {
    render() {
        return (
            <div>
                <h1>Заказы</h1>
                <Consumer>
                {
                    value => {
                        return (
                            true
                        )
                    }
                }
                </Consumer>
            </div>
        )
    }
}
