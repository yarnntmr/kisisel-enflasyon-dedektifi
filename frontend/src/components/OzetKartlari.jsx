function OzetKartlari({ harcamalar }) {
  const toplamTutar = harcamalar.reduce((toplam, h) => toplam + h.tutar, 0);

  return (
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
  );
}

export default OzetKartlari;