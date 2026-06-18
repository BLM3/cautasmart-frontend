import './App.css';
import { Toaster } from 'react-hot-toast';
import React, {useState,useEffect} from 'react';
import Navbar from './components/Navbar';
import OfferList from './components/OfferList';
import Favorites from './components/Favorites';
import CompareBar from './components/CompareBar';
import Terms from "./components/Terms";
import Privacy from "./components/Privacy";
import Footer from "./components/Footer";

function App() {
    const [view, setView] = useState("home");
    const [compareItems,setCompareItems]=useState([]);
    const [favorites, setFavorites] = useState(() => {
        const saved = localStorage.getItem("favorites");
        return saved ? JSON.parse(saved) : [];
    });
    const [showFavorites, setShowFavorites] = useState(false);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [view, showFavorites]);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 grid grid-rows-[auto_1fr_auto]">
            <header>
                <Toaster position="top-right" reverseOrder={false} />
                <Navbar setShowFavorites={setShowFavorites} favorites={favorites} setView={setView}/>
            </header>
            <div className="w-full max-w-7xl mx-auto pt-6 pb-12 px-4">
                {showFavorites ? (
                        <Favorites
                            favorites={favorites}
                            setFavorites={setFavorites}
                            compareItems={compareItems}
                            setCompareItems={setCompareItems}
                        />
                ) : (
                    <main>
                        {/* 💡 Modificarea e aici: OfferList apare DOAR când view este "home" */}
                        {view === "home" && (
                            <OfferList
                                compareItems={compareItems}
                                setCompareItems={setCompareItems}
                                favorites={favorites}
                                setFavorites={setFavorites}
                            />
                        )}

                        {/* Paginile tale noi se vor deschide curat acum */}
                        {view === "terms" && <Terms />}
                        {view === "privacy" && <Privacy />}
                    </main>
                )}
            </div>
            <div className="w-full">
                <CompareBar
                    compareItems={compareItems}
                    setCompareItems={setCompareItems}
                />
                <Footer setView={setView} setShowFavorites={setShowFavorites}/>
            </div>
        </div>
      );
}

export default App;
