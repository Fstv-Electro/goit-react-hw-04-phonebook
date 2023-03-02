import React from "react";
import PropTypes from "prop-types";

import { List, Item, Button } from './ContactList.styled';

function ContactList({ contacts, onDelete }) {
    return (
        <List>
            {contacts.map(({ id, name, number }, idx) => (
                <Item key={id}>
                    <div>{idx + 1}</div>
                    {name}: {number}
                    <Button onClick={() => onDelete(id)}>Delete</Button>
                </Item>
            ))}
        </List>
    );
}

export default ContactList;

ContactList.propTypes = {
    contacts: PropTypes.arrayOf(PropTypes.object),
    onDelete: PropTypes.func,
};