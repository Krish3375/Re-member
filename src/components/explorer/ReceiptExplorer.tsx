import { Music2, Search, ShoppingBag } from "lucide-react";
import { useMemo, useState } from "react";
import type { LifeReceipt, ReceiptType } from "../../types/receipt";

const filters: Array<"All" | ReceiptType> = ["All", "music", "purchase"];
type Props = { receipts: LifeReceipt[]; selectedId: string | null; onSelect: (id: string) => void };

export default function ReceiptExplorer({ receipts, selectedId, onSelect }: Props) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const visible = useMemo(() => receipts.filter((receipt) => {
    const words = `${receipt.title} ${receipt.subtitle ?? ""} ${receipt.tags.join(" ")}`.toLowerCase();
    return (filter === "All" || receipt.type === filter) && words.includes(query.trim().toLowerCase());
  }), [filter, query, receipts]);

  return <section className="explorer section" aria-labelledby="explorer-title">
    <div className="section-heading"><p className="section-number">01 / EXPLORE</p><h2 id="explorer-title">The receipts behind<br />your days.</h2></div>
    <div className="explorer-controls">
      <div className="search-wrapper"><Search size={18} aria-hidden="true" /><label className="sr-only" htmlFor="receipt-search">Search life receipts</label><input id="receipt-search" type="search" placeholder="Search songs, moments, categories…" value={query} onChange={(event) => setQuery(event.target.value)} /></div>
      <div className="filters" aria-label="Receipt categories">{filters.map((category) => <button key={category} type="button" className={filter === category ? "filter active" : "filter"} onClick={() => setFilter(category)} aria-pressed={filter === category}>{category === "All" ? category : category[0].toUpperCase() + category.slice(1)}</button>)}</div>
    </div>
    <p className="result-count" aria-live="polite">{visible.length} of {receipts.length} selected receipts</p>
    {visible.length ? <div className="receipt-grid">{visible.map((receipt) => {
      const Icon = receipt.type === "music" ? Music2 : ShoppingBag;
      return <article className={selectedId === receipt.id ? "receipt-card selected" : "receipt-card"} key={receipt.id}>
        <div className="receipt-top"><span className="receipt-icon"><Icon size={18} aria-hidden="true" /></span><time dateTime={receipt.timestamp}>{new Intl.DateTimeFormat(undefined, { month: "short", day: "numeric", year: "numeric" }).format(new Date(receipt.timestamp))}</time></div>
        <div><p className="receipt-type">{receipt.type}</p><h3>{receipt.title}</h3><p className="receipt-subtitle">{receipt.subtitle}</p></div>
        <button type="button" className="connection-button" onClick={() => onSelect(receipt.id)} aria-pressed={selectedId === receipt.id}>Trace its connections <span aria-hidden="true">↗</span></button>
      </article>;
    })}</div> : <p className="empty-state">No receipts match that search. Try an artist, category, or a shorter phrase.</p>}
  </section>;
}
