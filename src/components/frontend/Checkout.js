import React, { Component } from 'react'

import Accordion from './Accordion'
import AccordionItem from './AccordionItem'
import Login from './Login';
import SignUp from './SignUp';
import Delivery from './Delivery';
import Confirmation from './Confirmation';

export default class Checkout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cartTotal: 0,
            stepOneActive: true,
            stepTwoActive: false,
            stepThreeActive: false
        };
    }

    toStepTwo = () => {
        if(!this.state.stepTwoActive)
        {
            this.setState({ stepOneActive: false,
                            stepTwoActive: true,
                            stepThreeActive: false})
        }
    }

    toStepThree = () => {
        if(!this.state.stepThreeActive)
        {
            this.setState({ stepOneActive: false,
                            stepTwoActive: false,
                            stepThreeActive: true})
        }
    }


    render() {
        return (
            <div className="category__container">
                <h1 className="category__header">Оформление заказа</h1>
                <div className="cart__container">
                
                <Accordion atomic={true}>
                    <AccordionItem title="1. Контактная информация" toOpen={this.state.stepOneActive}>
                        <div className="checkout__row">
                            <SignUp toStepTwo={this.toStepTwo}/>
                            <Login  toStepTwo={this.toStepTwo}/>
                        </div>
                    </AccordionItem>
                    <AccordionItem title="2. Информация о доставке" toOpen={this.state.stepTwoActive}>                       
                        <Delivery toStepThree={this.toStepThree}/>
                    </AccordionItem>
                    <AccordionItem title="3. Подтверждение заказа" toOpen={this.state.stepThreeActive}>
                        <Confirmation />
                    </AccordionItem>
                </Accordion>
                </div>
            </div>
        )
    }
}
