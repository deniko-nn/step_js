import axios from "axios";

export default axios.create({
    baseUrl: 'https://api.aniapi.com',
    headers: {
        Authorization: "Bearer " + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU2NiIsIm5iZiI6MTYzNTE2ODg1OSwiZXhwIjoxNjM3NzYwODU5LCJpYXQiOjE2MzUxNjg4NTl9.-jkI1B4rfbqQSdS5saHJQ5OWa8iYLhAUIR4cTwYOgjs',
    }
});

