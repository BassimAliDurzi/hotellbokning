import { useState } from "react";
import "./styles/App.css";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    roomType: "",
  });

  const [isBooked, setIsBooked] = useState(false);

  const scrollToBooking = () => {
    const section = document.getElementById("booking");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const { name, date, roomType } = formData;

    if (!name || !date || !roomType) {
      alert("Vänligen fyll i alla fält.");
      return;
    }

    const booking = {
      id: Date.now(),
      name,
      date,
      roomType,
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem("hotelBooking", JSON.stringify(booking));
    setFormData({
      name,
      date,
      roomType,
    });
    setIsBooked(true);
    setIsBooked(true);
  };

  const handleNewBooking = () => {
    setFormData({
      name: "",
      date: "",
      roomType: "",
    });
    setIsBooked(false);
  };

  return (
    <main className="page">
      <section className="hero">
        <div className="hero__overlay">
          <p className="eyebrow">Välkommen till</p>
          <h1>Hotellbokning</h1>
          <p className="hero__text">
            Boka ditt rum enkelt och snabbt. Välj mellan Standard, Deluxe och
            Suite för din nästa vistelse.
          </p>
          <button className="hero__button" onClick={scrollToBooking}>
            Boka nu
          </button>
        </div>
      </section>

      <section id="booking" className="booking">
        <div className="booking__container">
          <p className="section-label">Bokning</p>
          <h2>Boka ditt rum</h2>
          <p className="booking__intro">
            Fyll i dina uppgifter och välj rumstyp för att slutföra bokningen.
          </p>

          {!isBooked ? (
            <form className="booking__form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Namn</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Ange ditt namn"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="date">Datum</label>
                <input
                  id="date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="roomType">Rumstyp</label>
                <select
                  id="roomType"
                  name="roomType"
                  value={formData.roomType}
                  onChange={handleChange}
                >
                  <option value="">Välj rum</option>
                  <option value="Standard">Standard</option>
                  <option value="Deluxe">Deluxe</option>
                  <option value="Suite">Suite</option>
                </select>
              </div>

              <button type="submit" className="submit-button">
                Boka
              </button>
            </form>
          ) : (
            <div className="booking__success">
              <h3>Bokningen är bekräftad</h3>
              <p className="success-text">
                Tack för din bokning. Vi ser fram emot ditt besök.
              </p>

              <div className="booking__summary">
                <p>
                  <strong>Namn:</strong> {formData.name}
                </p>
                <p>
                  <strong>Datum:</strong> {formData.date}
                </p>
                <p>
                  <strong>Rumstyp:</strong> {formData.roomType}
                </p>
              </div>

              <button
                className="submit-button"
                type="button"
                onClick={handleNewBooking}
              >
                Ny bokning
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default App;
