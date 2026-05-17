import bcrypt from 'bcrypt';

const comparePassword = async (
    plainPassword,
    hashedPassword
) => {

    const isPasswordMatched =
        await bcrypt.compare(
            plainPassword,
            hashedPassword
        );

    return isPasswordMatched;

};

export default comparePassword;