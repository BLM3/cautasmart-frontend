import React,{useState} from 'react';
import toast from 'react-hot-toast';
import { Heart, BarChart3, X, ExternalLink } from 'lucide-react';
function ProductCard({ offer,favorites=[],setFavorites,compareItems=[],setCompareItems,addToRecentlyViewed }) {

    const isFavorite=favorites.some(item=>item.id===offer.id);
    const isCompared=compareItems.some(item=>item.id===offer.id);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    const isAvailable = offer.inStock !== false;

    const toggleFavorite=()=>{
        if(isFavorite){
            setFavorites(favorites.filter(item=>item.id !==offer.id));
            toast('Produs eliminat din favorite', { icon: '🗑️' });
        }else{
            setFavorites([...favorites,offer]);
            toast.success('Adăugat la favorite! ❤️');
        }
    }
    const toggleCompare=()=>{
        if(isCompared){
            setCompareItems(compareItems.filter(item=>item.id !==offer.id));
            toast('Produs eliminat din comparație', { icon: '🔄' });
        }else if(compareItems.length<5){
            setCompareItems([...compareItems,offer]);
            toast.success('Adăugat la lista de comparație! 📊');
        }else {
            toast.error('Poți compara maximum 5 produse simultan!');
        }
    }
    const handleOpenModal = () => {
        setIsModalOpen(true);
        if (addToRecentlyViewed) {
            addToRecentlyViewed(offer);
        }
    };
    const productImages = offer.images && Array.isArray(offer.images) && offer.images.length > 0
        ? offer.images
        : offer.imageUrl ? [offer.imageUrl] : [];

    const handlePrevImage = (e) => {
        e.stopPropagation();
        setActiveImageIndex((prev) => (prev === 0 ? productImages.length - 1 : prev - 1));
    };

    const handleNextImage = (e) => {
        e.stopPropagation();
        setActiveImageIndex((prev) => (prev === productImages.length - 1 ? 0 : prev + 1));
    };
    return (
        <>
        <div className="h-full bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col relative border border-gray-100 dark:border-gray-700/50">
            <div className="p-2 sm:p-4 flex justify-between items-center gap-2 bg-gray-50/50 dark:bg-gray-900/20 border-b border-gray-100 dark:border-gray-700/30">
                {/* BADGE TOP RECOMANDAT*/}
                <div>
                    {!isAvailable ? (
                        <span className="inline-block bg-gray-500 text-white text-[11px] font-bold px-2 py-0.5 rounded-md uppercase">
                                Stoc Epuizat
                            </span>
                    ) : offer.rating >= 4.5 ? (
                        <span className="inline-block bg-amber-500 text-white text-[13px] font-extrabold px-2 py-0.5 rounded-md shadow-sm uppercase tracking-wider">
                                ⭐ Top
                            </span>
                    ) : (<div className="w-10 h-4"></div>)}
                </div>

                {/*favorites & compare*/}
                <div className="flex items-center gap-2 sm:gap-3">
                    <button
                        onClick={toggleFavorite}
                        className={`flex h-8 w-8 sm:h-11 sm:w-11 items-center justify-center rounded-xl border transition-all duration-200 hover:scale-105 active:scale-95 ${
                            isFavorite
                                ? 'bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-900/50 text-red-500'
                                : 'bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-400 hover:text-red-500 dark:hover:text-red-400'
                        }`}
                        title="Adaugă la favorite"
                    >
                        <Heart
                            size={16}
                            className={`sm:size-6 transition-transform duration-200 ${isFavorite ? 'fill-current scale-105' : ''}`}
                        />
                    </button>
                    <button
                        onClick={toggleCompare}
                        className={`flex h-8 px-2 sm:h-11 sm:px-4 items-center justify-center gap-1.5 rounded-xl text-[11px] sm:text-sm font-bold border transition-all duration-200 hover:scale-105 active:scale-95 ${
                            isCompared
                                ? 'bg-blue-600 border-blue-600 text-white shadow-sm'
                                : 'bg-gray-200 border-transparent hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200'
                        }`}
                    >
                        <BarChart3 size={14} className="sm:size-5" />
                        <span className="hidden xs:inline">{isCompared ? "Selectat" : "Compară"}</span>
                    </button>
                </div>
            </div>
            {/* IMAGE CONTAINER FIX */}
            <div onClick={handleOpenModal} className="w-full h-32 sm:h-48 bg-gray-200 dark:bg-gray-700/50 rounded-t-xl overflow-hidden flex items-center justify-center relative">
                {!imageLoaded && (
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 animate-pulse flex items-center justify-center">
                        {/* O mică iconiță de imagine palidă pe fundal ca placeholder vizual */}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 002-2H4a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                )}

                {/* Imaginea efectivă */}
                <img
                    src={offer.imageUrl || 'https://via.placeholder.com/150'}
                    alt={offer.name}
                    onLoad={() => setImageLoaded(true)} // Declanșează starea când browserul a terminat descărcarea
                    /* Dacă e încărcată aplicăm opacitate 100%, dacă nu, e ascunsă (opacitate 0) pentru o tranziție fluidă */
                    className={`w-full h-full object-contain p-2 transition-opacity duration-500 ease-in-out hover:scale-105 transition-transform
            ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                />
            </div>
            {/* CONTENT */}
            <div className="p-3 sm:p-5 flex flex-col flex-1 justify-between">
                {/* Titlu produs (Click deschide popup-ul) */}
                <h2 className="text-xm sm:text-xl font-extrabold text-gray-900 dark:text-gray-100 leading-tight cursor-pointer hover:text-blue-600 transition-colors tracking-tight mb-2 h-auto">
                    {offer.name}
                </h2>
                {/* Descriere trunchiată */}
                <div onClick={handleOpenModal} className="mt-2 flex-grow min-h-[3rem] text-sm sm:text-base cursor-pointer mb-2">
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed inline">
                        {(() => {
                            const description = offer.description && offer.description.trim() !== ""
                                ? offer.description
                                : "Nicio descriere disponibilă pentru acest produs premium.";

                            // --- 💡 Logică de tăiere inteligentă la nivel de cuvinte ---
                            const words = description.split(/\s+/); // Împărțim textul în cuvinte
                            const WORD_LIMIT = 13; // Limita de cuvinte (aproximativ 2 rânduri de text mare)

                            if (words.length > WORD_LIMIT) {
                                // Dacă textul e mai lung, tăiem și lipim butonul în continuarea textului
                                return (
                                    <>{words.slice(0, WORD_LIMIT).join(" ").replace(/[\s.]+$/, '')}
                                        <button onClick={(e) => { e.stopPropagation(); handleOpenModal(); }}
                                            className="text-sm sm:text-base font-extrabold text-blue-500 hover:text-blue-600 dark:text-blue-400 hover:underline inline ml-1 whitespace-nowrap"> ...more
                                        </button>
                                    </>
                                );
                            } else {// Dacă e scurt, arătăm textul complet fără buton
                                return description;
                            }
                        })()}
                    </p>
                </div>
                {/* PRICE + RATING */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1 mt-2 sm:mt-4 w-full min-h-[2.5rem] sm:min-h-[3.5rem]">

                    <div className="flex flex-col justify-end min-h-[2rem] sm:min-h-[2.5rem]">
                        {/* Prețul vechi tăiat (apare doar dacă există o reducere reală) */}
                        {offer.oldPrice && offer.oldPrice > 0 && offer.oldPrice > offer.price ? (
                            <span className="text-xs sm:text-sm text-gray-400 dark:text-gray-500 line-through font-medium-tight">
                                {offer.oldPrice} {offer.currency}
                             </span>
                        ) : (<div className="text-xs sm:text-sm h-4"></div>)}

                        {/* Prețul actual */}
                        <span className="text-sm sm:text-xl font-extrabold text-green-600 dark:text-green-400 flex items-center gap-2">
                            {offer.price} {offer.currency}

                            {/* Badge procent reducere - calculat doar dacă prețul vechi este valid */}
                            {offer.oldPrice && offer.oldPrice > 0 && offer.oldPrice > offer.price ? (
                                <span className="text-[10px] sm:text-xs font-bold bg-red-100 text-red-600 dark:bg-red-950/40 dark:text-red-400 px-1.5 py-0.5 rounded-md animate-pulse">
                                    -{Math.round(((offer.oldPrice - offer.price) / offer.oldPrice) * 100)}%
                                </span>
                            ) : null}
                         </span>
                    </div>

                    {/* Rating-ul rămâne la locul lui */}
                    <span className="text-yellow-500 font-bold bg-yellow-50 dark:bg-yellow-950/30 px-1.5 py-0.5 rounded-lg text-[10px] sm:text-sm whitespace-nowrap self-end sm:self-center">
                        ⭐ {offer.rating}
                    </span>
                </div>
                {/* AFFILIATE BUTTON */}
                {isAvailable ? (
                    <a
                        href={offer.affiliateLink}
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                        title="Redirecționare către magazinul partener"
                        onClick={() => { if (addToRecentlyViewed) addToRecentlyViewed(offer); }}
                        className="mt-3 text-center bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold transition shadow-sm block"
                    >
                        Vezi oferta ➔
                    </a>
                ) : (
                    <button
                        disabled
                        className="mt-3 text-center bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold cursor-not-allowed block w-full"
                    >
                        Indisponibil
                    </button>
                )}
            </div>
        </div>
            {/* --- POPUP / MODAL --- */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
                    <div className="absolute inset-0" onClick={() => setIsModalOpen(false)}></div>

                    <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative z-10 shadow-2xl flex flex-col md:flex-row border border-gray-100 dark:border-gray-700">

                        {/* Buton Închidere */}
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-3 right-3 sm:top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1.5 rounded-full bg-gray-100 dark:bg-gray-700 z-20 transition-colors"
                        >
                            <X size={18} />
                        </button>

                        {/* Stânga: Imagine */}
                        <div className="w-full md:w-1/2 bg-gray-50 dark:bg-gray-900/40 p-6 flex flex-col items-center justify-center min-h-[280px] sm:min-h-[380px] relative group/carousel">
                            {/*<img src={offer.imageUrl} alt={offer.name} className="max-h-60 object-contain rounded-lg" />*/}

                            {productImages.length > 0 ? (
                                <div className="w-full h-full flex flex-col items-center justify-center relative">
                                    {/* Imaginea activă curentă */}
                                    <img
                                        src={productImages[activeImageIndex]}
                                        alt={offer.images && Array.isArray(offer.images) && offer.images.length>0?(`${offer.name} - ${activeImageIndex + 1}`):(`${offer.name}`)}
                                        className="max-h-60 sm:max-h-72 md:max-h-80 object-contain rounded-lg select-none transition-all duration-300"
                                    />

                                    {/* Navigație tip Săgeți (Se afișează doar dacă sunt mai multe imagini în array) */}
                                    {productImages.length > 1 && (
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

                                            {/* Dots (Puncte de indexare plasate discret la baza imaginii) */}
                                            <div className="absolute bottom-[-12px] flex gap-1.5 justify-center mt-2">
                                                {productImages.map((_, idx) => (
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

                        {/* Dreapta: Detalii */}
                        <div className="w-full md:w-1/2 p-5 sm:p-8 flex flex-col justify-between">
                            <div>
                                <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider block mb-1">
                                    {offer.category || "General"}
                                </span>
                                <h2 className="text-base sm:text-xl md:text-2xl font-black text-gray-900 dark:text-gray-50 mb-3 leading-snug">
                                    {offer.name}
                                </h2>

                                <div className="flex items-center gap-2 mb-4">
                                    <span className="text-yellow-500 font-bold text-xs sm:text-sm">⭐ {offer.rating}</span>
                                    <span className="text-[15px] text-gray-400 dark:text-gray-500">(Recenzii eMAG)</span>
                                </div>

                                <h4 className="text-[11px] sm:text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1">Descriere Completă:</h4>
                                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed mb-6 whitespace-pre-line break-words">
                                    {offer.description && offer.description.trim() !== "" ? offer.description : "Nicio descriere completă disponibilă."}
                                </p>
                            </div>

                            {/* Footer Popup (Fără nofollow) */}
                            <div className="pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between gap-2">
                                <div>
                                    <span className="block text-[15px] text-gray-400">Preț pe eMAG:</span>
                                    <span className="text-base sm:text-2xl font-black text-green-600 dark:text-green-400 whitespace-nowrap">
                                        {offer.price} {offer.currency}
                                    </span>
                                </div>

                                {isAvailable ? (
                                    <a
                                        href={offer.affiliateLink}
                                        target="_blank"
                                        rel="noopener noreferrer sponsored"
                                        className="w-full sm:w-auto justify-center bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl text-sm font-bold transition-colors flex items-center gap-1.5 shadow-md shadow-blue-500/10 whitespace-nowrap"
                                    >
                                        Cumpără acum <ExternalLink size={14} />
                                    </a>
                                ) : (
                                    <button disabled className="bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 px-5 py-3 rounded-xl text-sm font-bold cursor-not-allowed">
                                        Stoc epuizat
                                    </button>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            )}
        </>
    );
}

export default ProductCard;