import React, { useEffect, useState } from "react";
import "./RequestsCard.css";
import { Button } from "../Button/Button";
import { useSelector } from "react-redux";
import axios from "axios";
const RequestsCard = () => {
  const [requestedUsers, setRequestedUsers] = useState([]);
  const userId = JSON.parse(sessionStorage.getItem("userId"))
  useEffect(() => {
    fetchRequestedUsers()
  }, []);

  const accept = async (targetId) => {
    const data = {
      "sender": {
        "userId": userId
      },
      "receiver": {
        "userId": targetId
      }
    }
    const result =await axios({
      method: "POST",
      url: `http://192.168.1.197:8080/api/v1/request/acceptedRequest`,
      headers: {
        Authorization: "Bearer " + JSON.parse(sessionStorage.getItem("AuthHead")).Authorization
      },
      data: data
    });

    console.log("result---->", result.data);
    window.location.reload(false)
  }


  const reject = async (targetId) => {
    const data = {
      "sender": {
        "userId": userId
      },
      "receiver": {
        "userId": targetId
      }

    }

    const result =await axios({
      method: "POST",
      url: `http://192.168.1.197:8080/api/v1/request/rejectRequest`,
      headers: {
        Authorization: "Bearer " + JSON.parse(sessionStorage.getItem("AuthHead")).Authorization
      },
      data: data
    });
    window.location.reload(false)
  }


  const fetchRequestedUsers = async () => {
    const result =await axios({
      method: "POST",
      url: `http://192.168.1.197:8080/api/v1/request/getRequestedConnections/${userId}`,
      headers: {
        Authorization: "Bearer " + JSON.parse(sessionStorage.getItem("AuthHead")).Authorization
      }
    });
    setRequestedUsers(result.data);
  }
  return (
    <div className="RequestsCard card-container">
      <h2>Requested Id's</h2>
      <div className="coverBox">



        {requestedUsers.map((user, id) => {
          return (
            <div className="follower follow-container">
              <div>
                <img
                  src={"http://localhost:8080/images/userprofile.png"}
                  alt="alt-text"
                  className="profile-image"
                />
                <div className="follower-username">
                  <span >@ {user.sender.userName}</span>
                </div>
              </div>
              <div className="">
                <button className="button request-button accept" onClick={() => {
                  accept(user.sender.userId)
                }}>Accept</button>
                <button className="button request-button reject" onClick={() => {
                  reject(user.sender.userId)
                }}>Reject</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );


};

export default RequestsCard;
