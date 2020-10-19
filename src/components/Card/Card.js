import React from 'react';
import {Draggable} from 'react-beautiful-dnd';
import PropTypes from 'prop-types';

class Card extends React.Component {
    render() {
        const {card: {id, imgAlt = '', imgSrc, title}, index}= this.props;

        return (
            <Draggable draggableId={id} index={index}>
                {
                    provided => (
                        <article
                            className="components-card"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                        >
                            <p className="title">{title}</p>
                            { imgSrc && <img src={imgSrc} alt={imgAlt} /> }
                        </article>
                    )
                }
            </Draggable>
        )
    }
}

Card.propTypes = {
    card: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired
}

export default Card;
