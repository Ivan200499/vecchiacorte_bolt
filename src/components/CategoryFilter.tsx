import React from 'react';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export default function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) {
  return (
    <div className="flex gap-2 overflow-x-auto py-4 px-4 -mx-4 sticky top-16 bg-white shadow-sm">
      <button
        onClick={() => onSelectCategory('all')}
        className={\`px-4 py-2 rounded-full whitespace-nowrap transition-colors \${
          selectedCategory === 'all'
            ? 'bg-indigo-600 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }\`}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={\`px-4 py-2 rounded-full whitespace-nowrap transition-colors \${
            selectedCategory === category
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }\`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}