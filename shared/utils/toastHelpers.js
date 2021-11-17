import toast from "react-hot-toast"

export const notifyApiDisabled = () => {
  toast.error("This function requires the backend API, which is disabled for the demo")
}