export default class HttpClient {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }

    // 이름자체가 fetch인 사용자함수
    async fetch(url, options) {
        // api함수 fetch
        const res = await fetch(`${this.baseURL}${url}`, {
            ...options, // 기존에 있는 옵션을 추가
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
        });

        let data;
        try {
            data = await res.json();
        } catch (error) {
            console.error(error);
        }

        if (res.status > 299 || res.status < 200) {
            const message = data && data.message ? data.message : 'Something went wrong!';
            throw new Error(message);
        }

        return data;
    }
}