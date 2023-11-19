import joi from "joi";
export const productSchema = joi.object({
name:joi.string().required().messages({
    "string.required": "Vui lòng nhập Tên",
    "any.required": 'Trường "Tên" là bắt buộc',
}),
price:joi.string().required().messages({
    "string.required": "Vui lòng nhập Gía",
    "any.required": 'Trường "Gía" là bắt buộc',
}),
reducedprice:joi.string().required().messages({
    "string.required": "Vui lòng nhập Gía",
    "any.required": 'Trường "Gía" là bắt buộc',
}),
author:joi.string().required().messages({
    "string.required": "Vui lòng nhập Gía",
    "any.required": 'Trường "Gía" là bắt buộc',
}),
img:joi.string().required().messages({
    "string.required": "Vui lòng nhập Vui lòng nhập ảnh",
    "any.required": 'Trường "ảnh" là bắt buộc',
}),
description:joi.string().required().messages({
    "string.required": "Vui lòng nhập description",
    "any.required": 'Trường "description" là bắt buộc',
}),
categoryId:joi.string().required(),
});

export const categorySchema = joi.object({
    name:joi.string().required().messages({
        "string.required": "Vui lòng nhập tên danh mục",
        "any.required": 'Trường "danh mục" là bắt buộc',
    }),

})