import { useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Route } from "react-router-dom";
import useHttp  from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";
// import CommentsList from "../components/comments/CommentsList";
import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import LoadingSpinner from "../components/UI/LoadingSpinner";

// const DUMMY_QUOTES = [
//   {id:'p1',author:'saif',text:'Making things better!!'},
//   {id:'p2',author:'Sufia',text:'Learning Redux better!!'},
//   {id:'p3',author:'Rohan',text:'Making things you wish existed'}
// ]


const QuoteDetail = (props) =>{
  const param = useParams()
  //we are using useRouteMatch to keep our url same across all the pages. Like suppose we happen to change our url in App.js from '/quotes' to '/quote' . So we need to change it at all the places where ever it is defined so this is not optimal approach. Here comes the useRouteMatch. This will store the url info and can be easily used across all pages
  const match = useRouteMatch()
  console.log(match);

  const {sendRequest, status, data:loadedQuote, error} = useHttp(getSingleQuote,true)

  const {quoteId} = param;

  useEffect(()=>{
    sendRequest(quoteId)
  },[sendRequest,quoteId])

  // const quote = DUMMY_QUOTES.find((quote) => quote.id === param.quoteId)

  if (status === 'pending'){
    return (
      <div className="centered">
        <LoadingSpinner/>
      </div>
    )
  }
  if(error){
    return <p className="centered">{error}</p>
  }
  // if(!loadedQuote){
  //   return <p>No Quote Found!</p>
  // }
  if(!loadedQuote.text){
    return <p>No Quote Found!</p>
  }
  // if(!quote){
  //   return <p>No Quote Found!</p>
  // }

  return (
    <div>
      {/* <p>QuoteDetail</p> */}
      {/* <p>
      DUMMY_QUOTES.find((id) => id === param.quoteId )
      </p> */}
      {/* <HighlightedQuote text={quote.text} author={quote.author} /> */}
      <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} />
      {/* <p>{param.quoteId}</p> */}
      {/* <Route path='/quotes/:quoteId/comments'> */}

      <Route path={`/quotes/${param.quoteId}`} exact>
        <div className='centered'>
        {/* <Link className="btn--flat" to={`/quotes/${param.quoteId}/comments`}> */}
        <Link className="btn--flat" to={`${match.url}/comments`}>
          Load Comments
        </Link>
        </div>
      </Route>
      {/* <Route path={`/quotes/${param.quoteId}/comments`}> */}
      {/* This match.path has adv. over above approach as when we change the route in app.js from quotes to quote, this match.path will also change since we are taking this value from url */}
      <Route path={`${match.path}/comments`}>
        <Comments />
      </Route>
    </div>
  )

}

export default QuoteDetail;