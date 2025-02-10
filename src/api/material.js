import instance from "../../utils/request.js";
import {ref} from "vue";
// 创建物料分类
export function createCategoryService(name, id) {
    return instance.post('material/create_category', {
        category_name: name,
        parent_category_id: id
    });
}

// 查看指定分类信息
export function viewCategoryService(id) {
    return instance.get(`material/view_category?category_id=${id}`);
}

// 获取指定层级的分类
export function getCategoriesByLevelService(level) {
    return instance.get(`material/get_categories_by_level?level=${level}`);
}

// 获取所有分类信息
export function getAllCategoriesService() {
    return instance.get('material/get_all_categories');
}

// 删除分类
export function deleteCategoriesService(id) {
    return instance.post(`material/delete_categories?category_id=${id}`);
}

// 创建物料
export function createMaterialService(name, categoryId, description, type, parameters) {
    return  instance.post("material/create_material", {
        material_name: name,
        category_id: categoryId,
        description: description,
        type: type,
        parameters: parameters
    });
}

// 查找物料
export function searchMaterialService(keyword, page, pageSize) {
    return  instance.get(`material/search_materials?keyword=${keyword}&page=${page}&page_size=${pageSize}`);
}

// 分页查询物料
export function listMaterialsService(page, pageSize) {
    return instance.get(`material/get_materials?page=${page}&page_size=${pageSize}`);
}

// 查看物料详情
export function detailMaterialService(id) {
    return instance.get(`material/get_material_detail?id=${id}`);
}

// 编辑物料
export function editMaterialService(id, name, priority, category, description, status, parameters, attachment) {
    return  instance.post("material/create_material", {
        material_id: id,
        material_name: name,
        category: category,
        description: description,
        status: status,
        parameters: parameters,
        attachments: attachment
    });
}

// 删除物料
export function deleteMaterialService() {
    console.log("无删除物料接口");
}

// 删除指定物料附件
export function deleteMaterialAttachmentService(id, key) {
    return instance.post(`material/delete_material_attachment?material_id=${id}&attachment_key=${key}`);
}