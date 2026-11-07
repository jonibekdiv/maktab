import { BUSES, busName } from "../data/buses";
import { countDay, fullName, getRec, sortStudents, todayStr } from "../utils";
import { Badge } from "./Common";

function BusMap({ bus }) {
  if (!bus.map) {
    return <div className="map-empty">🗺️ Bu liniya uchun xarita hali qo‘shilmagan</div>;
  }
  return (
    <div className="bus-map">
      <iframe title={`${bus.nomi} xaritasi`} src={bus.map} allowFullScreen loading="lazy" />
      <a href={bus.link} target="_blank" rel="noreferrer">
        Yandex Xaritada ochish ↗
      </a>
    </div>
  );
}

export default function Avtobuslar({ db, setBus }) {
  const today = todayStr();

  return (
    <section>
      <h2>Avtobus liniyalari</h2>
      <div className="grid buses">
        {BUSES.map((b) => {
          const list = sortStudents(db.students.filter((s) => s.bus === b.id));
          const others = sortStudents(db.students.filter((s) => s.bus !== b.id));
          const c = countDay(db, today, list);

          return (
            <div key={b.id} className="card">
              <div className="bus-head">
                <div className="bus-num">{b.id}</div>
                <div>
                  <b>{b.nomi}</b>
                  <div className="muted small-text">Haydovchi: {b.haydovchi}</div>
                </div>
              </div>
              <div className="muted small-text">📍 {b.marshrut}</div>

              <BusMap bus={b} />

              <div className="small-text">
                {c.jami} ta o‘quvchi · bugun <b className="text-green">{c.kelgan}</b> keldi
              </div>

              <ul className="bus-list">
                {list.length === 0 && <li className="muted">Hali o‘quvchi biriktirilmagan</li>}
                {list.map((s) => (
                  <li key={s.id}>
                    <span>
                      {fullName(s)} <span className="muted">({s.sinf})</span>
                    </span>
                    <span className="nowrap">
                      <Badge rec={getRec(db, today, s.id)} />
                      <button className="x" title="Avtobusdan olib tashlash" onClick={() => setBus(s.id, 0)}>
                        ✕
                      </button>
                    </span>
                  </li>
                ))}
              </ul>

              <select
                className="full"
                value=""
                onChange={(e) => e.target.value && setBus(Number(e.target.value), b.id)}
              >
                <option value="">+ O‘quvchi biriktirish...</option>
                {others.map((s) => (
                  <option key={s.id} value={s.id}>
                    {fullName(s)} ({s.sinf}){s.bus ? ` — hozir ${busName(s.bus)}` : ""}
                  </option>
                ))}
              </select>
            </div>
          );
        })}
      </div>
    </section>
  );
}
