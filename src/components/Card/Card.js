import React from 'react';
import PropTypes from 'prop-types';

class Card extends React.Component {
    render() {
        const {imgAlt, imgSrc, title} = this.props;

        return (
            <article className="components-card">
                <p className="title">{title}</p>
                { imgSrc && <img src={imgSrc} alt={imgAlt} /> }
            </article>
        )
    }
}

Card.defaultProps = {
    imgAlt: ''
};

Card.propTypes = {
    imgAlt: PropTypes.string,
    imgSrc: PropTypes.string,
    title: PropTypes.string.isRequired,
}

export default Card;
