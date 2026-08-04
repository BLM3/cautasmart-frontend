import './App.css';
import { Toaster } from 'react-hot-toast';
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import GuideList from './components/GuideList'; 
import Favorites from './components/Favorites';
import CompareBar from './components/CompareBar';
import Terms from "./components/Terms";
import Privacy from "./components/Privacy";
import About from "./components/About";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import CookieBanner from './components/CookieBanner';
import GuideDetail from './components/GuideDetail';

function App() {
    const [view, setView] = useState("home"); // "home", "guide_detail", "terms", "privacy", "about"
    const [selectedGuideSlug, setSelectedGuideSlug] = useState(null); // Păstrează ghidul selectat pentru vizualizare completă
    const [compareItems, setCompareItems] = useState([]);
    const [favorites, setFavorites] = useState(() => {
        const saved = localStorage.getItem("favorites");
        return saved ? JSON.parse(saved) : [];
    });
    const [showFavorites, setShowFavorites] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("All");

    // Scroll sus la schimbarea paginii sau vizualizării
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [view, showFavorites, selectedGuideSlug]);

    useEffect(() => {
        setView("home");
        setSelectedGuideSlug(null);
        setShowFavorites(false);
    }, [selectedCategory]);

    // Funcție ajutătoare pentru navigare la deschiderea unui ghid complet
    const openGuideDetail = (slug) => {
        setSelectedGuideSlug(slug);
        setShowFavorites(false);
        setView("guide_detail");
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 grid grid-rows-[auto_1fr_auto]">
            <header>
                <Toaster position="top-right" reverseOrder={false} />
                <Navbar
                    setShowFavorites={setShowFavorites}
                    favorites={favorites}
                    setView={(v) => {
                        setView(v);
                        if(v === "home") setSelectedCategory("All");
                    }}
                    isSidebarOpen={isSidebarOpen}
                    setIsSidebarOpen={setIsSidebarOpen}
                />
            </header>

            <div className="w-full flex flex-col md:flex-row gap-6 flex-grow">
                <Sidebar
                    isOpen={isSidebarOpen}
                    setIsOpen={setIsSidebarOpen}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    view={view}
                    onSelectGuide={setSelectedGuideSlug}
                />

                <div className="flex-grow pt-6 pb-12 px-4 max-w-[1400px] mx-auto w-full">
                    {showFavorites ? (
                        <Favorites
                            favorites={favorites}
                            setFavorites={setFavorites}
                            compareItems={compareItems}
                            setCompareItems={setCompareItems}
                        />
                    ) : (
                        <main>
                            {/* Lista principală de ghiduri și topuri */}
                            {view === "home" && (
                                <GuideList
                                    compareItems={compareItems}
                                    setCompareItems={setCompareItems}
                                    favorites={favorites}
                                    setFavorites={setFavorites}
                                    selectedCategory={selectedCategory}
                                    setSelectedCategory={setSelectedCategory}
                                    onSelectGuide={openGuideDetail}
                                />
                            )}

                            {/* Pagina de Ghid Complet (dacă nu folosești react-router-dom) */}
                            {view === "guide_detail" && selectedGuideSlug && (
                                <GuideDetail
                                    slug={selectedGuideSlug}
                                    onBack={() => setView("home")}
                                    compareItems={compareItems}
                                    setCompareItems={setCompareItems}
                                    favorites={favorites}
                                    setFavorites={setFavorites}
                                />
                            )}

                            {/* Paginile Statice */}
                            {view === "terms" && <Terms />}
                            {view === "privacy" && <Privacy />}
                            {view === "about" && <About />}
                        </main>
                    )}
                </div>
            </div>

            <div className="w-full">
                <CompareBar
                    compareItems={compareItems}
                    setCompareItems={setCompareItems}
                />
                <Footer setView={setView} setShowFavorites={setShowFavorites}/>
            </div>

            <CookieBanner />
        </div>
    );
}

export default App;