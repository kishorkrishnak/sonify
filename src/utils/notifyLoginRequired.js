import { toast } from "react-hot-toast";

const notifyLoginRequired = () =>
  toast("Login required for this feature", {
    duration: 1600,
  });

export default notifyLoginRequired