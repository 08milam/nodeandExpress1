const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

app.use(express.json());

const getUserInfo = async (username) => {
    const url = `https://api.github.com/users/${username}`;
    try {
        const response = await axios.get(url);
        if (response.status === 200) {
            const userData = response.data;
            return { name: userData.name || "", bio: userData.bio || "" };
        }
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
};

app.post('/', async (req, res) => {
    const data = req.body;
    const developers = data.developers || [];
    const developersInfo = [];
    for (const username of developers) {
        const userInfo = await getUserInfo(username);
        if (userInfo) {
            developersInfo.push(userInfo);
        }
    }
    res.json(developersInfo);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
