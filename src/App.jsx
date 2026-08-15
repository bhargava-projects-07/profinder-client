
import { useAuth } from "./context/AuthContext";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import AdminRouting from "./Routings/AdminRouting";
import Routing from "./Routings/Routing";

import './App.css';

function App() {

  const { token } = useAuth();

  return (
    <main>

      {

        ! token ?
        <>

          <div className="site-main-view min-h-screen">
            <Header />

            <div className="flex-grow">
                <Routing />
            </div>

            <Footer />
          </div>
        </>
        :
        <>
          <AdminRouting />
        </>
    }

    </main>
  )
}

export default App
