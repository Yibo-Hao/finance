class Api::V1::UsersController < ApplicationController
    def show
        header = request.headers['Authorization'] rescue ''
        jwt = header.split(' ')[1]
        payload = JWT.decode(jwt, Rails.application.credentials.jwt_secret, true, { algorithm: 'HS256' }) rescue nil

        return render status: 400 if payload.nil?
        user_id = payload[0]['user_id'] rescue nil

        user = User.find user_id 
        if user.nil?
            render status: 404
        else
            render json: {resource: user}
        end
    end
end
