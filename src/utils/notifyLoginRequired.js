import { toast } from "react-hot-toast";
export const notifyLoginRequired = () =>
  toast("Login to enjoy music streaming!", {
    duration: 1600,
    icon: "🧑🏻‍🎤",
  });
