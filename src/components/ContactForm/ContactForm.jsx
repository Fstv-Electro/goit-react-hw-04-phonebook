import { useState} from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, ErrorMessage } from 'formik';
import {
    Button, Input, Label
} from './ContactForm.styled';

export function ContactForm({onSubmit}) {
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');

    const handleInputCHange = e => {
        const { name, value } = e.currentTarget;

        switch (name) {
            case 'name':
                setName(value);
                break;
            case 'number':
                setNumber(value);
                break;
            default:
                return;
        }
    };

    const handleSubmit = (values, action) => {
        onSubmit(values);
        action.resetForm();
    };

        return (
            <Formik initialValues={{ name, number }} onSubmit={handleSubmit} onChange={handleInputCHange}>
                <Form autoComplete='off'>
                    <Label>
                        Name:
                        <Input
                            type="text"
                            name="name"
                            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                            required
                        />
                    </Label>
                    <ErrorMessage name='name' component="div" />
                    <Label>
                        Number:
                        <Input
                            type="tel"
                            name="number"
                            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                            required
                        />
                    </Label>
                    <ErrorMessage name='number' component="div" />
                    <Button type="submit">Add</Button>
                </Form>
            </Formik>
        );
   
}

export default ContactForm;

ContactForm.propTypes = {
    onSubmit: PropTypes.func,
};