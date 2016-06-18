require 'sinatra'
require 'date'
require 'pry'
require 'nokogiri'
require 'open-uri'

get '/' do
  erb :index
end

get '/day_of_week' do
  erb :day_of_week
end

post '/day_of_week' do
  days_of_week_hsh = { 1 => "Monday", 2 => "Tuesday", 3 =>"Wednesday", 4 => "Thursday", 5 => "Friday", 6 => "Saturday", 7 => "Sunday"}

  week_day_number = (Date.parse(params[:birthdate])).cwday
  @week_day = days_of_week_hsh[week_day_number]

  erb :day_of_week
end

get '/top_music' do
  erb :top_music
end

post '/top_music' do
  birth_date = Date.parse(params[:birthdate])
  url_stub = "#{birth_date.strftime("%Y")}"
  url = "http://www.bobborst.com/popculture/number-one-songs-by-year/?y=#{url_stub}"
  doc = Nokogiri::HTML(open(url)) 
  targets = doc.xpath("/html/body/div[4]/div[4]/div[1]/div[1]/table/tbody/tr/td")

  counter = 0
  found_song = false
  total = targets.length
  @song = ""
  until counter == total-1 || found_song == true

    x=targets[counter]
    range_start = 0
    range_end = 0
    if (x.children.text =~ !(/\A\d+\z/)) == 0 || x.children.length > 1
      range_start = Date.parse(x.children[1].attributes["datetime"].value)
      range_end = Date.parse(x.children[3].attributes["datetime"].value)
      if (range_start..range_end).cover?(birth_date)
        x=targets[counter + 1]
        @song = x.children.text
        found_song = true
      end 
    end

    counter +=1
  end

    
  erb :top_music
  
end


post '/historical_events' do
  birth_date = Date.parse(params[:birthdate])

  all_history = []
  url = "http://www.onthisday.com/events/date/#{birth_date.strftime("%Y")}/#{birth_date.strftime("%B")}/#{birth_date.strftime("%-d")}"
  
  doc = Nokogiri::HTML(open(url))
  targets = doc.xpath("html/body/main/article/div/ul")
    @all_history=[]
    if targets[0].attributes['class'].value == "content__list"
      send_file 'other.html'
    else   
      x=1
      historical_fact = targets[0].children.children[0]
      until historical_fact == nil
        @all_history << historical_fact.to_s
        historical_fact = targets[0].children.children[x] 
        x +=1
      end
    
    @all_history
    erb :all_history
    end
end

