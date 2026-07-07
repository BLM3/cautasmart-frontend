import React from 'react';

function Sidebar({ isOpen, setIsOpen, selectedCategory, setSelectedCategory }) {
    // Aici pui categoriile tale de produse
    const categorii = [
        "Electrocasnice Mari & Mici",
        "Telefoane & Tablete",
        "Desktop, Laptopuri & IT",
        "Televizoare & Gadgeturi",
        "Frumusete & Ingrijire",
        "Articole Copii & Bebe",
        "Petshop"
    ];

    return (
        <>
            {/* BACKGROUND ÎNTUNECAT (Overlay) - Apare doar pe mobil când meniul e deschis pentru a bloca restul ecranului */}
            {isOpen && (
                <div className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* MENIUL LATERAL PROPRIU-ZIS */}
            <aside className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 pt-20 px-4 z-40 transition-transform duration-300 ease-in-out
                    ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                md:translate-x-0 md:sticky md:top-[72px] md:h-[calc(100vh-72px)] md:pt-4`}>
                <div className="flex justify-between items-center mb-6 md:hidden">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">Categorii</h2>
                    {/* Buton de închidere (X) doar pe mobil */}
                    <button onClick={() => setIsOpen(false)}
                        className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
                        X
                    </button>
                </div>

                <h2 className="hidden md:block text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-4">
                    Categorii Produse
                </h2>

                <nav className="space-y-1">
                    <button onClick={() => { setSelectedCategory("All");
                            if (window.innerWidth < 768) setIsOpen(false); }}
                        className={`w-full text-left px-3 py-2.5 text-sm font-medium rounded-lg transition-colors cursor-pointer block
                            ${selectedCategory === "All"
                            ? "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"}`}
                    >
                        Toate produsele
                    </button>
                    {categorii.map((cat, index) => {
                        const isSelected = selectedCategory === cat;
                        return (
                            <button key={index} onClick={() => { setSelectedCategory(cat);
                                    if (window.innerWidth < 768) setIsOpen(false); // Închide sidebar-ul pe mobil după selecție
                            }}
                                className={`w-full text-left px-3 py-2.5 text-sm font-medium rounded-lg transition-colors cursor-pointer block
                                    ${isSelected ? "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400" // Stil pentru categoria selectată
                                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"}`}
                            >
                                {cat}
                            </button>
                        );
                    })}
                </nav>
            </aside>
        </>
    );
}

export default Sidebar;