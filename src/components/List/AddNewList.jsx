import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/Button';

const COPY = {
    ADD_NEW_LIST: 'Add new list...'
};

class AddNewList extends React.Component {
    render() {
        const {handleAddNewList} = this.props;

        return (
            <article className="components-list">
                <Button
                    styleType="action"
                    onClick={handleAddNewList}>
                    {COPY.ADD_NEW_LIST}
                </Button>
            </article>
        )
    }
}

AddNewList.propTypes = {
    handleAddNewList: PropTypes.func
};

export default AddNewList;
