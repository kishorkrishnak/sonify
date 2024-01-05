import { toast } from "react-hot-toast";
export const notifyLoginRequired = () =>
  toast("Login required for this feature", {
    duration: 1600,
    icon: "🔐",
  });
