Rails.application.routes.draw do
  get '/', to: 'home#index'

  namespace :api do
    namespace :v1 do
      # /api/v1
      resources :validation_codes, only: [:create]
      resources :sessions, only: [:create, :destroy]
      resources :users, only: [:show]
      resources :tags
      resources :items
    end
  end
end