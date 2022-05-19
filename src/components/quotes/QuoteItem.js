import classes from './QuoteItem.module.css';
import { Link } from 'react-router-dom';


const QuoteItem = (props) => {
  return (
    <li className={classes.item}>
      <figure>
        <blockquote>
          <p>{props.text}</p>
        </blockquote>
        <figcaption>{props.author}</figcaption>
      </figure>
      {/* <NavLink className='btn'>
      View Fullscreen
      </NavLink> */}
      {/* <Link className='btn' to='quotes/{props.id}'> */}
      <Link className='btn' to={`quotes/${props.id}`}>
        View Fullscreen
      </Link>
    </li>
  );
};

export default QuoteItem;
