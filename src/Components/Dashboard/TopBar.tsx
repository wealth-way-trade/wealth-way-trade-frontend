import { FiUser } from "react-icons/fi";
import { IoWalletOutline } from "react-icons/io5";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import PaymentMethods from "./PaymentMethods";
import { Link } from "react-router";
import { useState, useEffect } from "react";
import authService from "../../services/authService";

const TopBar = () => {
  const [balance, setBalance] = useState<number>(0);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const profileResponse = await authService.getProfile();
      if (profileResponse.success && profileResponse.data) {
        setBalance(profileResponse.data.balance);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "PKR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div>
      <div className="md:hidden flex items-center justify-between p-3 bg-[#171022]">
        <Link
          to={"/user-dashboard"}
          className="w-12 h-12 hover:opacity-80 transition-all duration-500 cursor-pointer bg-[#5f29b760] flex items-center justify-center text-white rounded-full"
        >
          <FiUser className="text-2xl" />
        </Link>
        <div className="bg-[#171022] py-3 rounded-lg border-[#403257] px-5 text-end border right-5 text-white">
          <span className="text-[#c4c4ca] text-sm">PKR </span>
          {formatCurrency(balance).replace("PKR", "")}
        </div>
        <Sheet>
          <SheetTrigger>
            <div className="w-12 h-12 hover:opacity-80 transition-all duration-500 cursor-pointer bg-[#5f29b760] flex items-center justify-center text-white rounded-lg">
              <IoWalletOutline className="text-2xl" />
            </div>
          </SheetTrigger>
          <SheetContent>
            <PaymentMethods />
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default TopBar;
