require 'sinatra'
require 'date'
require 'pry'
require 'nokogiri'
require 'open-uri'

get '/' do
  erb :index
end

post '/day_of_week' do
  days_of_week_hsh = { 1 => "Monday", 2 => "Tuesday", 3 =>"Wednesday", 4 => "Thursday", 5 => "Friday", 6 => "Saturday", 7 => "Sunday"}
  week_day_number = (Date.parse(params[:birthdate])).cwday
  @week_day = days_of_week_hsh[week_day_number]
  # @birthdate = params[:birthdate]

  # @week_day = days_of_week_hsh[birthdate.cwday]
  erb :day_of_week
end

post '/top_music' do
  birth_date = Date.parse(params[:birthdate])
  url_stub = "#{birth_date.strftime("%Y")}"
  url = "http://www.bobborst.com/popculture/number-one-songs-by-year/?y=#{url_stub}"
  doc = Nokogiri::HTML(open(url)) 
  targets = doc.xpath("/html/body/div[4]/div[4]/div[1]/div[1]/table/tbody/tr/td")
  # targets = doc.xpath("/html/body/div[4]/div[4]/div[1]/div[1]/table/tbody/tr/td['children'][1]['attributes']['value']")
    counter = 0
    found_song = false
    total = targets.length
    @song = ""
    until counter == total-1 || found_song == true
    # targets.each do |x|
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
end
