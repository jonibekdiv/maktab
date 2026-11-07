import { useState } from "react";
import { countDay, fmtDate, fullName, getRec, sortStudents } from "../utils";
import { Badge, Empty } from "./Common";

export default function Tarix({ db, openDay }) {
  const [studentId, setStudentId] = useState("");
  const days = Object.keys(db.attendance).sort().reverse();

  const sid = Number(studentId);
  const sc = { keldi: 0, kechikdi: 0, kelmadi: 0 };
  if (sid) days.forEach((d) => { const r = getRec(db, d, sid); if (r) sc[r.s]++; });

  return (
    <section>
      <h2>Davomat tarixi</h2>

      <div className="card table-wrap">
        <h3>Kunlar bo‘yicha</h3>
        <table>
          <thead>
            <tr>
              <th>Sana</th>
              <th>Keldi</th>
              <th>Kechikdi</th>
              <th>Kelmadi</th>
              <th>Davomat %</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {days.length === 0 && <Empty cols={6}>Hali davomat olinmagan</Empty>}
            {days.map((d) => {
              const c = countDay(db, d);
              return (
                <tr key={d}>
                  <td>
                    <b>{fmtDate(d)}</b>
                  </td>
                  <td>{c.keldi}</td>
                  <td>{c.kechikdi}</td>
                  <td>{c.kelmagan}</td>
                  <td>{c.foiz}%</td>
                  <td>
                    <button className="btn small" onClick={() => openDay(d)}>
                      Ko‘rish
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="card">
        <h3>O‘quvchi bo‘yicha</h3>
        <div className="toolbar">
          <select value={studentId} onChange={(e) => setStudentId(e.target.value)} style={{ minWidth: 240 }}>
            <option value="">O‘quvchini tanlang...</option>
            {sortStudents(db.students).map((s) => (
              <option key={s.id} value={s.id}>
                {fullName(s)} ({s.sinf})
              </option>
            ))}
          </select>
        </div>

        {sid > 0 && (
          <>
            <p>
              ✅ Keldi: <b>{sc.keldi}</b> · ⏰ Kechikdi: <b>{sc.kechikdi}</b> · ❌ Kelmadi: <b>{sc.kelmadi}</b>
            </p>
            {days.length === 0 ? (
              <Empty>Ma’lumot yo‘q</Empty>
            ) : (
              <table>
                <tbody>
                  {days.map((d) => (
                    <tr key={d}>
                      <td>{fmtDate(d)}</td>
                      <td>
                        <Badge rec={getRec(db, d, sid)} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </>
        )}
      </div>
    </section>
  );
}
