import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/Button';

const COPY = {
    ADD_NEW_LIST: 'Add new list...'
};

class List extends React.Component {
    constructor(props) {
        super(props);

        this.handleAddNewList = this.handleAddNewList.bind(this);
    }

    handleAddNewList(event) {
        const {createNewList} = this.props;
        console.log('I am going to create a new list...', event.target);
        createNewList({
            listName: 'Test List'
        });
    }

    render() {
        const {addNewList} = this.props;

        return (
            <article className="components-list">
                {
                    addNewList &&
                        <Button
                            styleType="action"
                            onClick={this.handleAddNewList}>
                            {COPY.ADD_NEW_LIST}
                        </Button>
                }
            </article>
        )
    }
}

List.propTypes = {
    addNewList: PropTypes.bool,
    createNewList: PropTypes.func
};

export default List;
