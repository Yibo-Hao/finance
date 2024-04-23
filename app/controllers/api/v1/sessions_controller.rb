class Api::V1::SessionsController < ApplicationController
    def create
        canSignin = ValidationCode.exists?(
            email: params[:email],
            code: params[:code],
            kind: 'sign_in',
            used_at: nil
        )

        if canSignin
            ValidationCode.where(
                email: params[:email],
                kind: 'sign_in',
                code: params[:code]
            ).update_all(used_at: Time.now)
        end

        return render status: 401, json: {error: 'Invalid code'} unless canSignin

        user = User.find_by_email(params[:email])

        if user.nil? 
            user = User.new email: params[:email], name: params[:email]
            if !user.save 
                return render status: 400, json: {error: user.errors}
                return
            end 
        end

        payload = { user_id: user.id, exp: Time.now.to_i + 4 * 3600 }
        token = JWT.encode payload, Rails.application.credentials.jwt_secret, 'HS256'
        response.headers['jwt'] = "Bearer #{token}"
        render status: 200
    end

    def destroy

    end
end
