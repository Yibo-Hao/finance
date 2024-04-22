class UserMailer < ApplicationMailer
    default from: '735668747@qq.com'

    def welcome_email(email)
      validationCode = ValidationCode.where(email: email).order(created_at: :desc).first
      @code = validationCode.code
      mail(to: email, subject: 'finance验证码')
    end
end
