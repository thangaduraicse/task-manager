import React from 'react';
import PropTypes from 'prop-types';

class ToggleSwitch extends React.Component {
    render() {
        const {children, onToggle} = this.props;

        return (
            <div className="components-toggle-switch">
                <span className="hint">{children}</span>
                <label className="switch">
                    <input type="checkbox" onChange={onToggle} />
                    <span className="slider round"></span>
                </label>
            </div>
        );
    }
}

ToggleSwitch.propTypes = {
    children: PropTypes.any,
    onToggle: PropTypes.func
}

export default ToggleSwitch;
