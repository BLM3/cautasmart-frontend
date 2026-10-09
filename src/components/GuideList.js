import React, { useEffect, useState, useRef, useCallback } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { X, BookOpen } from 'lucide-react';
import GuideCard from './GuideCard';
import SearchBar from './SearchBar';
import FilterBar from './FilterBar';
import RecentlyViewed from './RecentlyViewed';
import ProductSkeleton from './ProductSkeleton';

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 110, damping: 16 }
    }
};

export default function GuideList({
                                      favorites,
                                      setFavorites,
                                      compareItems,
                                      setCompareItems,
                                      selectedCategory,
                                      setSelectedCategory,
                                      onSelectGuide
                                  }) {
    const [guides, setGuides] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    const [searchTerm, setSearchTerm] = useState(() => {
        const params = new URLSearchParams(window.location.search);
        return params.get('search') || '';
    });
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
    const [sortBy, setSortBy] = useState('');

    const [recentlyViewed, setRecentlyViewed] = useState(() => {
        const saved = localStorage.getItem("recentlyViewed");
        return saved ? JSON.parse(saved) : [];
    });

    // Intersection Observer pentru paginare
    const observer = useRef();
    const lastGuideElementRef = useCallback(node => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPage(prevPage => prevPage + 1);
            }
        });

        if (node) observer.current.observe(node);
    }, [loading, hasMore]);

    // 1. Debounce pentru căutare (500ms)
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 500);

        return () => clearTimeout(handler);
    }, [searchTerm]);

    // 2. Sincronizare parametri în URL
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);

        if (searchTerm) params.set('search', searchTerm);
        else params.delete('search');

        if (selectedCategory && selectedCategory !== 'All') params.set('category', selectedCategory);
        else params.delete('category');

        if (sortBy) params.set('sortBy', sortBy);
        else params.delete('sortBy');

        const newUrl = `${window.location.pathname}${params.toString() ? '?' + params.toString() : ''}`;
        window.history.pushState({ path: newUrl }, '', newUrl);
    }, [searchTerm, selectedCategory, sortBy]);

    // 3. Resetare listă DOAR la schimbarea filtrelor sau a termenului de căutare
    useEffect(() => {
        setGuides([]);
        setPage(0);
        setHasMore(true);
    }, [debouncedSearchTerm, selectedCategory, sortBy]);

    // 4. Salvare favorite în LocalStorage
    useEffect(() => {
        if (favorites) {
            localStorage.setItem("favorites", JSON.stringify(favorites));
        }
    }, [favorites]);

    // 5. Preluare ghiduri din Backend Java (/api/v1/guides)
    useEffect(() => {
        let isCancelled = false;

        const fetchGuides = async () => {
            try {
                setLoading(true);
                setError(null);

                const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:8080';

                let endpoint = `${baseUrl}/api/v1/guides`;
                if (debouncedSearchTerm) {
                    endpoint = `${baseUrl}/api/v1/guides/search`;
                }

                // Trimitem sortBy la backend ca 'sortBy'
                const response = await axios.get(endpoint, {
                    params: {
                        ...(debouncedSearchTerm ? { q: debouncedSearchTerm } : {}),
                        ...(selectedCategory && selectedCategory !== 'All' ? { category: selectedCategory } : {}),
                        page: page,
                        size: 10,
                        ...(sortBy ? { sortBy: sortBy } : {})
                    }
                });

                if (isCancelled) return;

                const dataArray = Array.isArray(response.data)
                    ? response.data
                    : (response.data && Array.isArray(response.data.content) ? response.data.content : []);

                const validDataArray = dataArray.filter(g => g && (g.id || g.slug || g.title));

                if (validDataArray.length === 0) {
                    setHasMore(false);
                } else {
                    setGuides(prevGuides => {
                        if (page === 0) return validDataArray;

                        const guidesMap = new Map(prevGuides.map(g => [g.id || g.slug, g]));
                        validDataArray.forEach(newGuide => {
                            guidesMap.set(newGuide.id || newGuide.slug, newGuide);
                        });
                        return Array.from(guidesMap.values());
                    });

                    if (response.data && response.data.last === true) {
                        setHasMore(false);
                    }
                }
            } catch (err) {
                if (!isCancelled) {
                    setError("Nu s-au putut încărca ghidurile și topurile.");
                    console.error("Eroare la preluarea ghidurilor:", err);
                }
            } finally {
                if (!isCancelled) {
                    setLoading(false);
                }
            }
        };

        fetchGuides();

        return () => {
            isCancelled = true;
        };
    }, [page, debouncedSearchTerm, selectedCategory, sortBy]);

    // Adăugare în recent vizionate
    const addToRecentlyViewed = (guide) => {
        setRecentlyViewed(prevItems => {
            const filtered = prevItems.filter(item => {
                const sameId = guide.id && item.id === guide.id;
                const sameSlug = guide.slug && item.slug === guide.slug;
                return !sameId && !sameSlug;
            });
            const updated = [guide, ...filtered].slice(0, 6);
            localStorage.setItem("recentlyViewed", JSON.stringify(updated));
            return updated;
        });
    };

    // Extragere dinamică a categoriilor de ghiduri
    const dynamicCategories = React.useMemo(() => {
        if (!guides || guides.length === 0) return ['All'];
        const extractedCategories = guides.map(g => g.category).filter(Boolean);
        return ['All', ...new Set(extractedCategories)];
    }, [guides]);

    return (
        <div className="px-4 max-w-7xl mx-auto">
            {/* Căutare Ghiduri */}
            <SearchBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                setPage={setPage}
                placeholder="Caută un ghid sau top (ex: televizoare OLED, laptopuri)..."
            />

            {/* Bara de Filtre */}
            <FilterBar
                category={selectedCategory}
                setCategory={setSelectedCategory}
                sortBy={sortBy}
                setSortBy={setSortBy}
                setPage={setPage}
                availableCategories={dynamicCategories}
            />

            {/* Pastile Filtre Active */}
            {(searchTerm || sortBy) && (
                <div className="flex flex-wrap gap-2 my-4 items-center max-w-3xl mx-auto">
                    <span className="text-xs font-semibold text-gray-400 dark:text-gray-500 mr-1">
                        Filtre active:
                    </span>

                    {searchTerm && (
                        <div className="flex items-center gap-1.5 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full text-xs font-medium border border-blue-100 dark:border-blue-900/50">
                            <span>Căutare: "{searchTerm}"</span>
                            <button
                                onClick={() => { setSearchTerm(''); setPage(0); }}
                                className="hover:bg-blue-100 dark:hover:bg-blue-900 p-0.5 rounded-full transition-colors"
                            >
                                <X size={12} />
                            </button>
                        </div>
                    )}

                    {sortBy && (
                        <div className="flex items-center gap-1.5 bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 px-3 py-1 rounded-full text-xs font-medium border border-amber-100 dark:border-amber-900/50">
                            <span>Sortare activă</span>
                            <button
                                onClick={() => { setSortBy(''); setPage(0); }}
                                className="hover:bg-amber-100 dark:hover:bg-amber-900 p-0.5 rounded-full transition-colors"
                            >
                                <X size={12} />
                            </button>
                        </div>
                    )}

                    <button
                        onClick={() => {
                            setSearchTerm('');
                            setSortBy('');
                            setPage(0);
                        }}
                        className="text-xs font-bold text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 ml-2 hover:underline transition-colors"
                    >
                        Resetează tot
                    </button>
                </div>
            )}

            {/* Skeletons la prima încărcare */}
            {guides.length === 0 && loading && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 my-6">
                    {Array.from({ length: 6 }).map((_, idx) => (
                        <ProductSkeleton key={idx} />
                    ))}
                </div>
            )}

            {error && <p className="text-red-500 text-center my-8">{error}</p>}

            {guides.length === 0 && !loading && !error && (
                <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                    <BookOpen className="mx-auto h-12 w-12 mb-3 text-gray-400" />
                    <p className="text-lg font-medium">Nu s-a găsit niciun ghid sau top pentru căutarea ta.</p>
                </div>
            )}

            {/* Grila Animatǎ cu Carduri de Ghid */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                key={`${debouncedSearchTerm}-${selectedCategory}-${sortBy}`}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 items-stretch my-6"
            >
                {guides.map((guide, index) => {
                    const isLast = guides.length === index + 1;
                    return (
                        <motion.div
                            variants={itemVariants}
                            ref={isLast ? lastGuideElementRef : null}
                            key={`${guide.id || guide.slug || 'guide'}-${index}`}
                        >
                            <GuideCard
                                guide={guide}
                                favorites={favorites}
                                setFavorites={setFavorites}
                                compareItems={compareItems}
                                setCompareItems={setCompareItems}
                                addToRecentlyViewed={addToRecentlyViewed}
                                onSelectGuide={onSelectGuide}
                            />
                        </motion.div>
                    );
                })}
            </motion.div>

            {/* Spinner pentru infinit scroll */}
            {loading && guides.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 my-6">
                    {Array.from({ length: 3 }).map((_, idx) => (
                        <ProductSkeleton key={idx} />
                    ))}
                </div>
            )}

            {/* Mesaj de final */}
            {!hasMore && guides.length > 0 && (
                <p className="text-center text-gray-400 dark:text-gray-500 my-10 italic font-medium">
                    Ai parcurs toate ghidurile și topurile din această secțiune! 📖
                </p>
            )}

            {/* Secțiunea Vizionate Recent */}
            <RecentlyViewed items={recentlyViewed} />
        </div>
    );
}