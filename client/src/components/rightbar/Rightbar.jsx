import "./rightbar.css";
import { Users } from "../../dummyData";
import Online from "../online/Online";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Add, Remove } from "@material-ui/icons";

export default function Rightbar({ user }) {

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const {user: currentUser, dispatch} = useContext(AuthContext);
  const [followed, setFollowed] = useState(currentUser.followings.includes(user?.id));

  // useEffect(() => {
  //   setFollowed(currentUser.followings.includes(user?.id));
  // }, [currentUser, user?.id]);

  useEffect(() => {
    const getFriends = async () => {

      try {
        const friendList = await axios.get("/users/friends/" + user._id);
        setFriends(friendList.data);
      } catch (error) {
        console.log(error);
      }

    };
    getFriends();
  }, [user]);

  const followHandler = async () => {
    
    try {
      if (followed) {
        await axios.put("/users/" + user._id + "/unfollow", {userId: currentUser._id});
        dispatch({type: "UNFOLLOW", payload: user._id});
      } else {
        await axios.put("/users/" + user._id + "/follow", {userId: currentUser._id});
        dispatch({type: "FOLLOW", payload: user._id})
      }
      setFollowed(!followed);
    } catch (error) {
      console.log(error)
    }
  }

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src="/assets/gift.png" alt="" />
          <span className="birthdayText">
            {" "}
            Today is a birthday for <b>Berker Karakuş!</b>
          </span>
        </div>
        <h4 className="rightbarTitle">Now Online</h4>
        <ul className="rightbarFriendList">
          {Users.map(u => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    )
  }

  const ProfileRightbar = () => {
    return (
      <>
      {user.username !== currentUser.username && (
        <button className="rightbarFollowButton" onClick={followHandler}>
          {followed ? "Remove Friend " : "Add Friend "}
          {followed ? <Remove /> : <Add />}
        </button>
      )}
        <h4 className="rightbarTitle">User Informations</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">{user.relationship ===1 ? "Single" : user.relationship ===1 ? "Not Single" : "-"}</span>
          </div>
        </div>
        <h4 className="rightbarTitle">Your Friends</h4>
        <div className="rightbarFollowings">
          {friends.map(friend => (
            <Link style={{textDecoration: "none"}} to={"/profile/" + friend.username}>
              <div className="rightbarFollowing">
              <img src={friend.profilePicture ? PF+friend.profilePicture : PF+"person/noAvatar.png"} alt="" className="rightbarFollowingImg" />
              <span className="rightbarFollowingName">{friend.username}</span>
              </div>
            </Link>
          ))};
        </div>
      </>
    )
  }

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  )
}
