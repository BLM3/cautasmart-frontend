import React from 'react';

function Privacy() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12 text-gray-800 bg-white shadow-sm rounded-lg my-6 dark:bg-gray-800 dark:text-gray-200 dark:shadow-none transition-colors duration-300">
            <h1 className="text-3xl font-black text-blue-900 mb-2 dark:text-blue-400">Politica de Confidențialitate</h1>
            <p className="text-sm text-gray-500 mb-8 dark:text-gray-400">Ultima actualizare: August 2026 | Cautasmart.ro</p>

            <div className="space-y-6 text-justify">
                <p>
                    Protecția datelor dumneavoastră cu caracter personal este o prioritate pentru noi. Această politică explică transparent ce tip de informații sunt procesate
                    în timpul utilizării platformei editoriale <strong>Cautasmart.ro</strong> și cum sunt acestea gestionate, în deplină conformitate cu Regulamentul General privind Protecția Datelor (UE 2016/679 - GDPR).
                </p>

                <section>
                    <h2 className="text-xl font-bold text-gray-900 border-l-4 border-green-600 pl-3 mb-3 dark:text-white dark:border-green-500">1. Date Colectate și Scopul Procesării</h2>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>
                            <strong>Date Tehnice și Anonime:</strong> În timpul lecturării ghidurilor și topurilor noastre, serverul și instrumentele de analiză colectează automat date non-personale
                            (adresa IP parțial anonimizată, tipul browserului, paginile/ghidurile vizualizate, durata vizitei). Acestea sunt utilizate strict în scop statistic și pentru optimizarea performanței site-ului.
                        </li>
                        <li>
                            <strong>Stocare Locală (LocalStorage):</strong> Pentru a vă oferi o experiență facilă de navigare prin ghidurile noastre — cum ar fi păstrarea ghidurilor la „Favorite”, modul de „Comparație produse”
                            sau lista de „Ghiduri vizualizate recent” —, site-ul utilizează memoria locală a browserului dumneavoastră (LocalStorage). Aceste preferințe <strong>rămân stocate exclusiv pe dispozitivul dumneavoastră</strong> și nu sunt trimise către serverele Cautasmart.ro.
                        </li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-gray-900 border-l-4 border-green-600 pl-3 mb-3 dark:text-white dark:border-green-500">2. Module Cookie și Marketingul de Afiliere</h2>
                    <p>
                        Pentru a măsura performanța recomandărilor editoriale și a atribui corect comisioanele din afiliere, platforma noastră și partenerii tehnici (cum sunt rețelele de afiliere) utilizează module cookie de urmărire comercială.
                        În momentul în care doriți să verificați oferta unui produs recomandaț și dați click pe un link extern (ex: „Vezi oferta”, „Verifică prețul”), un identificator numeric anonim este plasat temporar în browserul dumneavoastră (de regulă pentru o perioadă de 15-30 de zile).
                    </p>
                    <p className="mt-2">
                        Acest cookie <strong>nu colectează date personale sensibile</strong> (nume, e-mail, date bancare sau de card) și are unicul scop de a confirma magazinului partener că vizita a fost redirecționată în urma lecturării unui ghid de pe Cautasmart.ro.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-gray-900 border-l-4 border-green-600 pl-3 mb-3 dark:text-white dark:border-green-500">3. Drepturile Utilizatorilor (GDPR)</h2>
                    <p>
                        Deoarece Cautasmart.ro este un site de conținut și ghiduri care nu solicită crearea unui cont de utilizator și nu colectează baze de date cu nume sau adrese de e-mail, noi nu stocăm date cu caracter personal direct identificabile.
                    </p>
                    <p className="mt-2">
                        Puteți gestiona sau șterge în orice moment datele salvate în propriul browser (precum lista de favorite, istoricul local sau cookie-urile de afiliere) accesând setările de confidențialitate ale browserului pe care îl utilizați.
                    </p>
                </section>
            </div>
        </div>
    );
}

export default Privacy;