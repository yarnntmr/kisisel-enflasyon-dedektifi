import { useState, useEffect } from "react";

const KATEGORILER = [
  { value: "gida", label: "Gıda ve içecek" },
  { value: "kira", label: "Kira" },
  { value: "enerji", label: "Elektrik, su, doğalgaz" },
  { value: "ulasim", label: "Ulaşım" },
  { value: "iletisim", label: "İnternet, telefon ve dijital abonelikler" },
  { value: "ev", label: "Temizlik ve ev ihtiyaçları" },
  { value: "kisisel-bakim", label: "Kişisel bakım" },
  { value: "giyim", label: "Giyim" },
  { value: "restoran", label: "Kafe ve restoran" },
  { value: "eglence", label: "Eğlence ve spor" },
  { value: "diger", label: "Diğer" },
];

function bugun() {
  return new Date().toLocaleDateString("sv-SE");
}

function kategoriAdi(value) {
  const bulunan = KATEGORILER.find((k) => k.value === value);
  return bulunan ? bulunan.label : value;
}

function App() {
  const [harcamalar, setHarcamalar] = useState(
    () => JSON.parse(localStorage.getItem("harcamalar")) || []
  );
  const [tutar, setTutar] = useState("");
  const [kategori, setKategori] = useState("");
  const [tarih, setTarih] = useState(bugun());

  useEffect(() => {
    localStorage.setItem("harcamalar", JSON.stringify(harcamalar));
  }, [harcamalar]);

  function kaydet(olay) {
    olay.preventDefault();
    const yeni = { tarih: tarih, kategori: kategori, tutar: Number(tutar) };
    setHarcamalar([...harcamalar, yeni]);
    setTutar("");
    setKategori("");
    setTarih(bugun());
  }

  const toplamTutar = harcamalar.reduce((toplam, h) => toplam + h.tutar, 0);

  return (
    <main className="kapsayici">
      <h1>Kişisel Enflasyon Dedektifi</h1>
      <p className="alt-baslik">Harcamalarına göre senin gerçek enflasyonun.</p>

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

      <h2>Harcamalarım</h2>

      <div className="ozet">
        <div>
          <span className="ozet-etiket">Harcama sayısı</span>
          <strong>{harcamalar.length}</strong>
        </div>
        <div>
          <span className="ozet-etiket">Toplam</span>
          <strong>{toplamTutar.toLocaleString("tr-TR")} TL</strong>
        </div>
      </div>

      {harcamalar.length === 0 && (
        <p className="bos">Henüz harcama yok. İlk harcamanı yukarıdan ekle.</p>
      )}

      <ul className="liste">
        {harcamalar.map((h, i) => (
          <li key={i}>
            <div>
              <span className="etiket">{kategoriAdi(h.kategori)}</span>
              <span className="tarih">{h.tarih}</span>
            </div>
            <strong>{h.tutar.toLocaleString("tr-TR")} TL</strong>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default App;