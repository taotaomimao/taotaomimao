/*
[rewrite_local]
^https:\/\/mp\.jxnewbook\.cn\/api\/additional-server\/v1\/pay\/member\/status url script-response-body https://raw.githubusercontent.com/taotaomimao/taotaomimao/main/jx_vip.js

[mitm]
hostname = mp.jxnewbook.cn
*/

var body = $response.body;
var headers = $response.headers;

try {
    var obj = JSON.parse(body);

    if (obj.data) {
        var d = obj.data;

        d.status = 1;
        d.status_text = "已生效";
        d.need_remind = false;
        d.vip_payment_type = true;
        d.effect_to = 4070880000000;

        if (d.memberships && d.memberships.length > 0) {
            d.memberships[0].effect_to = 4070880000000;
            d.memberships[0].result = 1;
            d.memberships[0].level = 10;
        }
    }

    body = JSON.stringify(obj);
    console.log("✅ VIP修改成功");
} catch (e) {
    console.log("❌ 出错：" + e.message);
}

$done({ body, headers });





