import axios from "../api/axios";

interface LoginResult {
  status: boolean;
  err: any;
  message: string;
}

export const getUserData = async (sessionId: string, userId: string) => {
  return await axios
    .post(
      "user/details",
      JSON.stringify({
        sessionId,
        userId
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => {
      const username = res.data.data.username;
      localStorage.setItem(
        "auth",
        JSON.stringify({
          ssid: sessionId,
          userId,
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
  passwordHash: string
): Promise<any> => {
  try {
    return await axios
      .post(
        "/login",
        JSON.stringify({
          email: email,
          passwordHash: passwordHash,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(async (response) => {
        const ssid = response?.data?.data?.sessionId;
        const userId = response?.data?.data?.userId;
        return getUserData(ssid, userId);
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
  return await axios
    .post(
      "/logout",
      JSON.stringify({
        //@ts-ignore
        sessionId: JSON.parse(window.localStorage.getItem("auth"))!.ssid,
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then(() => {
      localStorage.removeItem("auth");
      return true;
    }).catch(() => {
      return false;
    });
}
interface userData {
  email: string;
  passwordHash: string;
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
  userData: userData,
  userGoals: userGoals | undefined
) => {
  const data = userGoals
    ? JSON.stringify({
        details: {
          ...userData,
        },
        goals: {
          ...userGoals,
        },
      })
    : JSON.stringify({
        details: {
          ...userData,
        },
      });
  return await axios.put(
    "/register",
    data,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  ).then((response) => {
    return getUserData(response.data.data.sessionId, response.data.data.userId);
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
