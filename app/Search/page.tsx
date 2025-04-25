// src/components/search/SearchBar.tsx
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'next-i18next';

type SearchParams = {
  location: string;
  checkIn: string;
  checkOut: string;
  guests: number;
};

export default function SearchBar() {
  const { t } = useTranslation('common');
  const router = useRouter();
  const [searchParams, setSearchParams] = useState<SearchParams>({
    location: '',
    checkIn: '',
    checkOut: '',
    guests: 1,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: name === 'guests' ? parseInt(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const queryParams = new URLSearchParams();
    queryParams.append('location', searchParams.location);
    queryParams.append('checkIn', searchParams.checkIn);
    queryParams.append('checkOut', searchParams.checkOut);
    queryParams.append('guests', searchParams.guests.toString());
    
    router.push(`/search?${queryParams.toString()}`);
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-md p-6">
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
        <div className="flex-1">
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
            {t('search.location')}
          </label>
          <input
            type="text"
            id="location"
            name="location"
            placeholder={t('search.locationPlaceholder')}
            value={searchParams.location}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        
        <div className="flex-1">
          <label htmlFor="checkIn" className="block text-sm font-medium text-gray-700 mb-1">
            {t('search.checkIn')}
          </label>
          <input
            type="date"
            id="checkIn"
            name="checkIn"
            value={searchParams.checkIn}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        
        <div className="flex-1">
          <label htmlFor="checkOut" className="block text-sm font-medium text-gray-700 mb-1">
            {t('search.checkOut')}
          </label>
          <input
            type="date"
            id="checkOut"
            name="checkOut"
            value={searchParams.checkOut}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        
        <div className="flex-1">
          <label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-1">
            {t('search.guests')}
          </label>
          <select
            id="guests"
            name="guests"
            value={searchParams.guests}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {[1, 2, 3, 4, 5, 6].map(num => (
              <option key={num} value={num}>
                {num} {num === 1 ? t('search.guest') : t('search.guests')}
              </option>
            ))}
          </select>
        </div>
        
        <div className="flex items-end">
          <button
            type="submit"
            className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {t('search.searchButton')}
          </button>
        </div>
      </form>
    </div>
  );
}