/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable no-unused-vars */
import ".././style/loading.css";
import ".././style/center.css";
import ".././style/button.css";
import ".././style/font.css";

import {
  useGetSurveysQuery,
  useDeleteSurveyMutation,
} from "../features/api/apiSlice";
import { selectCurrentUser } from "../features/authSlice";
import { useSelector } from "react-redux";
import Table from "react-bootstrap/Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMessage,
  faLink,
  faPenToSquare,
  faSquareMinus,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Mysurveys() {
  const { id } = useSelector(selectCurrentUser);
  const [deleteSurvey, { isLoading: isLoadingDelete }] =
    useDeleteSurveyMutation();
  const { data, isLoading: isLoadingGet } = useGetSurveysQuery(id);
  const navigate = useNavigate();

  if (isLoadingGet || isLoadingDelete)
    return <div className="loading">LOADING...</div>;

  const handleCheckAnswers = (survey_id, name, content) => {
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
  const handleCopyLink = (hash) => {
    const url = window.location.origin + "/survey/" + hash;
    navigator.clipboard.writeText(url);
  };
  const handleModify = (id, content) => {
    navigate("/newsurvey", { state: { id: id, content: content } });
  };
  const handleDelete = async (id) => {
    try {
      await deleteSurvey({
        id: id,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleNavigate = (e) => {
    e.preventDefault();
    navigate("/newsurvey", { state: { id: -1, content: "" } });
  };

  return (
    <div className="center">
      <h1 className="heading">Surveys</h1>
      <Table striped hover style={{ width: "80%", margin: "auto" }}>
        <thead>
          <tr>
            <th style={{ textAlign: "left" }}>name</th>
            <th style={{ textAlign: "right" }}>actions</th>
          </tr>
        </thead>
        <tbody>
          {[...data].map((e, i) => (
            <tr key={e + i}>
              <td style={{ textAlign: "left" }}>
                <p>{e.name}</p>
              </td>
              <td style={{ textAlign: "right" }}>
                <FontAwesomeIcon
                  icon={faMessage}
                  size="2x"
                  style={{ marginRight: "10px", marginLeft: "10px" }}
                  className="survey-btn"
                  onClick={() => handleCheckAnswers(e.id, e.name, e.content)}
                />
                <FontAwesomeIcon
                  icon={faLink}
                  size="2x"
                  style={{ marginRight: "10px", marginLeft: "10px" }}
                  className="survey-btn"
                  onClick={() => handleCopyLink(e.hash)}
                />
                <FontAwesomeIcon
                  icon={faPenToSquare}
                  style={{
                    color: "#005eff",
                    marginRight: "10px",
                    marginLeft: "10px",
                  }}
                  size="2x"
                  className="survey-btn"
                  onClick={() =>
                    handleModify(e.id, e.name + "\n\n" + e.content)
                  }
                />
                <FontAwesomeIcon
                  icon={faSquareMinus}
                  style={{
                    color: "#ff0000",
                    marginRight: "10px",
                    marginLeft: "10px",
                  }}
                  size="2x"
                  className="survey-btn"
                  onClick={() => handleDelete(e.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button
        style={{ marginTop: "40px", fontSize: "1.3rem" }}
        onClick={handleNavigate}
      >
        New survey
      </Button>
    </div>
  );
}

export default Mysurveys;
