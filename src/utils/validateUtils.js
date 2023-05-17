
// 自定义验证邮箱
export const validateEmail = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('请输入邮箱'));
    } else {
        const reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
        if (!reg.test(value)) {
            if (value.endsWith('@qq.com')) {
                callback(new Error('QQ邮箱无法验证，请输入其他邮箱'));
            } else {
                callback(new Error('请输入正确的邮箱格式'));
            }
        } else {
            callback();
        }
    }
};


// 自定义三大运行商的手机号验证
export const validatePhoneNumber = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('请输入手机号'));
    } else {
        const reg = /^1(3|4|5|6|7|8|9)\d{9}$/;
        if (!reg.test(value)) {
            callback(new Error('请输入正确的手机号格式'));
        } else {
            callback();
        }
    }
};