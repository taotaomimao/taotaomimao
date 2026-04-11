/*
[rewrite_local]
# 只要看到这个地址，就执行本脚本（链接请填入你自己的这个文件的 Raw 链接）
^https:\/\/mp\.jxnewbook\.cn\/api\/additional-server\/v1\/pay\/member\/status url script-response-body https://raw.githubusercontent.com/taotaomimao/taotaomimao/main/jx_vip.js

[mitm]
hostname = mp.jxnewbook.cn
*/

/**
 * 核心逻辑部分
 */
var obj = JSON.parse($response.body);

if (obj && obj.data) {
    // 强制修改会员状态
    obj.data.isVip = 1;
    obj.data.vipLevel = 9;
    obj.data.expireTime = "2099-12-31 23:59:59";
    obj.data.status = 1;
    
    // 确保返回成功码
    obj.errcode = 200;
    obj.errmsg = "成功";
}

$done({ body: JSON.stringify(obj) });


