import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import {Button, Input, Modal} from 'components';

export const HOME_OVERLAY_TYPES = {
    CARD_OVERLAY: 'cardOverlay',
    LIST_OVERLAY: 'listOverlay'
};

const COPY = {
    ADD_NEW_CARD: 'Add new card',
    ADD_NEW_LIST: 'Add new list',
    CLOSE_MODAL_BUTTON: 'Close',
    SAVE_MODAL_BUTTON: 'Save',
    TITLE: 'Title'
};

const intialFormState = {
    title: {
        value: undefined
    }
};

class HomeOverlay extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            form: intialFormState,
            showModal: false
        };

        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    componentDidUpdate(prevProps) {
        const {modalName: currentModalName} = this.props,
                {modalName: prevModalName} = prevProps;

        currentModalName !== prevModalName && currentModalName && (this.setState({ showModal: true }));
    }

    getHeading() {
        const {modalName} = this.props;

        if (modalName === HOME_OVERLAY_TYPES.CARD_OVERLAY) {
            return COPY.ADD_NEW_CARD;
        }

        if (modalName === HOME_OVERLAY_TYPES.LIST_OVERLAY) {
            return COPY.ADD_NEW_LIST;
        }

        return '';
    }

    handleFieldChange(e) {
        const {target: {id, value}} = e;
        let {form} = this.state;
        
        form = {
            ...form,
            [id]: {
                value
            }
        };

        this.setState({
            form
        });
    }

    handleSave() {
        const {handleSave, modalProps} = this.props,
                {form: {title: {value: title}}} = this.state;

        const result = {
            ...modalProps,
            id: uuidv4(),
            title
        };
        handleSave(result);
        this.handleModalClose();
    }

    handleModalClose() {
        const {handleClose} = this.props;

        this.setState({
            form: intialFormState,
            showModal: false
        });

        handleClose();
    }
    
    render() {
        const {showModal} = this.state,
                heading = this.getHeading();

        return showModal && (
            <Modal className="home-overlay-modal">
                {
                    heading && <h1>{heading}</h1>
                }
                <div className="field">
                    <label htmlFor="title">{COPY.TITLE}</label>
                    <Input
                        id="title"
                        name="title"
                        onChange={this.handleFieldChange}
                    />
                </div>
                <div className="button-group">
                    <Button
                        onClick={this.handleSave}>
                        {COPY.SAVE_MODAL_BUTTON}
                    </Button>
                    <Button
                        styleType="action"
                        onClick={this.handleModalClose}>
                        {COPY.CLOSE_MODAL_BUTTON}
                    </Button>
                </div>
            </Modal>
        );
    }
}

HomeOverlay.propTypes = {
    handleClose: PropTypes.func,
    handleSave: PropTypes.func,
    modalName: PropTypes.string.isRequired,
    modalProps: PropTypes.object
};

export default HomeOverlay;
