import instance from "../../utils/request.js";
import {ref} from "vue";
import {OpenMessage} from "../components/Notification.js";
import router from "../router/index.js";

export const login = async (username, password) => {
    const fd = new FormData();
    fd.append("username", username);
    fd.append("password", password);
    await instance.post("/users/login", fd)
        .then(response => {
            console.log(response);
            OpenMessage('登录成功！', 'success');
            router.push('/demand');
        }).catch(error => {
            console.log(error);
        });
}