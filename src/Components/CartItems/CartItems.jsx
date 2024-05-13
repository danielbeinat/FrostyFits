import { useContext } from "react";
import "./CartItems.scss";
import { ShoopContext } from "../../Context/ShoopContext";
import { MdDelete } from "react-icons/md";

export const CartItems = () => {
  const { Allproducts, cart, removeFromCart, getTotalCartAmount } =
    useContext(ShoopContext);
  return (
    <>
      <div className="cart-items">
        <div className="cart-description">
          <h1>Productos</h1>
          <h1>Nombre</h1>
          <h1>Precio</h1>
          <h1>Cantidad</h1>
          <h1> Total</h1>
          <h1>Eliminar</h1>
        </div>

        <hr />
        {Allproducts.map((item) => {
          if (cart[item.id] > 0) {
            return (
              <div key={item.id} className="products">
                <img src={item.image} alt="" />
                <p>{item.name}</p>
                <p>${item.price.toLocaleString()}</p>
                <button>{cart[item.id]}</button>
                <p>${item.price * cart[item.id].toLocaleString()}</p>
                <button onClick={() => removeFromCart(item.id)}>
                  <MdDelete size={20} />
                </button>
              </div>
            );
          }

          return null;
        })}

        <div className="cartitems-down">
          <div className="cartitems-total">
            <h1>Total Carrito</h1>
            <div>
              <div className="cartitems-total-item">
                <p>Subtotal</p>
                <p>$ {getTotalCartAmount().toLocaleString()}</p>
              </div>
              <hr />
              <div className="cartitems-total-item">
                <p>Envio</p>
                <p>Gratis</p>
              </div>
              <hr />
              <div className="cartitems-total-item">
                <p>Total</p>
                <p>$ {getTotalCartAmount().toLocaleString()}</p>
              </div>
            </div>
            <button type="submit">Comprar</button>
          </div>

          <div className="promo">
            <p>¿Tenés un código de descuento?</p>
            <div className="sendcode">
              <input type="text" placeholder="Código promocional" />
              <button type="submit">Aplicar</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
