Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create, :show, :index]
    resources :friendships, only: [:create, :update, :destroy]
    resource :session, only: [:create, :destroy]
    resources :posts, only: [:create, :index, :update, :destroy]
    resources :comments, only: [:create, :index, :update, :destroy]
    resources :likes, only: [:create, :index, :destroy]
    get 'searches/:input', to: 'searches#search'
  end

  root "static_pages#root"
end
