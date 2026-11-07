const KEY = "maktab_davomat_react_v1";

/** Birinchi ochilganda ko'rsatiladigan namuna ma'lumotlar */
function seed() {
  const classes = ["1-A", "1-B", "2-A", "2-B", "3-A", "3-B", "4-A", "4-B"];
  const rows = [
    ["Aliyev", "Jasur", "1-A", 1],
    ["Karimova", "Malika", "1-A", 1],
    ["Toshmatov", "Bekzod", "1-B", 2],
    ["Rahimova", "Dilnoza", "2-A", 2],
    ["Yusupov", "Sardor", "2-A", 3],
    ["Ergasheva", "Madina", "2-B", 3],
    ["Qodirov", "Otabek", "3-A", 4],
    ["Nazarova", "Sevara", "3-B", 4],
    ["Xolmatov", "Azizbek", "4-A", 5],
    ["Sobirova", "Nilufar", "4-B", 5],
    ["Islomov", "Javohir", "1-B", 0],
    ["Umarova", "Zarina", "3-A", 1],
  ];
  return {
    classes,
    students: rows.map(([familiya, ism, sinf, bus], i) => ({ id: i + 1, familiya, ism, sinf, bus, tel: "" })),
    nextId: rows.length + 1,
    attendance: {}, // { "2026-11-07": { "3": { s: "keldi", t: "08:05" } } }
  };
}

export function load() {
  try {
    const s = localStorage.getItem(KEY);
    if (s) return JSON.parse(s);
  } catch (e) {}
  return seed();
}

export function save(db) {
  try {
    localStorage.setItem(KEY, JSON.stringify(db));
  } catch (e) {}
}
