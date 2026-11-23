import { kategoriAdi } from "../kategoriler";

function HarcamaListesi({ harcamalar }) {
  if (harcamalar.length === 0) {
    return <p className="bos">Henüz harcama yok. İlk harcamanı yukarıdan ekle.</p>;
  }

  return (
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
  );
}

export default HarcamaListesi;