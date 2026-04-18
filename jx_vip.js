/*
[rewrite_local]
^https:\/\/mp\.jxnewbook\.cn\/api\/additional-server\/v1\/pay\/member\/status url script-response-body https://raw.githubusercontent.com/taotaomimao/taotaomimao/main/jx_vip.js
^https:\/\/mp\.jxnewbook\.cn\/api\/newbook-user-center\/v1\/user\/current url script-response-body https://raw.githubusercontent.com/taotaomimao/taotaomimao/main/jx_vip.js

[mitm]
hostname = mp.jxnewbook.cn
*/

var url = $request.url;
var obj = JSON.parse($response.body);

if (url.indexOf("member/status") !== -1) {
    obj = {
        "errcode": 200,
        "ts": Math.floor(Date.now()/1000),
        "data": {
            "status": 100,
            "mtname": "VIP金卡会员",
            "mtid": 1,
            "memberships": [{
                "order_type": 1,
                "effect_to": 4070880000000,
                "effect_from": 1775984091000,
                "umid": 2043251486473072640,
                "effect_days": 30,
                "level": 10,
                "oid": 2043251416562413568,
                "mtname": "VIP金卡会员",
                "cppid": 1,
                "mtid": 1,
                "result": 1,
                "create_time": 1775984091000,
                "payment": 22
            }],
            "effect_to": 4070880000000,
            "vip_time_type": 10,
            "vip_payment_type": true,
            "uid": "1643854106353344512",
            "status_text": "有效",
            "need_remind": false
        },
        "errmsg": "成功"
    };
    console.log("✅ member/status 整体替换成功");
}

if (url.indexOf("user/current") !== -1 && obj.data && obj.data.memberStatus) {
    var ms = obj.data.memberStatus;
    ms.status = 100;
    ms.status_text = "有效";
    ms.effect_to = 4070880000000;
    ms.vip_time_type = 10;
    ms.vip_payment_type = true;
    if (ms.memberships && ms.memberships.length > 0) {
        ms.memberships[0].effect_to = 4070880000000;
        ms.memberships[0].effect_days = 30;
        ms.memberships[0].payment = 22;
        ms.memberships[0].cppid = 1;
    }
    console.log("✅ user/current 修改成功");
}

$done({body: JSON.stringify(obj)});
