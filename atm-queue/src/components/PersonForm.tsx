import { useState, type FormEvent } from "react";

interface Props {
  onAddPerson: (name: string, withdrawalAmount: number) => void;
}

export default function PersonForm({ onAddPerson }: Props) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const parsedAmount = parseFloat(amount);
    if (!name.trim() || isNaN(parsedAmount) || parsedAmount <= 0) return;
    onAddPerson(name.trim(), parsedAmount);
    setName("");
    setAmount("");
  };

  return (
    <form className="person-form" onSubmit={handleSubmit}>
      <h2>Agregar persona a la fila</h2>
      <div className="form-group">
        <label htmlFor="name">Nombre</label>
        <input
          id="name"
          type="text"
          placeholder="Nombre completo"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="amount">Monto a retirar ($)</label>
        <input
          id="amount"
          type="number"
          placeholder="0.00"
          min="0.01"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </div>
      <button type="submit">Agregar a la fila</button>
    </form>
  );
}
