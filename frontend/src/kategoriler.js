export const KATEGORILER = [
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

export function kategoriAdi(value) {
  const bulunan = KATEGORILER.find((k) => k.value === value);
  return bulunan ? bulunan.label : value;
}