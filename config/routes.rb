# config/routes.rb
Rails.application.routes.draw do
  root 'pages#home'
  get 'pages/home', to: 'pages#home'
  # Other routes
end
