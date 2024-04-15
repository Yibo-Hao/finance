Rails.application.routes.draw do
  get '/', to: 'home#index'

  namespace :api do
    namespace :v1 do
      # /api/v1
      resources :validation_codes, only: [:create]
      resources :session, only: [:create, :destroy]
      resources :me, only: [:show]
      resources :tags
      resources :items
    end
  end
end