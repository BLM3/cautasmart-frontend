import React, { useState } from 'react';
import { Info, Mail, ShieldCheck, HeartHandshake, Send, CheckCircle, Loader2 } from 'lucide-react';

function About() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');

        try {
            // 💡 Schimbă URL-ul de mai jos cu adresa reală a backend-ului tău Spring Boot (sau '/api/contact' dacă ai proxy)
            const response = await fetch('https://backendproject-cautasmart.onrender.com/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', message: '' });
            } else {
                setStatus('error');
            }
        } catch (error) {
            console.error("Eroare la trimiterea mesajului:", error);
            setStatus('error');
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 my-4">

            {/* Header Pagina */}
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100 dark:border-gray-700">
                <Info className="text-blue-600 dark:text-blue-400" size={32} />
                <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-gray-100">
                    Despre Cautasmart.ro & Contact
                </h1>
            </div>

            <div className="space-y-8 text-gray-600 dark:text-gray-300 leading-relaxed text-sm sm:text-base">

                {/* Sectiunea Misiune */}
                <div>
                    <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2 flex items-center gap-2">
                        <HeartHandshake className="text-amber-500" size={20} /> Misiunea Noastră
                    </h2>
                    <p>
                        <strong>Cautasmart.ro</strong> este un portal independent de ghiduri de cumpărături, analize și topuri de produse, creat cu scopul de a te ajuta să iei cele mai bune decizii când achiziționezi echipamente tech, electrocasnice sau gadgeturi.
                    </p>
                    <p className="mt-2">
                        Ne propunem să simplificăm procesul de alegere prin analize obiective, comparații clare și recomandări bazate pe specificații reale, oferindu-ți acces rapid la produsele potrivite de la magazinele de încredere din România.
                    </p>
                </div>

                {/* Secțiunea Ghiduri Editoriale & Afiliere */}
                <div className="p-4 bg-blue-50/50 dark:bg-blue-950/20 rounded-xl border border-blue-100 dark:border-blue-900/40">
                    <h2 className="text-base font-bold text-gray-900 dark:text-gray-100 mb-1 flex items-center gap-2">
                        <ShieldCheck className="text-blue-600 dark:text-blue-400" size={18} /> Transparență & Parteneriate
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                        Site-ul nostru publică conținut editorial independent și participă la programe de marketing afiliat. Când citești un ghid, apeși pe o recomandare și cumperi un produs de la un magazin partener, putem primi un mic comision, fără niciun cost suplimentar pentru tine.
                    </p>
                </div>

                {/* Grid Date Contact + Formular */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">

                    {/* Stânga: Date de Contact */}
                    <div className="p-6 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-200 dark:border-gray-700 flex flex-col justify-between">
                        <div>
                            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
                                <Mail size={20} className="text-blue-600 dark:text-blue-400" /> Date de Contact
                            </h2>
                            <p className="mb-4">Ai întrebări, recomandări sau dorești un parteneriat cu noi? Ne poți scrie direct prin formular sau la e-mail:</p>
                            <p className="font-extrabold text-blue-600 dark:text-blue-400 text-lg sm:text-xl select-all mb-2">
                                contact@cautasmart.ro
                            </p>
                        </div>
                        <p className="text-xs text-gray-400 mt-4">Timp mediu de răspuns: 24 de ore lucrătoare.</p>
                    </div>

                    {/* Dreapta: Formular de Contact */}
                    <div className="p-6 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-200 dark:border-gray-700">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">Trimite-ne un mesaj</h3>

                        {status === 'success' ? (
                            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-lg text-emerald-700 dark:text-emerald-300 flex items-center gap-3">
                                <CheckCircle size={24} className="flex-shrink-0" />
                                <div>
                                    <p className="font-bold">Mesaj trimis cu succes!</p>
                                    <p className="text-xs">Îți vom răspunde în cel mai scurt timp posibil.</p>
                                </div>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 mb-1">
                                        Numele tău
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Popescu Ion"
                                        className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 dark:text-gray-100 text-sm"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 mb-1">
                                        Adresa ta de E-mail
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="nume@exemplu.ro"
                                        className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 dark:text-gray-100 text-sm"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 mb-1">
                                        Mesajul tău
                                    </label>
                                    <textarea
                                        name="message"
                                        rows="4"
                                        required
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Scrie mesajul tău aici..."
                                        className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 dark:text-gray-100 text-sm resize-none"
                                    ></textarea>
                                </div>

                                {status === 'error' && (
                                    <p className="text-xs text-red-500 font-medium">
                                        A apărut o eroare la trimitere. Te rugăm să încerci din nou sau să ne scrii direct pe e-mail.
                                    </p>
                                )}

                                <button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow transition-colors cursor-pointer disabled:opacity-50 text-sm"
                                >
                                    {status === 'loading' ? (
                                        <>
                                            <Loader2 size={18} className="animate-spin" />
                                            Se trimite...
                                        </>
                                    ) : (
                                        <>
                                            <Send size={18} />
                                            Trimite Mesajul
                                        </>
                                    )}
                                </button>
                            </form>
                        )}
                    </div>

                </div>

            </div>
        </div>
    );
}

export default About;