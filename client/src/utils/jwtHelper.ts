import { jwtDecode, JwtPayload } from "jwt-decode";

export function getCookie(name) {
  try {
    const value = `; ${document.cookie}`;
    console.log(value);
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      const cookie = parts.pop().split(";").shift();
      console.log(cookie);
      return cookie;
    }
  } catch (error) {
    console.error("Error trying to access cookie: ", name);
  }
}

interface CustomJwtPayload extends JwtPayload {
  username?: string;
}

export const getUserName = () => {
  try {
    const token = getCookie("token"); //Get the cookie containing the JWT.
    if (token) {
      const decodedToken = <CustomJwtPayload>jwtDecode(token);
      const username = decodedToken.username;
      return username;
    }
  } catch (error) {
    console.error("Error trying to read username from cookie.");
  }
};

const getExpirationTime = () => {
  try {
    const token = getCookie("token"); //Get the cookie containing the JWT.
    if (token) {
      const decodedToken = <CustomJwtPayload>jwtDecode(token);
      const time = decodedToken.exp * 1000;
      return time ? time : 1000;
    }
  } catch (error) {
    console.error("Error trying to read username from cookie.");
    return 1000;
  }
};

export const startJWTSequence = () => {
  try {
    const timetillExpired = getExpirationTime() - Date.now() - 5000;
    console.log("TUE: ", timetillExpired / 1000);
    setTimeout(() => {
      refreshToken(getCookie("token"));
    }, timetillExpired);
  } catch (error) {
    console.log(error);
  }
};

const refreshToken = async (lastToken: String) => {
  try {
    const currentToken = getCookie("token");
    if (currentToken === lastToken) {
      let response = await fetch(
        "http://localhost:5000/api/auth/regenerate_token",
        {
          method: "Get",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Include cookies in the request
        }
      );
      const timetillExpired = getExpirationTime() - Date.now() - 5000;
      console.log("TUE: ", timetillExpired / 1000);

      if (!response.ok) {
        throw new Error("Error trying to regenerate a JWT");
      }

      setTimeout(() => {
        refreshToken(getCookie("token"));
      }, timetillExpired);
    }
  } catch (error) {
    console.error("There has been a problem with regenerating a token.", error);
  }
};
