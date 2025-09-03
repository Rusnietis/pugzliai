import { useContext } from 'react';
import { Customers } from '../../Contexts/Customers';

export default function Header() {
  const { stats, setTaxes, filters, setFilters, sort, setSort } = useContext(Customers);

  // --- filtras ---
  const handleFilterChange = (e) => {
    const [blocked, amount] = e.target.value.split("|");
    setFilters({
      isBlocked: blocked === "all" ? null : blocked === "true",
      amountType: amount === "all" ? null : amount
    });
  };

  // --- sortas ---
  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  const handleTaxes = () => {
    setTaxes({ change: -5 });
  };

  return (
    <div className="card-header">
      {/* Statistikos blokas */}
      <div className='stats'>
        <h5 style={{ margin: 4 }}>Banko statistika</h5>
        <hr style={{ margin: 4 }} />
        {stats === null ? <div className="loader"><div></div></div> : null}
        {stats && stats.map(item => (
          <div key={item.name}>
            {item.name === 'customers' && <p style={{ margin: 0 }}>Bankas šiuo metu turi: <b>{item.count}</b> klientus</p>}
            {item.name === 'accounts' && <>
              <p style={{ margin: 0 }}>Bendra laikoma suma: <b>{item.count}</b> eur</p>
              <p>Vidutinė laikoma suma: <b>{item.is_blocked}</b> eur</p>
            </>}
          </div>
        ))}
        <hr />
      </div>

      {/* Filtras ir sort */}
      <div className="col-3" style={{ display: 'flex', gap: 10}}>
        <div className="filter" style={{ flexDirection: 'column'}}>
          <label htmlFor="filterSelect">Filtruoti pagal:</label>
          <select
            id="filterSelect"
            value={`${filters.isBlocked ?? "all"}|${filters.amountType ?? "all"}`}
            onChange={handleFilterChange}
          >
            <option value="all|all">Visi klientai</option>
            <option value="true|all">Tik blokuoti</option>
            <option value="false|all">Tik neblokuoti</option>
            <option value="all|positive">Visi su teigiama sąskaita</option>
            <option value="all|negative">Visi su neigiama sąskaita</option>
            <option value="all|zero">Visi su nuline sąskaita</option>
          </select>
        </div>

        <div className="sort" style={{ flexDirection: 'column'}}>
          <label htmlFor="sortSelect">Rušiuoti pagal:</label>
          <select
            id="sortSelect"
            value={sort || "none"}
            onChange={handleSortChange}
          >
            <option value="none">Visi</option>
            <option value="surname">Pagal pavardę</option>
            <option value="amount">Pagal sumą</option>
          </select>
        </div>
      </div>

      {/* Mokesčių mygtukas */}
      <div className="taxes">
        <button
          className="button-18 blue"
          onClick={handleTaxes}
        >
          Mokesčiai
        </button>
      </div>
    </div>
  );
}
