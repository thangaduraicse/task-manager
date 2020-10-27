import React from 'react';
import PropTypes from 'prop-types';

class Input extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            focussed: false
        };

        this.handleBlur = this.handleBlur.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
    }

    getClassName() {
        const {className, isNotValid} = this.props,
                {focussed} = this.state;

        return [
            focussed && 'focussed',
            isNotValid && 'error',
            className,
        ].filter(v => v);
    }

    handleBlur(e) {
        const {onBlur} = this.props;

        this.setState({
            focussed: false
        });

        onBlur && onBlur(e);
    }

    handleChange(e) {
        const {onChange} = this.props;

        onChange && onChange(e);
    }

    handleFocus(e) {
        const {onFocus} = this.props;

        this.setState({
            focussed: true
        });

        onFocus && onFocus(e);
    }


    render() {
        const {id, type, name} = this.props;

        return (
            <div className="components-input">
                <input
                    className={this.getClassName()}
                    type={type}
                    id={id}
                    name={name || id}
                    onBlur={this.handleBlur}
                    onChange={this.handleChange}
                    onFocus={this.handleFocus}
                />
            </div>
        )
    }
}
Input.defaultProps = {
    type: 'text'
};

Input.propTypes = {
    className: PropTypes.string,
    id: PropTypes.string.isRequired,
    isNotValid: PropTypes.bool,
    name: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    type: PropTypes.string
}

export default Input;
