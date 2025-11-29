import Sidebar from "./componants/sidebar";
import "./App.css";
import React, {useState, useEffect} from "react";
import Problem from "./main/problem";
import Translator from "./main/translator";
import Prof from "./main/prof";
function App() {



  const [page, setPage] = useState(1)
  const [collapsed, setCollapsed] = useState(false);
  const [mobColl, setMobColl] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false);



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
     
            {page===1 && <Problem />}
            {page===2 && <Translator />}
            {page===3 && <Prof />}
        </div> 
     
      </div>
    </>
  );
}

export default App;
