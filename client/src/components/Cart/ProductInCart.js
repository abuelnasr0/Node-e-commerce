import useFetch from "../../useFetch";
import Loading from "../Loading/Loading";

const ProductInCart = ({product_id , quantity , totalPrice , setTotalPrice , cart , setCart}) => {

    const link = `/api/products/list/${product_id}`;
    const {data:product , error , isPending} = useFetch(link);

    const removeCartItem = () => {
        setCart(cart.filter(item => item.product_id !== product_id));
       
    }

    
    return ( 
    
        <div className="product2">
        {error && <div> {error} </div>} 
        {isPending && <Loading />}
        {product && <>
                <div className="imgContainerCart">
                    <img src={product.image}/>
                </div>
                <div className="product2-info">
                    <h3 className="product2-name">{product.name}</h3>
                    <h4 className="product2-price">{product.price} LE</h4>
                    <button className="plus quan">+</button>
                    <span className="product2-quantity">{quantity}</span>
                    <button className="minus quan">-</button>
                    <p className="product2-remove">
                        <i className="fa fa-trash" aria-hidden="true"></i>
                        <span className="remove">Remove</span>
                    </p>
                </div>
            </>
        }
    </div>
);
};

export default ProductInCart;