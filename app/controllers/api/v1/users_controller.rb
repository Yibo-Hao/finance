class Api::V1::UsersController < ApplicationController
    def show
        user = request.env[:current_user]
        if user.nil?
            render status: 404
        else
            render json: {resource: user}
        end
    end
end
