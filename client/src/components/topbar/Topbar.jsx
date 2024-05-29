import "./topbar.css";
import { Search, Person, Chat, Notifications, Menu } from "@material-ui/icons";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

export default function Topbar() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      try {
        const res = await axios.get(`/users/?username=${searchQuery}`);
        if (res.data) {
          navigate(`/profile/${searchQuery}`);
        } else {
          setError(`No profile found with the username "${searchQuery}"`);
        }
      } catch (err) {
        setError(`No profile found with the username "${searchQuery}"`);
      }
    }
  };

  const closeError = () => {
    setError("");
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">OZUGRAM</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <form className="searchbar" onSubmit={handleSearchSubmit}>
          <Search className="searchIcon" />
          <input
            placeholder="Search for anything..."
            className="searchInput"
            value={searchQuery}
            onChange={handleSearch}
          />
        </form>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            <span className="topbarLink">Homepage</span>
          </Link>
          <Link
            to={`/profile/${user.username}`}
            style={{ textDecoration: "none", color: "white" }}
          >
            <span className="topbarLink">Timeline</span>
          </Link>
        </div>
        <div className={`topbarIcons ${menuOpen ? "active" : ""}`}>
          <form className="searchbar mobileSearchbar" onSubmit={handleSearchSubmit}>
            <Search className="searchIcon" />
            <input
              placeholder="Search for anything..."
              className="searchInput"
              value={searchQuery}
              onChange={handleSearch}
            />
          </form>
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <Link to={`/profile/${user.username}`}>
          <img
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
            className="topbarImg"
          />
        </Link>
        <Menu className="menuIcon" onClick={toggleMenu} />
      </div>
      {error && (
        <div className="errorPopup">
          {error}
          <button onClick={closeError}>Close</button>
        </div>
      )}
    </div>
  );
}
