class UserMailer < ApplicationMailer
    default from: '735668747@qq.com'

    def welcome_email
      mail(to: '735668747@qq.com', subject: 'Hi')
    end
end
