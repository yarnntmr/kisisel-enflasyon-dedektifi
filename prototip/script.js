console.log("Merhaba, JavaScript çalışıyor!");

const tarihKutusu = document.getElementById("tarih");
console.log(tarihKutusu);

tarihKutusu.valueAsDate = new Date();
const form = document.getElementById("harcama-formu");

form.addEventListener("submit", function (olay) {
  olay.preventDefault();

  const tutar = document.getElementById("tutar").value;
  const kategori = document.getElementById("kategori").value;
  const tarih = tarihKutusu.value;

  console.log("Yeni harcama:", tutar, kategori, tarih);
  const liste = document.getElementById("harcama-listesi");
  const satir = document.createElement("li");
  satir.textContent = `${tarih} · ${kategori} · ${tutar} TL`;
  liste.appendChild(satir);

  form.reset();
  tarihKutusu.valueAsDate = new Date();
});