import axios from "../api/axios";

interface LoginResult {
  status: boolean;
  err: any;
  message: string;
}

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
      return { status: true, message: "Success" };
    })
    .catch((err) => {
      return { status: false, err: err, message: "Get Data Error" };
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
          return { status: false, err: err, message: "Error" };
        } else if (err.response?.status === 401) {
          return {
            status: false,
            err: null,
            message: "Špatný email nebo heslo",
          };
        }
      });
  } catch (err) {
    return { status: false, err: err, message: "Error" };
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
interface userData {
  email: string;
  username: string;
  name: string;
  surname: string;
  height: number;
  weight: number;
  birthDate: string;
  sex: number;
}

interface userGoals {
  calories: number;
  proteins: number;
  carbs: number;
  fats: number;
  fiber: number;
  salt: number;
}

export const userRegister = async (
  password: string,
  userData: userData,
  userGoals: userGoals | undefined
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
  return await axios.post(
    "/register",
    data,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  ).then((response) => {
    return getUserData(response.data.data.sessionId);
  }).catch((err) => {
    if (!err?.response) {
      return { status: true, err: err, message: "Error" };
    } else if (err.response?.status === 409) {
      return {
        status: false,
        err: null,
        message: "Email už existuje",
      };
    }
  });

};
