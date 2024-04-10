import { useEffect, useState } from "react";
import { userContext } from "@/utils/context/userProvider";
import { useContext } from "react";
import { useRouter } from "next/router";

const User = () => {
  const router = useRouter();
  const {user} = useContext(userContext);
  const [loginFailed, setLoginFailed] = useState(false);

  useEffect(() => {

    if (user) {
        router.push("/user/main");
    } else {
      setLoginFailed(true);
      setTimeout(() => {
        router.push("/");
      }, 3000); // Redirect to the home page after 2 seconds
    }
  }, [user, router]);

  if (loginFailed) {
    return (
      <div>
        <p>Credenciales incorrectas. Intenta de nuevo.</p>
      </div>
    );
  }

  return null; // No need to return anything, as router.push is used for navigation.
};

export default User;