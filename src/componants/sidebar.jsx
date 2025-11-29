  import logo from "../assets/logo.svg";
  import collapss from "../assets/collaps.svg"
  import collapsedd from "../assets/collapsed.svg"
  import ajst from "../assets/ajst.png"
  import "./sidebar.css";
  import brain from "../assets/brain.svg"
  import trans from "../assets/trans.svg"
  import corr from "../assets/corr.svg"

  export default function Sidebar({setPage , collapsed, mobileOpen, setCollapsed, mobColl, setMobColl}) {
    

    
    

    return (
      <>
        {mobileOpen && 
        <div className="mobile-topbar">
          
          <div className="mobile-left">
            <img src={logo} className="logo logo-media"  alt="logo" /> 
            <span className="mobile-title">Cody</span>
          </div>
           

          <button className="hamburger" onClick={() => setMobColl(true)}>
            ☰
          </button>
        </div>
      }
    
        {mobileOpen && mobColl && (
          <div className="backdrop" onClick={() => setMobColl(false)}></div>
        )}

      
        <aside
          className={`sidebar 
          ${!mobColl ? "mobcoll" : ""}
          ${collapsed ? "collapsed" : ""} 
          ${mobileOpen ? "mobile-open" : ""}`}
        >
          <div className="slide-bar-top-side">
          <div className="sidebar-header">
            <div className={`sidebarH-item ${collapsed ? "sidebarH-item-collapsed" : ""} `}>
            {!collapsed && <> <div className="logo-cont"> <img src={logo} className="logo"  alt="logo" /> <h2 className="logotext">Cody</h2> </div> </>}
           <div
              className="collapse-btn"
              onClick={() => {setCollapsed((c) => !c)}}
            >
              {collapsed  ? <img src={collapsedd} className="col"  alt="col" /> : <img src={collapss} className="col"  alt="col" /> }
            </div>
            
            </div>
            <div className="sidebarH-item" id="last-item">
              <img src={ajst} alt="" id="ajst" />
              { collapsed ? null : <p className="ajst-name">Esprit: Jeunes Science</p> }            
            </div>
          </div>

          <ul className="sidebar-items">
            <li className={`item  ${collapsed ? "item-collapsed" : null}`} onClick={() => {setPage(1)
            if (mobileOpen) {
              setMobColl(false)
            }
              
            }}>
              <img src={brain} alt="" className="icon" />
              
              {!collapsed && <span className="text">problem solver</span>}
            </li>

            <li className={`item  ${collapsed ? "item-collapsed" : null}`} onClick={() => {setPage(2) 
              if (mobileOpen) {
                setMobColl(false)
              }
            }}>
              <img src={trans} alt="" className="icon" />
              {!collapsed && <span className="text">translator</span>}
            </li>

            <li className={`item  ${collapsed ? "item-collapsed" : null}`} onClick={() => {setPage(3)
              if (mobileOpen) {
                setMobColl(false)
              }
            }}>
              <img src={corr} alt="" className="icon" />
              {!collapsed && <span className="text">correcteur</span>}
            </li>
          </ul>
            </div>

            {!collapsed && <><div className="slidebarfooter">
            <a href="#" className="footer-link" target="_">about us</a>
            <a href="#" className="footer-link" target="_">devs</a>
          </div></>}
          
        </aside>
      </>
    );
  }
