import { useEffect, useState } from "react";
import { BusSelect, ClassSelect } from "./Common";

export default function StudentModal({ student, classes, defaultClass, onSave, onClose }) {
  const [f, setF] = useState(() =>
    student
      ? { familiya: student.familiya, ism: student.ism, sinf: student.sinf, bus: String(student.bus), tel: student.tel }
      : { familiya: "", ism: "", sinf: defaultClass || classes[0] || "", bus: "0", tel: "" }
  );

  // Esc bosilsa yopiladi
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const set = (key) => (value) => setF((old) => ({ ...old, [key]: value }));

  function submit(e) {
    e.preventDefault();
    const data = {
      familiya: f.familiya.trim(),
      ism: f.ism.trim(),
      sinf: f.sinf,
      bus: Number(f.bus),
      tel: f.tel.trim(),
    };
    if (!data.familiya || !data.ism || !data.sinf) return;
    onSave(data, student?.id);
  }

  return (
    <div className="modal-bg" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <form className="modal" onSubmit={submit}>
        <h3>{student ? "O‘quvchini tahrirlash" : "O‘quvchi qo‘shish"}</h3>

        <label>Familiya</label>
        <input autoFocus required value={f.familiya} onChange={(e) => set("familiya")(e.target.value)} />

        <label>Ism</label>
        <input required value={f.ism} onChange={(e) => set("ism")(e.target.value)} />

        <label>Sinf</label>
        <ClassSelect classes={classes} value={f.sinf} onChange={set("sinf")} />

        <label>Avtobus liniyasi</label>
        <BusSelect value={f.bus} onChange={set("bus")} withNone />

        <label>Ota-ona telefoni</label>
        <input value={f.tel} onChange={(e) => set("tel")(e.target.value)} placeholder="+998 90 123 45 67" />

        <div className="actions">
          <button type="button" className="btn" onClick={onClose}>
            Bekor qilish
          </button>
          <button type="submit" className="btn primary">
            Saqlash
          </button>
        </div>
      </form>
    </div>
  );
}
