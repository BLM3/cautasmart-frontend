import React, { useState } from 'react';

function Sidebar({ isOpen, setIsOpen, selectedCategory, setSelectedCategory, view,onSelectGuide }) {

    // Stare pentru a urmări ce categorie principală este extinsă (deschisă)
    const [openCategory, setOpenCategory] = useState(null);

    const paginiFaraMeniu = ["terms", "privacy", "about"];
    if (paginiFaraMeniu.includes(view)) {
        return null;
    }

    // Structura de date ierarhică adaptată pentru Ghiduri și Topuri
    const categoriiIerarhice = [
        {
            nume: "Tech",
            subcategorii: [
                "Televizoare OLED & LED",
                "Telefoane Apple",
                "Tablete & E-readers",
                "Audio & Căști Bluetooth"
            ]
        },
        {
            nume: "Îngrijire Personală",
            subcategorii: [
                "Plăci de păr & Perii de îndreptat",
                "Uscătoare de păr",
                "Aparate de tuns",
                "Ondulatoare"
            ]
        },
        {
            nume: "Home",
            subcategorii: [
                "Aspiratoare Verticale",
                "Purificatoare",
                "Espressoare",
                "Electrocasnice Mari"
            ]
        },
        {
            nume: "Gaming",
            subcategorii: [
                "Monitoare Gaming",
                "Laptopuri & PC-uri",
                "Periferice & Scaune Gaming",
                "Console"
            ]
        },
        {
            nume: "Fitness",
            subcategorii: [
                "Ceasuri Smart & Brățări"
            ]
        },
        {
            nume: "Supraveghere & Securitate",
            subcategorii: [
                "Camere Supraveghere",
            ]
        },
        /*{
            nume: "Unelte & Bricolaj",
            subcategorii: [
                "Scule Cu Acumulator",
                "Generatoare & Energie Solară",
                "Echipamente Atelier"
            ]
        },*/
        {
            nume: "Bebeluși & Copii",
            subcategorii: [
                "Scaune Auto",
                /*"Monitorizare & Îngrijire",
                "Jucării & Educație",
                "Aparate & Hrănire Bebeluşi"*/
            ]
        },
        {
            nume: "Petshop & Animale",
            subcategorii: [
                "Aspiratoare & Păr Animale",
                "Ansamblu de joacă & Hrană",
                "Toalete Inteligente Pisici",
                "Accesorii & Îngrijire Animale"
            ]
        }
    ];

    // Funcție pentru comutarea vizibilității subcategoriilor
    const toggleSubmenu = (numeCategorie) => {
        setOpenCategory(openCategory === numeCategorie ? null : numeCategorie);
    };

    // Selectare categorie/subcategorie și închidere meniu pe mobil
    const handleSelectCategory = (categoryName) => {
        setSelectedCategory(categoryName);
        if (onSelectGuide) {
            onSelectGuide(null);
        }
        if (window.innerWidth < 768) {
            setIsOpen(false);
        }
    };

    return (
        <>
            {/* BACKGROUND ÎNTUNECAT (Overlay Mobile) */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* MENIUL LATERAL */}
            <aside className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 pt-20 px-4 z-40 transition-transform duration-300 ease-in-out overflow-y-auto
                    ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                md:translate-x-0 md:sticky md:top-[72px] md:h-[calc(100vh-72px)] md:pt-4`}>

                <div className="flex justify-between items-center mb-6 md:hidden">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">Categorii Ghiduri</h2>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                        ✕
                    </button>
                </div>

                <h2 className="hidden md:block text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-4">
                    Categorii Ghiduri
                </h2>

                <nav className="space-y-1 pb-6">
                    {/* Opțiunea "Toate ghidurile" */}
                    <button
                        onClick={() => handleSelectCategory("All")}
                        className={`w-full text-left px-3 py-2.5 text-sm font-medium rounded-lg transition-colors cursor-pointer block
                            ${selectedCategory === "All"
                            ? "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400 font-semibold"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"}`}
                    >
                        Toate ghidurile
                    </button>

                    {/* Meniul Categoriilor Ierarhice */}
                    {categoriiIerarhice.map((cat, index) => {
                        const isMainSelected = selectedCategory === cat.nume;
                        const isExpanded = openCategory === cat.nume;

                        return (
                            <div key={index} className="space-y-1">
                                {/* Categoria Principală */}
                                <div className="flex items-center justify-between">
                                    <button
                                        onClick={() => handleSelectCategory(cat.nume)}
                                        className={`w-full text-left px-3 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer flex-1
                                            ${isMainSelected
                                            ? "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400 font-semibold"
                                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"}`}
                                    >
                                        {cat.nume}
                                    </button>

                                    {/* Săgeată pentru expandare subcategorii */}
                                    {cat.subcategorii && cat.subcategorii.length > 0 && (
                                        <button
                                            onClick={() => toggleSubmenu(cat.nume)}
                                            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-lg"
                                            aria-label="Toggle submenu"
                                        >
                                            <svg
                                                className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>
                                    )}
                                </div>

                                {/* Lista Subcategoriilor (Apare doar dacă este deschisă) */}
                                {isExpanded && (
                                    <div className="pl-4 space-y-1 border-l-2 border-gray-100 dark:border-gray-700 ml-3">
                                        {cat.subcategorii.map((sub, subIndex) => {
                                            const isSubSelected = selectedCategory === sub;
                                            return (
                                                <button
                                                    key={subIndex}
                                                    onClick={() => handleSelectCategory(sub)}
                                                    className={`w-full text-left px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer block
                                                        ${isSubSelected
                                                        ? "text-blue-600 dark:text-blue-400 font-bold bg-blue-50/50 dark:bg-blue-950/20"
                                                        : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700/50"}`}
                                                >
                                                    {sub}
                                                </button>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </nav>
            </aside>
        </>
    );
}

export default Sidebar;