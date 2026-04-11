/*
[rewrite_local]
^https:\/\/mp\.jxnewbook\.cn\/api\/additional-server\/v1\/pay\/member\/status url script-response-body https://raw.githubusercontent.com/taotaomimao/taotaomimao/main/jx_vip.js

[mitm]
hostname = mp.jxnewbook.cn
*/

var body = $response.body;
var obj = JSON.parse(body);

// 1. 修改用户组 ID（尝试把 999 改成 1，通常 1 或 0 代表高级分组）
obj.groupid = "1"; 

// 2. 重点：填充 detail 对象
// 既然原本是空的，我们就人工塞入会员属性
obj.detail = {
    "is_vip": 1,
    "vip_status": 1,
    "member_level": "VIP",
    "expire_time": "2099-12-31",
    "is_pay": true,
    "can_read": 1
};

// 3. 备用修改（万一它还校验其他字段）
obj.tid = "1";

$done({ body: JSON.stringify(obj) });



