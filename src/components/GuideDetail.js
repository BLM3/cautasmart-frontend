import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { ArrowLeft, ExternalLink, CheckCircle, XCircle, Award, Tag, Scale } from 'lucide-react';
import ProductSkeleton from './ProductSkeleton';

export default function GuideDetail({ slug, onBack, setCompareItems, compareItems = [], setFavorites, favorites }) {
    const [guide, setGuide] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchedRef = useRef(false);

    useEffect(() => {
        if (fetchedRef.current) return;
        fetchedRef.current = true;

        const fetchGuideDetail = async () => {
            try {
                setLoading(true);
                const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:8080';
                const response = await axios.get(`${baseUrl}/api/v1/guides/${slug}`);
                setGuide(response.data);
            } catch (err) {
                console.error("Eroare la încărcarea ghidului:", err);
                setError("Nu s-au putut încărca detaliile ghidului.");
            } finally {
                setLoading(false);
            }
        };

        if (slug) {
            fetchGuideDetail();
        }
    }, [slug]);

    // Funcție pentru adăugarea/eliminarea produselor din CompareBar
    const toggleCompare = (item) => {
        if (!setCompareItems) return;

        const isAlreadyCompared = compareItems.some(c => c.id === item.id);

        if (isAlreadyCompared) {
            setCompareItems(compareItems.filter(c => c.id !== item.id));
        } else {
            if (compareItems.length >= 4) {
                alert("Poți compara maxim 4 produse simultan!");
                return;
            }

            // Adaptăm structura item-ului pentru a se potrivi cu CompareBar
            const normalizedItem = {
                id: item.id || `${guide.id}-${item.rank}`,
                name: item.productName || item.name,
                imageUrl: item.imageUrl,
                price: item.estimatedPrice,
                estimatedPrice: item.estimatedPrice,
                badge: item.badgeText,
                pros: item.pros,
                cons: item.cons,
                description: item.reviewSummary || item.description,
                affiliateLink: item.affiliateUrl || item.affiliateLink,
                affiliateUrl: item.affiliateUrl || item.affiliateLink
            };

            setCompareItems([...compareItems, normalizedItem]);
        }
    };

    if (loading) {
        return (
            <div className="max-w-4xl mx-auto py-8">
                <ProductSkeleton />
            </div>
        );
    }

    if (error || !guide) {
        return (
            <div className="text-center py-12">
                <p className="text-red-500 font-bold mb-4">{error || "Ghidul nu a fost găsit."}</p>
                <button
                    onClick={onBack}
                    className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition"
                >
                    Înapoi la ghiduri
                </button>
            </div>
        );
    }

    return (
        <article className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-3xl p-6 sm:p-10 shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-300">
            {/* Buton Înapoi */}
            <button
                onClick={onBack}
                className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline mb-6 group cursor-pointer"
            >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                <span>Înapoi la toate ghidurile</span>
            </button>

            {/* Header Ghid */}
            <header className="mb-8">
                <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 font-bold text-xs rounded-full uppercase tracking-wider border border-blue-100 dark:border-blue-800">
                        {guide.category}
                    </span>
                    <span className="text-xs text-gray-400 dark:text-gray-500">
                        Actualizat: {new Date(guide.updatedAt).toLocaleDateString('ro-RO')}
                    </span>
                </div>

                <h1 className="text-2xl sm:text-4xl font-black text-gray-900 dark:text-white leading-tight mb-4">
                    {guide.title}
                </h1>

                <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg leading-relaxed bg-gray-50 dark:bg-gray-700/50 p-4 rounded-2xl border-l-4 border-blue-600">
                    {guide.summary}
                </p>
            </header>

            {/* Banner Imagine (Opțional) */}
            {guide.bannerImageUrl && (
                <div className="w-full h-64 sm:h-96 rounded-2xl overflow-hidden mb-10 shadow-sm">
                    <img
                        src={guide.bannerImageUrl}
                        alt={guide.title}
                        className="w-full h-full object-cover"
                    />
                </div>
            )}

            {/* Lista cu Produse */}
            <section className="space-y-8 mb-12">
                <h2 className="text-xl font-black text-gray-900 dark:text-white flex items-center gap-2">
                    <Award className="text-blue-600" />
                    <span>Clasamentul Topului</span>
                </h2>

                {guide.items && guide.items.map((item) => {
                    const itemId = item.id || `${guide.id}-${item.rank}`;
                    const isCompared = compareItems.some(c => c.id === itemId || c.id === item.id);

                    return (
                        <div
                            key={itemId}
                            className="relative bg-gray-50 dark:bg-gray-700/40 rounded-2xl p-5 sm:p-7 border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-800 transition shadow-sm"
                        >
                            {/* Rank Badge */}
                            <div className="absolute -top-3 -left-3 bg-blue-600 text-white text-xs font-black px-3 py-1.5 rounded-xl shadow-md flex items-center gap-1">
                                <span>#{item.rank}</span>
                                {item.badgeText && <span className="opacity-80">| {item.badgeText}</span>}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center pt-2">
                                {/* Poza Produs */}
                                <div className="md:col-span-4 flex justify-center">
                                    <div className="w-48 h-48 bg-white dark:bg-gray-800 rounded-2xl p-3 flex items-center justify-center border border-gray-100 dark:border-gray-700 shadow-inner">
                                        <img
                                            src={item.imageUrl}
                                            alt={item.productName}
                                            className="max-h-full max-w-full object-contain hover:scale-105 transition-transform"
                                        />
                                    </div>
                                </div>

                                {/* Informații Produs */}
                                <div className="md:col-span-8 flex flex-col justify-between h-full">
                                    <div>
                                        <span className="text-xs font-bold text-gray-400 dark:text-gray-400 uppercase tracking-wider">
                                            {item.brand}
                                        </span>
                                        <h3 className="text-xl font-extrabold text-gray-900 dark:text-white mb-2">
                                            {item.productName}
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
                                            {item.reviewSummary}
                                        </p>
                                    </div>

                                    {/* Pros & Cons */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5 text-xs sm:text-sm">
                                        {item.pros && item.pros.length > 0 && (
                                            <div className="bg-emerald-50 dark:bg-emerald-950/30 p-3 rounded-xl border border-emerald-100 dark:border-emerald-900/40">
                                                <span className="font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1 mb-1.5">
                                                    <CheckCircle size={14} /> Puncte Tari:
                                                </span>
                                                <ul className="space-y-1 text-emerald-800 dark:text-emerald-300">
                                                    {item.pros.map((p, idx) => (
                                                        <li key={idx}>• {typeof p === 'string' ? p : p.text}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        {item.cons && item.cons.length > 0 && (
                                            <div className="bg-rose-50 dark:bg-rose-950/30 p-3 rounded-xl border border-rose-100 dark:border-rose-900/40">
                                                <span className="font-bold text-rose-700 dark:text-rose-400 flex items-center gap-1 mb-1.5">
                                                    <XCircle size={14} /> Puncte Slabe:
                                                </span>
                                                <ul className="space-y-1 text-rose-800 dark:text-rose-300">
                                                    {item.cons.map((c, idx) => (
                                                        <li key={idx}>• {typeof c === 'string' ? c : c.text}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>

                                    {/* Preț & Butoane (Afiliere + Comparație) */}
                                    <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-gray-200 dark:border-gray-600">
                                        <div>
                                            <span className="text-xs text-gray-400 block">Preț estimat:</span>
                                            <span className="text-xl font-black text-emerald-600 dark:text-emerald-400">
                                                {item.estimatedPrice ? `~${item.estimatedPrice} RON` : 'Verifică preț'}
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            {/* Buton Adaugă la Comparație */}
                                            {setCompareItems && (
                                                <button
                                                    onClick={() => toggleCompare({ ...item, id: itemId })}
                                                    className={`inline-flex items-center gap-1.5 font-bold py-2.5 px-3 sm:px-4 rounded-xl text-xs transition border ${
                                                        isCompared
                                                            ? 'bg-blue-50 dark:bg-blue-950 text-blue-600 border-blue-300 dark:border-blue-700'
                                                            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'
                                                    }`}
                                                    title="Adaugă în tabelul de comparație"
                                                >
                                                    <Scale size={15} className={isCompared ? "text-blue-600" : "text-gray-400"} />
                                                    <span>{isCompared ? 'Adăugat' : 'Compară'}</span>
                                                </button>
                                            )}

                                            {/* Buton Link Afiliat */}
                                            <a
                                                href={item.affiliateUrl || '#'}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs sm:text-sm shadow-sm transition"
                                            >
                                                <span>Vezi Oferta</span>
                                                <ExternalLink size={14} />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </section>

            {/* Ghid de Cumpărare */}
            {guide.buyingAdvice && (
                <section className="bg-blue-50/50 dark:bg-blue-950/20 p-6 sm:p-8 rounded-2xl border border-blue-100 dark:border-blue-900/40">
                    <h3 className="text-lg font-black text-blue-900 dark:text-blue-300 mb-3 flex items-center gap-2">
                        <Tag size={18} /> Ghid de Cumpărare & Sfaturi
                    </h3>
                    <div className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed space-y-2 whitespace-pre-line">
                        {guide.buyingAdvice}
                    </div>
                </section>
            )}
        </article>
    );
}