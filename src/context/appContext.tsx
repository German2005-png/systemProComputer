'use client'
import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import allProduct from "../jsons/allProduct.json";

interface UserProps {
    username: string;
    createdAt: string;
}

interface ProductProps {
    id: number;
    name: string;
    price: number;
    image: string;
    images: string[];
    quantity: number;
}

interface ShowCardProps {
    products: ProductProps[];
    state: boolean;
}

interface ShowNavUser {
    user: UserProps;
    state: boolean;
}

interface ErrorSignProps {
    type: string;
    title: string;
    message: string;
}

interface AllCardProps {
    digits: object;
    fullname: object;
    date: object;
    securityCode: object;
    id: object;
    createdAt: object;
    cardType: object;
}

interface AppContextTypes {
    showSign: string;
    setShowSign: React.Dispatch<React.SetStateAction<string>>;
    showCard: ShowCardProps;
    setShowCard: React.Dispatch<React.SetStateAction<ShowCardProps>>;
    showCardModal: string;
    setShowCardModal: React.Dispatch<React.SetStateAction<string>>;
    errorSign: ErrorSignProps;
    setErrorSign: React.Dispatch<React.SetStateAction<ErrorSignProps>>;
    user: UserProps;
    setUser: React.Dispatch<React.SetStateAction<UserProps>>;
    showUser: ShowNavUser;
    setShowUser: React.Dispatch<React.SetStateAction<ShowNavUser>>;
    productsUrl: string;
    setProductsUrl: React.Dispatch<React.SetStateAction<string>>;
    cardNumberDigits: string[];
    setCardNumberDigits: React.Dispatch<React.SetStateAction<string[]>>;
    cardDateNumber: string[];
    setCardDateNumber: React.Dispatch<React.SetStateAction<string[]>>;
    cardSecurityCode: string;
    setCardSecurityCode: React.Dispatch<React.SetStateAction<string>>;
    fullName: string;
    setFullName: React.Dispatch<React.SetStateAction<string>>;
    cardId: string;
    setCardId: React.Dispatch<React.SetStateAction<string>>;
    allCard: AllCardProps[];
    setAllCard: React.Dispatch<React.SetStateAction<AllCardProps[]>>;
}

interface AppContentProps {
    children: React.ReactNode;
}

interface ProductServerProps {
    id: number;
    products: number;
    productQuality: number;
}

export const AppContext = createContext<AppContextTypes | undefined>(undefined);

const AppContextProvider: React.FC<AppContentProps> = ({ children }) => {
    const [showSign, setShowSign] = useState<string>("");
    const [showCard, setShowCard] = useState<ShowCardProps>({ products: [], state: false });
    const [showCardModal, setShowCardModal] = useState<string>("");
    const [errorSign, setErrorSign] = useState<ErrorSignProps>({type: "", title: "", message: ""});
    const [user, setUser] = useState<UserProps>({ username: "", createdAt: "" });
    const [showUser, setShowUser] = useState<ShowNavUser>({user: {username: "", createdAt: ""}, state: false});
    const [allCard, setAllCard] = useState<AllCardProps[]>([]);
    const [productsUrl, setProductsUrl] = useState<string>("");
    const [cardNumberDigits, setCardNumberDigits] = useState<string[]>([])
    const [cardDateNumber, setCardDateNumber] = useState<string[]>([]);
    const [cardSecurityCode, setCardSecurityCode] = useState<string>("");
    const [fullName, setFullName] = useState<string>("");
    const [cardId, setCardId] = useState<string>("");
    useEffect(() => {
        if (Cookies.get("token")) {
            if (!user.username) {
                fetch("/server/api/user", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    }
                }).then(res => {
                    if (!res.ok) {
                        console.error("Error al obtener el usuario");
                        setErrorSign({type: "Error", title: "Error", message: "Error al obtener el usuario"});
                    } else {
                        return res.json();
                    }
                })
                    .then(data => {
                        setUser({ username: data.user.username, createdAt: data.user.createdAt });
                    }).catch(err => {
                        console.error(err);
                        setErrorSign({type: "Error", title: "Error", message: "Ha ocurrido un error al obtener el usuario!"});
                    });
            }
        }
    }, [user]);

    useEffect(() => {
        if(user.username) {
            fetch("/server/api/products", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            }).then(res => {
                if (!res.ok) {
                    console.error("Error al obtener la tarjeta");
                } else {
                    return res.json();
                }
            }).then(data => {
                if(data.card && Array.isArray(data.card)) {
                    const allProductsServer = allProduct.allProducts.filter((p)=> data.card.some((cardItem: ProductServerProps) => cardItem.products === p.id));
                    allProductsServer.forEach((product)=> product.quantity = data.card.find((cardItem: ProductServerProps) => cardItem.products === product.id)?.productQuality || 0);
                    setShowCard({ products: allProductsServer, state: showCard.state });
                }
            }).catch(err => {
                console.error("ERROR AL OBTENER LA TARJETA: ", err);
                setErrorSign({type: "Error", title: "Error", message: "Ha ocurrido un error!"});
            });
        }
    }, [user, showCard.state]);
    return (
        <AppContext.Provider value={{ showSign, setShowSign, showCard, setShowCard, showCardModal, setShowCardModal, errorSign, setErrorSign, user, setUser, showUser, setShowUser ,productsUrl, setProductsUrl, cardNumberDigits, setCardNumberDigits, cardDateNumber, setCardDateNumber, cardSecurityCode, setCardSecurityCode, fullName, setFullName, cardId, setCardId, allCard, setAllCard }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = (): AppContextTypes => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppContextProvider');
    }
    return context;
};

export default AppContextProvider;
