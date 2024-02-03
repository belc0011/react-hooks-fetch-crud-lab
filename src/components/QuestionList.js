import React, {useState, useEffect} from "react";
import QuestionItem from "./QuestionItem"
function QuestionList({setQuestions, questions}) {

  useEffect(() => {
    fetch('http://localhost:4000/questions')
    .then(res => res.json())
    .then(data => {
      setQuestions(data)
      console.log(data)})
      .catch(console.log("error"))
    }, [])
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questions.map((question) => {
        return <QuestionItem key={question.id} question={question} questions={questions} setQuestions={setQuestions}/>
      })}</ul>
    </section>
  );
}

export default QuestionList;
