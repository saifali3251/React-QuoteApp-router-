import { Fragment } from "react";
import { useRef, useState } from "react";
//we need to prevent user from moving to another page while he is filing the form which is not yet submitted. For that we use this Prompt hook that takes when and message as param. We will also use useState hook to simply store the state of form
// Concept : We will use useState to check if form is focused or not. Once form is focused, we will prevent the user from switching to other link using Prompt. Also, if the submit btn is clicked, we will set focus as false
import { Prompt } from "react-router-dom";

import Card from "../UI/Card";
import LoadingSpinner from "../UI/LoadingSpinner";
import classes from "./QuoteForm.module.css";

const QuoteForm = (props) => {
  const authorInputRef = useRef();
  const textInputRef = useRef();
  const [isEntering, setIsEntering] = useState(false);
  // const [finalVal, setFinalVal] = useState();

  const formFocusedHandler = (e) => {
    e.preventDefault()
    // console.log(e.target.value)
    // setFinalVal(e.target.value)
    setIsEntering(true);

    // console.log("Outside finalval = ",finalVal);
    // if(finalVal !== ''){
      // console.log("finalval = ",finalVal);
      // setIsEntering(true);
    // }
    // console.log("Focused");
  };


  function submitFormHandler(event) {
    event.preventDefault();

    const enteredAuthor = authorInputRef.current.value;
    const enteredText = textInputRef.current.value;

    // optional: Could validate here

    props.onAddQuote({ author: enteredAuthor, text: enteredText });
  }

  return (
    <Fragment>
      <Prompt when={isEntering} message={() => 'Changes not saved yet. Leave this page?'}/>
      <Card>
        <form
          onChange={formFocusedHandler}
          // onFocus={formFocusedHandler}
          className={classes.form}
          onSubmit={submitFormHandler}
        >
          {props.isLoading && (
            <div className={classes.loading}>
              <LoadingSpinner />
            </div>
          )}

          <div className={classes.control}>
            <label htmlFor="author">Author</label>
            <input type="text" id="author" ref={authorInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="text">Text</label>
            <textarea id="text" rows="5" ref={textInputRef}></textarea>
          </div>
          <div className={classes.actions}>
            <button onClick={() => setIsEntering(false)} className="btn">Add Quote</button>
          </div>
        </form>
      </Card>
    </Fragment>
  );
};

export default QuoteForm;
