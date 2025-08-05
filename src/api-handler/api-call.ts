
import API from './api';
import { ALL_BOOKING, BOOK, BOOKINGS, LOGIN, REGISTER } from './endpoint';

interface Body {
    email: string;
    password: string;
    name: string
}

export const registerUser = async (body: Body) => {
    const res = await API.post(REGISTER, body);
    localStorage.setItem('user', JSON.stringify(res.data));
    return res.data;
};
interface LoginPayload {
    email: string;
    password: string;
}


interface LoginResponse {
    status: number;
    token: string;
}
interface body {
    movie: string | undefined;
    theater: string | undefined;
    time: string;
    seats: number[];
}

export const loginUser = async (body: LoginPayload): Promise<LoginResponse> => {
    try {
        const res = await API.post(LOGIN, body);
        localStorage.setItem('user', JSON.stringify(res.data));

        return res.data;
    } catch (err: any) {
        console.error('Login error:', err.response?.data || err.message);
        throw err.response?.data || { error: 'Login failed' };
    }
};

export const bookTickets = async (
    body: body

) => {
    const res = await API.post(BOOK, body);
    return res.data;
};

export const getMyBookings = async () => {
    const res = await API.get(BOOKINGS);
    return res.data;
};


export const getAllBookings = async () => {
    const res = await API.get(ALL_BOOKING);
    return res.data;
};