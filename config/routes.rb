Rails.application.routes.draw do
  get 'hello_world', to: 'hello_world#index'
  root 'home#index'
  resources :users


  get '/login', to: 'user_sessions#new'
  post '/login', to: 'user_sessions#create'
  delete '/logout', to: 'user_sessions#destroy'

end
