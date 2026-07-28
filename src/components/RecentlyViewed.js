import React from 'react';

function RecentlyViewed({ items = [] }) {
    if (!items || items.length === 0) return null;

    return (
        <div className="bg-white dark:bg-gray-800 border-t dark:border-gray-700 p-6 mt-12">
            <div className="max-w-7xl mx-auto">
                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
                    🕒 Vizualizate recent
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
                    {items.map((item, index) => {
                        // Folosim prima proprietate validă pentru ID, Titlu și Imagine
                        const uniqueKey = item.id || item.slug || index;
                        const itemTitle = item.name || item.title || 'Ghid';
                        const itemImage = item.imageUrl || item.bannerImageUrl || item.banner_image_url || 'https://via.placeholder.com/150';

                        return (
                            <a
                                key={uniqueKey}
                                href={item.affiliateLink || '#'}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="border rounded-xl p-2 bg-gray-50 dark:bg-gray-700 hover:bg-blue-50 dark:hover:bg-gray-600 hover:border-blue-300 transition flex flex-col items-center text-center cursor-pointer group text-gray-700 dark:text-gray-300"
                            >
                                <div className="w-16 h-16 bg-white overflow-hidden rounded-lg mb-2 flex items-center justify-center">
                                    <img
                                        src={itemImage}
                                        alt={itemTitle}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                    />
                                </div>
                                <span className="text-xs font-semibold text-gray-700 dark:text-gray-200 line-clamp-1 w-full px-1 group-hover:text-blue-600 transition">
                                    {itemTitle}
                                </span>
                                {item.price && (
                                    <span className="text-xs font-bold text-green-600 mt-1">
                                        {item.price} {item.currency || 'RON'}
                                    </span>
                                )}
                            </a>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default RecentlyViewed;