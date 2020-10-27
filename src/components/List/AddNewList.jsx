import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/Button';

const COPY = {
    ADD_NEW_LIST: 'Add new list...'
};

class AddNewList extends React.Component {
    render() {
        const {createNewList} = this.props;

        return (
            <article className="components-list">
                <Button
                    styleType="action"
                    onClick={createNewList}>
                    {COPY.ADD_NEW_LIST}
                </Button>
            </article>
        )
    }
}

AddNewList.propTypes = {
    createNewList: PropTypes.func
};

export default AddNewList;
