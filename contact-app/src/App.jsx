import { useState, useEffect } from 'react';
import Loader from './components/Loader';
import ContactList from './components/ListaContactoForma';
import AddContactForm from './components/añadirContactoForma';
import './App.css';

// Datos iniciales de contactos
const initialContacts = [
  { id: 1, name: 'Juan García', phone: '+34 612 345 678' },
  { id: 2, name: 'María López', phone: '+34 623 456 789' },
  { id: 3, name: 'Carlos Rodríguez', phone: '+34 634 567 890' },
  { id: 4, name: 'Ana Martínez', phone: '+34 645 678 901' },
];

function App() {
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Simular carga inicial de datos
  useEffect(() => {
    const loadContacts = () => {
      setTimeout(() => {
        setContacts(initialContacts);
        setIsLoading(false);
      }, 2000); // Simula 2 segundos de carga
    };

    loadContacts();
  }, []);

  // Función para agregar un contacto
  const handleAddContact = (newContact) => {
    setContacts([...contacts, newContact]);
  };

  // Función para eliminar un contacto
  const handleDeleteContact = (id) => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>📱 Mis Contactos</h1>
      </header>
      
      <main className="app-main">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <AddContactForm onAddContact={handleAddContact} />
            <ContactList 
              contacts={contacts} 
              onDeleteContact={handleDeleteContact} 
            />
          </>
        )}
      </main>
    </div>
  );
}

export default App;
