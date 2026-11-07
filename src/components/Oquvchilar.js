import { useState } from "react";
import { busName } from "../data/buses";
import { fullName, getRec, matches, sortStudents, todayStr } from "../utils";
import { Badge, BusSelect, ClassSelect, Empty } from "./Common";

export default function Oquvchilar({ db, classFilter, setClassFilter, onAdd, onEdit, onDelete }) {
  const [q, setQ] = useState("");
  const [bus, setBus] = useState("");
  const today = todayStr();

  const list = sortStudents(
    db.students.filter(
      (s) => matches(s, q) && (!classFilter || s.sinf === classFilter) && (bus === "" || String(s.bus) === bus)
    )
  );

  return (
    <section>
      <div className="toolbar">
        <h2 className="grow">O‘quvchilar ro‘yxati</h2>
        <button className="btn primary" onClick={onAdd}>
          + O‘quvchi qo‘shish
        </button>
      </div>

      <div className="card">
        <div className="toolbar">
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="🔍 Ism yoki familiya bo‘yicha qidirish..."
          />
          <ClassSelect classes={db.classes} value={classFilter} onChange={setClassFilter} all="Barcha sinflar" />
          <BusSelect value={bus} onChange={setBus} all="Barcha avtobuslar" withNone />
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Familiya, ism</th>
                <th>Sinf</th>
                <th>Avtobus</th>
                <th>Telefon</th>
                <th>Bugun</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {list.length === 0 && <Empty cols={7}>O‘quvchi topilmadi</Empty>}
              {list.map((s, i) => (
                <tr key={s.id}>
                  <td className="muted">{i + 1}</td>
                  <td>
                    <b>{fullName(s)}</b>
                  </td>
                  <td>{s.sinf}</td>
                  <td>{s.bus ? busName(s.bus) : <span className="muted">—</span>}</td>
                  <td>{s.tel || <span className="muted">—</span>}</td>
                  <td>
                    <Badge rec={getRec(db, today, s.id)} />
                  </td>
                  <td className="nowrap">
                    <button className="btn small" onClick={() => onEdit(s)}>
                      ✏️ Tahrirlash
                    </button>{" "}
                    <button className="btn small danger" onClick={() => onDelete(s)}>
                      🗑
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
