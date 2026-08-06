import React, { useState } from 'react';
import { Check, X, ExternalLink, ArrowRight, ShieldCheck, Tag, Sparkles, XCircle, BookOpen } from 'lucide-react';

function CompareBar({ compareItems = [], setCompareItems }) {
    const [isOpen, setIsOpen] = useState(false);

    if (!compareItems || compareItems.length === 0) {
        return null;
    }

    const removeItem = (id) => {
        const updated = compareItems.filter(item => item.id !== id);
        setCompareItems(updated);
        if (updated.length === 0) setIsOpen(false);
    };

    const clearAll = () => {
        setCompareItems([]);
        setIsOpen(false);
    };

    return (
        <>
            {/* BARA FIXĂ DE JOS (FLOTOARE) */}
            <div className="fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-t border-gray-200 dark:border-gray-800 shadow-[0_-8px_30px_rgba(0,0,0,0.12)] dark:shadow-[0_-8px_30px_rgba(0,0,0,0.5)] z-40 transition-all p-3 sm:p-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">

                    {/* Items miniatură */}
                    <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-1">
                        <div className="flex items-center gap-2">
                            <span className="flex h-2.5 w-2.5 relative">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-600"></span>
                            </span>
                            <span className="font-bold text-xs sm:text-sm text-gray-800 dark:text-gray-200 whitespace-nowrap">
                                Comparație ({compareItems.length}/4)
                            </span>
                        </div>

                        <div className="flex items-center gap-2">
                            {compareItems.map(item => {
                                const displayName = item.productName || item.name || item.title || 'Produs';
                                return (
                                    <div key={item.id} className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 pl-2.5 pr-1.5 py-1 rounded-xl text-xs font-semibold border border-gray-200 dark:border-gray-700/60 shadow-sm whitespace-nowrap">
                                        <span className="max-w-[90px] sm:max-w-[140px] truncate" title={displayName}>
                                            {displayName}
                                        </span>
                                        <button
                                            onClick={() => removeItem(item.id)}
                                            className="w-4 h-4 flex items-center justify-center rounded-full hover:bg-red-500/10 hover:text-red-500 text-gray-400 transition"
                                            title="Elimină"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Acțiuni Dreapta */}
                    <div className="flex items-center gap-2 shrink-0">
                        <button
                            onClick={clearAll}
                            className="text-xs text-gray-500 dark:text-gray-400 hover:text-red-500 underline px-2 transition hidden sm:inline"
                        >
                            Șterge tot
                        </button>

                        <button
                            onClick={() => setIsOpen(true)}
                            className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-extrabold px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl transition shadow-lg shadow-blue-500/20 text-xs sm:text-sm flex items-center gap-1.5"
                        >
                            <span>Compară acum</span>
                            <ArrowRight size={16} />
                        </button>
                    </div>
                </div>
            </div>

            {/* MODALUL TABELULUI COMPARATIV */}
            {isOpen && (
                <div className="fixed inset-0 bg-black/75 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
                    <div className="bg-white dark:bg-gray-900 rounded-3xl max-w-6xl w-full max-h-[90vh] flex flex-col relative shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">

                        {/* Antet Modal */}
                        <div className="p-5 sm:p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between bg-gray-50/50 dark:bg-gray-900/50">
                            <div>
                                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider mb-0.5">
                                    <Sparkles size={14} />
                                    <span>Analiză Comparativă (#1 din Ghiduri)</span>
                                </div>
                                <h2 className="text-lg sm:text-2xl font-black text-gray-900 dark:text-white">Comparație Produse Top</h2>
                            </div>

                            <button
                                onClick={() => setIsOpen(false)}
                                className="w-9 h-9 flex items-center justify-center rounded-2xl bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition font-bold"
                            >
                                <XCircle size={20} />
                            </button>
                        </div>

                        {/* Tabel Derulabil */}
                        <div className="overflow-y-auto overflow-x-auto p-4 sm:p-6 flex-1">
                            <table className="w-full text-left border-collapse min-w-[620px]">
                                <thead>
                                <tr className="border-b border-gray-100 dark:border-gray-800">
                                    <th className="p-3 text-gray-400 dark:text-gray-500 font-bold text-xs uppercase tracking-wider w-1/5">
                                        Caracteristică
                                    </th>
                                    {compareItems.map(item => {
                                        const title = item.productName || item.name || item.title || 'Produs';
                                        const image = item.imageUrl || item.image || item.bannerImageUrl;
                                        const badge = item.badgeText || item.badge;

                                        return (
                                            <th key={item.id} className="p-3 text-center align-bottom w-1/4">
                                                <div className="flex flex-col items-center gap-2.5 bg-gray-50 dark:bg-gray-800/40 p-3.5 rounded-2xl border border-gray-100 dark:border-gray-800">

                                                    {/* Ghidul de proveniență */}
                                                    {item.guideTitle && (
                                                        <span className="flex items-center gap-1 text-[10px] text-blue-600 dark:text-blue-400 font-bold truncate max-w-[160px]" title={item.guideTitle}>
                                                                <BookOpen size={11} className="shrink-0" />
                                                                <span className="truncate">{item.guideTitle}</span>
                                                            </span>
                                                    )}

                                                    {/* Imagine produs */}
                                                    <div className="w-20 h-20 bg-white dark:bg-gray-800 rounded-xl p-2 border border-gray-200 dark:border-gray-700 flex items-center justify-center overflow-hidden shadow-sm">
                                                        <img
                                                            src={image || '/placeholder.png'}
                                                            alt={title}
                                                            className="max-w-full max-h-full object-contain"
                                                            onError={(e) => {
                                                                e.target.onerror = null;
                                                                e.target.src = 'https://via.placeholder.com/150?text=Produs';
                                                            }}
                                                        />
                                                    </div>

                                                    {/* Badge (Locul #1) */}
                                                    {badge && (
                                                        <span className="bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-[10px] font-black px-2.5 py-0.5 rounded-full border border-amber-200 dark:border-amber-800">
                                                                {badge}
                                                            </span>
                                                    )}

                                                    <h3 className="text-xs sm:text-sm font-extrabold text-gray-900 dark:text-white line-clamp-2 leading-snug">
                                                        {title}
                                                    </h3>
                                                </div>
                                            </th>
                                        );
                                    })}
                                </tr>
                                </thead>

                                <tbody className="divide-y divide-gray-100 dark:divide-gray-800/60 text-xs sm:text-sm">

                                {/* Rând Preț */}
                                <tr className="hover:bg-gray-50/50 dark:hover:bg-gray-800/20 transition">
                                    <td className="p-4 font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                        <Tag size={15} className="text-emerald-500" /> Preț Estimat
                                    </td>
                                    {compareItems.map(item => {
                                        const price = item.estimatedPrice || item.price;
                                        return (
                                            <td key={item.id} className="p-4 text-center font-black text-emerald-600 dark:text-emerald-400 text-base">
                                                {price ? `${price} RON` : 'Verifică oferta'}
                                            </td>
                                        );
                                    })}
                                </tr>

                                {/* Rând PROS */}
                                <tr className="hover:bg-gray-50/50 dark:hover:bg-gray-800/20 transition">
                                    <td className="p-4 font-bold text-gray-700 dark:text-gray-300">Puncte Tari (PRO)</td>
                                    {compareItems.map(item => (
                                        <td key={item.id} className="p-4 align-top">
                                            {Array.isArray(item.pros) && item.pros.length > 0 ? (
                                                <ul className="space-y-1.5 text-xs text-emerald-700 dark:text-emerald-400">
                                                    {item.pros.map((p, idx) => (
                                                        <li key={idx} className="flex items-start gap-1.5">
                                                            <Check size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                                                            <span>{typeof p === 'string' ? p : p.text}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <div className="text-center text-gray-400 dark:text-gray-500 text-xs flex items-center justify-center gap-1">
                                                    <ShieldCheck size={14} className="text-blue-500" /> Recomandare Top
                                                </div>
                                            )}
                                        </td>
                                    ))}
                                </tr>

                                {/* Rând CONS */}
                                <tr className="hover:bg-gray-50/50 dark:hover:bg-gray-800/20 transition">
                                    <td className="p-4 font-bold text-gray-700 dark:text-gray-300">Puncte Slabe (CON)</td>
                                    {compareItems.map(item => (
                                        <td key={item.id} className="p-4 align-top">
                                            {Array.isArray(item.cons) && item.cons.length > 0 ? (
                                                <ul className="space-y-1.5 text-xs text-rose-600 dark:text-rose-400">
                                                    {item.cons.map((c, idx) => (
                                                        <li key={idx} className="flex items-start gap-1.5">
                                                            <X size={14} className="text-rose-500 shrink-0 mt-0.5" />
                                                            <span>{typeof c === 'string' ? c : c.text}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <div className="text-center text-gray-400 dark:text-gray-500 text-xs">Fără minusuri majore</div>
                                            )}
                                        </td>
                                    ))}
                                </tr>

                                {/* Rând Verdict Editor */}
                                <tr className="hover:bg-gray-50/50 dark:hover:bg-gray-800/20 transition">
                                    <td className="p-4 font-bold text-gray-700 dark:text-gray-300">Verdict Editor</td>
                                    {compareItems.map(item => {
                                        const summary = item.reviewSummary || item.description || item.summary;
                                        return (
                                            <td key={item.id} className="p-4 text-gray-600 dark:text-gray-300 text-xs text-center leading-relaxed align-top">
                                                <p className="line-clamp-4" title={summary}>
                                                    {summary || "Garanția calității conform analizei noastre editoriale."}
                                                </p>
                                            </td>
                                        );
                                    })}
                                </tr>

                                {/* Rând Acțiune / Cumpără */}
                                <tr className="bg-gray-50/50 dark:bg-gray-900/50">
                                    <td className="p-4 font-bold text-gray-700 dark:text-gray-300">Ofertă Magazin</td>
                                    {compareItems.map(item => {
                                        const link = item.affiliateUrl || item.affiliateLink || item.affiliate_url || '#';
                                        return (
                                            <td key={item.id} className="p-4 text-center">
                                                <a
                                                    href={link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs px-4 py-2.5 rounded-xl transition shadow-md hover:shadow-emerald-600/20 w-full"
                                                >
                                                    <span>Vezi Prețul Actual</span>
                                                    <ExternalLink size={13} />
                                                </a>
                                            </td>
                                        );
                                    })}
                                </tr>

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default CompareBar;