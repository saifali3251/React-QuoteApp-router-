import { useEffect } from "react";
import QuoteList from "../components/quotes/QuoteList";
import useHttp from "../hooks/use-http";
import { getAllQuotes } from "../lib/api";

import LoadingSpinner from "../components/UI/LoadingSpinner";
import NoQuotesFound from "../components/quotes/NoQuotesFound";


// const DUMMY_QUOTES = [
//   {id:'p1',author:'saif',text:'Making things better!!'},
//   {id:'p2',author:'Sufia',text:'Learning Redux better!!'},
//   {id:'p3',author:'Rohan',text:'Making things you wish existed'}
// ]

const AllQuotes = () =>{

  //useHttp returns sendRequest, status,data and error as specified in use-http.js hook
  const {sendRequest, status, data: loadedQuotes, error} = useHttp(
    getAllQuotes, true
  );

  // console.log(sendRequest);
  console.log(loadedQuotes);
  console.log(status);

  useEffect(() =>{
    console.log('useEffect running..');
    sendRequest();
  },[sendRequest]);

  if(status === 'pending'){
    return (
      <div className="centered">
        <LoadingSpinner/>
      </div>
    );
  }

  if(error){
    return <p className="centered focussed">{error}</p>;
  }
  if(status === 'completed' && (!loadedQuotes || loadedQuotes.length === 0)){
    return <NoQuotesFound/>
  }

  return (
    <div>

    {/* <p>All Quotes</p> */}
      {/* <QuoteList quotes={DUMMY_QUOTES} /> */}
      <QuoteList quotes={loadedQuotes} />
    </div>
  )

}

export default AllQuotes;