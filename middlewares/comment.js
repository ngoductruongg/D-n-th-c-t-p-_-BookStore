import joi from "joi";
export const Comment_Schema = joi.object({
userId:joi.string().required().messages({
    "any.required": 'Trường "id người dùng" là bắt buộc',
}),
nameuser:joi.string().required().messages({
    "any.required": 'Trường "tên người dùng" là bắt buộc',
}),
productId:joi.string().required().messages({
"any.required": 'Trường "id sản phẩm" là bắt buộc',
}),
content:joi.string().messages({
    "any.required": 'Trường "nội dung" là bắt buộc',
}),

});