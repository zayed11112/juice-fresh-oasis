
import React, { useState } from 'react';

const sugarJuices = [
  {
    name: 'قصب',
    prices: { small: 10, medium: 15, large: 20, liter: 30 },
  },
  {
    name: 'سوبيا',
    prices: { small: 10, medium: 15, large: 20, liter: 30 },
  },
  {
    name: 'تمر هندي',
    prices: { small: 10, medium: 15, large: 20, liter: 30 },
  },
];

const mixes = [
  { name: 'قصب برتقال', prices: { small: 15, medium: 20, large: 30 } },
  { name: 'قصب مانجو', prices: { small: 35, medium: 40, large: 45 } },
  { name: 'قصب يوسفي', prices: { small: 30, medium: 35, large: 40 } },
  { name: 'قصب سوبيا', prices: { small: 10, medium: 15, large: 20 } },
  { name: 'قصب موز', prices: { small: 20, medium: 30, large: 40 } },
  { name: 'قصب ليمون نعناع', prices: { small: 20, medium: 30, large: 40 } },
  { name: 'قصب حلاوة مكسرات', prices: { small: 30, medium: 35, large: 40 } },
  { name: 'قصب كيوي', prices: { small: 30, medium: 40, large: 45 } },
  { name: 'قصب فانيليا', prices: { small: 15, medium: 20, large: 35 } },
  { name: 'قصب بريل', prices: { small: 35, medium: 40, large: 45 } },
  { name: 'قصب كانتالوب', prices: { small: 30, medium: 40, large: 45 } },
];

const freshes = [
  { name: 'جوافة', prices: { small: 30, medium: 35, large: 40 } },
  { name: 'مانجو', prices: { small: 35, medium: 40, large: 45 } },
  { name: 'كيوي ليمون نعناع', prices: { small: 35, medium: 40, large: 45 } },
  { name: 'فراولة', prices: { small: 30, medium: 35, large: 40 } },
  { name: 'موز', prices: { small: 30, medium: 35, large: 40 } },
  { name: 'موز بالفراولة', prices: { small: 35, medium: 40, large: 45 } },
  { name: 'برتقال', prices: { small: 15, medium: 20, large: 25 } },
  { name: 'يوسفي ليمون نعناع', prices: { small: 35, medium: 40, large: 45 } },
  { name: 'أفوكادو', prices: { small: 60, medium: 70, large: 80 } },
  { name: 'أفوكادو مكسرات فاكهة', prices: { small: 100, medium: 150, large: 200 } },
];

const categories = [
  { id: 'sugar', label: '🧃 العصائر' },
  { id: 'mixes', label: '🧉 مكسات القصب' },
  { id: 'freshes', label: '🥤 الفريشات' },
];

const Menu = () => {
  const [cat, setCat] = useState('sugar');
  return (
    <div className="section-container text-right" dir="rtl">
      <h1 className="section-title text-3xl mb-6 flex items-center gap-2 dark:text-white">
        🍹 Juice Fresh <span className="text-juice-green dark:text-juice-green font-bold text-xl">منيو العصائر</span>
      </h1>
      <div className="flex justify-center space-x-2 rtl:space-x-reverse mb-6">
        {categories.map(c => (
          <button
            key={c.id}
            onClick={() => setCat(c.id)}
            className={`px-4 py-2 font-bold rounded-full border-2 border-juice-green transition ${cat === c.id ? 'bg-juice-green text-white shadow-lg' : 'text-juice-green bg-white dark:bg-gray-800 dark:text-juice-green'}`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* الجدول الرئيسي حسب التصنيف */}
      <div className="bg-white dark:bg-gray-800 p-3 rounded-xl shadow border dark:border-gray-700 overflow-x-auto animate-theme-transition">
        {cat === 'sugar' && (
          <table className="min-w-full text-center">
            <thead>
              <tr className="bg-juice-green text-white text-lg">
                <th className="px-4 py-2">العصير</th>
                <th className="px-2 py-2">صغير</th>
                <th className="px-2 py-2">وسط</th>
                <th className="px-2 py-2">كبير</th>
                <th className="px-2 py-2">لتر</th>
              </tr>
            </thead>
            <tbody>
              {sugarJuices.map((item, i) => (
                <tr key={i} className="border-b dark:border-gray-700 text-lg hover:bg-juice-green/10 dark:hover:bg-juice-green/20 transition dark:text-white">
                  <td className="py-3 font-bold">{item.name}</td>
                  <td>{item.prices.small} جنيه</td>
                  <td>{item.prices.medium} جنيه</td>
                  <td>{item.prices.large} جنيه</td>
                  <td>{item.prices.liter} جنيه</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {cat === 'mixes' && (
          <table className="min-w-full text-center">
            <thead>
              <tr className="bg-juice-orange text-white text-lg">
                <th className="px-4 py-2">النوع</th>
                <th className="px-4 py-2">صغير</th>
                <th className="px-4 py-2">وسط</th>
                <th className="px-4 py-2">كبير</th>
              </tr>
            </thead>
            <tbody>
              {mixes.map((item, i) => (
                <tr key={i} className="border-b dark:border-gray-700 text-lg hover:bg-juice-orange/10 dark:hover:bg-juice-orange/20 transition dark:text-white">
                  <td className="py-2 font-bold">{item.name}</td>
                  <td>{item.prices.small} جنيه</td>
                  <td>{item.prices.medium} جنيه</td>
                  <td>{item.prices.large} جنيه</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {cat === 'freshes' && (
          <table className="min-w-full text-center">
            <thead>
              <tr className="bg-juice-yellow text-white text-lg">
                <th className="px-4 py-2">العصير</th>
                <th className="px-4 py-2">صغير</th>
                <th className="px-4 py-2">وسط</th>
                <th className="px-4 py-2">كبير</th>
              </tr>
            </thead>
            <tbody>
              {freshes.map((item, i) => (
                <tr key={i} className="border-b dark:border-gray-700 text-lg hover:bg-juice-yellow/10 dark:hover:bg-juice-yellow/20 transition dark:text-white">
                  <td className="py-2 font-bold">{item.name}</td>
                  <td>{item.prices.small} جنيه</td>
                  <td>{item.prices.medium} جنيه</td>
                  <td>{item.prices.large} جنيه</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Menu;
