class Api::V1::ItemsController < ApplicationController
    def index
        current_user = request.env['current_user']
        return head :401 if current_user.nil?

        page_number = params[:page] || 1
        per_page = params[:per_page] || 10
    
        items = Item.limit(per_page).offset((page_number.to_i - 1) * per_page.to_i)
        render json: {
            resources: items,
            pager: {
                page_number: page_number,
                per_page: per_page,
                count: Item.count
            }
        }
    end

    def create
        item = Item.new amount: 1
        if item.save
            render json: {resource: item}
        else
            render json: {errors: item.errors}
        end
    end
end
