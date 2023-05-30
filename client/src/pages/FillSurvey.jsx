/* eslint-disable no-unused-vars */
import { Button } from "react-bootstrap";
import ".././style/center.css";
import ".././style/loading.css";
import ".././style/button.css";

import {
  useCreateResultMutation,
  useGetSurveyByHashQuery,
} from "../features/api/apiSlice";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

function FillSurvey() {
  const hash = window.location.href.substring(
    window.location.href.lastIndexOf("/") + 1
  );

  const [pageIndex, setPageIndex] = useState(1);
  const [navIndex, setNavIndex] = useState([]); //storing all the numbers from 1 to the number of pages
  const [dict, setDict] = useState([[]]); //storing the questions with their answer for every page at different array index
  const [createResult, { isLoading: isLoadingCreate }] =
    useCreateResultMutation();
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const navigate = useNavigate();

  const {
    data,
    isLoading: isLoadingGet,
    isError,
  } = useGetSurveyByHashQuery(hash);

  //TESTING DATA
  // const data = {
  //   name: "Survey5",
  //   content:
  //     "Page1\nQuestion1\nQuestion2\n\nPage2\nQuestion3\nQuestion4\nQuestion5\n\nPage3\nQuestion6",
  // };

  if (isLoadingGet || isLoadingCreate)
    return <div className="loading">LOADING...</div>;

  if (isError) return <div className="loading error">HASH NOT FOUND!</div>;

  if (!isDataLoaded) {
    let dict_tmp = [[]];
    let dataArr = data[0].content.split("\n");
    let ind = 0; //current page index
    let indexArr = [1]; //storing all the numbers from 1 to the number of pages
    for (let i = 1; i < dataArr.length; ++i) {
      if (dataArr[i] === "" && i < dataArr.length - 1) {
        ++i;
        ++ind;
        dict_tmp.push([]);
        indexArr.push(ind + 1);
      } else if (i < dataArr.length - 1) {
        dict_tmp[ind].push({ question: dataArr[i], answer: "", filled: false });
      }
    }
    setNavIndex(indexArr);
    setDict(dict_tmp);
    setIsDataLoaded(true);
  }

  const handlePageChange = (e, ind) => {
    e.preventDefault();
    for (let i = 0; i < dict[ind - 1].length; ++i) {
      if (!dict[ind - 1][i].filled) return;
    }
    setPageIndex(ind);
  };

  const handleAnswer = (e, ind) => {
    let modifiedData = {};
    for (let i = 0; i < dict[pageIndex - 1].length; ++i) {
      if (
        dict[pageIndex - 1][ind].question === dict[pageIndex - 1][i].question
      ) {
        modifiedData = dict[pageIndex - 1];
        modifiedData[ind].answer = e.target.value;
        if (e.target.value != "") modifiedData[ind].filled = true;
        else modifiedData[ind].filled = false;
      }
    }

    let newdata = [
      ...dict.slice(0, pageIndex - 1),
      modifiedData,
      ...dict.slice(pageIndex, navIndex.length),
    ];

    setDict(newdata);
  };

  const handleBack = (e) => {
    setPageIndex(pageIndex - 1);
  };
  const handleNext = (e) => {
    for (let i = 0; i < dict[pageIndex - 1].length; ++i) {
      if (!dict[pageIndex - 1][i].filled) return;
    }
    setPageIndex(pageIndex + 1);
  };
  const handleSend = async () => {
    let body = "";
    for (let i = 0; i < dict.length; ++i) {
      for (let j = 0; j < dict[i].length; ++j) {
        if (dict[i][j].answer === "") return;
        body += dict[i][j].question + ":" + dict[i][j].answer + "\n";
      }
      body += "\n";
    }

    try {
      await createResult({
        surveyId: data[0].id,
        content: body,
      });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="center">
      <h1 className="heading">{data[0].name}</h1>
      {/* NAVIGATION BUTTONS */}
      {navIndex.map((navInd, key) => (
        <Button
          key={navInd + key + "navbtn"}
          style={{ marginLeft: "3px", marginRight: "3px", width: "40px" }}
          className={
            navInd === pageIndex
              ? ""
              : [...dict[navInd - 1]].filter((d) => !d.filled).length === 0
              ? "activeSend"
              : "unfilled"
          }
          onClick={(e) => handlePageChange(e, navInd)}
        >
          {navInd}
        </Button>
      ))}
      {/* QUESTIONS */}
      <Form className="form">
        {dict[pageIndex - 1].map((d, ind) => (
          <Form.Group
            className="mb-3"
            controlId="formBasicName"
            key={d + ind + "group"}
          >
            <Form.Control
              type="text"
              placeholder={dict[pageIndex - 1][ind].question}
              onChange={(e) => handleAnswer(e, ind)}
              value={dict[pageIndex - 1][ind].answer}
              required
            />
          </Form.Group>
        ))}
        {/* BACK | NEXT | SEND   BUTTONS */}
        {pageIndex > 1 && (
          <Button className="left green" onClick={handleBack}>
            BACK
          </Button>
        )}
        {pageIndex < navIndex.length && (
          <Button className="right green" onClick={handleNext}>
            NEXT
          </Button>
        )}
        {pageIndex === navIndex.length && (
          <Button className="right send" onClick={handleSend}>
            SEND
          </Button>
        )}
      </Form>
    </div>
  );
}

export default FillSurvey;
