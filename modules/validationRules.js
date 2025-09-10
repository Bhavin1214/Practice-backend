const checkValidationRules = {

    signupValidation: {
        firstName: "required|string",
        lastName: "required|string",
        email: "required|email",
        countryCode: "required|string",
        phoneNo: "required|string",
        password: "required|min:6",
        DOB: "required|date",
        gender: "required|in:male,female,other",
    },
    loginValidation: {
        email: 'required|email',
        password: 'required|min:6',
        phoneNo: "required|string",
    },
    profileUpdateValidation: {
        firstName: "required|string",
        lastName: "required|string",
        email: "required|email",
        countryCode: "required|string",
        phoneNo: "required|string",
        DOB: "required|date",
        gender: "required|in:male,female,other",
    },
    createPostValidation :{
        Title:"required|string",
        Content:"required|string"
    }
}

export default checkValidationRules;