import { useState, useEffect } from "react";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import AppRoutes from "./AppRoutes";
import {supabase} from "./lib/supabaseClient";



function App() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      return JSON.parse(savedCart)
    }
    return []
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  },[cart]);

  const addToCart = (product) => {
    if (product.stock <= 0) {
      return
    }

    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      setCart(
        cart.map((item) => 
          item.id === product.id ? 
            item.quantity < product.stock ?
              {
                ...item,
                stock: product.stock,
                quantity : item.quantity+1 
              }
            : {
                ...item,
                stock: product.stock
              }            
          :item
        )
      );
    } else {
      setCart([...cart, {...product, quantity :1}]);
    }
  };

  const increaseQuantity = (id) => {
    setCart(
      cart.map((item) => {
        if (item.id === id) {
          if (item.quantity < item.stock) {
            return {
              ...item, quantity : item.quantity + 1
            }
          }
          return item
        }
        return item          
      })   
    );
  };

  const decreaseQuantity = (id) => {
     setCart(
      cart
        .map((item) =>  
          item.id === id ?
          {...item, quantity : item.quantity - 1}
          : item
        )
        .filter((item) => item.quantity > 0)
    );      
  };

  const removeFromCart = (id) => {
    console.log("id reçu :", id);
    console.log("cart avant suppression :", cart);
    setCart(
      cart.filter((item) => Number(item.id) !== Number(id) )
    );
  };

  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  const [productCategory, setProductCategory] = useState([]);
  const [loadingProductCategory, setLoadingProductCategory] = useState(true);
  
  const fetchTable = async (tableName, setter, loadingSetter) => {
    try {
      const { data, error } = await supabase
        .from(tableName)
        .select("*")
        .order("id", { ascending: true });

      if (error) {
        console.error(`Erreur Supabase ${tableName} :`, error);
        return;
      }

      console.log(`${tableName} Supabase :`, data);
      setter(data);
    } catch (error) {
      console.error(`Erreur inattendue ${tableName} :`, error);
    } finally {
      loadingSetter(false);
    }
  };

  useEffect(() => {
    fetchTable("products", setProducts, setLoadingProducts);
    fetchTable("product_category", setProductCategory, setLoadingProductCategory);
  }, []);

  const [user, setUser] = useState();
  const [loadingUser, setLoadingUser] = useState(true);

  const [profile, setProfile] = useState();
  const [loadingProfile, setLoadingProfile] = useState(true);

  const [session, setSession] = useState();

  
  const checkUserIdentity = async () => {

    try {

      const { data: sessionData, error: sessionError} = await supabase.auth.getSession();

      if (sessionError) {
        console.error("Erreur récupération session :", sessionError);
        setSession(null);
        setUser(null);
        setProfile(null);
        return;
      };

      const currentSession = sessionData.session;

      if (!currentSession) {
        setSession(null);
        setUser(null);
        setProfile(null);
        return;
      }

      setSession(currentSession);

      const {data:userData, error:userError} = await supabase.auth.getUser();



      if (userError) {
          console.error(`Erreur Supabase user :`, userError);
          setSession(null);
          setUser(null);
          setProfile(null);
          return;
      } 

      const user = userData.user;

      if (!user) {
        setSession(null);
        setUser(null);
        setProfile(null);
        return;
      }

      setUser(user)


      const {data:profileData, error:profileError} = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (profileError) {
          console.error(`Erreur Supabase profiles :`, profileError);
          return;
      } 

      setProfile(profileData)


    } catch(error) {
      console.error(`Erreur inattendue checkuserIdentity :`, error);
      setSession(null);
      setUser(null);
      setProfile(null);
    } finally {
      setLoadingProfile(false);
      setLoadingUser(false);
    }
  }

  useEffect(()=> {
  checkUserIdentity();
  },[]);

  return (
    <div className="app-layout">
      <Header 
        addToCart={addToCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        removeFromCart={removeFromCart}
        cart={cart}
        user={user}
        setUser={setUser}
        setProfile={setProfile}
        profile={profile}
        checkUserIdentity={checkUserIdentity}
        session={session}
      />

      
      <main className="app-main">
        <AppRoutes 
          addToCart={addToCart}
          increaseQuantity={increaseQuantity}
          decreaseQuantity={decreaseQuantity}
          removeFromCart={removeFromCart}
          cart={cart}
          setCart={setCart}
          products={products}
          loadingProducts={loadingProducts}
          productCategory={productCategory}
          loadingProductCategory={loadingProductCategory}
          user={user}
          profile={profile}
          setProfile={setProfile}
          loadingUser={loadingUser}
          loadingProfile={loadingProfile}
          checkUserIdentity={checkUserIdentity}
          session={session}
        />
      </main>


      <Footer />
    </div>
  );
}

export default App;