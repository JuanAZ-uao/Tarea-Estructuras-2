import { useState } from 'react';
import './añadirContacto.css';

const AddContactForm = ({ onAddContact }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!name.trim() || !phone.trim()) {
      alert('Por favor completa todos los campos');
      return;
    }

    onAddContact({
      id: Date.now(),
      name: name.trim(),
      phone: phone.trim()
    });

    setName('');
    setPhone('');
  };

  return (
    <form className="add-contact-form" onSubmit={handleSubmit}>
      <h3>Agregar Contacto</h3>
      <div className="form-group">
        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="form-input"
        />
      </div>
      <div className="form-group">
        <input
          type="tel"
          placeholder="Teléfono"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="form-input"
        />
      </div>
      <button type="submit" className="submit-btn">
        Agregar Contacto
      </button>
    </form>
  );
};

export default AddContactForm;
