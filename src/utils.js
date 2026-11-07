export const STATUS = { keldi: "Keldi", kechikdi: "Kechikdi", kelmadi: "Kelmadi" };

const pad = (n) => String(n).padStart(2, "0");

export function todayStr() {
  const d = new Date();
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export function nowTime() {
  const d = new Date();
  return `${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

const OYLAR = ["yanvar", "fevral", "mart", "aprel", "may", "iyun", "iyul", "avgust", "sentabr", "oktabr", "noyabr", "dekabr"];

export function fmtDate(s) {
  const [y, m, d] = s.split("-");
  return `${+d}-${OYLAR[+m - 1]}, ${y}`;
}

export const fullName = (s) => `${s.familiya} ${s.ism}`;

export const sortClasses = (arr) => arr.slice().sort((a, b) => a.localeCompare(b, "uz", { numeric: true }));

export const sortStudents = (arr) =>
  arr
    .slice()
    .sort(
      (a, b) =>
        a.sinf.localeCompare(b.sinf, "uz", { numeric: true }) || fullName(a).localeCompare(fullName(b), "uz")
    );

/** Bir o'quvchining ma'lum kundagi davomat yozuvi: {s: "keldi"|"kechikdi"|"kelmadi", t: "08:05"} yoki null */
export const getRec = (db, date, id) => (db.attendance[date] || {})[id] || null;

/** Kun bo'yicha hisob: jami, keldi, kechikdi, kelmadi, belgilanmagan, kelgan, kelmagan */
export function countDay(db, date, list = db.students) {
  const c = { jami: list.length, keldi: 0, kechikdi: 0, kelmadi: 0, none: 0 };
  list.forEach((s) => {
    const r = getRec(db, date, s.id);
    c[r ? r.s : "none"]++;
  });
  c.kelgan = c.keldi + c.kechikdi;
  c.kelmagan = c.jami - c.kelgan;
  c.foiz = c.jami ? Math.round((c.kelgan / c.jami) * 100) : 0;
  return c;
}

/** Ism yoki familiya bo'yicha qidiruv */
export function matches(s, q) {
  q = q.trim().toLowerCase();
  if (!q) return true;
  return [s.ism, s.familiya, `${s.familiya} ${s.ism}`, `${s.ism} ${s.familiya}`].some((x) =>
    x.toLowerCase().includes(q)
  );
}
