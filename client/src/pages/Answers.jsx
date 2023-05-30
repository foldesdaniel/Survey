/* eslint-disable no-unused-vars */
import ".././style/loading.css";
import ".././style/center.css";
import ".././style/font.css";
import ".././style/list.css";

import ListGroup from "react-bootstrap/ListGroup";
import { useGetSurveysQuery } from "../features/api/apiSlice";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../features/authSlice";
import { useNavigate } from "react-router-dom";

function Answers() {
  const { id: user_id } = useSelector(selectCurrentUser);
  const { data, isLoading } = useGetSurveysQuery(user_id);
  const navigate = useNavigate();

  const handleClick = (survey_id, name, content) => {
    let questions = [];
    const data = content.split("\n");
    for (let i = 1; i < data.length; ++i) {
      if (data[i] === "") ++i;
      else questions.push(data[i]);
    }
    navigate("/answer", {
      state: { id: survey_id, name: name, questions: questions },
    });
  };

  if (isLoading) return <div className="loading">LOADING...</div>;

  return (
    <div className="center">
      <h1 className="heading">Answers</h1>
      <ListGroup as="ul" style={{ width: "40%", margin: "auto" }}>
        {[...data].map((e, i) => (
          <ListGroup.Item
            as="li"
            key={e + i + "li"}
            className="li-item"
            onClick={() => handleClick(e.id, e.name, e.content)}
          >
            {e.name}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}

export default Answers;
