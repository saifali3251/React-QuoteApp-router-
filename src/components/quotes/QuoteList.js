import { Fragment } from 'react';
//useHistory allows us to change the page url
//useLocation has the information about the currently loaded page
//with use of these hooks we will try sorting our quotes on asc/des.
//sorting can be also done using useState hook but we prefer using these hooks for now
import { useHistory, useLocation } from 'react-router-dom';
import QuoteItem from './QuoteItem';
import classes from './QuoteList.module.css';

const sortQuotes = (quotes,ascending) =>{
  return quotes.sort((quoteA,quoteB) =>{
    if (ascending) {
      return quoteA.id > quoteB.id ? 1 : -1;
    }
    else{
      return quoteA.id < quoteB.id ? 1 : -1;
    }
  })
}

const QuoteList = (props) => {

  const history = useHistory();
  const location = useLocation();

  console.log(location)//check this log important
  //this location contains all info about the url

  //this is built in browser method to get query param
  const queryParam = new URLSearchParams(location.search);

  const isSortingAscending = queryParam.get('sort') === 'asc';

  const sortedQuotes = sortQuotes(props.quotes,isSortingAscending)

  const changeSortHandler = () =>{
    // history.push('/quotes?sort=asc') //will use dynamic queryparam below
    history.push({
      pathname: location.pathname,
      search: `?sort=${(isSortingAscending ? 'desc' : 'asc')}`
    });

    //Above object wise url looks better
    // history.push('/quotes?sort=' + (isSortingAscending ? 'desc' : 'asc'));
  }
  return (
    <Fragment>
      <div className={classes.sorting}>
        <button onClick={changeSortHandler}>
          sort {isSortingAscending ? 'Descending' : 'Ascending'}
        </button>
      </div>
      <ul className={classes.list}>
        {sortedQuotes.map((quote) => (
          <QuoteItem
            key={quote.id}
            id={quote.id}
            author={quote.author}
            text={quote.text}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default QuoteList;
