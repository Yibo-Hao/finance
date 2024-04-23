class Api::V1::ValidationCodesController < ApplicationController
  def create
    one_minute_ago = Time.now - 1.minute
    return render status: 429 if ValidationCode.exists?(email: params[:email], kind: 'sign_in', created_at: one_minute_ago..Time.now)

    validation_code = ValidationCode.new email: params[:email], kind: 'sign_in'
    if validation_code.save
      render status: 200
    else
      render json: {errors: validation_code.errors}, status: 400
    end
  end
end
