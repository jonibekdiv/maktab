import { useEffect, useState } from "react";
import "./App.css";
import { load, save } from "./storage";
import { fmtDate, fullName, nowTime, sortClasses, todayStr } from "./utils";
import Statistika from "./components/Statistika";
import Oquvchilar from "./components/Oquvchilar";
import Sinflar from "./components/Sinflar";
import Avtobuslar from "./components/Avtobuslar";
import Davomat from "./components/Davomat";
import Tarix from "./components/Tarix";
import StudentModal from "./components/StudentModal";

const TABS = [
  ["stat", "📊 Statistika"],
  ["students", "👨‍🎓 O‘quvchilar"],
  ["classes", "🏷️ Sinflar"],
  ["buses", "🚌 Avtobuslar"],
  ["attendance", "✅ Davomat"],
  ["history", "🗓️ Davomat tarixi"],
];

export default function App() {
  const [db, setDb] = useState(load);
  const [tab, setTab] = useState("stat");
  const [attDate, setAttDate] = useState(todayStr());
  const [classFilter, setClassFilter] = useState("");
  const [modal, setModal] = useState(null); // null = yopiq, {student: null} = yangi, {student: {...}} = tahrirlash

  // Har o'zgarishda brauzer xotirasiga saqlash
  useEffect(() => save(db), [db]);

  /* ---------- O'quvchilar ---------- */
  function saveStudent(data, id) {
    setDb((d) =>
      id
        ? { ...d, students: d.students.map((s) => (s.id === id ? { ...s, ...data } : s)) }
        : { ...d, students: [...d.students, { id: d.nextId, ...data }], nextId: d.nextId + 1 }
    );
    setModal(null);
  }

  function deleteStudent(s) {
    if (!window.confirm(`${fullName(s)} o‘chirilsinmi?`)) return;
    setDb((d) => {
      const attendance = {};
      Object.entries(d.attendance).forEach(([day, recs]) => {
        const rest = { ...recs };
        delete rest[s.id];
        if (Object.keys(rest).length) attendance[day] = rest;
      });
      return { ...d, students: d.students.filter((x) => x.id !== s.id), attendance };
    });
  }

  /* ---------- Avtobus ---------- */
  const setBus = (studentId, bus) =>
    setDb((d) => ({ ...d, students: d.students.map((s) => (s.id === studentId ? { ...s, bus } : s)) }));

  /* ---------- Sinflar ---------- */
  function addClass(name) {
    const v = name.trim().toUpperCase();
    if (!v) return false;
    if (db.classes.includes(v)) {
      alert("Bu sinf allaqachon bor");
      return false;
    }
    setDb((d) => ({ ...d, classes: sortClasses([...d.classes, v]) }));
    return true;
  }
  function deleteClass(cl) {
    if (!window.confirm(`${cl} sinfi o‘chirilsinmi?`)) return;
    setDb((d) => ({ ...d, classes: d.classes.filter((c) => c !== cl) }));
  }

  /* ---------- Davomat ---------- */
  function updateDay(date, fn) {
    setDb((d) => {
      const day = { ...(d.attendance[date] || {}) };
      fn(day);
      const attendance = { ...d.attendance };
      if (Object.keys(day).length) attendance[date] = day;
      else delete attendance[date];
      return { ...d, attendance };
    });
  }
  const mark = (date, id, status) =>
    updateDay(date, (day) => {
      if (!status) delete day[id];
      else day[id] = { s: status, t: status === "kelmadi" ? "" : day[id]?.t || nowTime() };
    });
  const setTime = (date, id, t) => updateDay(date, (day) => day[id] && (day[id] = { ...day[id], t }));
  const markAll = (date, ids) =>
    updateDay(date, (day) => ids.forEach((id) => (day[id] = { s: "keldi", t: nowTime() })));

  /* ---------- Navigatsiya ---------- */
  const openClass = (cl) => {
    setClassFilter(cl);
    setTab("students");
  };
  const openDay = (d) => {
    setAttDate(d);
    setTab("attendance");
  };

  return (
    <>
      <header>
        <h1>🏫 Maktab davomati</h1>
        <span className="muted">Bugun: {fmtDate(todayStr())}</span>
      </header>

      <nav>
        {TABS.map(([key, label]) => (
          <button key={key} className={tab === key ? "active" : ""} onClick={() => setTab(key)}>
            {label}
          </button>
        ))}
      </nav>

      <main>
        {tab === "stat" && <Statistika db={db} />}
        {tab === "students" && (
          <Oquvchilar
            db={db}
            classFilter={classFilter}
            setClassFilter={setClassFilter}
            onAdd={() => setModal({ student: null })}
            onEdit={(s) => setModal({ student: s })}
            onDelete={deleteStudent}
          />
        )}
        {tab === "classes" && <Sinflar db={db} onOpen={openClass} onAdd={addClass} onDelete={deleteClass} />}
        {tab === "buses" && <Avtobuslar db={db} setBus={setBus} />}
        {tab === "attendance" && (
          <Davomat db={db} date={attDate} setDate={setAttDate} mark={mark} setTime={setTime} markAll={markAll} />
        )}
        {tab === "history" && <Tarix db={db} openDay={openDay} />}
      </main>

      {modal && (
        <StudentModal
          student={modal.student}
          classes={db.classes}
          defaultClass={classFilter}
          onSave={saveStudent}
          onClose={() => setModal(null)}
        />
      )}
    </>
  );
}
