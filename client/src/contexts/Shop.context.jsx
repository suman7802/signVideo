import {useState} from 'react';
import {createContext} from 'react';
import PropTypes from 'prop-types';

const ShopContext = createContext();

function ShopContextProvider({children}) {
  const [selectedDays, setSelectedDays] = useState(30);

  const handleBuyCourseClick = (category) => {
    console.log(`Category: ${category}, Days: ${selectedDays}`);
  };

  return (
    <ShopContext.Provider
      value={{handleBuyCourseClick, selectedDays, setSelectedDays}}>
      {children}
    </ShopContext.Provider>
  );
}

ShopContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export {ShopContextProvider, ShopContext};
