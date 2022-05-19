import QuoteForm from "../components/quotes/QuoteForm";
import { useHistory } from "react-router-dom";
import useHttp from "../hooks/use-http";
import { addQuote } from "../lib/api";
import { useEffect } from "react";

const NewQuote = () =>{

  const {sendRequest, status} = useHttp(addQuote);
  const history = useHistory()

  //we are using this useEffect to use the clean function to render the page once the status is completed.
  useEffect(() =>{
    if(status === 'completed'){
      history.push('/quotes')
    }
  },[status,history]);

  const addQuoteHandler = (quoteData) =>{
    console.log(quoteData);
    sendRequest(quoteData)

    //we need to add something here so that once the user submits the form he get redirected to some other place. We implement here bcs this method is only calling the form.
    // we will use a hook called useHistory()
    //useHistory allows us to change page history/url

    // history.push('/quotes')//push allows to go back to the form page.
    //replace wont allow to go back and just replace to passed route

  }
  return(
    <QuoteForm isLoading={status === 'pending'} onAddQuote={addQuoteHandler} />
  )

}

export default NewQuote;