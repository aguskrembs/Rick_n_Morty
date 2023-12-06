import { createSlice } from "@reduxjs/toolkit";
import { ref, get, getDatabase } from "firebase/database";

export const initialState = {
    favouriteHistory: [],
    commentHistory: [],
    loading: false,
    hasErrors: false,
};

const historySlice = createSlice({
    name: "history",
    initialState,
    reducers: {
        getHistory: (state) => {
            state.favouriteHistory = [];
            state.commentHistory = [];
        },
        getHistorySuccess: (state, { payload }) => {
            state.history = [];
            payload.results.forEach((historyItem) => {
                state.favouriteHistory.push(historyItem);
            });
            state.loading = false;
            state.hasErrors = false;
        },
        addHistoryItem: (state, { payload }) => {
            state.favouriteHistory.push(payload);
            state.loading = false;
        },

        getCommentHistory: (state) => {
            state.commentHistory = [];
        },
        getCommentHistorySuccess: (state, { payload }) => {
            state.commentHistory = [];
            payload.results.forEach((historyItem) => {
                state.commentHistory.push(historyItem);
            });
            state.loading = false;
            state.hasErrors = false;
        },
        addCommentHistoryItem: (state, { payload }) => {
            state.commentHistory.push(payload);
            state.loading = false;
        },

        getHistoryFailure: (state) => {
            state.loading = false;
            state.hasErrors = true;
        },
    },
});

export default historySlice.reducer;

export const historySelector = (state) => state.history;

export const {
    getHistory,
    getHistorySuccess,
    addHistoryItem,
    getCommentHistory,
    getCommentHistorySuccess,
    addCommentHistoryItem,
    getHistoryFailure,
} = historySlice.actions;

export function fetchHistory() {
    return async (dispatch) => {
        dispatch(getHistory());

        try {
            const reference = ref(getDatabase(), "history/favouritesHistory");

            get(reference).then((snapshot) => {
                snapshot.forEach((item) => {
                    dispatch(addHistoryItem(item.val()));
                });
            });
        } catch (error) {
            console.error(error);
            dispatch(getHistoryFailure());
        }
    };
}

export function fetchCommentHistory() {
    return async (dispatch) => {
        dispatch(getHistory());

        try {
            const reference = ref(getDatabase(), "history/commentHistory");

            get(reference).then((snapshot) => {
                snapshot.forEach((item) => {
                    dispatch(addCommentHistoryItem(item.val()));
                });
            });
        } catch (error) {
            console.error(error);
            dispatch(getHistoryFailure());
        }
    };
}
