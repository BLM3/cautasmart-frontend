import React from 'react';

function Privacy() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12 text-gray-800 bg-white shadow-sm rounded-lg my-6 dark:bg-gray-800 dark:text-gray-200 dark:shadow-none transition-colors duration-300">
            <h1 className="text-3xl font-black text-blue-900 mb-2 dark:text-blue-400">Politica de Confidențialitate</h1>
            <p className="text-sm text-gray-500 mb-8 dark:text-gray-400">Ultima actualizare: Iunie 2026 | Cautasmart.ro</p>

            <div className="space-y-6 text-justify">
                <p>
                    Protecția datelor dumneavoastră cu caracter personal este esențială pentru noi. Această politică explică transparent ce tip de informații sunt procesate
                    în timpul utilizării Cautasmart.ro și cum sunt acestea gestionate, în deplină conformitate cu Regulamentul General privind Protecția Datelor (UE 2016/679).
                </p>

                <section>
                    <h2 className="text-xl font-bold text-gray-900 border-l-4 border-green-600 pl-3 mb-3 dark:text-white dark:border-green-500">1. Date Colectate și Scopul Procesării</h2>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>
                            <strong>Date Tehnice și Anonime:</strong> În timpul navigării, serverul și instrumentele de analiză colectează automat date non-personale
                            (adresa IP parțial anonimizată, tipul browserului, paginile accesate, durata vizitei). Acestea sunt utilizate strict statistic pentru optimizarea performanței site-ului.
                        </li>
                        <li>
                            <strong>Stocare Locală (LocalStorage):</strong> Pentru a vă oferi funcționalitățile de personalizare, cum ar fi secțiunile „Favorite”, „Comparație produse”
                            sau „Vizualizate recent”, site-ul utilizează memoria locală a browserului dumneavoastră (LocalStorage). Aceste date <strong>rămân stocate exclusiv pe dispozitivul dumneavoastră</strong>,
                            nu sunt trimise și nu sunt salvate pe serverele Cautasmart.ro.
                        </li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-gray-900 border-l-4 border-green-600 pl-3 mb-3 dark:text-white dark:border-green-500">2. Module Cookie și Politica de Afiliere</h2>
                    <p>
                        Pentru a măsura performanța și a atribui corect comisioanele din afiliere, platforma noastră și rețelele partenere (cum este Profitshare) utilizează module cookie de urmărire comercială.
                        În momentul în care dați click pe un link de afiliere, un identificator numeric anonim este plasat temporar în browserul dumneavoastră (de regulă pentru o perioadă de 15-30 de zile).
                        Acest cookie <strong>nu colectează date personale sensibile</strong> (nume, e-mail, date bancare) și are unicul scop de a confirma rețelei de afiliere că vizitatorul a fost redirecționat de pe Cautasmart.ro.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-gray-900 border-l-4 border-green-600 pl-3 mb-3 dark:text-white dark:border-green-500">3. Drepturile Utilizatorilor (GDPR)</h2>
                    <p>
                        Deoarece Cautasmart.ro nu implementează sisteme de cont de utilizator, formulare de contact sau newslettere, noi nu colectăm și nu stocăm baze de date cu caracter personal (nume, prenume, e-mail).
                        Prin urmare, dreptul de ștergere sau modificare a datelor (dreptul de a fi uitat) se poate exercita în mod direct de către utilizator, prin simpla ștergere a datelor din LocalStorage
                        și a modulelor cookie din setările browserului folosit.
                    </p>
                </section>
            </div>
        </div>
    );
}

export default Privacy;