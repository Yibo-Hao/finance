class UserMailer < ApplicationMailer
    default from: '735668747@qq.com'

    def welcome_email(email)
      validationCode = ValidationCode.find_by_email(email)
      @code = validationCode.code
      mail(to: email, subject: 'finance验证码')
    end
end
