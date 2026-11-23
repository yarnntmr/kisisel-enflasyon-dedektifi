import { useState, useEffect } from "react";
import HarcamaFormu from "./components/HarcamaFormu";
import OzetKartlari from "./components/OzetKartlari";
import HarcamaListesi from "./components/HarcamaListesi";

function App() {
  const [harcamalar, setHarcamalar] = useState(
    () => JSON.parse(localStorage.getItem("harcamalar")) || []
  );

  useEffect(() => {
    localStorage.setItem("harcamalar", JSON.stringify(harcamalar));
  }, [harcamalar]);

  function harcamaEkle(yeni) {
    setHarcamalar([...harcamalar, yeni]);
  }

  return (
    <main className="kapsayici">
      <h1>Kişisel Enflasyon Dedektifi</h1>
      <p className="alt-baslik">Harcamalarına göre senin gerçek enflasyonun.</p>

      <HarcamaFormu onEkle={harcamaEkle} />

      <h2>Harcamalarım</h2>
      <OzetKartlari harcamalar={harcamalar} />
      <HarcamaListesi harcamalar={harcamalar} />
    </main>
  );
}

export default App;