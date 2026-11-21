const tarihKutusu = document.getElementById("tarih");
tarihKutusu.valueAsDate = new Date();

const form = document.getElementById("harcama-formu");
const liste = document.getElementById("harcama-listesi"); // YENİ: listeyi en başta bul

const harcamalar = JSON.parse(localStorage.getItem("harcamalar")) || [];

function listeyeEkle(harcama) {                                               
  const satir = document.createElement("li");                                  
  satir.textContent = `${harcama.tarih} · ${harcama.kategori} · ${harcama.tutar} TL`; 
  liste.appendChild(satir);                                                    
}                                                                             

harcamalar.forEach(listeyeEkle); // YENİ: sayfa açılınca kayıtlıları çiz

form.addEventListener("submit", function (olay) {
  olay.preventDefault();

  const tutar = document.getElementById("tutar").value;
  const kategori = document.getElementById("kategori").value;
  const tarih = tarihKutusu.value;

  const yeniHarcama = { tarih: tarih, kategori: kategori, tutar: tutar };
  harcamalar.push(yeniHarcama);
  localStorage.setItem("harcamalar", JSON.stringify(harcamalar));

  listeyeEkle(yeniHarcama); // YENİ: eski 4 satırın yerine tek satır

  form.reset();
  tarihKutusu.valueAsDate = new Date();
});