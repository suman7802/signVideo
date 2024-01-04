import {createContext, useState} from 'react';
import PropTypes from 'prop-types';

const ShopContext = createContext();

function ShopContextProvider({children}) {
  const [coursesToBuy, setCoursesToBuy] = useState([]);

  const addToCart = (course) => {
    setCoursesToBuy((prevCourses) => [...prevCourses, course]);
  };

  return (
    <ShopContext.Provider value={{coursesToBuy, addToCart}}>
      {children}
    </ShopContext.Provider>
  );
}

ShopContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export {ShopContextProvider, ShopContext};
