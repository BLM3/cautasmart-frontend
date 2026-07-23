import React from 'react';

function Footer({ setView,setShowFavorites }) {
    return (
        <footer className="w-full bg-gray-900 text-gray-400 py-8 border-t border-gray-800 mt-12 text-sm transition-colors duration-300 dark:bg-black dark:border-gray-900 dark:text-gray-500">
            <div className="max-w-7xl mx-auto px-4 flex flex-col gap-6">

                {/* Partea superioară existente: Brand, Copyright & Link-uri */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div>
                        <p className="font-bold text-white text-base dark:text-gray-300">Cautasmart.ro</p>
                        <p className="text-xs text-gray-500 mt-1 dark:text-gray-600">© {new Date().getFullYear()} Toate drepturile rezervate.</p>
                    </div>

                    <div className="flex flex-wrap gap-6">
                        <button
                            onClick={() => { setView('terms'); setShowFavorites(false); }}
                            className="hover:text-white transition-colors cursor-pointer"
                        >
                            Termeni și Condiții
                        </button>
                        <button
                            onClick={() => { setView('privacy'); setShowFavorites(false); }}
                            className="hover:text-white transition-colors cursor-pointer"
                        >
                            Politica de Confidențialitate
                        </button>
                        <button
                            onClick={() => { setView('about'); if(setShowFavorites) setShowFavorites(false); }}
                            className="hover:text-white transition-colors cursor-pointer"
                        >
                            Despre Noi / Contact
                        </button>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-xs text-gray-500">Link util:</span>
                        <a
                            href="https://reclamatiisal.anpc.ro/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:opacity-80 transition-opacity"
                        >https://reclamatiisal.anpc.ro/Portals/0/Images/anpc2.png?ver=mZNMrFLBGWE9G0-ZWbHY6g%3d%3d
                            <img
                                src=""
                                alt="Soluționarea Alternativă a Litigiilor"
                                className="h-8 w-auto rounded"
                                onError={(e) => {
                                    // Soluție de siguranță: dacă imaginea de pe CDN dă vreodată fail, se afișează un text stilizat în loc să se strice designul
                                    e.target.style.display = 'none';
                                    e.target.parentNode.innerHTML = '<span className="px-2 py-1 bg-gray-800 text-xs text-white rounded border border-gray-700">A.N.P.C. (S.A.L.)</span>';
                                }}
                            />
                        </a>
                    </div>
                </div>

                {/* 💡 NOU: Mesajul de Transparență și Afiliere (Cap 4.3.l & Cap 10.4) */}
                <div className="pt-4 border-t border-gray-800 dark:border-gray-900 text-xs text-gray-500 leading-relaxed dark:text-gray-600">
                    <p>
                        * <strong className="text-gray-400 dark:text-gray-500">Notă privind transparența:</strong> Cautasmart.ro participă la programe de marketing afiliat (inclusiv Profitshare).
                        Dacă apeși pe un link de produs și efectuezi o cumpărătură, este posibil să primim un mic comision, fără niciun cost suplimentar pentru tine.
                        Prețurile și disponibilitatea produselor sunt actualizate periodic, dar pot exista mici diferențe față de site-ul comerciantului partener.
                    </p>
                </div>

            </div>
        </footer>
    );
}

export default Footer;