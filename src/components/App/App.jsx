import React, { Component } from 'react';
import { nanoid } from 'nanoid';

import { Container, Title, Text } from './App.styled';
import ContactForm from 'components/ContactForm/ContactForm';
import ContactList from 'components/Contacts/ContactList';
import Filter from 'components/Filter';


class App extends Component {

  state = {
    contacts: [ ],
    filter: '',
  }

  componentDidMount() {
    const dataContacts = localStorage.getItem('contacts');

    if (dataContacts !== null) {
      const parsedContacts = JSON.parse(dataContacts);
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(_, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  handleSubmit = data => {
    const sameName = this.state.contacts.find(item => item.name.toLowerCase() === data.name.toLowerCase());
    if (sameName) return alert(sameName.name + ' already in your contacts');

    data.id = nanoid();
    this.setState( prev => ({ contacts: [data, ...prev.contacts] }));
  };
  
  onChangeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getContacts = () => {
    const { filter, contacts } = this.state;
    const lowerFilter = filter.toLowerCase();

    return contacts.filter(item => item.name.toLowerCase().includes(lowerFilter));
  };

  onDeleteContacts = id => {
    this.setState(prevState => ({ contacts: prevState.contacts.filter(item => item.id !== id), }))
  };
  
  render() {
    const { filter, contacts } = this.state;

    return (
      <Container>
        <Title>Phonebook</Title>
        <ContactForm onSubmit={this.handleSubmit} />
        <Title>Contacts</Title>
        <Text>Find contact</Text>
        <Filter value={filter} onChange={this.onChangeFilter} />
        {contacts.length ?
          (
            <ContactList
              contacts={this.getContacts()}
              onDelete={this.onDeleteContacts} />
          ) : (
        <Text>You havn't contacts yet</Text>
        )}
        
      </Container>
    );
  }
}

export default App;