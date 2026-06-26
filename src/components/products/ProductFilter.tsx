import React from 'react';

interface ProductFilterProps {
    categories: string[];
    selectedCategory: string;
    onCategoryChange: (category: string) => void;
}

const ProductFilter = ({ categories, selectedCategory, onCategoryChange }: ProductFilterProps) => {
    return (
        <div className='lg:w-56 shrink-0'>
            <div className="card bg-base-100 shadow-md p-4 sticky top-20">
                <h3 className="font-bold text-lg mb-4">Categories</h3>
                <ul className="space-y-1">
                    {
                        categories.map((cat) => (
                            <li key={cat}>
                                <button
                                    onClick={() => onCategoryChange(cat)}
                                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors text-sm ${selectedCategory === cat
                                        ? "bg-primary text-primary-content font-semibold"
                                        : "hover:bg-base-200"
                                        }`}
                                >
                                    {cat}
                                </button>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    );
};

export default ProductFilter;