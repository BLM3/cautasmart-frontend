import React from 'react';

function Terms() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12 text-gray-800 bg-white shadow-sm rounded-lg my-6 dark:bg-gray-800 dark:text-gray-200 dark:shadow-none transition-colors duration-300">
            <h1 className="text-3xl font-black text-blue-900 mb-2 dark:text-blue-400">Termeni și Condiții de Utilizare</h1>
            <p className="text-sm text-gray-500 mb-8 dark:text-gray-400">Ultima actualizare: August 2026 | Cautasmart.ro</p>

            <div className="space-y-6 text-justify">
                <p>
                    Prezentul document stabilește termenii și condițiile de utilizare ale site-ului <strong>Cautasmart.ro</strong>.
                    Prin accesarea și utilizarea acestui site, vă exprimați acordul deplin și necondiționat cu privire la prevederile menționate mai jos.
                </p>

                <section>
                    <h2 className="text-xl font-bold text-gray-900 border-l-4 border-blue-600 pl-3 mb-3 dark:text-white dark:border-blue-500">1. Natura Serviciilor</h2>
                    <p>
                        Cautasmart.ro funcționează exclusiv ca o **platformă editorială independentă de ghiduri de cumpărături, analize, recomandări și topuri de produse**.
                        Cautasmart.ro <strong>NU este magazin online și NU este un agregator automat de produse</strong>. Noi nu comercializăm direct produse, NU încasează plăți, NU procesăm comenzi
                        și NU livrăm bunuri. Scopul conținutului nostru este de a oferi informații utile, opinii editoriale și analize obiective pentru a ajuta utilizatorii să facă alegeri informate înainte de a achiziționa produse de la comercianții autorizați.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-gray-900 border-l-4 border-blue-600 pl-3 mb-3 dark:text-white dark:border-blue-500">2. Declinarea Responsabilității privind Marketingul de Afiliere</h2>
                    <p>
                        Articolele și ghidurile noastre conțin link-uri de afiliere. În momentul în care utilizați butoanele de redirecționare (precum „Vezi oferta”, „Verifică prețul”)
                        și efectuați o achiziție pe site-ul unui magazin partener, Cautasmart.ro poate primi un mic comision din valoarea vânzării.
                        Această operațiune <strong>nu implică niciun cost suplimentar</strong> sau nicio taxă ascunsă pentru dumneavoastră, prețul produsului fiind identic cu cel direct din magazinul respectiv.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-gray-900 border-l-4 border-blue-600 pl-3 mb-3 dark:text-white dark:border-blue-500">3. Exonerarea de Răspundere</h2>
                    <p>
                        Ghidurile și recenziile noastre reflectă opinia editorială independentă a autorilor. Prețurile estimate, specificațiile tehnice și disponibilitatea produselor menționate în ghiduri au caracter orientativ și sunt valabile la momentul redactării sau actualizării articolului.
                        Prețul final, stocul și condițiile de garanție/livrare aplicabile sunt exclusiv cele afișate pe site-ul comerciantului în momentul plasării comenzii. Cautasmart.ro nu își asumă răspunderea pentru modificările ulterioare efectuate de magazinele partenere.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-bold text-gray-900 border-l-4 border-blue-600 pl-3 mb-3 dark:text-white dark:border-blue-500">4. Proprietate Intelectuală</h2>
                    <p>
                        Conținutul text (ghidurile, articolele, structura topurilor), elementele grafice, logo-ul și codul sursă ale Cautasmart.ro sunt protejate de drepturile de autor și aparțin deținătorilor site-ului.
                        Este interzisă copierea, reproducerea sau republicarea conținutului text fără acordul nostru scris. Numele de mărci, comercianți și imaginile oficiale ale produselor prezentate sunt utilizate cu titlu ilustrativ și aparțin deținătorilor lor de drept.
                    </p>
                </section>
            </div>
        </div>
    );
}

export default Terms;

