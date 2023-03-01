Rails.application.routes.draw do
  get '/participants' => 'participants#index'
  post '/participants' => 'participants#create'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  root 'home#index'
end
