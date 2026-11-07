import { useState } from "react";
import { countDay, todayStr } from "../utils";

export default function Sinflar({ db, onOpen, onAdd, onDelete }) {
  const [name, setName] = useState("");
  const today = todayStr();

  function add(e) {
    e.preventDefault();
    if (onAdd(name)) setName("");
  }

  return (
    <section>
      <form className="toolbar" onSubmit={add}>
        <h2 className="grow">Sinflar</h2>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Masalan: 5-A" style={{ width: 140 }} />
        <button className="btn primary" type="submit">
          + Sinf qo‘shish
        </button>
      </form>
      <p className="muted">Sinf kartasini bosing — o‘sha sinf o‘quvchilari ochiladi. Bo‘sh sinfni ✕ bilan o‘chirish mumkin.</p>

      <div className="grid classes">
        {db.classes.map((cl) => {
          const list = db.students.filter((s) => s.sinf === cl);
          const c = countDay(db, today, list);
          return (
            <div key={cl} className="card class-card" onClick={() => onOpen(cl)}>
              <div className="row-between">
                <div className="class-name">{cl}</div>
                {list.length === 0 && (
                  <button
                    className="x"
                    title="O‘chirish"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(cl);
                    }}
                  >
                    ✕
                  </button>
                )}
              </div>
              <div className="muted">{c.jami} ta o‘quvchi</div>
              <div className="muted small-text">
                Bugun: {c.kelgan} keldi, {c.kechikdi} kechikdi
              </div>
              <div className="bar">
                <span style={{ width: `${c.foiz}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
