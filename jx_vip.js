/*
[rewrite_local]
^https:\/\/mp\.jxnewbook\.cn\/api\/additional-server\/v1\/pay\/member\/status url script-response-body https://raw.githubusercontent.com/taotaomimao/taotaomimao/main/jx_vip.js
^https:\/\/mp\.jxnewbook\.cn\/api\/newbook-user-center\/v1\/user\/current url script-response-body https://raw.githubusercontent.com/taotaomimao/taotaomimao/main/jx_vip.js
^https:\/\/mp\.jxnewbook\.cn\/api\/insurance-server\/v1\/invest\/lap url script-response-body https://raw.githubusercontent.com/taotaomimao/taotaomimao/main/jx_vip.js

[mitm]
hostname = mp.jxnewbook.cn
*/

var url = $request.url;
var body = $response.body;
var headers = $response.headers;

try {
    var obj = JSON.parse(body);

    if (url.indexOf("member/status") !== -1 && obj.data) {
        var d = obj.data;
        d.status = 100;
        d.status_text = "有效";
        d.effect_to = 4070880000000;
        d.vip_time_type = 10;
        d.vip_payment_type = true;
        if (d.memberships && d.memberships.length > 0) {
            d.memberships[0].effect_to = 4070880000000;
            d.memberships[0].effect_days = 30;
            d.memberships[0].result = 1;
            d.memberships[0].level = 10;
            d.memberships[0].payment = 22;
            d.memberships[0].cppid = 1;
        }
        console.log("✅ member/status 修改成功");
    }

    if (url.indexOf("user/current") !== -1 && obj.data) {
        var ms = obj.data.memberStatus;
        if (ms) {
            ms.status = 100;
            ms.status_text = "有效";
            ms.effect_to = 4070880000000;
            ms.vip_time_type = 10;
            ms.vip_payment_type = true;
            if (ms.memberships && ms.memberships.length > 0) {
                ms.memberships[0].effect_to = 4070880000000;
                ms.memberships[0].effect_days = 30;
                ms.memberships[0].result = 1;
                ms.memberships[0].level = 10;
                ms.memberships[0].payment = 22;
                ms.memberships[0].cppid = 1;
            }
        }
        console.log("✅ user/current 修改成功");
    }

    if (url.indexOf("invest/lap") !== -1 && obj.errcode !== 200) {
        obj.errcode = 200;
        obj.errmsg = "成功";
        obj.data = "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​​​​​​​​​​​​​​​​
