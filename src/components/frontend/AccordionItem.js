import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import classNames from "classnames";

class AccordionItem extends Component {
    static propTypes = {
        title: PropTypes.string,
        toOpen: PropTypes.bool
    };

    static defaultProps = {
        title: "TITLE",
        toOpen: false
    };

    constructor(props) {
        super(props);
        this.state = { isOpen: false };
        this.mounted = true;
    }

    handleDocumentClick = event => {
        if (
            this.mounted &&
            !ReactDOM.findDOMNode(this).contains(event.target) &&
            this.state.isOpen
        ) {
            this.setState({ isOpen: false });
        }
    };

    componentDidMount() {
        if (this.props.atomic) {
            document.addEventListener("click", this.handleDocumentClick, false);
            document.addEventListener(
                "touchend",
                this.handleDocumentClick,
                false
            );
        }
        if (this.props.toOpen && !this.state.isOpen) {
            this.setState({ isOpen: true });
        }
    }

    componentDidUpdate() {
        if (this.props.toOpen && !this.state.isOpen) {
            this.setState({ isOpen: true });
        }
    }

    componentWillUnmount() {
        this.mounted = false;
        document.removeEventListener("click", this.handleDocumentClick, false);
        document.removeEventListener(
            "touchend",
            this.handleDocumentClick,
            false
        );
    }

    onClick = () => {
        if (this.props.toOpen) {
            this.setState({ isOpen: !this.state.isOpen });
        }
    };

    render() {
        const accordionItemClassNames = classNames([
            "accordion-item",
            {
                active: this.state.isOpen
            }
        ]);

        return (
            <div className={accordionItemClassNames}>
                <button className='title' onClick={this.onClick}>
                    {this.props.title}
                </button>
                <div className='panel'>{this.props.children}</div>
            </div>
        );
    }
}

export default AccordionItem;
