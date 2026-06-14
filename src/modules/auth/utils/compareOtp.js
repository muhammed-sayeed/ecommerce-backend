import hashOtp from "./hashOtp.js";

const compareOtp = (
    incomingOtp,
    storedOtpHash
) => {

    return (
        hashOtp(incomingOtp)
        === storedOtpHash
    );

};

export default compareOtp;