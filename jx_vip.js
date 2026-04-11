/*
 * JX新书会员解锁脚本
 * 适用接口：/api/additional-server/v1/pay/member/status
 */

let body = $response.body;

if (body) {
    try {
        let obj = JSON.parse(body);
        
        // 核心修改逻辑：不论后端返回什么，我们强制塞入会员信息
        // 这里的字段是根据同类型平台最常用的字段名预测的
        if (obj.data) {
            obj.data.isVip = 1;               // 1通常代表是会员
            obj.data.vip = 1;                 // 备用字段
            obj.data.level = 9;               // 等级直接拉满
            obj.data.status = 1;              // 状态正常
            obj.data.is_member = true;        // 某些平台用布尔值
            obj.data.expireTime = "2099-12-31 23:59:59"; // 过期时间
            obj.data.deadline = 4102415999;   // 时间戳格式的过期时间
        }

        // 确保业务状态码也是成功的
        obj.errcode = 200;
        obj.errmsg = "成功";

        body = JSON.stringify(obj);
        console.log("✅ JX新书会员状态已修改成功！");
    } catch (e) {
        console.log("❌ 脚本运行报错: " + e);
    }
}

$done({ body });

