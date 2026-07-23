import React from 'react';

function Terms() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12 text-gray-800 bg-white shadow-sm rounded-lg my-6 dark:bg-gray-800 dark:text-gray-200 dark:shadow-none transition-colors duration-300">
            <h1 className="text-3xl font-black text-blue-900 mb-2 dark:text-blue-400">Termeni și Condiții de Utilizare</h1>
            <p className="text-sm text-gray-500 mb-8 dark:text-gray-400">Ultima actualizare: Iunie 2026 | Cautasmart.ro</p>

            <div className="space-y-6 text-justify">
                <p>
                    Prezentul document stabilește termenii și condițiile de utilizare ale site-ului <strong>Cautasmart.ro</strong>.
                    Prin accesarea și utilizarea acestui site, vă exprimați acordul deplin și necondiționat cu privire la prevederile menționate mai jos.
                </p>

                <section>
                    <h2 className="text-xl font-bold text-gray-900 border-l-4 border-blue-600 pl-3 mb-3 dark:text-white dark:border-blue-500">1. Natura Serviciilor</h2>
                    <p>
                        Cautasmart.ro funcționează exclusiv ca un agregator, platformă de recomandare și comparator de produse, prețuri și oferte online.
                        Cautasmart.ro <strong>NU este magazin online</strong>, NU comercializează direct produse, NU încasează plăți, NU procesează comenzi
                        și NU livrează bunuri. Întregul rol al platformei este de a facilita identificarea ofertelor și de a direcționa utilizatorii către comercianții autorizați.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-gray-900 border-l-4 border-blue-600 pl-3 mb-3 dark:text-white dark:border-blue-500">2. Funcționarea Afilierii și Link-urile Terțe</h2>
                    <p>
                        Platforma noastră conține link-uri de afiliere. Acest lucru înseamnă că în momentul în care utilizați butoanele de redirecționare
                        (precum „Vezi oferta”, „Cumpără acum”) și finalizați o achiziție pe site-ul magazinului partener (de exemplu, magazine din rețeaua Profitshare),
                        Cautasmart.ro poate încasa un comision procentual din valoarea vânzării. Această operațiune <strong>nu implică niciun cost suplimentar </strong>
                         sau nicio taxă ascunsă pentru dumneavoastră, prețul produsului rămânând neschimbat.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-gray-900 border-l-4 border-blue-600 pl-3 mb-3 dark:text-white dark:border-blue-500">3. Exonerarea de Răspundere</h2>
                    <p>
                        Informațiile afișate pe Cautasmart.ro (prețuri, stocuri, specificații tehnice, imagini) sunt preluate în mod automat sau manual prin intermediul
                        API-urilor oferite de rețelele de afiliere și magazinele partenere. Deși depunem eforturi constante pentru menținerea unei acurateți ridicate,
                        prețul și disponibilitatea finală valabile sunt cele afișate pe site-ul comerciantului în momentul finalizării comenzii. Cautasmart.ro nu își asumă
                        răspunderea pentru erori tehnice de sincronizare, modificări subite de preț sau politici de retur/livrare aplicate de magazinele terțe.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-gray-900 border-l-4 border-blue-600 pl-3 mb-3 dark:text-white dark:border-blue-500">4. Proprietate Intelectuală</h2>
                    <p>
                        Structura grafică, codul sursă, logo-ul și elementele de branding ale Cautasmart.ro sunt proprietatea exclusivă a deținătorilor site-ului.
                        Imaginile produselor, denumirile comerciale, logo-urile magazinelor partenere și descrierile bunurilor aparțin de drept respectivilor comercianți sau producători
                        și sunt utilizate strict în scop ilustrativ și informativ, sub umbrela relației de afiliere.
                    </p>
                </section>
            </div>
        </div>
    );
}

export default Terms;

