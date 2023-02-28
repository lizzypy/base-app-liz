Rails.application.routes.draw do
  get '/participants' => 'participants#index'
  post '/participants' => 'participants#create'

  root 'home#index'
end
