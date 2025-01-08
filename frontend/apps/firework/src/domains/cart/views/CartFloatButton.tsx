import { FloatButton } from "antd";
import { ShoppingCart } from "lucide-react";
import { useCartFireworks } from "./CartContext";

function CartFloatButton() {
  const cartFireworks = useCartFireworks();
  const getTotalQuantity = () => {
    return Object.values(cartFireworks).reduce(
      (acc, item) => acc + item.quantity,
      0
    );
  };
  const count = getTotalQuantity();

  return (
    <FloatButton.Group shape="circle">
      <FloatButton badge={{ count }} icon={<ShoppingCart />} />
    </FloatButton.Group>
  );
}

export { CartFloatButton };
