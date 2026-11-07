import { BUSES } from "../data/buses";
import { STATUS } from "../utils";

/** Davomat holati belgisi */
export function Badge({ rec }) {
  if (!rec) return <span className="badge b-none">Belgilanmagan</span>;
  return (
    <span className={`badge b-${rec.s}`}>
      {STATUS[rec.s]}
      {rec.s === "kechikdi" && rec.t ? ` · ${rec.t}` : ""}
    </span>
  );
}

/** Sinf tanlash */
export function ClassSelect({ classes, value, onChange, all }) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      {all && <option value="">{all}</option>}
      {classes.map((c) => (
        <option key={c} value={c}>
          {c}
        </option>
      ))}
    </select>
  );
}

/** Avtobus tanlash */
export function BusSelect({ value, onChange, all, withNone }) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      {all && <option value="">{all}</option>}
      {withNone && <option value="0">Avtobussiz</option>}
      {BUSES.map((b) => (
        <option key={b.id} value={b.id}>
          {b.nomi}
        </option>
      ))}
    </select>
  );
}

export const Empty = ({ children, cols }) =>
  cols ? (
    <tr>
      <td colSpan={cols} className="empty">
        {children}
      </td>
    </tr>
  ) : (
    <div className="empty">{children}</div>
  );
