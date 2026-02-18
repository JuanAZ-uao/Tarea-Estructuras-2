import ContactItem from './ContactoForma';
import './ListaContacto.css';

const ContactList = ({ contacts, onDeleteContact }) => {
  if (contacts.length === 0) {
    return (
      <div className="contact-list-empty">
        <p>No hay contactos. ¡Agrega uno!</p>
      </div>
    );
  }

  return (
    <div className="contact-list">
      {contacts.map((contact) => (
        <ContactItem 
          key={contact.id} 
          contact={contact} 
          onDelete={onDeleteContact} 
        />
      ))}
    </div>
  );
};

export default ContactList;
