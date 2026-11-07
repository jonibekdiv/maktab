import { useState } from "react";
import { BUSES } from "../data/buses";
import { countDay, fullName, getRec, sortStudents, todayStr } from "../utils";
import { Badge, Empty } from "./Common";

function StudentMiniTable({ db, date, list, emptyText }) {
  if (!list.length) return <Empty>{emptyText}</Empty>;
  return (
    <table>
      <tbody>
        {list.map((s) => (
          <tr key={s.id}>
            <td>{fullName(s)}</td>
            <td>{s.sinf}</td>
            <td>
              <Badge rec={getRec(db, date, s.id)} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function CountTable({ rows }) {
  return (
    <table>
      <thead>
        <tr>
          <th></th>
          <th>Jami</th>
          <th>Keldi</th>
          <th>Kechikdi</th>
          <th>Kelmadi</th>
        </tr>
      </thead>
      <tbody>
        {rows.map(([name, c]) => (
          <tr key={name}>
            <td>
              <b>{name}</b>
            </td>
            <td>{c.jami}</td>
            <td>{c.keldi}</td>
            <td>{c.kechikdi}</td>
            <td>{c.kelmagan}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function Statistika({ db }) {
  const [date, setDate] = useState(todayStr());
  const c = countDay(db, date);

  const late = sortStudents(db.students.filter((s) => getRec(db, date, s.id)?.s === "kechikdi"));
  const absent = sortStudents(
    db.students.filter((s) => {
      const r = getRec(db, date, s.id);
      return !r || r.s === "kelmadi";
    })
  );

  const byClass = db.classes
    .map((cl) => [cl, countDay(db, date, db.students.filter((s) => s.sinf === cl))])
    .filter(([, x]) => x.jami > 0);
  const byBus = BUSES.map((b) => [b.nomi, countDay(db, date, db.students.filter((s) => s.bus === b.id))]);

  return (
    <section>
      <div className="toolbar">
        <h2 className="grow">Statistika</h2>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value || todayStr())} />
      </div>

      <div className="grid stats">
        <div className="stat blue">
          <div className="label">Jami o‘quvchilar</div>
          <div className="value">{c.jami}</div>
        </div>
        <div className="stat green">
          <div className="label">Kelgan ({c.foiz}%)</div>
          <div className="value">{c.kelgan}</div>
        </div>
        <div className="stat orange">
          <div className="label">Kechikkan</div>
          <div className="value">{c.kechikdi}</div>
        </div>
        <div className="stat red">
          <div className="label">Kelmagan</div>
          <div className="value">{c.kelmagan}</div>
        </div>
      </div>

      <div className="grid two mt">
        <div className="card">
          <h3>⏰ Kechikkanlar</h3>
          <StudentMiniTable db={db} date={date} list={late} emptyText="Kechikkanlar yo‘q" />
        </div>
        <div className="card">
          <h3>❌ Kelmaganlar</h3>
          <StudentMiniTable db={db} date={date} list={absent} emptyText="Hamma kelgan 🎉" />
        </div>
      </div>

      <div className="grid two">
        <div className="card table-wrap">
          <h3>Sinflar bo‘yicha</h3>
          <CountTable rows={byClass} />
        </div>
        <div className="card table-wrap">
          <h3>Avtobuslar bo‘yicha</h3>
          <CountTable rows={byBus} />
        </div>
      </div>
    </section>
  );
}
