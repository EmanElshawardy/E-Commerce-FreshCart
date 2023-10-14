import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { useCart } from '../../Context/CartContext';

function Cart() {

  const { removeProductFromCart,
    updateProductCount,
    clearCart,
    totalCart,
    cartId,
    cartProducts } = useCart()
  return (
    <>
      <Helmet>
        <title> Cart </title>
      </Helmet>
        <div className="my-5">
          <button
            className="btn btn-outline-danger d-block ms-auto"
            onClick={clearCart}
          >
            Clear Cart
          </button>
          <div className="d-flex justify-content-between my-2">
            <p>
              <span className="fw-bolder fw-bold">Total cart Price: </span>
              <span className="text-main">{totalCart}</span>
            </p>
            <Link
              to={"/address/" + cartId}
              className="btn btn-success text-white"
            >
              {" "}
              CheckOut
            </Link>
          </div>
          {cartProducts?.map((product, index) => {
            const subtotal = product.count * product.price;

            return (
              <div
                key={product._id}
                className=" cart-product shadow rounded-2 my-3"
              >
                <div className="row align-items-center">
                  <div className="col-md-2">
                    <img
                      className="w-100"
                      src={product.product.imageCover}
                      alt=""
                    />
                  </div>
                  <div className="col-md-8">
                    <h2>{product.product.title}</h2>
                    <h5>{product.product.category.name}</h5>
                    <p className="d-flex justify-content-between">
                      <span>{product.price}EGP</span>
                      <span>
                        <i className="fas fa-star rating-color me-1"></i>
                        {product.product.ratingsAverage}
                      </span>
                    </p>
                    <p>
                      <span className="fw-bolder">Total Price:</span> {subtotal}
                      EGP
                    </p>
                  </div>
                  <div className="col-md-2">
                    <button
                      className="btn text-danger"
                      onClick={() => removeProductFromCart(product.product._id)}
                    >
                      <i className="fa-solid fa-trash"></i> Remove
                    </button>
                    <div className="d-flex align-items-center">
                      <button
                        className="btn bg-main text-white mx-2"
                        onClick={() =>
                          updateProductCount(
                            product.product._id,
                            product.count - 1,
                            index
                          )
                        }
                      >
                        -
                      </button>
                      <span>{product.count}</span>
                      <button
                        className="btn bg-main text-white mx-2"
                        onClick={() =>
                          updateProductCount(
                            product.product._id,
                            product.count + 1,
                            index
                          )
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
    </>
  );
}

export default Cart;