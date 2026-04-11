// 获取原始的响应体（服务器发回给你的数据）
let body = $response.body;

// 尝试将字符串解析为 JSON 对象
try {
    let obj = JSON.parse(body);

    // 这一步最关键：根据你抓到的 status 接口返回值修改
    // 我们先写一个通用的，后续根据你的真实数据微调
    if (obj.data) {
        obj.data.isVip = 1;               // 修改为会员状态
        obj.data.vipLevel = 9;            // 等级最高
        obj.data.expireTime = "2099-12-31"; // 过期时间
    }

    // 重新封装成字符串发回给 App
    body = JSON.stringify(obj);
} catch (e) {
    console.log("脚本解析失败: " + e);
}

$done({ body });
