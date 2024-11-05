import React, { createContext, useContext, useState } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import app from "../firebase";

interface childrenType {
  children: React.ReactNode;
}
type toppingListType = {
  name: string;
  imageUrl: string;
  id: string;
};

export interface menuType {
  id: string;
  name: string;
  price: number;
  isVeg: boolean;
  imageUrl: string;
  // extraTopping?: toppingsType[];
}
export interface cartType {
  id: string;
  name: string;
  price: number;
  isVeg: boolean;
  imageUrl: string;
  extraTopping?: toppingListType[];
  quantity: number;
}
interface contextType {
  getMenu: () => void;
  menuData: menuType[] | null;
  getProduct: (productId: string) => void;
  product: menuType | null;
  getToppings: () => void;
  toppingList: toppingListType[] | null;
  setCartItem: React.Dispatch<React.SetStateAction<cartType[] | null>>;
  cartItem: cartType[] | null;
  setOrder: React.Dispatch<React.SetStateAction<orderType[] | null>>;
  order: orderType[] | null;
}
interface orderType {
  orderItem: cartType[];
  userDetails: {
    firstName: string;
    lastName: string;
    primaryPhoneNumber: string;
    secondaryPhoneNumber: string;
    state: string;
    pinNumber: string;
    address: string;
    neatestRoad: string;
    city: string;
    landMark: string;
    paymentType: string;
  };
}
const PostContext = createContext({} as contextType);
export default function PostProvider({ children }: childrenType) {
  const [menuData, setMenuData] = useState<menuType[] | null>(null);
  const [product, setProduct] = useState<menuType | null>(null);
  const [toppingList, setToppingList] = useState<toppingListType[] | null>(
    null
  );
  const [cartItem, setCartItem] = useState<cartType[] | null>(null);
  const [order, setOrder] = useState<orderType[] | null>(null);
  console.log(order);

  const db = getFirestore(app);
  async function getMenu() {
    const docRef = collection(db, "menu");
    const docSnap = await getDocs(docRef);
    const data = docSnap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setMenuData(data);
  }
  async function getProduct(productId: string) {
    const docRef = doc(db, "menu", productId);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();
    setProduct({ ...data, id: productId });
  }

  async function getToppings() {
    console.log("hiiiii");
    const docRef = collection(db, "topping");
    const docSnap = await getDocs(docRef);
    const data = docSnap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setToppingList(data);
  }

  return (
    <PostContext.Provider
      value={{
        getMenu,
        menuData,
        getProduct,
        product,
        getToppings,
        toppingList,
        setCartItem,
        cartItem,
        setOrder,
        order,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}
export function usePosts() {
  const context = useContext(PostContext);
  if (context === undefined)
    throw new Error("PostContext was used outside of the PostProvider");
  return context;
}
