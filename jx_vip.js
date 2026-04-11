var obj = JSON.parse($response.body);

if (obj && obj.data) {
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

$done({body: JSON.stringify(obj)});
