import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Heart, BarChart3, X, ExternalLink, BookOpen, Calendar, ArrowRight } from 'lucide-react';

function GuideCard({ guide, favorites = [], setFavorites, compareItems = [], setCompareItems, addToRecentlyViewed, onSelectGuide }) {
    // Identificator unic pentru Ghid
    const guideSlug = guide.slug || guide.id;

    // Stare locală pentru ghidul detaliat (încărcat la deschiderea modalului)
    const [detailedGuide, setDetailedGuide] = useState(guide);
    const [loadingDetails, setLoadingDetails] = useState(false);

    // Extragerea produsului cel mai bun (#1) din Ghid
    const currentItems = detailedGuide.items || guide.items || [];
    const topProduct = currentItems.length > 0
        ? (currentItems.find(item => item.rank === 1) || currentItems[0])
        : null;

    // Identificator unic pentru produsul selectat (Ghid ID + Produs ID)
    const compareId = topProduct ? `${guide.id}-${topProduct.id || topProduct.rank}` : guideSlug;

    // Verificăm dacă ghidul este salvat la Favorite sau dacă produsul #1 este în Comparare
    const isFavorite = favorites.some(item => (item.slug || item.id) === guideSlug);
    const isCompared = compareItems.some(item => item.id === compareId);

    const [imageLoaded, setImageLoaded] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    // Toggle pentru Favorite
    const toggleFavorite = (e) => {
        e.stopPropagation();
        if (isFavorite) {
            setFavorites(favorites.filter(item => (item.slug || item.id) !== guideSlug));
            toast('Ghid eliminat din favorite', { icon: '🗑️' });
        } else {
            setFavorites([...favorites, guide]);
            toast.success('Ghid salvat la favorite! ❤️');
        }
    };

    // Toggle pentru Comparare - SELECTEAZĂ AUTOMAT PRODUSUL #1
    const toggleCompare = (e) => {
        e.stopPropagation();

        if (!topProduct) {
            toast.error('Acest ghid nu are produse de comparat.');
            return;
        }

        if (isCompared) {
            setCompareItems(compareItems.filter(item => item.id !== compareId));
            toast('Produs eliminat din comparație', { icon: '🔄' });
        } else if (compareItems.length < 4) {
            // Construim obiectul de produs optimizat pentru CompareBar
            const payload = {
                id: compareId,
                productName: topProduct.productName || topProduct.name || topProduct.brand,
                name: topProduct.productName || topProduct.name || topProduct.brand,
                imageUrl: topProduct.imageUrl || guide.bannerImageUrl,
                estimatedPrice: topProduct.estimatedPrice || topProduct.price,
                badgeText: topProduct.badgeText || `Locul #1 în Top`,
                pros: topProduct.pros || [],
                cons: topProduct.cons || [],
                reviewSummary: topProduct.reviewSummary || topProduct.summary || guide.summary,
                affiliateUrl: topProduct.affiliateUrl || topProduct.affiliateLink,
                guideTitle: guide.title
            };

            setCompareItems([...compareItems, payload]);
            toast.success(`Adăugat: ${payload.productName} (#1 din Ghid)! 📊`);
        } else {
            toast.error('Poți compara maximum 4 produse simultan!');
        }
    };

    // Deschidere modal + încărcare automată a produselor din backend
    const handleOpenModal = async () => {
        setIsModalOpen(true);
        if (addToRecentlyViewed) {
            addToRecentlyViewed(guide);
        }

        // Dacă nu avem deja încărcate produsele din top, le cerem de la backend
        if (!detailedGuide.items || detailedGuide.items.length === 0) {
            try {
                setLoadingDetails(true);
                const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:8080';
                const response = await fetch(`${baseUrl}/api/v1/guides/${guideSlug}`);
                if (response.ok) {
                    const data = await response.json();
                    setDetailedGuide(data);
                }
            } catch (error) {
                console.error("Eroare la încărcarea detaliilor ghidului:", error);
            } finally {
                setLoadingDetails(false);
            }
        }
    };

    // Listă de imagini pentru preview
    const guideImages = guide.images && Array.isArray(guide.images) && guide.images.length > 0
        ? guide.images
        : guide.bannerImageUrl
            ? [guide.bannerImageUrl]
            : currentItems.length > 0
                ? currentItems.map(item => item.imageUrl).filter(Boolean)
                : ["https://placehold.co/400x250/e2e8f0/1e293b?text=Ghid+Cumparaturi"];

    const handlePrevImage = (e) => {
        e.stopPropagation();
        setActiveImageIndex((prev) => (prev === 0 ? guideImages.length - 1 : prev - 1));
    };

    const handleNextImage = (e) => {
        e.stopPropagation();
        setActiveImageIndex((prev) => (prev === guideImages.length - 1 ? 0 : prev + 1));
    };

    return (
        <>
            <div className="h-full bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col relative border border-gray-100 dark:border-gray-700/50 group">

                {/* HEADER CARD: BADGE CATEGORIE & FAVORITE/COMPARE */}
                <div className="p-2 sm:p-4 flex justify-between items-center gap-2 bg-gray-50/50 dark:bg-gray-900/20 border-b border-gray-100 dark:border-gray-700/30">
                    <div>
                        <span className="inline-block bg-blue-600 text-white text-[11px] font-extrabold px-2.5 py-1 rounded-md shadow-sm uppercase tracking-wider">
                            {guide.category || 'Ghid'}
                        </span>
                    </div>

                    {/* Butoane Favorite & Compare */}
                    <div className="flex items-center gap-2 sm:gap-3">
                        {setFavorites && (
                            <button
                                onClick={toggleFavorite}
                                className={`flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-xl border transition-all duration-200 hover:scale-105 active:scale-95 ${
                                    isFavorite
                                        ? 'bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-900/50 text-red-500'
                                        : 'bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-400 hover:text-red-500 dark:hover:text-red-400'
                                }`}
                                title="Adaugă ghidul la favorite"
                            >
                                <Heart
                                    size={16}
                                    className={`sm:size-5 transition-transform duration-200 ${isFavorite ? 'fill-current scale-105' : ''}`}
                                />
                            </button>
                        )}

                        {setCompareItems && (
                            <button
                                onClick={toggleCompare}
                                className={`flex h-8 px-2 sm:h-10 sm:px-3 items-center justify-center gap-1.5 rounded-xl text-[11px] sm:text-xs font-bold border transition-all duration-200 hover:scale-105 active:scale-95 ${
                                    isCompared
                                        ? 'bg-blue-600 border-blue-600 text-white shadow-sm'
                                        : 'bg-gray-200 border-transparent hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200'
                                }`}
                                title="Compară cel mai bun produs din acest ghid"
                            >
                                <BarChart3 size={14} className="sm:size-4" />
                                <span className="hidden xs:inline">{isCompared ? "Selectat" : "Compară #1"}</span>
                            </button>
                        )}
                    </div>
                </div>

                {/* IMAGINE BANNER */}
                <div onClick={handleOpenModal} className="w-full h-36 sm:h-48 bg-gray-100 dark:bg-gray-700/50 rounded-t-xl overflow-hidden flex items-center justify-center relative cursor-pointer">
                    {!imageLoaded && (
                        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 animate-pulse flex items-center justify-center">
                            <BookOpen className="h-8 w-8 text-gray-400 dark:text-gray-500" />
                        </div>
                    )}

                    <img
                        src={guideImages[0]}
                        alt={guide.title}
                        onLoad={() => setImageLoaded(true)}
                        className={`w-full h-full object-cover transition-opacity duration-500 ease-in-out group-hover:scale-105 transition-transform
                            ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                    />
                </div>

                {/* CONȚINUT CARD */}
                <div className="p-3 sm:p-5 flex flex-col flex-1 justify-between">
                    <div>
                        {/* Meta Data: Dată */}
                        <div className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-400 mb-2">
                            <Calendar size={13} />
                            <span>{guide.updatedAt ? new Date(guide.updatedAt).toLocaleDateString('ro-RO') : 'Recent'}</span>
                        </div>

                        {/* Titlu Ghid */}
                        <h2
                            onClick={handleOpenModal}
                            className="text-base sm:text-lg font-extrabold text-gray-900 dark:text-gray-100 leading-tight cursor-pointer hover:text-blue-600 transition-colors tracking-tight mb-2 line-clamp-2"
                        >
                            {guide.title}
                        </h2>

                        {/* Descriere / Summary Trunchiată */}
                        <div onClick={handleOpenModal} className="mt-1 flex-grow cursor-pointer mb-3">
                            <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm leading-relaxed inline">
                                {(() => {
                                    const summary = guide.summary && guide.summary.trim() !== ""
                                        ? guide.summary
                                        : "Ghid complet de cumpărături cu specificații și analiză detaliată.";

                                    const words = summary.split(/\s+/);
                                    const WORD_LIMIT = 12;

                                    if (words.length > WORD_LIMIT) {
                                        return (
                                            <>
                                                {words.slice(0, WORD_LIMIT).join(" ").replace(/[\s.]+$/, '')}
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); handleOpenModal(); }}
                                                    className="text-xs sm:text-sm font-extrabold text-blue-500 hover:text-blue-600 dark:text-blue-400 hover:underline inline ml-1 whitespace-nowrap"
                                                >
                                                    ...mai mult
                                                </button>
                                            </>
                                        );
                                    } else {
                                        return summary;
                                    }
                                })()}
                            </p>
                        </div>
                    </div>

                    {/* BUTON CĂTRE PAGINA DE DETALIU A GHIDULUI */}
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            const guideIdentifier = guide.slug || guide.id;
                            if (addToRecentlyViewed) addToRecentlyViewed(guide);
                            if (typeof onSelectGuide === 'function' && guideIdentifier) {
                                onSelectGuide(guideIdentifier);
                            }
                        }}
                        className="mt-3 text-center bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold transition shadow-sm flex items-center justify-center gap-1.5 w-full cursor-pointer"
                    >
                        <span>Citește Topul</span>
                        <ArrowRight size={15} />
                    </button>
                </div>
            </div>

            {/* POPUP / MODAL (QUICK VIEW) */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
                    <div className="absolute inset-0" onClick={() => setIsModalOpen(false)}></div>

                    <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative z-10 shadow-2xl flex flex-col md:flex-row border border-gray-100 dark:border-gray-700">

                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-3 right-3 sm:top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1.5 rounded-full bg-gray-100 dark:bg-gray-700 z-20 transition-colors"
                        >
                            <X size={18} />
                        </button>

                        {/* Stânga: Imagini Carousel */}
                        <div className="w-full md:w-1/2 bg-gray-50 dark:bg-gray-900/40 p-6 flex flex-col items-center justify-center min-h-[280px] sm:min-h-[380px] relative group/carousel">
                            {guideImages.length > 0 ? (
                                <div className="w-full h-full flex flex-col items-center justify-center relative">
                                    <img
                                        src={guideImages[activeImageIndex]}
                                        alt={guide.title}
                                        className="max-h-60 sm:max-h-72 md:max-h-80 object-contain rounded-lg select-none transition-all duration-300"
                                    />

                                    {guideImages.length > 1 && (
                                        <>
                                            <button
                                                onClick={handlePrevImage}
                                                className="absolute left-0 p-2 rounded-full bg-white/90 dark:bg-gray-800/90 text-gray-800 dark:text-gray-200 shadow-md hover:bg-white dark:hover:bg-gray-700 transition-all opacity-100 md:opacity-0 md:group-hover/carousel:opacity-100"
                                            >
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={handleNextImage}
                                                className="absolute right-0 p-2 rounded-full bg-white/90 dark:bg-gray-800/90 text-gray-800 dark:text-gray-200 shadow-md hover:bg-white dark:hover:bg-gray-700 transition-all opacity-100 md:opacity-0 md:group-hover/carousel:opacity-100"
                                            >
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </button>

                                            <div className="absolute bottom-[-12px] flex gap-1.5 justify-center mt-2">
                                                {guideImages.map((_, idx) => (
                                                    <button
                                                        key={idx}
                                                        onClick={(e) => { e.stopPropagation(); setActiveImageIndex(idx); }}
                                                        className={`h-2 rounded-full transition-all duration-300 ${idx === activeImageIndex ? 'w-5 bg-blue-600' : 'w-2 bg-gray-300 dark:bg-gray-600'}`}
                                                    />
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </div>
                            ) : (
                                <div className="text-gray-400 text-xs">Nicio imagine disponibilă</div>
                            )}
                        </div>

                        {/* Dreapta: Detalii Ghid */}
                        <div className="w-full md:w-1/2 p-5 sm:p-8 flex flex-col justify-between">
                            <div>
                                <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider block mb-1">
                                    {guide.category || "General"}
                                </span>
                                <h2 className="text-base sm:text-xl md:text-2xl font-black text-gray-900 dark:text-gray-50 mb-3 leading-snug">
                                    {guide.title}
                                </h2>

                                <h4 className="text-[11px] sm:text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1">Rezumat Ghid:</h4>
                                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed mb-4 whitespace-pre-line break-words">
                                    {guide.summary || "Niciun rezumat disponibil."}
                                </p>

                                {/* SECȚIUNEA APERITIV TOP (SE ÎNCARCĂ DINAMIC) */}
                                {loadingDetails ? (
                                    <div className="mt-4 p-4 text-center text-xs text-blue-600 dark:text-blue-400 font-semibold animate-pulse bg-blue-50 dark:bg-blue-950/30 rounded-xl">
                                        Se încarcă produsele din top...
                                    </div>
                                ) : detailedGuide.items && detailedGuide.items.length > 0 ? (
                                    <div className="mt-4">
                                        <h4 className="text-[11px] sm:text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">
                                            Aperitiv Top ({detailedGuide.items.length} {detailedGuide.items.length === 1 ? 'produs' : 'produse'}):
                                        </h4>
                                        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                                            {detailedGuide.items.map((item, idx) => (
                                                <div key={item.id || idx} className="flex items-center justify-between bg-gray-50 dark:bg-gray-900/40 p-2.5 rounded-xl text-xs border border-gray-100 dark:border-gray-700/50">
                                                    <div className="flex items-center gap-2 overflow-hidden">
                                                        <span className="font-extrabold text-blue-600 dark:text-blue-400 min-w-[20px]">#{item.rank || idx + 1}</span>
                                                        <span className="truncate font-semibold text-gray-800 dark:text-gray-200">
                                                            {item.productName || item.brand || item.name}
                                                        </span>
                                                    </div>
                                                    <span className="text-emerald-600 dark:text-emerald-400 font-bold ml-2 whitespace-nowrap">
                                                        {item.estimatedPrice ? `~${item.estimatedPrice} RON` : ''}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ) : null}
                            </div>

                            <div className="pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between gap-2 mt-6">
                                <button
                                    onClick={() => {
                                        setIsModalOpen(false);
                                        const guideIdentifier = guide.slug || guide.id;
                                        if (addToRecentlyViewed) addToRecentlyViewed(guide);
                                        if (typeof onSelectGuide === 'function' && guideIdentifier) {
                                            onSelectGuide(guideIdentifier);
                                        }
                                    }}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl text-sm font-bold transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 cursor-pointer"
                                >
                                    <span>Citește Topul Complet</span>
                                    <ExternalLink size={16} />
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            )}
        </>
    );
}

export default GuideCard;