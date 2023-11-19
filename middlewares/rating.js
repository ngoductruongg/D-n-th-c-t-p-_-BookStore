import Joi from 'joi';

export const ratingSchema = Joi.object({
  productId: Joi.string().required().messages({
    'string.required': 'Trường "productId" là bắt buộc',
  }),

  rating: Joi.number().required().min(1).max(5).messages({
    'number.base': 'Trường "rating" phải là số',
    'number.min': 'Trường "rating" phải lớn hơn hoặc bằng 1',
    'number.max': 'Trường "rating" phải nhỏ hơn hoặc bằng 5',
    'number.required': 'Trường "rating" là bắt buộc',
  }),

  userId: Joi.string().required().messages({
    'string.required': 'Trường "userId" là bắt buộc',
  }),

  feedback: Joi.string().required().messages({
    'string.required': 'Trường "feedback" là bắt buộc',
  }),
});