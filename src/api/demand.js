import instance from "../../utils/request.js";
import {ref} from "vue";
import {OpenMessage} from "../components/Notification.js";

export const allDemands = ref([])
export const filterDemands = ref([])
export const detailDemand = ref([])
// 创建需求
export const createDemandService = (name, priority, category, description) => {
    const fd = new FormData();
    fd.append("demand_name", name);
    fd.append("priority", priority);
    fd.append("category", category);
    fd.append("description", description);
    instance.post("demand/create_demand", fd)
        .then(response => {
            console.log(response);
            OpenMessage('需求创建成功！', 'success');
        })
        .catch(error => {
            console.log(error);
        });
}

// 查找需求
export const searchDemandService = async (keyword, page, pageSize) => {
    await instance.get(`demand/search_demands?keyword=${keyword}&page=${page}&pageSize=${pageSize}`)
        .then((response) => {
            console.log(response.data);
            filterDemands.value = response.data.data;
        })
        .catch((error) => {
            console.log(error);
        });
}

// 分页查询需求
export const listDemandsService =  async (page, pageSize) => {
    await instance.get(`demand/demand_list?page=${page}&page_size=${pageSize}`)
        .then((response) => {
            console.log(response.data);
            allDemands.value = response.data.data;
        })
        .catch((error) => {
            console.log(error);
        })
}

// 查看需求详情
export const detailDemandService = async (id) => {
    await instance.get(`demand/demand_detail?demand_id=${id}`)
        .then((response) => {
            console.log(response.data);
            detailDemand.value = response.data.data;
        })
        .catch(error => {
            console.log(error);
        })
}

// 编辑需求
export const editDemandService = async (id, name, priority, category, description, status, attachment) => {
    let fd = new FormData();
    fd.append("demand_id", id);
    fd.append("demand_name", name);
    fd.append("priority", priority);
    fd.append("category", category);
    fd.append("description", description);
    fd.append("status", status);
    fd.append("attachments", attachment);
    await instance.post("demand/create_demand", fd)
        .then(response => {
            console.log(response.data);
        }).catch(error => {
            console.log(error);
        })
}

// 删除需求
export const deleteDemandService = (id) => {
    let fd = new FormData();
    fd.append("demand_id", id);
    instance.post("demand/delete_demand", fd)
        .then(response => {
            console.log(response);
        });
}

// 删除指定需求附件
export const deleteDemandAttachmentService = (id, key) => {
    let fd = new FormData();
    fd.append("demand_id", id);
    fd.append("attachment_key", key);
    instance.post("demand/create_demand", fd)
        .then(r => {
            console.log(r);
        });
}