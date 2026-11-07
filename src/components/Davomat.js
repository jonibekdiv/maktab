import { useState } from "react";
import { busName } from "../data/buses";
import { STATUS, countDay, fmtDate, fullName, getRec, matches, sortStudents, todayStr } from "../utils";
import { Badge, BusSelect, ClassSelect, Empty } from "./Common";

export default function Davomat({ db, date, setDate, mark, setTime, markAll }) {
  const [q, setQ] = useState("");
  const [cls, setCls] = useState("");
  const [bus, setBus] = useState("");
  const [status, setStatus] = useState("");

  const list = sortStudents(
    db.students.filter((s) => {
      const r = getRec(db, date, s.id);
      return (
        matches(s, q) &&
        (!cls || s.sinf === cls) &&
        (bus === "" || String(s.bus) === bus) &&
        (!status || (status === "none" ? !r : r && r.s === status))
      );
    })
  );
  const c = countDay(db, date);

  function allPresent() {
    const ids = list.filter((s) => !getRec(db, date, s.id)).map((s) => s.id);
    if (!ids.length) return alert("Belgilanmagan o‘quvchi yo‘q");
    if (window.confirm(`${ids.length} ta belgilanmagan o‘quvchi “keldi” deb belgilansinmi?`)) markAll(date, ids);
  }

  return (
    <section>
      <div className="toolbar">
        <h2 className="grow">Davomat</h2>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value || todayStr())} />
      </div>

      <div className="card">
        <div className="toolbar">
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="🔍 Ism yoki familiya..." />
          <ClassSelect classes={db.classes} value={cls} onChange={setCls} all="Barcha sinflar" />
          <BusSelect value={bus} onChange={setBus} all="Barcha avtobuslar" withNone />
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">Barcha holatlar</option>
            <option value="keldi">Kelganlar</option>
            <option value="kechikdi">Kechikkanlar</option>
            <option value="kelmadi">Kelmaganlar</option>
            <option value="none">Belgilanmaganlar</option>
          </select>
        </div>

        <div className="toolbar">
          <button className="btn" onClick={allPresent}>
            ✅ Ro‘yxatdagilarni “keldi” qilish
          </button>
          <span className="muted">
            {fmtDate(date)}: {c.keldi} keldi · {c.kechikdi} kechikdi · {c.kelmadi} kelmadi · {c.none} belgilanmagan
          </span>
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Familiya, ism</th>
                <th>Sinf</th>
                <th>Avtobus</th>
                <th>Holat</th>
                <th>Belgilash</th>
              </tr>
            </thead>
            <tbody>
              {list.length === 0 && <Empty cols={6}>O‘quvchi topilmadi</Empty>}
              {list.map((s, i) => {
                const r = getRec(db, date, s.id);
                return (
                  <tr key={s.id}>
                    <td className="muted">{i + 1}</td>
                    <td>
                      <b>{fullName(s)}</b>
                    </td>
                    <td>{s.sinf}</td>
                    <td>{s.bus ? busName(s.bus) : <span className="muted">—</span>}</td>
                    <td>
                      <Badge rec={r} />
                    </td>
                    <td>
                      <div className="att-btns">
                        {Object.entries(STATUS).map(([key, label]) => (
                          <button
                            key={key}
                            className={`${key} ${r?.s === key ? "on" : ""}`}
                            onClick={() => mark(date, s.id, key)}
                          >
                            {label}
                          </button>
                        ))}
                        {r?.s === "kechikdi" && (
                          <input
                            type="time"
                            title="Kelgan vaqti"
                            value={r.t}
                            onChange={(e) => setTime(date, s.id, e.target.value)}
                          />
                        )}
                        {r && (
                          <button title="Belgini olib tashlash" onClick={() => mark(date, s.id, null)}>
                            ↺
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
