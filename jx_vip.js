/*
[rewrite_local]
^https://mp.jxnewbook.cn/api/additional-server/v1/pay/member/status url script-response-body https://raw.githubusercontent.com/taotaomimao/taotaomimao/main/jx_vip.js
^https://mp.jxnewbook.cn/api/newbook-user-center/v1/thirdpartyUser/getByOpenId url script-response-body https://raw.githubusercontent.com/taotaomimao/taotaomimao/main/jx_vip.js

[mitm]
hostname = mp.jxnewbook.cn
*/

var url = $request.url;

// 增加安全检查：确保有响应体才进行解析
if ($response.body) {
    try {
        var obj = JSON.parse($response.body);

        // 处理会员状态接口
        if (url.indexOf("member/status") !== -1) {
            if (obj && obj.data) {
                var d = obj.data;
                d.status = 1;
                d.status_text = "已生效";
                d.effect_to = 4070880000000;
                d.vip_time_type = 10;
                d.vip_payment_type = true;

                if (d.memberships && Array.isArray(d.memberships) && d.memberships.length > 0) {
                    d.memberships[0].effect_to = 4070880000000;
                    d.memberships[0].effect_days = 30;
                    d.memberships[0].result = 1;
                    d.memberships[0].level = 10;
                    d.memberships[0].payment = 22;
                    d.memberships[0].cppid = 1;
                }
            }
        }

        // 处理用户 ID 接口
        if (url.indexOf("getByOpenId") !== -1) {
            if (obj && obj.data) {
                obj.data.groupId = 1;
            }
        }

        $done({ body: JSON.stringify(obj) });
    } catch (e) {
        console.log("脚本执行异常: " + e);
        $done({}); // 发生解析错误时，返回原始数据，不阻塞请求
    }
} else {
    $done({}); // 没有响应体，直接跳过
}
