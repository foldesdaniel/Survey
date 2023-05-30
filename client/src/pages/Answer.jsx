/* eslint-disable no-unused-vars */
import ".././style/loading.css";
import ".././style/center.css";
import ".././style/font.css";
import ".././style/container.css";

import { useLocation } from "react-router-dom";
import { useGetResultsQuery } from "../features/api/apiSlice";

/*
    content: "question1:answer1\nquestion2:answer2..."
/*/

function Answer() {
  const { state } = useLocation();
  const { id: survey_id, name, questions } = state;
  const { data, isLoading } = useGetResultsQuery(survey_id);

  let indexes = [];
  for (let i = 0; i < questions.length; ++i) {
    indexes.push(i);
  }

  if (isLoading) return <div className="loading">LOADING...</div>;

  return (
    <div className="center">
      <h1 className="heading">Answers</h1>
      <div style={{ width: "60%", margin: "auto" }}>
        <h1 style={{ textAlign: "left", marginBottom: "20px" }}>{name}</h1>
        {indexes.map((ind, key) => (
          <div className="outer-answer" key={ind + key + "div"}>
            <p>{questions[ind]}</p>
            {data.map((dat, keyy) =>
              dat.content
                .split("\n")
                .filter((e) => e.split(":")[0] === questions[ind])
                .map((ee) => {
                  let v = ee.split(":")[1];
                  return (
                    <div
                      className="inner-answer"
                      key={dat + keyy + "div-inner"}
                    >
                      <p>{v}</p>
                    </div>
                  );
                })
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Answer;
