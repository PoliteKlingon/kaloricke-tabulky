import axios from "../api/axios";

import IUserData from "../interfaces/IUserData"
import IUserGoals from "../interfaces/IUserGoals";

export const getUserData = async (sessionId: string) => {
  return await axios
    .get("user/", {
      headers: {
        Authorization: `Bearer ${sessionId}`,
      },
    })
    .then((res) => {
      const username = res?.data?.data?.details.username;
      localStorage.setItem(
        "auth",
        JSON.stringify({
          ssid: sessionId,
          username: username,
        })
      );
      return { status: 200, err:null, message: "Success" };
    })
    .catch((err) => {
      return { status: 400, err: err, message: "Get Data Error" };
    });
}

export const login = async (
  email: string,
  password: string
): Promise<any> => {
  try {
    return await axios
      .post(
        "/login",
        JSON.stringify({
          email: email,
          password: password,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(async (response) => {
        const ssid = response?.data?.data?.sessionId;
        return getUserData(ssid);
      })
      .catch((err) => {
        if (!err?.response) {
          return { status: 400, err: err, message: "Error" };
        } else if (err.response?.status === 401) {
          return {
            status: 400,
            err: err,
            message: "Špatný email nebo heslo",
          };
        }
      });
  } catch (err) {
    return { status: 400, err: err, message: "Error" };
  }
};

export const logout = async (): Promise<Boolean> => {
  //@ts-ignore
  const ssid = JSON.parse(window.localStorage.getItem("auth"))!.ssid;
  return await axios
    .post(
      "/logout",
      JSON.stringify({
        
        sessionId: ssid,
      }),
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${ssid}`,
        },
      }
    )
    .then(() => {
      localStorage.removeItem("auth");
      return true;
    })
    .catch(() => {
      return false;
    });
}

export const userRegister = async (
  password: string,
  userData: IUserData,
  userGoals: IUserGoals | undefined
) => {
  const data = userGoals
    ? JSON.stringify({
        password: password,
        details: {
          ...userData,
        },
        goals: {
          ...userGoals,
        },
      })
    : JSON.stringify({
        password: password,
        details: {
          ...userData,
        },
      });
  console.log(userData, userGoals);
  return await axios
    .post("/register", data, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      console.log("HERE")
      return getUserData(response.data.data.sessionId);
    })
    .catch((err) => {
      console.log(err)
      if (err.response?.status === 409) {
        return {
          status: 409,
          err: null,
          message: "Email už existuje",
        };
      }
      return { status: 400, err: err, message: "Error" };
    });
};
