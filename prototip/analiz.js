function birimFiyat(fiyat, miktar) {
  return fiyat / miktar * 100;
}
function yuzdeDegisim(eski, yeni) {
  return (yeni / eski - 1) * 100;
}
function gizliKuculmeAnalizi(eski, yeni) {
  const eskiBirim = birimFiyat(eski.fiyat, eski.miktar);
  const yeniBirim = birimFiyat(yeni.fiyat, yeni.miktar);

  const birimDegisim = yuzdeDegisim(eskiBirim, yeniBirim);
  const etiketDegisim = yuzdeDegisim(eski.fiyat, yeni.fiyat);

  const kuculmeVar = yeni.miktar < eski.miktar && yeniBirim > eskiBirim;

  return {
    birimDegisim: birimDegisim,
    etiketDegisim: etiketDegisim,
    gizliArtis: birimDegisim - etiketDegisim,
    kuculmeVar: kuculmeVar
  };
}