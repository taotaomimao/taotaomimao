/*
[rewrite_local]
^https:\/\/mp\.jxnewbook\.cn\/api\/additional-server\/v1\/pay\/member\/status url script-response-body https://raw.githubusercontent.com/taotaomimao/taotaomimao/main/jx_vip.js
^https:\/\/mp\.jxnewbook\.cn\/api\/newbook-user-center\/v1\/user\/current url script-response-body https://raw.githubusercontent.com/taotaomimao/taotaomimao/main/jx_vip.js
^https:\/\/mp\.jxnewbook\.cn\/api\/event-analysis-system\/v1\/action\/cashvalueLog reject

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

    body = JSON.stringify(obj);
} catch (e) {
    console.log("❌ 出错：" + e.message);
}

$done({ body, headers });
