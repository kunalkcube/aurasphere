import React, { useState } from 'react';

const SearchBar = ({ onSearch, onClose }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            onSearch(searchQuery);
            onClose();
        }
    };

    return (
        <div className='w-full h-screen z-30 absolute bg-[#F3E7DB]/20 backdrop-blur-md'>
            <div className="w-full px-4 py-3 bg-white border-b-black border-b">
                <form onSubmit={handleSubmit} className="flex items-center">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search (e.g., Assam)"
                        className="flex-grow p-2 text-gray-700 focus:outline-none"
                        autoFocus
                    />
                    <button
                        type="button"
                        className="ml-2 p-2 rounded-full bg-gray-200 text-gray-500"
                        onClick={onClose}
                    >
                        <svg width="16" height="16" viewBox="0 0 387 387" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M189.805 247.012L59.3457 377.471C50.8135 386.003 36.9795 386.003 28.4473 377.471L8.75977 357.782C0.227562 349.25 0.227576 335.417 8.75977 326.885L139.219 196.426L189.805 247.012ZM377.471 326.885C386.003 335.417 386.003 349.25 377.471 357.782L357.782 377.471C349.25 386.003 335.417 386.003 326.885 377.471L196.426 247.012L247.012 196.426L377.471 326.885ZM243.701 193.115L193.115 243.701L142.529 193.115L193.115 142.529L243.701 193.115ZM28.4473 8.75977C36.8462 0.360828 50.382 0.229697 58.9414 8.36621L59.3457 8.75977L189.805 139.219L139.219 189.805L8.75977 59.3457C0.227529 50.8135 0.227532 36.9795 8.75977 28.4473L28.4473 8.75977ZM326.885 8.75977C335.417 0.22753 349.25 0.227536 357.782 8.75977L377.471 28.4473C386.003 36.9795 386.003 50.8135 377.471 59.3457L247.012 189.805L196.426 139.219L326.885 8.75977Z" fill="black" stroke="#FF0000" stroke-width="4.68175" />
                        </svg>
                    </button>
                    <button
                        type="submit"
                        className="ml-2 p-4 bg-[#CE4B43] text-white rounded-full"
                    >
                        <svg width="20" height="20" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M1.60001 4.90001C1.60001 3.07747 3.07747 1.60001 4.90001 1.60001C6.72255 1.60001 8.20001 3.07747 8.20001 4.90001C8.20001 6.72255 6.72255 8.20001 4.90001 8.20001C3.07747 8.20001 1.60001 6.72255 1.60001 4.90001ZM4.90001 0.200013C2.30427 0.200013 0.200012 2.30427 0.200012 4.90001C0.200012 7.49575 2.30427 9.60001 4.90001 9.60001C5.87256 9.60001 6.77612 9.30462 7.52586 8.79865L10.2636 11.5364C10.6151 11.8879 11.1849 11.8879 11.5364 11.5364C11.8879 11.1849 11.8879 10.6151 11.5364 10.2636L8.79865 7.52586C9.30462 6.77612 9.60001 5.87256 9.60001 4.90001C9.60001 2.30427 7.49575 0.200013 4.90001 0.200013Z" fill="black" />
                        </svg>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SearchBar;