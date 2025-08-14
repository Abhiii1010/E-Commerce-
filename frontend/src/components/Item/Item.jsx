import { Link } from "react-router-dom";
import "./Item.css"; 

function Item(props) {
  return (
    <div className="item">
      <Link to={`/product/${props.id}`} style={{ textDecoration: "none", color: "inherit" }}>
        <img
          src={props.image}
          alt={props.name}
          onClick={() => window.scrollTo(0, 0)} // ✅ FIXED
        />
        <p>{props.name}</p>
        <div className="item-price">
          <div className="item-price-new">${props.new_price}</div>
          <div className="item-price-old">${props.old_price}</div>
        </div>
      </Link>
    </div>
  );
}

export default Item;
