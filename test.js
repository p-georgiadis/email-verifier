import http from 'k6/http';
import { check } from 'k6';

export const options = {
    vus: 10,
    duration: '30s',
};

export default function () {
    const url = 'http://localhost:8081/request-registration';
    const payload = JSON.stringify({ email: 'test@example.com' });
    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    try {
        const response = http.post(url, payload, params);
        check(response, {
            'status is 204': (r) => r.status === 204,
        });
    } catch (error) {
        console.error(`Error during request: ${error}`);
    }
}
