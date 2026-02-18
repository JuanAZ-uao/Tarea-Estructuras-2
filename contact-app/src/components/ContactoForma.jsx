import './Contacto.css';

const ContactItem = ({ contact, onDelete }) => {
  return (
    <div className="contact-item">
      <div className="contact-info">
        <span className="contact-name">{contact.name}</span>
        <span className="contact-phone">{contact.phone}</span>
      </div>
      <button 
        className="delete-btn" 
        onClick={() => onDelete(contact.id)}
        aria-label="Eliminar contacto"
      >
        ✕
      </button>
    </div>
  );
};

export default ContactItem;
