// test-utils.jsx
import { render as rtlRender } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
// Import your own reducer
import authReducer from "../features/auth/authSlice";
import userReducer from "../features/user/userSlice";
import userListReducer from "../features/userList/userListSlice";

function render(
  ui: any,
  {
    store = configureStore({
      reducer: {
        auth: authReducer,
        user: userReducer,
        userList: userListReducer,
      },
    }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }: any) {
    return <Provider store={store}>{children}</Provider>;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from "@testing-library/react";
// override render method
export { render };
