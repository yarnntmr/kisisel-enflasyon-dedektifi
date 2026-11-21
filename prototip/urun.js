const tarihKutusu = document.getElementById("tarih");
tarihKutusu.valueAsDate = new Date();

const form = document.getElementById("urun-formu");
const sonuc = document.getElementById("sonuc");
const liste = document.getElementById("kayit-listesi");

const kayitlar = JSON.parse(localStorage.getItem("fiyatKayitlari")) || [];

function urunAnahtari(kayit) {
  return `${kayit.marka}|${kayit.urunAdi}|${kayit.cesit}|${kayit.birim}`.toLowerCase();
}

function listeyeEkle(kayit) {
  const satir = document.createElement("li");
  satir.textContent = `${kayit.tarih} · ${kayit.marka} ${kayit.urunAdi} ${kayit.cesit} · ${kayit.miktar} ${kayit.birim} · ${kayit.fiyat} TL`;
  liste.appendChild(satir);
}

kayitlar.forEach(listeyeEkle);

form.addEventListener("submit", function (olay) {
  olay.preventDefault();

  const yeniKayit = {
    marka: document.getElementById("marka").value.trim(),
    urunAdi: document.getElementById("urun-adi").value.trim(),
    cesit: document.getElementById("cesit").value.trim(),
    birim: document.getElementById("birim").value,
    miktar: Number(document.getElementById("miktar").value),
    fiyat: Number(document.getElementById("fiyat").value),
    tarih: tarihKutusu.value
  };

  const ayniUrunKayitlari = kayitlar.filter(function (kayit) {
    return urunAnahtari(kayit) === urunAnahtari(yeniKayit);
  });
  const oncekiKayit = ayniUrunKayitlari.at(-1);

  if (oncekiKayit) {
    const analiz = gizliKuculmeAnalizi(oncekiKayit, yeniKayit);

    if (analiz.kuculmeVar) {
      sonuc.textContent = `⚠️ Gizli küçülme! Paket ${oncekiKayit.miktar} ${yeniKayit.birim} → ${yeniKayit.miktar} ${yeniKayit.birim}. Etiket fiyatı %${analiz.etiketDegisim.toFixed(1)} değişti, gerçek fiyat %${analiz.birimDegisim.toFixed(1)} arttı. Gizli artış: ${analiz.gizliArtis.toFixed(1)} puan.`;
    } else {
      sonuc.textContent = `✅ Gizli küçülme yok. Birim fiyat değişimi: %${analiz.birimDegisim.toFixed(1)}.`;
    }
  } else {
    sonuc.textContent = "📝 Bu ürünün ilk kaydı. Bir sonraki alışverişte karşılaştıracağım.";
  }

  kayitlar.push(yeniKayit);
  localStorage.setItem("fiyatKayitlari", JSON.stringify(kayitlar));
  listeyeEkle(yeniKayit);

  form.reset();
  tarihKutusu.valueAsDate = new Date();
});