import { useContext } from "react";
import AuthContext from "./authprovider";

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
