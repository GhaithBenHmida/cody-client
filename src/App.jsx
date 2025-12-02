import Sidebar from "./componants/sidebar";
import "./App.css";
import React, {useState, useEffect} from "react";
import Problem from "./main/problem";
import Translator from "./main/translator";
import Prof from "./main/prof";
function App() {

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  
  const [page, setPage] = useState(1)
  const [collapsed, setCollapsed] = useState(false);
  const [mobColl, setMobColl] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false);

  const [context, setContext] = useState([])
  const [prof, setProf] = useState([{}])

  useEffect(() => {
    const handleResize = () => {
     
      if (window.innerWidth > 768) {
        setMobColl(true)
        setMobileOpen(false);
      } else {
        
        setMobileOpen(true);
        
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);


  return (
    <>
      <div className="parent">

      <Sidebar setPage={setPage} collapsed={collapsed} 
      setCollapsed={setCollapsed} mobileOpen={mobileOpen} 
      mobColl={mobColl}
      setMobColl={setMobColl} />
      
        <div className={`content  ${collapsed ? "content-collapsed" : null}`}>
            {page===1 && <Problem context={context} setContext={setContext} url={BACKEND_URL} />}
            {page===2 && <Translator  />}
            {page===3 && <Prof context={prof} setContext={setProf} url={BACKEND_URL} />}
        </div> 
     
      </div>
    </>
  );
}

export default App;
