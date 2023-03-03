import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import { Container, Title, Text } from './App.styled';
import ContactForm from 'components/ContactForm/ContactForm';
import ContactList from 'components/Contacts/ContactList';
import Filter from 'components/Filter';


export const App = () => {

  const [contacts, setContacts] = useState(() =>
    JSON.parse(localStorage.getItem('contacts')));

  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);
  


  const handleSubmit = data => {    
    if (!contacts.find((contact) => data.name.toLocaleLowerCase() === contact.name.toLowerCase())) {
      data.id = nanoid();
    setContacts((prev) => (prev ? [...prev, data] : [data]));
    } else {
      return alert(`${data.name} already in your contacts`);
    }
  };
  
  const onChangeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const getContacts = () => {
    const lowerFilter = filter.toLowerCase();

    return contacts.filter(item => item.name.toLowerCase().includes(lowerFilter));
  };

  const onDeleteContacts = id => {
    setContacts(contacts.filter(item => item.id !== id))
  };
  
  return (
    <Container>
      <Title>Phonebook</Title>
      <ContactForm onSubmit={handleSubmit} />
      <Title>Contacts</Title>
      <Text>Find contact</Text>
      <Filter value={filter} onChange={onChangeFilter} />
      {contacts.length ?
        (
          <ContactList
            contacts={getContacts()}
            onDelete={onDeleteContacts} />
        ) : (
          <Text>You havn't contacts yet</Text>
        )}
        
    </Container>
  );
};