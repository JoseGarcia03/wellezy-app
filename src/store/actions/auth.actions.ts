import axios from "axios";
import { UnknownAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { login, logout } from "../slices/auth.slice";
import { RootState } from "../store";

export const thunkLoginAction =
    (token: string): ThunkAction<void, RootState, unknown, UnknownAction> =>
    async (dispatch) => {
        const resp = await loginFetch(token);

        if (resp && resp?.errors?.lenght !== 0) {
            dispatch(login({ ...resp?.data, token: token }));
        } else {
            dispatch(logout());
        }
    };

async function loginFetch(token: string) {
    try {
        const resp = await axios.get(
            `${import.meta.env.VITE_API_URL}/users/get-user`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return resp?.data;
    } catch (err) {
        localStorage.removeItem("token");
        console.log(err);
    }
}
