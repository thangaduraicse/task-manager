import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { Button, Input, Modal} from 'components';

const COPY = {
    ADD_NEW_CARD: 'Add new card',
    CLOSE_BUTTON: 'Close',
    INPUT_LABEL: 'Card Title',
    SAVE_BUTTON: 'Save'
}

class CardOverlay extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            inputValue: ''
        };

        this.handleSaveModal = this.handleSaveModal.bind(this);
        this.handleTitleInputChange = this.handleTitleInputChange.bind(this);
    }

    handleSaveModal() {
        const { handleClose, handleSave, list: { id } } = this.props,
                { inputValue } = this.state;
        let result;

        inputValue && (
            result = {
                id: uuidv4(),
                title: inputValue
            },
            handleSave(result, id),
            handleClose()
        );
    }

    handleTitleInputChange(e) {
        const { target: { value: inputValue } } = e;

        this.setState({ inputValue });
    }

    render() {
        const { handleClose } = this.props;

        return (
            <Modal className="home-overlay-modal">
                <h1>{COPY.ADD_NEW_CARD}</h1>
                <div className="field">
                    <label htmlFor="title">{COPY.INPUT_LABEL}</label>
                    <Input
                        id="title"
                        name="title"
                        onChange={this.handleTitleInputChange}
                    />
                </div>
                <div className="button-group">
                    <Button onClick={handleClose}>
                        {COPY.CLOSE_BUTTON}
                    </Button>
                    <Button onClick={this.handleSaveModal}>
                        {COPY.SAVE_BUTTON}
                    </Button>
                </div>
            </Modal>
        );
    }
}

CardOverlay.propTypes = {
    list: PropTypes.object.isRequired,
    handleClose: PropTypes.func.isRequired,
    handleSave: PropTypes.func.isRequired
};

export default CardOverlay;
