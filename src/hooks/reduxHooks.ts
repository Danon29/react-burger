import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { RootState } from "../services/rootReducer";
import { AppDispatch } from "../services/store";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
