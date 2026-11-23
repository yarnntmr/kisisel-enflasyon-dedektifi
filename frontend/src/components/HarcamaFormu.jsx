import { useState } from "react";
import { KATEGORILER } from "../kategoriler";

function bugun() {
  return new Date().toLocaleDateString("sv-SE");
}

function HarcamaFormu({ onEkle }) {
  const [tutar, setTutar] = useState("");
  const [kategori, setKategori] = useState("");
  const [tarih, setTarih] = useState(bugun());

  function kaydet(olay) {
    olay.preventDefault();
    onEkle({ tarih: tarih, kategori: kategori, tutar: Number(tutar) });
    setTutar("");
    setKategori("");
    setTarih(bugun());
  }

  return (
    <form onSubmit={kaydet}>
      <div>
        <label htmlFor="tutar">Tutar (TL)</label>
        <input
          type="number" id="tutar" min="0" step="0.01" required
          placeholder="0,00"
          value={tutar}
          onChange={(e) => setTutar(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="kategori">Kategori</label>
        <select
          id="kategori" required
          value={kategori}
          onChange={(e) => setKategori(e.target.value)}
        >
          <option value="">Seçiniz</option>
          {KATEGORILER.map((k) => (
            <option key={k.value} value={k.value}>{k.label}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="tarih">Tarih</label>
        <input
          type="date" id="tarih" required
          value={tarih}
          onChange={(e) => setTarih(e.target.value)}
        />
      </div>

      <button type="submit">Harcamayı kaydet</button>
    </form>
  );
}

export default HarcamaFormu;