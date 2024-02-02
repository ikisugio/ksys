import React, { useState } from 'react';
import CustomDropdown from '@/components/CustomDropdown';

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const options = [
    { label: 'オプション 1', value: 1 },
    { label: 'オプション 2', value: 2 },
    { label: 'オプション 3', value: 3 },
  ];

  const handleSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div>
      <button onClick={toggleDropdown}>
        {isOpen ? '閉じる' : '開く'}
      </button>
      <CustomDropdown
        options={options}
        onSelect={handleSelect}
        isOpen={isOpen}
      />
      {selectedOption && (
        <div>
          選択されたオプション: {selectedOption.label}
        </div>
      )}
    </div>
  );
};

export default App;
