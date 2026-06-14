const otpKeys = {

    otp(mobile) {
        return `otp:mobile:${mobile}`;
    },

    cooldown(mobile) {
        return `otp:cooldown:${mobile}`;
    },

    attempts(mobile) {
        return `otp:attempts:${mobile}`;
    },

};

export default otpKeys;