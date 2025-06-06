import { body } from "express-validator";

const userCreateValidation = () => {
    return [
        body("name")
            .isString()
            .withMessage("O nome é obrigatório.")
            .isLength({ min: 3 })
            .withMessage("O nome precisa ter no mínimo 3 caracteres"),

        body("email")
            .isString()
            .withMessage("O e-mail é obrigatório")
            .isEmail()
            .withMessage("Insira um e-mail válido"),

        body("password")
            .isString()
            .withMessage("A senha é obrigatória")
            .isLength({ min: 5 })
            .withMessage("A senha precisa ter no mínimo 5 caracteres"),

        body("confirmPassword")
            .isString()
            .withMessage("A confirmação de senha é obrigatória")
            .custom((value, { req }) => {
                if (value != req.body.password) {
                    throw new Error("As senhas não são iguais");
                }
                return true;
            }),
        body("profileImage").custom((value, { req }) => {
            if (req.file && req.file.size > 5 * 1024 * 1024) {
                throw new Error("A imagem deve ter no máximo 5MB");
            }
            return true;
        }),
    ];
};

const userLoginValidation = () => {
    return [
        body("email")
            .isString()
            .withMessage("O e-mail é obrigatório")
            .isEmail()
            .withMessage("Insira um e-mail válido"),
        body("password").isString().withMessage("A senha é obrigatória"),
    ];
};

const userUpdateValidation = () => {
    return [
        body("name")
            .optional()
            .isLength({ min: 3 })
            .withMessage("O nome precisa de pelo menos 3 caracteres."),
        body("password")
            .optional()
            .isLength({ min: 5 })
            .withMessage("A senha precisa ter no mínimo 5 caracteres "),
    ];
};

export { userCreateValidation, userLoginValidation, userUpdateValidation };
