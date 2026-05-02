import { useSelector, useDispatch } from 'react-redux';
import {
  selectCartItems,
  selectCartTotal,
  selectCartSubtotal,
  selectCartItemCount,
  selectCartRestaurantId,
} from '../features/cart/cartSelectors';
import { addItem, removeItem, updateQuantity, clearCart } from '../features/cart/cartSlice';

/**
 * Custom hook to interact with the Cart feature slice easily
 */
export const useCart = () => {
  const dispatch = useDispatch();
  
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const subtotal = useSelector(selectCartSubtotal);
  const itemCount = useSelector(selectCartItemCount);
  const restaurantId = useSelector(selectCartRestaurantId);

  const handleAddItem = (item, restId) => {
    dispatch(addItem({ item, restaurantId: restId }));
  };

  const handleRemoveItem = (itemId) => {
    dispatch(removeItem(itemId));
  };

  const handleUpdateQty = (itemId, quantity) => {
    dispatch(updateQuantity({ id: itemId, quantity }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return {
    items,
    total,
    subtotal,
    itemCount,
    restaurantId,
    addItem: handleAddItem,
    removeItem: handleRemoveItem,
    updateQty: handleUpdateQty,
    clearCart: handleClearCart,
  };
};
