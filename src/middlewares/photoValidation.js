import { body } from "express-validator";

const photoIsertValidation = () => {
    return [
        body("title")
            .not()
            .equals("undefined")
            .withMessage("O título é obrigatório")
            .isString()
            .withMessage("O título deve ser um texto")
            .isLength({ min: 3 })
            .withMessage("O título precisa ter no mínimo 3 caracteres"),
        body("image").custom((value, { req }) => {
            if (!req.file) {
                throw new Error("A imagem é obrigatória");
            }
            if (req.file && req.file.size > 5 * 1024 * 1024) {
                throw new Error("A imagem deve ter no máximo 5MB");
            }
            return true;
        }),
    ];
};

const photoUpdateValidation = () => {
    return [
        body("title")
            .optional()
            .isString()
            .withMessage("O titulo deve ser um texto")
            .isLength({ min: 3 })
            .withMessage("O titulo precisa ter no mínimo 3 caracteres"),
    ];
};

const photoCommentValidation = () => {
    return [
        body("comment").isString().withMessage("O comentário é obrigatório"),
    ];
};

export { photoIsertValidation, photoUpdateValidation, photoCommentValidation };
