import { toast } from "react-hot-toast";
export const notifyLoginRequired = () =>
  toast("Login required for this feature", {
    position:"bottom-center",
    duration: 1600,
    
  });
