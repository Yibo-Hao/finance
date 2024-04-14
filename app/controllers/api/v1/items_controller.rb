class Api::V1::ItemsController < ApplicationController
    def index
        page_number = params[:page] || 1
        per_page = params[:per_page] || 10
    
        items = Item.page(page_number).per(per_page)
        render json: {
            resources: items
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
