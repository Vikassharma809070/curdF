import React from 'react';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';

const App = () => {
  return (
    <div className="App">
      <h1 className="text-center text-2xl my-4">Contact Management</h1>
      <ContactForm />
      <ContactList />
      
    </div>
  );
};

export default App;
