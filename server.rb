require 'sinatra' # gem install sinatra
require 'json'
require 'tilt/erb'

# Accessible via http://localhost:4567

get '/' do

  erb :index

end

post '/' do
  @birth_date = params['birth_date']
  
end
