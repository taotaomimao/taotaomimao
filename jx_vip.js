/*
[rewrite_local]
^https://mp.jxnewbook.cn/api/additional-server/v1/pay/member/status url script-response-body https://raw.githubusercontent.com/taotaomimao/taotaomimao/main/jx_vip.js
^https://mp.jxnewbook.cn/api/newbook-user-center/v1/thirdpartyUser/getByOpenId url script-response-body https://raw.githubusercontent.com/taotaomimao/taotaomimao/main/jx_vip.js

[mitm]
hostname = mp.jxnewbook.cn
*/

var url = $request.url;

if ($response.body) {
    try {
        var obj = JSON.parse($response.body);
        if (url.indexOf("member/status") !== -1 && obj && obj.data) {
            var d = obj.data;
            d.status = 1;
            d.status_text = "已生效";
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
        }
        if (url.indexOf("getByOpenId") !== -1 && obj && obj.data) {
            obj.data.groupId = 1;
        }
        $done({ body: JSON.stringify(obj) });
    } catch(e) {
        $done({});
    }
} else {
    $done({});
}
