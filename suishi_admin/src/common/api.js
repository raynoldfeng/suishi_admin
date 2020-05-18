/**
 * Created by Administrator on 2019/4/21 0021.
 * http://129.204.236.40/#/
 *  "host":"http://admin.sui10.com/",
 */
export const api={
    "host":(window.location.host).indexOf("test.sui10.com") !=(-1) ?  "http://test-admin.sui10.com/":"",
    "login":"login",
    "roles":"admin/admin_user/roles",
    "adminUser":"admin/admin_user",
    "adminUserUsers":"admin/admin_user/user",
    "menus":"admin/admin_user/menus",
    "auth":"admin/admin_user/auth",
    "addAuth":"admin/admin_user/auth",
    "apiToken":"api/account/v1/qcloudApiToken",
    "cosToken":"admin/tool/qcloud_cos_token",
    "tagsType":"admin/tags/type",
    "tagsData":"admin/tags",
    "lesson":"admin/lesson",
    "test":"admin/test",
    "course":"admin/course",
    "categoryType":"admin/category_type",
    "category":"admin/category",
    "postList":"admin/post",
    "addTeams":"admin/teams",
    "teamType":"admin/team/type",
    "account":"admin/team/account",
    "taskList":"admin/task/list/",
    "addTask":"admin/task",
    "user":"admin/user",
    "request":"admin/team/request",
    "allot":"admin/team/request/allot",
    "reject":"admin/team/request/reject",
    "order":"admin/order",
    "bucketApiToken":"api/account/v1/qcloudBucketApiToken"
}