/*
[rewrite_local]
^https:\/\/mp\.jxnewbook\.cn\/api\/additional-server\/v1\/pay\/member\/status url script-response-body https://raw.githubusercontent.com/taotaomimao/taotaomimao/main/jx_vip.js

[mitm]
hostname = mp.jxnewbook.cn
*/

var body = $response.body;
try {
    var obj = JSON.parse(body);

    // 1. 修改核心权限组 (把 999 改成 1)
    obj.groupid = "1"; 
    obj.tid = "1";

    // 2. 针对你空的 detail 注入权限
    obj.detail = {
        "is_vip": 1,
        "vip_status": 1,
        "expire_time": "2099-12-31",
        "member_level": 9
    };

    // 3. 在外层也补上常见的会员开关（以防万一）
    obj.is_vip = 1;
    obj.vip = 1;
    obj.status = 1;

    body = JSON.stringify(obj);
    console.log("✅ 字段已精准修改：groupid 现在是 " + obj.groupid);
} catch (e) {
    console.log("❌ 脚本运行出错：" + e);
}

$done({ body });




