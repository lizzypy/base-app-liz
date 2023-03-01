class HomeController < ApplicationController
  def index
    render file: 'public/static/index.html'
  end
end