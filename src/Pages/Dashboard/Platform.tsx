import { useState, useEffect } from "react";
import BottomBar from "../../Components/Dashboard/BottomBar";
import LeftBar from "../../Components/Dashboard/LeftBar";
import RightBar from "../../Components/Dashboard/RightBar";
import TopBar from "../../Components/Dashboard/TopBar";
import authService from "../../services/authService";
import tradeService from "../../services/tradeService";
import { toast } from "react-toastify";
import botService, { BotType } from "../../services/botService";
import TradingViewWidget from "../../Components/Dashboard/UserDashboard/Chart/TradingViewWidget";

const Platform = () => {
  // User data state
  const [balance, setBalance] = useState<number>(0);
  const [activeSubscription, setActiveSubscription] = useState<boolean>(false);
  const [botType, setBotType] = useState<BotType | null>(null);

  // Trade state
  const [amount, setAmount] = useState<number>(5000);
  const [duration, setDuration] = useState<number>(60);
  const [loading, setLoading] = useState<boolean>(false);
  const [tradeStatus, setTradeStatus] = useState<
    "idle" | "processing" | "completed"
  >("idle");
  const [tradeResult, setTradeResult] = useState<{
    amount: number;
    profit: number;
    percentage: number;
  } | null>(null);
  const [remainingTime, setRemainingTime] = useState<number>(0);

  useEffect(() => {
    fetchUserData();
    fetchBotSubscription();
  }, []);

  // Countdown timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (tradeStatus === "processing" && remainingTime > 0) {
      interval = setInterval(() => {
        setRemainingTime((prev) => {
          if (prev <= 1) {
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [tradeStatus, remainingTime]);

  const fetchUserData = async (): Promise<boolean> => {
    try {
      const profileResponse = await authService.getProfile();
      console.log("User profile response:", profileResponse);
      if (profileResponse.success && profileResponse.data) {
        console.log("Updating balance to:", profileResponse.data.balance);
        console.log("User total profit:", profileResponse.data.totalProfit);
        setBalance(profileResponse.data.balance);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error fetching user data:", error);
      return false;
    }
  };

  const fetchBotSubscription = async () => {
    try {
      const response = await botService.getActiveBotSubscription();
      if (response.success && response.data && response.data.isActive) {
        setActiveSubscription(true);
        if (response.data.botType) {
          setBotType(response.data.botType);
        }
      }
    } catch (error) {
      console.error("Error fetching bot subscription:", error);
    }
  };

  const handleStartTrade = async () => {
    console.log("Starting trade with amount:", amount, "duration:", duration);

    // Validate input
    if (!amount || amount <= 0) {
      toast.error("Please enter a valid trade amount");
      return;
    }

    if (amount > balance) {
      toast.error("Insufficient balance for this trade");
      return;
    }

    if (amount < 5000) {
      toast.error("Minimum trade amount is PKR 5,000");
      return;
    }

    if (amount > 50000) {
      toast.error("Maximum trade amount is PKR 50,000");
      return;
    }

    try {
      setLoading(true);
      setTradeStatus("processing");
      setRemainingTime(duration); // Set the countdown timer

      // Start the trade
      const response = await tradeService.startTrade({
        amount,
        duration, // duration is in seconds
        isBot: activeSubscription,
      });

      console.log("Trade response:", response); // Log the full response

      if (response.success && response.data) {
        // Extract the trade ID - check multiple possible property names
        const tradeId =
          response.data.id || response.data.tradeId || response.data._id;

        console.log("Trade ID extracted:", tradeId); // Log the extracted ID

        if (!tradeId) {
          console.error("No trade ID found in API response:", response.data);
          toast.error(
            "Trade started but no ID received. Please check your balance manually."
          );
          setTradeStatus("idle");
          return;
        }

        // Use the actual duration from state (converted to milliseconds)
        const actualDuration = duration * 1000;
        console.log(`Trade will complete in ${duration} seconds`);

        // Immediately update balance to reflect the deduction
        setBalance((prevBalance) => prevBalance - amount);

        setTimeout(() => {
          completeTrade(tradeId, amount);
        }, actualDuration);

        toast.success(`Trade started! Will complete in ${duration} seconds`);
      } else {
        setTradeStatus("idle");
        toast.error(response.message || "Failed to start trade");
      }
    } catch (error) {
      console.error("Error starting trade:", error);

      // Check if it's a network error or API error
      if (error instanceof Error) {
        toast.error(`Failed to start trade: ${error.message}`);
      }

      // Ask user before falling back to local simulation
      const shouldSimulate = window.confirm(
        "Failed to connect to server. Would you like to simulate the trade locally? (Note: This won't save your profits)"
      );

      if (shouldSimulate) {
        simulateLocalTrade(amount);
      } else {
        setTradeStatus("idle");
      }
    } finally {
      setLoading(false);
    }
  };

  // Fallback function to simulate a trade locally if API isn't available
  const simulateLocalTrade = (tradeAmount: number) => {
    toast.info(`Trade has been started - will complete in ${duration} seconds`);
    setRemainingTime(duration); // Set the countdown timer

    // Use the actual duration from state
    const actualDuration = duration * 1000;

    setTimeout(() => {
      let profitPercentage = 5; // Default 5% without bot

      if (activeSubscription && botType) {
        switch (botType) {
          case BotType.BASIC:
            // 10-15% profit for basic bot
            profitPercentage = Math.floor(Math.random() * 6) + 10;
            break;
          case BotType.ADVANCED:
            // 15-20% profit for advanced bot
            profitPercentage = Math.floor(Math.random() * 6) + 15;
            break;
          case BotType.PRO:
            // 20-25% profit for pro bot
            profitPercentage = Math.floor(Math.random() * 6) + 20;
            break;
          default:
            profitPercentage = 5; // Default 5%
        }
      }

      const profit = Math.floor(tradeAmount * (profitPercentage / 100));

      // Update local state for UI
      setTradeResult({
        amount: tradeAmount,
        profit,
        percentage: profitPercentage,
      });
      setTradeStatus("completed");
      setBalance((prevBalance) => prevBalance + tradeAmount + profit); // Add both original amount and profit

      toast.success(`Trade completed! You earned ${formatCurrency(profit)}`);

      // Reset after 10 seconds
      setTimeout(() => {
        setTradeStatus("idle");
        setTradeResult(null);
      }, 10000);
    }, actualDuration);
  };

  const completeTrade = async (tradeId: string, tradeAmount: number) => {
    try {
      console.log("Completing trade with ID:", tradeId); // Log the trade ID

      // Calculate profit based on bot type or default rate
      let profitPercentage = 5; // Default 5% without bot

      if (activeSubscription && botType) {
        switch (botType) {
          case BotType.BASIC:
            // 10-15% profit for basic bot
            profitPercentage = Math.floor(Math.random() * 6) + 10;
            break;
          case BotType.ADVANCED:
            // 15-20% profit for advanced bot
            profitPercentage = Math.floor(Math.random() * 6) + 15;
            break;
          case BotType.PRO:
            // 20-25% profit for pro bot
            profitPercentage = Math.floor(Math.random() * 6) + 20;
            break;
          default:
            profitPercentage = 5; // Default 5%
        }
      }

      const profit = Math.floor(tradeAmount * (profitPercentage / 100));

      // Call API to complete the trade
      const response = await tradeService.completeTrade({
        tradeId,
        profit,
        profitPercentage,
      });

      console.log("Complete trade response:", response);

      if (response.success && response.data) {
        // Log the returned trade data
        console.log("Trade completion data:", response.data);

        // Check if backend returned updated balance/profit
        if (response.data.userBalance !== undefined) {
          console.log(
            "Backend confirmed new balance:",
            response.data.userBalance
          );
          console.log(
            "Backend confirmed total profit:",
            response.data.userTotalProfit
          );
        }

        // Update local state for UI
        setTradeResult({
          amount: tradeAmount,
          profit,
          percentage: profitPercentage,
        });
        setTradeStatus("completed");

        // Immediately update the local balance (original amount + profit)
        const newBalance = balance + tradeAmount + profit;
        console.log(
          `Updating balance: ${balance} + ${tradeAmount} + ${profit} = ${newBalance}`
        );
        setBalance(newBalance);

        // Show toast notification with profit info
        toast.success(`Trade completed! You earned ${formatCurrency(profit)}`);

        // Reset after 10 seconds
        setTimeout(() => {
          setTradeStatus("idle");
          setTradeResult(null);
        }, 10000);

        // Refresh user data after a longer delay to ensure backend has processed the change
        setTimeout(async () => {
          console.log("Refreshing user data...");
          await fetchUserData();
          console.log("Data refreshed, dispatching balance update event");

          // Dispatch a custom event to refresh balance in other components
          window.dispatchEvent(new Event("balanceUpdated"));
        }, 3000);
      } else {
        console.error("Trade completion failed:", response);
        throw new Error(response.message || "Failed to complete trade");
      }
    } catch (error) {
      console.error("Error completing trade:", error);
      setTradeStatus("idle");

      // More specific error handling
      if (error instanceof Error) {
        if (
          error.message.includes("Network") ||
          error.message.includes("fetch")
        ) {
          toast.error(
            "Network error: Could not complete trade. Please check your connection."
          );
        } else {
          toast.error(`Error completing trade: ${error.message}`);
        }
      } else {
        toast.error("Unknown error completing trade");
      }

      // Don't automatically fall back to simulation - let user decide
      toast.warning(
        "Your trade could not be completed on the server. Profits may not be saved."
      );
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

  // const formatRemainingTime = (seconds: number): string => {
  //   if (seconds >= 60) {
  //     const minutes = Math.floor(seconds / 60);
  //     const remainingSeconds = seconds % 60;
  //     return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  //   }
  //   return `${seconds}s`;
  // };

  // Calculate bot profit rate
  const getBotProfitRate = (): number => {
    if (!botType) return 5;

    switch (botType) {
      case BotType.BASIC:
        return 12.5; // Mid-point of 10-15%
      case BotType.ADVANCED:
        return 17.5; // Mid-point of 15-20%
      case BotType.PRO:
        return 22.5; // Mid-point of 20-25%
      default:
        return 5;
    }
  };

  return (
    <div>
      <div className="flex md:flex-row flex-col">
        <LeftBar />
        <TopBar />
        <div className="w-full relative">
          <div className="bg-[#171022] md:block hidden py-3 rounded-lg border-[#403257] px-5 text-end absolute top-3 border right-5 text-white">
            <span className="text-[#c4c4ca] text-sm">PKR </span>
            {formatCurrency(balance).replace("PKR", "")}
          </div>

          {/* {tradeStatus === "processing" && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 bg-[#171022] p-8 rounded-lg border border-[#403257] text-white text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#5f29b7] mx-auto mb-4"></div>
              <h3 className="text-lg font-medium mb-2">Trade in Progress</h3>
              <p className="text-sm text-gray-400">
                Your trade of {formatCurrency(amount)} is being processed
              </p>
              <p className="text-2xl font-bold text-[#5f29b7] mt-4">
                {formatRemainingTime(remainingTime)}
              </p>
              <p className="text-xs text-gray-500 mt-1">Time remaining</p>
            </div>
          )} */}

          {tradeStatus === "completed" && tradeResult && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 bg-[#171022] p-8 rounded-lg border border-[#403257] text-white text-center">
              <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2 text-green-400">
                Trade Completed
              </h3>
              <div className="bg-[#201738] p-4 rounded-lg mb-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400">Amount:</span>
                  <span>{formatCurrency(tradeResult.amount)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400">Profit %:</span>
                  <span className="text-green-400">
                    {tradeResult.percentage}%
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-gray-700">
                  <span className="text-gray-400">Profit:</span>
                  <span className="text-green-400 font-medium">
                    {formatCurrency(tradeResult.profit)}
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-400">
                Profit added to your balance
              </p>
            </div>
          )}

          <TradingViewWidget tradeStatus={tradeStatus} />

          <BottomBar
            amount={amount}
            setAmount={setAmount}
            time={duration}
            setTime={setDuration}
            onStartTrade={handleStartTrade}
            isLoading={loading || tradeStatus === "processing"}
            botActive={activeSubscription}
            botType={botType}
            botProfitRate={getBotProfitRate()}
          />
        </div>
        <RightBar
          amount={amount}
          setAmount={setAmount}
          duration={duration}
          setDuration={setDuration}
          onStartTrade={handleStartTrade}
          isLoading={loading || tradeStatus === "processing"}
          botActive={activeSubscription}
          botType={botType}
          botProfitRate={getBotProfitRate()}
          balance={balance}
        />
      </div>
    </div>
  );
};

export default Platform;
