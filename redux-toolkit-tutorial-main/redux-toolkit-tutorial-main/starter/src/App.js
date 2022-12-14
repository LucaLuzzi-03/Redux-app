import { useEffect } from "react";

import { useDispatch, useSelector } from 'react-redux';
import { calculateTotals, getCartItems } from "./features/cart/cartSlice";

import { CartContainer } from "./components/CartContainer";
import { Navbar } from "./components/Navbar";
import { Modal } from './components/Modal'

function App() {

  const { cartItems, isLoading } = useSelector( state => state.cart);
  const { isOpen } = useSelector( state => state.modal);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calculateTotals());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItems])

  useEffect(() => {
    dispatch(getCartItems())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  

  if( isLoading ) {
    return(
      <div className="loading">
        <h1>Loading...</h1>
      </div>
    )
  }

  return (
    <main>
      { isOpen
          ? <Modal />
          : null
      }
      <Navbar />
      <CartContainer />
    </main>
  );
}
export default App;
