import {RootState} from "../store";

export const selectFilter = (state: RootState) => state.filter
export const selectSortName = (state: RootState) => state.filter.sort.name