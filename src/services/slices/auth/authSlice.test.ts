import reducer, {
  initialState,
  loginUser,
  logOut,
  registerUser,
  setIsAuthChecked,
  setUser,
} from "./authSlice";

describe("testing authSlice", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("should set isAuthChecked to true", () => {
    expect(reducer(undefined, setIsAuthChecked(true))).toEqual({
      ...initialState,
      isAuthChecked: true,
    });
  });

  it("should set user data", () => {
    expect(
      reducer(undefined, setUser({ email: "test@mail.ru", name: "user" }))
    ).toEqual({
      ...initialState,
      user: { email: "test@mail.ru", name: "user" },
    });
  });

  it("should handle loginUser.fulfilled", () => {
    expect(
      reducer(undefined, {
        type: loginUser.fulfilled.type,
        payload: { email: "test@mail.ru", name: "user" },
      })
    ).toEqual({
      ...initialState,

      isAuthChecked: true,
    });
  });

  it("should handle registerUser.fulfilled", () => {
    expect(
      reducer(undefined, {
        type: registerUser.fulfilled.type,
        payload: {
          user: { email: "test@mail.ru", name: "user", password: "123456" },
        },
      })
    ).toEqual({
      ...initialState,
      isAuthChecked: true,
    });
  });

  it("should handle logout", () => {
    expect(
      reducer(undefined, {
        type: logOut.fulfilled.type,
      })
    ).toEqual(initialState);
  });
});
