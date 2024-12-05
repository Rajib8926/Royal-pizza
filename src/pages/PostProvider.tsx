import React, { createContext, useContext, useEffect, useState } from "react";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  writeBatch,
} from "firebase/firestore";
import app, { auth } from "../firebase";
interface childrenType {
  children: React.ReactNode;
}
export type toppingListType = {
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
}
export interface cartType {
  name: string;
  id: string;
  price: number;
  isVeg: boolean;
  imageUrl: string;
  extraTopping: toppingListType[];
  quantity: number;
}
interface contextType {
  getMenu: () => void;
  menuData: menuType[] | null;
  getProduct(productId: string | undefined): Promise<void>;
  product: menuType | null;
  getToppings: () => void;
  toppingList: toppingListType[] | null;
  setCartItem: React.Dispatch<
    React.SetStateAction<cartType[] | null | undefined>
  >;
  cartItem: cartType[] | null | undefined;
  setOrder: React.Dispatch<React.SetStateAction<orderType[] | null>>;
  order: orderType[] | null;
  setOpenLogin: React.Dispatch<React.SetStateAction<boolean>>;
  openLogin: boolean;
  openSignUp: boolean;
  setOpenSignUp: React.Dispatch<React.SetStateAction<boolean>>;
  // setUserData: any;
  // userData: any;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
  isLogin: boolean;
  addProductInCart(currentProduct: cartType): Promise<void>;
  getCart(): void;
  getOrder(): Promise<void>;
  deleteAllCart(): Promise<void>;
}
export interface userDetailsType {
  orderDate: string;
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
}
export interface orderType {
  id?: string;
  orderItem?: cartType[];
  userDetails?: userDetailsType;
}
const PostContext = createContext({} as contextType);
export default function PostProvider({ children }: childrenType) {
  // const [userData, setUserData] = useState();
  const [menuData, setMenuData] = useState<menuType[] | null>(null);
  const [product, setProduct] = useState<menuType | null>(null);
  const [toppingList, setToppingList] = useState<toppingListType[] | null>(
    null
  );
  const [cartItem, setCartItem] = useState<cartType[] | null | undefined>(null);
  const [order, setOrder] = useState<orderType[] | null>(null);
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [openLogin, setOpenLogin] = useState<boolean>(false);
  const [openSignUp, setOpenSignUp] = useState<boolean>(false);

  const db = getFirestore(app);
  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (users) => {
      if (users) {
        setIsLogin(true);
      }
    });
  };
  const userId = auth.currentUser?.uid;


  useEffect(
    function () {
      fetchUserData();
      if (isLogin) {
        setOpenLogin(false);
        setOpenSignUp(false);
      }
    },
    [isLogin]
  );
  async function getCart() {
   
    if (userId) {
      const parentDocRef = doc(db, "users", userId);
      const subDocRef = collection(parentDocRef, "cart");

      const cartData = await getDocs(subDocRef);
   

      const dataList = cartData.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      if (dataList?.length === 0) {
        setCartItem(null);
      } else {
        setCartItem(dataList as cartType[]);
      }
    } else {
      setCartItem(null);
    }
  }
  useEffect(
    function () {
      getCart();

      getOrder();
   
    },
    [userId]
  );
  async function addProductInCart(currentProduct: cartType) {
    if (currentProduct && userId) {
      const isInCart = cartItem?.find((data) => data.id === product?.id);
      if (!isInCart) {


        const parentDocRef = doc(db, "users", userId);
        const subcollectionRef = collection(parentDocRef, "cart");
        await addDoc(subcollectionRef, {
          ...product,
          quantity: currentProduct.quantity,
          extraTopping: currentProduct.extraTopping,
        });
        return cartItem
          ? setCartItem([...cartItem, currentProduct])
          : setCartItem([currentProduct]);
      }
    }
  }

  async function deleteAllCart() {
    if (userId) {
      const parentDocRef = doc(db, "users", userId);
      const subcollectionRef = collection(parentDocRef, "cart");
      const querySnapshot = await getDocs(subcollectionRef);
      const batch = writeBatch(db);

      querySnapshot.forEach((docSnapshot) => {
        batch.delete(docSnapshot.ref);
      });
      await batch.commit();

    }
  }
  async function getMenu() {
    const docRef = collection(db, "menu");
    const docSnap = await getDocs(docRef);
    const data = docSnap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setMenuData(data as menuType[]);
  }
  async function getProduct(productId: string | undefined) {
    if (productId) {
      const docRef = doc(db, "menu", productId);
      const docSnap = await getDoc(docRef);
      const data = docSnap.data();
      setProduct({ ...data, id: productId } as menuType);
    }
  }
  async function getOrder() {
    if (userId) {
      const parentDocRef = doc(db, "users", userId);
      const subcollectionRef = collection(parentDocRef, "order");
      const postData = await getDocs(subcollectionRef);
      const dataList: orderType[] | null = postData.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      if (dataList.length === 0) {
        setOrder(null);
      } else {
        setOrder(dataList);
      }
    } else {
      setOrder(null);
    }
  }
  async function getToppings() {
    const docRef = collection(db, "topping");
    const docSnap = await getDocs(docRef);
    const data = docSnap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setToppingList(data as toppingListType[]);
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
        setOpenLogin,
        openLogin,
        setOpenSignUp,
        openSignUp,
        // setUserData,
        // userData,
        isLogin,
        setIsLogin,
        addProductInCart,
        getCart,
        getOrder,
        deleteAllCart,
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
