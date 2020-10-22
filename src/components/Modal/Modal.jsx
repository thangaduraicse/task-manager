import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class Modal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            modal: null
        };
    }

    componentDidMount() {
        // Remove existing overlay div
        let target = document.getElementById('overlay');

        target && target.remove();

        // Create a new overlay div
        target = document.createElement('div');
        target.id =  'overlay';
        target.className = 'overlay';

        // Appending that div to the body tag
        document.body.appendChild(target);
        document.getElementById('root').classList.add('overlay-open');

        this.setState({
            modal: target
        });
    }

    componentDidUpdate() {
        const {children, className} = this.props,
                { modal } = this.state;

        modal && (
            ReactDOM.render(
                <article className={`components-modal ${className}`}>
                    {children}
                </article>,
            modal)
        );
    }

    componentWillUnmount() {
        const { modal } = this.state;

        modal && modal.remove();
        document.getElementById('root').classList.remove('overlay-open');
    }

    render() {
        return null;
    }
    
}

Modal.defaultProps = {
    className: ''
}


Modal.propTypes = {
    className: PropTypes.string,
    children: PropTypes.any
};

export default Modal;
