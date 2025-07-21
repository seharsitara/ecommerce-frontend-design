import MessageIcon from "../../icon/message";
import ProfileIcon from "../../icon/profile";
import CartIcon from "../../icon/cart";
import OrdersIcon from "../../icon/orders";

const actions = [
  { name: "Message", icon: MessageIcon, color: "text-blue-600" },
  { name: "Profile", icon: ProfileIcon, color: "text-gray-700" },
  { name: "Cart", icon: CartIcon, color: "text-green-600" },
  { name: "Orders", icon: OrdersIcon, color: "text-yellow-600" },
];

export default function ActionIcon() {
  return (
    <div
      className="absolute top-[18px] left-[1010px] w-[228px] h-[41px] space-x-2  opacity-100 rotate-0 rounded flex items-center justify-between px-4"
      style={{ minWidth: 0 }}
    >
      {actions.map(({ name, icon: Icon, color }) => (
        <div key={name} className="flex flex-col items-center  justify-center flex-1">
          <Icon className={`w-6 h-6 ${color}`}  />
          <span className="text-xs text-gray-600 mt-1 truncate w-full text-center">{name}</span>
        </div>
      ))}
    </div>
  );
}
