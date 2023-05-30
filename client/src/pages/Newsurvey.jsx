/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import ".././style/center.css";
import ".././style/font.css";
import ".././style/loading.css";

import { Button } from "react-bootstrap";
import { useState } from "react";
import {
  useCreateSurveyMutation,
  useModifySurveyMutation,
} from "../features/api/apiSlice";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Newsurvey() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { id, content } = state;
  const [createSurvey, { isLoading: isLoadingCreate }] =
    useCreateSurveyMutation();
  const [modifySurvey, { isLoading: isLoadingModify }] =
    useModifySurveyMutation();

  const [text, setText] = useState(content);
  const [error, setError] = useState(false);

  const handleAdd = async (e) => {
    setError(false);
    if (text === "") {
      setError(true);
      return;
    }

    const data = text.split("\n");
    const title = data[0];

    if (data.length < 4 || data[0] === "" || data[1] !== "") {
      setError(true);
      return;
    }

    for (let i = 2; i < data.length - 1; ++i) {
      if (data[i] === "") {
        if (data[i - 1] === "" || data[i + 1] === "") {
          setError(true);
          return;
        }
      }
      if (data[i - 1] === "" && data[i + 1] === "") {
        setError(true);
        return;
      }
    }
    if (data[data.length - 1] !== "" && data[data.length - 2] === "") {
      setError(true);
      return;
    }
    try {
      let newdata = data.splice(2, data.length - 1);
      let content = "";
      for (let i = 0; i < newdata.length; ++i) content += newdata[i] + "\n";
      if (id === -1) {
        await createSurvey({
          name: title,
          content: content,
        });
      } else {
        await modifySurvey({ id: id, name: title, content: content });
      }
      navigate("/mysurveys");
    } catch (err) {
      console.log(err);
    }
  };

  if (isLoadingCreate || isLoadingModify)
    return <div className="loading">LOADING...</div>;

  return (
    <div className="center">
      <h1 className="heading">New survey</h1>
      <textarea
        cols="70"
        rows="11"
        onChange={(e) => setText(e.target.value)}
        value={text}
      ></textarea>
      <br />
      <Button
        style={{ marginTop: "40px", fontSize: "1.3rem" }}
        onClick={handleAdd}
      >
        {id === -1 && "Add"}
        {id !== -1 && "Modify"}
      </Button>
      <div style={{ textAlign: "center", marginTop: "40px", color: "red" }}>
        {error && <p>Invalid input!</p>}
      </div>
    </div>
  );
}

export default Newsurvey;
