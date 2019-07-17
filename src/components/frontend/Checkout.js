import React, { Component } from 'react'
import {
    Accordion,
    AccordionItem,
    AccordionItemButton,
    AccordionItemHeading,
    AccordionItemPanel,
} from 'react-accessible-accordion';

import Login from './Login';
import SignUp from './SignUp';
import Delivery from './Delivery';




export default class Checkout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cartTotal: 0
        };
    }

    render() {
        return (
            <div className="category__container">
                <h1 className="category__header">Оформление заказа</h1>
                <div className="cart__container">
                <Accordion>
                    <AccordionItem>
                        <AccordionItemHeading>
                            <AccordionItemButton>
                                <span className="accordion__number">1.</span> Контактная информация
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <div className="checkout__row">
                                <SignUp />
                                <Login />
                            </div>
                        </AccordionItemPanel>
                    </AccordionItem>
                    <AccordionItem>
                        <AccordionItemHeading>
                            <AccordionItemButton>
                                <span className="accordion__number">2.</span> Информация о доставке
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                                <Delivery />
                        </AccordionItemPanel>
                    </AccordionItem>
                    <AccordionItem>
                        <AccordionItemHeading>
                            <AccordionItemButton>
                            <span className="accordion__number">3.</span> Подтверждение заказа
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <p>
                                Подтверждение 
                            </p>
                        </AccordionItemPanel>
                    </AccordionItem>
                </Accordion>
                </div>
            </div>
        )
    }
}
