import React from "react";

function QuestionItem({ question, questions, setQuestions }) {
  const { id, prompt, answers, correctIndex } = question;
  console.log(answers)
  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));
    function handleDelete(event) {
      console.log(event.target.id)
      fetch(`http://localhost:4000/questions/${event.target.id}`, {
        method: "DELETE"
      })
      .then(res => res.json())
      .then(data => {
        const idInteger = parseInt(event.target.id)
        setQuestions(prevQuestions => questions.filter((subquestion) => {
          return subquestion.id !== idInteger
        }))
      })
      .catch(console.log("error"))
    }
    function handleChange(e) {
      const questionNumber = parseInt(e.target.id)
      const correctedIndex = parseInt(e.target.value)
      fetch(`http://localhost:4000/questions/${questionNumber}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "correctIndex": correctedIndex
        })
      })
      .then(res => res.json())
      .then(data => console.log(data))
    }
  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select id={id} defaultValue={correctIndex} onChange={handleChange}>{options}</select>
      </label>
      <button id={id} onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
