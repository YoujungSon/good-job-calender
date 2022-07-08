import { api, instances } from "../../shared/api";
import { produce } from "immer";
import { deleteCookie, setCookie } from "./../../shared/Cookie";
import axios from "axios";
// initialState
const initialState = {
  is_login: null,
};

// action
const SET_USER = "user_reducer/SET_USER";
const LOGIN_USER = "user_reducer/LOGIN_USER";
const LOGOUT_USER = "user_reducer/LOGOUT_USER";
const TOKEN_USER = "user_reducer/TOKEN_USER";

// action creator
export function setUser(payload) {
  return { type: SET_USER, payload };
}
export function loginUser(payload) {
  return { type: LOGIN_USER, payload };
}
export function logoutUser(payload) {
  return { type: LOGOUT_USER, payload };
}
export function tokenUser(payload) {
  return { type: TOKEN_USER, payload };
}

/* ----------------- 리듀서 ------------------ */
//middleware
export const loginDB = (payload) => {
  return function (dispatch) {
    console.log(payload);
    axios
      .post("http://14.34.139.253:3000/api/auth", payload)
      .then((response) => {
        console.log(response);
        dispatch(setUser(payload));
        setCookie("token", response.data.token, 5);
        // setCookie("email", email);
      })
      .catch((error) => {
        console.error(error);
        window.alert("이메일 또는 비밀번호를 확인해주세요.");
      });
  };
};

export const kakaoLoginDB = (code) => {
  console.log(code);
  return async function (dispatch, getState, { history }) {
    await axios
      .get(`http://175.112.86.142:8088/api/user/kakao/callback?code=${code}`)
      .then((response) => {
        console.log("카카오 로그인 성공", response);
        if (Math.floor(response.status / 100) === 2) {
          console.log("카카오 로그인 성공", response);
          const userToken = response.headers?.authorization?.split(" ")[1];
          // const decoded = jwt_decode(userToken);
          setCookie("userToken", userToken);
          // dispatch(
          //   logIn({
          //     expiredDate: decoded.EXPIRED_DATE,
          //     email: decoded.USER_EMAIL,
          //     name: decoded.USER_NAME,
          //     level: decoded.USER_LEVEL,
          //   })
          // );
          history.replace("/");
        }
      })
      .catch((err) => {
        console.log("카카오 로그인 에러", err);
        window.alert("로그인에 실패하였습니다.");
        history.replace("/");
      });
  };
};

//reducer
export default function userReducer(state = initialState, action) {
  // 새로운 액션 타입 추가시 case 추가한다.
  switch (action.type) {
    case SET_USER: {
      return produce(state, (draft) => {
        setCookie("is_login", "true");
        draft.is_login = true;
        draft.user = action.payload;
      });
    }
    case LOGIN_USER: {
      return produce(state, (draft) => {
        setCookie("is_login", "true");
        draft.token = action.payload.user.token;
        draft.user = action.payload.user.user;
        draft.is_login = true;
      });
    }
    case LOGOUT_USER: {
      return produce(state, (draft) => {
        deleteCookie("is_login");
        localStorage.removeItem("username");
        localStorage.removeItem("authorization");
        draft.user = null;
        draft.is_login = false;
      });
    }
    case TOKEN_USER: {
      return produce(state, (draft) => {
        draft.is_login = true;
      });
    }
    default:
      return state;
  }
}
