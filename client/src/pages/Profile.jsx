/* eslint-disable no-unused-vars */
import ".././style/loading.css";
import ".././style/loading.css";

import { selectCurrentUser } from "../features/authSlice";
import { useGetSurveysQuery } from "../features/api/apiSlice";
import { useSelector } from "react-redux";

function Profile() {
  const { id, email, fullname } = useSelector(selectCurrentUser);
  const { data, isLoading } = useGetSurveysQuery(id);

  if (isLoading) return <div className="loading">LOADING...</div>;

  return (
    <div className="center" style={{ marginTop: "100px" }}>
      <p>
        <b>Name:</b> {fullname}
      </p>
      <p>
        <b>Email:</b> {email}
      </p>
      <p>
        <b>
          Number of surveys: {[...data].filter((d) => d.userId === id).length}
        </b>{" "}
      </p>
    </div>
  );
}

export default Profile;
