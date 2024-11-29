import React, { createContext, useContext, useEffect, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  setDoc,
  writeBatch,
} from "firebase/firestore";
import app, { auth } from "../firebase";
import { Expand } from "@mui/icons-material";
import { toppingType } from "./product/Product";

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
  setOpenLogin: React.Dispatch<React.SetStateAction<boolean>>;
  openLogin: boolean;
  openSignUp: boolean;
  setOpenSignUp: React.Dispatch<React.SetStateAction<boolean>>;
  setUserData: any;
  userData: any;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
  isLogin: boolean;
  addProductInCart(currentProduct: addProductInCartType): Promise<void>;
  getCart(): void;
  getOrder(): Promise<void>;
  deleteAllCart(): Promise<void>;
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
interface addProductInCartType extends menuType {
  quantity: number;
  extraTopping: toppingType[] | null;
}
const PostContext = createContext({} as contextType);
export default function PostProvider({ children }: childrenType) {
  const [userData, setUserData] = useState();
  const [menuData, setMenuData] = useState<menuType[] | null>(null);
  const [product, setProduct] = useState<menuType | null>(null);
  const [toppingList, setToppingList] = useState<toppingListType[] | null>(
    null
  );
  const [cartItem, setCartItem] = useState<cartType[] | null>(null);
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
    console.log(userId);
    if (userId) {
      const parentDocRef = doc(db, "users", userId);
      const subDocRef = collection(parentDocRef, "cart");

      const cartData = await getDocs(subDocRef);
      console.log(cartData);

      const dataList = cartData.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      if (dataList.length === 0) {
        setCartItem(null);
      } else {
        setCartItem(dataList);
      }
    } else {
      setCartItem(null);
    }

    console.log(dataList);
  }
  useEffect(
    function () {
      getCart();

      getOrder();
      console.log("Logout");
    },
    [userId]
  );
  async function addProductInCart(currentProduct: addProductInCartType) {
    if (currentProduct) {
      const isInCart = cartItem?.find((data) => data.id === product.id);
      if (!isInCart) {
        console.log("Yes");

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
    const parentDocRef = doc(db, "users", userId);
    const subcollectionRef = collection(parentDocRef, "cart");
    const querySnapshot = await getDocs(subcollectionRef);
    const batch = writeBatch(db);

    querySnapshot.forEach((docSnapshot) => {
      batch.delete(docSnapshot.ref);
    });
    await batch.commit();
    console.log("delete");
  }
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
  async function getOrder() {
    if (userId) {
      const parentDocRef = doc(db, "users", userId);
      const subcollectionRef = collection(parentDocRef, "order");
      const postData = await getDocs(subcollectionRef);
      const dataList = postData.docs.map((doc) => ({
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
        setOpenLogin,
        openLogin,
        setOpenSignUp,
        openSignUp,
        setUserData,
        userData,
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
