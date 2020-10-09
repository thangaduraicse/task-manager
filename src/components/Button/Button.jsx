import React from 'react';
import PropTypes from 'prop-types';

class Button extends React.Component {
    render() {
        const {children, onClick, styleType} = this.props;
                
        return (
            <button className={`components-button ${styleType}`} onClick={onClick}>
                {children}
            </button>
        );
    }
}

Button.defaultProps = {
    styleType: 'primary'
};

Button.propTypes = {
    children: PropTypes.any,
    onClick: PropTypes.func,
    styleType: PropTypes.string
};

export default Button;
