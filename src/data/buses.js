/* =========================================================
   AVTOBUS LINIYALARI (5 ta)
   - nomi, haydovchi, marshrut — o'zingiz o'zgartirasiz
   - map  — Yandex xarita iframe manzili (src)
   - link — "Yandex Xaritada ochish" havolasi
   4- va 5-liniya xaritasi hali berilmagan (map: null)
   ========================================================= */

export const BUSES = [
  {
    id: 1,
    nomi: "1-liniya",
    haydovchi: "—",
    marshrut: "1-yo‘nalish → Maktab",
    map: "https://yandex.uz/map-widget/v1/?ll=66.866902%2C39.045479&mode=routes&rtext=39.031780%2C66.902458~39.060221%2C66.831020&rtt=auto&ruri=~ymapsbm1%3A%2F%2Forg%3Foid%3D224619366042&z=14.29",
    link: "https://yandex.uz/maps/?ll=66.866902%2C39.045479&mode=routes&rtext=39.031780%2C66.902458~39.060221%2C66.831020&rtt=auto&ruri=~ymapsbm1%3A%2F%2Forg%3Foid%3D224619366042&utm_medium=mapframe&utm_source=maps&z=14.29",
  },
  {
    id: 2,
    nomi: "2-liniya",
    haydovchi: "—",
    marshrut: "2-yo‘nalish → Maktab",
    map: "https://yandex.uz/map-widget/v1/?ll=66.866902%2C39.045479&mode=routes&rtext=39.031780%2C66.902458~39.060221%2C66.831020&rtn=1&rtt=auto&ruri=~ymapsbm1%3A%2F%2Forg%3Foid%3D224619366042&z=14.29",
    link: "https://yandex.uz/maps/?ll=66.866902%2C39.045479&mode=routes&rtext=39.031780%2C66.902458~39.060221%2C66.831020&rtn=1&rtt=auto&ruri=~ymapsbm1%3A%2F%2Forg%3Foid%3D224619366042&utm_medium=mapframe&utm_source=maps&z=14.29",
  },
  {
    id: 3,
    nomi: "3-liniya",
    haydovchi: "—",
    marshrut: "3-yo‘nalish → Maktab",
    map: "https://yandex.uz/map-widget/v1/?ll=66.866902%2C39.045479&mode=routes&rtext=39.031780%2C66.902458~39.060221%2C66.831020&rtn=2&rtt=auto&ruri=~ymapsbm1%3A%2F%2Forg%3Foid%3D224619366042&z=14.29",
    link: "https://yandex.uz/maps/?ll=66.866902%2C39.045479&mode=routes&rtext=39.031780%2C66.902458~39.060221%2C66.831020&rtn=2&rtt=auto&ruri=~ymapsbm1%3A%2F%2Forg%3Foid%3D224619366042&utm_medium=mapframe&utm_source=maps&z=14.29",
  },
  {
    id: 4,
    nomi: "4-liniya",
    haydovchi: "—",
    marshrut: "Marshrut kiritilmagan",
    map: null,
    link: null,
  },
  {
    id: 5,
    nomi: "5-liniya",
    haydovchi: "—",
    marshrut: "Marshrut kiritilmagan",
    map: null,
    link: null,
  },
];

export const busName = (id) => (BUSES.find((b) => b.id === Number(id)) || {}).nomi || "—";
