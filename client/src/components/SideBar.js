import React from "react";
import {  BrowserRouter as Router,  Link} from "react-router-dom";
import FontAwesome from "react-fontawesome";

const SideBar = () => {
  return (
    <div className="col-md-4">
      <div className="side-bar">
                  {/* <ul className="navbar-sidebar">
            <li>
              <Link to="/">
                <FontAwesome name="fas fa-cog" size="2x" />
                Dashboard 
              </Link>
            </li>
            <li>
              <Link to="/products">
                <FontAwesome name="fas fa-cog" size="2x" />
                Products 
              </Link>
            </li>


            <li>
              <Link to="/login">
                <FontAwesome name="fas fa-cog" size="2x" />
                login
              </Link>
            </li>
          </ul> */}




          <div className="countries">
        <h4 className="title">Specialist</h4>
        <ul className="navbar-sidebar">
          <li>
            <label className="checkbox-btn">Afganistan
              <input type="checkbox" defaultChecked="checked" />
              <span className="checkmark" />
            </label>
          </li>
          <li>
            <label className="checkbox-btn">Aland Islands
              <input type="checkbox" />
              <span className="checkmark" />
            </label>
          </li>
          <li>
            <label className="checkbox-btn">Albania
              <input type="checkbox" />
              <span className="checkmark" />
            </label>
          </li>
          <li>
            <label className="checkbox-btn">Algeria
              <input type="checkbox" />
              <span className="checkmark" />
            </label>
          </li>
          <li>
            <label className="checkbox-btn">American Samoa
              <input type="checkbox" />
              <span className="checkmark" />
            </label>
          </li>
          <li>
            <label className="checkbox-btn">Andorra
              <input type="checkbox" />
              <span className="checkmark" />
            </label>
          </li>
          <li>
            <label className="checkbox-btn">Angola
              <input type="checkbox" />
              <span className="checkmark" />
            </label>
          </li>
          <li>
            <label className="checkbox-btn">Anguilla
              <input type="checkbox" />
              <span className="checkmark" />
            </label>
          </li>
          <li>
            <label className="checkbox-btn">Antarticca
              <input type="checkbox" />
              <span className="checkmark" />
            </label>
          </li>
          <li>
            <label className="checkbox-btn">Argentina
              <input type="checkbox" />
              <span className="checkmark" />
            </label>
          </li>
          <li>
            <label className="checkbox-btn">Armenia
              <input type="checkbox" />
              <span className="checkmark" />
            </label>
          </li>
          <li>
            <label className="checkbox-btn">Aruba
              <input type="checkbox" />
              <span className="checkmark" />
            </label>
          </li> 
          <li><a href="#">more...</a></li>
        </ul>
      </div>



      </div>

      
    </div>
  );
};
export default SideBar;
