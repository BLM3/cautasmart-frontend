import React from 'react';

function Footer({ setView,setShowFavorites }) {
    return (
        <footer className="w-full bg-gray-900 text-gray-400 py-8 border-t border-gray-800 mt-12 text-sm transition-colors duration-300 dark:bg-black dark:border-gray-900 dark:text-gray-500">
            <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                    <p className="font-bold text-white text-base dark:text-gray-300">Cautasmart.ro</p>
                    <p className="text-xs text-gray-500 mt-1 dark:text-gray-600">© {new Date().getFullYear()} Toate drepturile rezervate.</p>
                </div>

                <div className="flex flex-wrap gap-6">
                    <button
                        onClick={() => {setView('terms');setShowFavorites(false);}}
                        className="hover:text-white transition-colors cursor-pointer"
                    >
                        Termeni și Condiții
                    </button>
                    <button
                        onClick={() => {setView('privacy');setShowFavorites(false);}}
                        className="hover:text-white transition-colors cursor-pointer"
                    >
                        Politica de Confidențialitate
                    </button>
                </div>
            </div>
        </footer>
    );
}

export default Footer;