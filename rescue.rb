require 'date'
require 'nokogiri'
require 'open-uri'
require 'pry'

def query_user
  valid_birth_date = nil
  
  until valid_birth_date
    puts "Tell me your birth date and I will tell you the day of the week on which you were born.  Use this format: YYYY-MM-DD"
    puts
    birth_date = gets.chomp
    valid_birth_date = valid_date(birth_date)  
  end

  return valid_birth_date

end

def valid_date(dt)
  begin
    valid_birth_date = Date.parse(dt)
  rescue Exception
    puts "that is invalid date"
    puts "please use following format: YYYY-MM-DD"
    valid_birth_date = nil
    return valid_birth_date
  end

  valid_birth_date = nil unless date_range?(valid_birth_date)
  return valid_birth_date
end

def date_range?(dt)
  oldest_person_info = get_oldest_person_info
   
  oldest_person_birthdate = Date.parse(oldest_person_info[1])
  valid_dates = (oldest_person_birthdate + 1)..Date.today

  if valid_dates.cover?(dt)
    return true
  else
    oldest_person_birthdate_strf = oldest_person_birthdate.strftime("%B %e %Y")
    print "That cannot be your birthdate or else you would be"
    if dt < oldest_person_birthdate
      print " older than "
      # puts "That can't be your birthday or else you'd be older than #{oldest_person_info[0]}, who is the oldest person in the world and was born on #{oldest_person_birthdate_strf}"
    elsif dt == oldest_person_birthdate
      print " the same age as "
      # puts "That can't be your birthday or else you'd be the same age as #{oldest_person_info[0]}, who is the oldest person in the world and was also born on #{oldest_person_birthdate_strf}"
    end
    puts "#{oldest_person_info[0]}, who is the oldest person in the world and was born on #{oldest_person_birthdate_strf}"
    return false
  end
end

def get_oldest_person_info
  doc = Nokogiri::HTML(open("https://en.wikipedia.org/wiki/Oldest_people"))

  target_person = doc.xpath("/html/body/div[3]/div[3]/div[4]/table[1]/tr[9]/td[2]/a")
  oldest_person = nil


  target_person.each do |target|
    oldest_person = target.attributes['title'].value

  end
  
  target_date = doc.xpath("/html/body/div[3]/div[3]/div[4]/table[1]/tr[9]/td[4]/span[2]")
    oldest_birthdate = target_date.text

  return oldest_person, oldest_birthdate
end


def find_day_of_week(birth_date)
  days_of_week_hsh = { 1 => "Monday", 2 => "Tuesday", 3 =>"Wednesday", 4 => "Thursday", 5 => "Friday", 6 => "Saturday", 7 => "Sunday"}
  week_day = days_of_week_hsh[birth_date.cwday]
  return week_day
end

def get_history(birth_date)
  
  all_history = []
  url = "http://www.onthisday.com/events/date/#{birth_date.strftime("%Y")}/#{birth_date.strftime("%B")}/#{birth_date.strftime("%-d")}"
  
  doc = Nokogiri::HTML(open(url))
  targets = doc.xpath("html/body/main/article/div/ul")
  # targets = doc.xpath("html/body/main/article/div[1]/ul")
  all_history=[]
  
  if targets[0].attributes['class'].value == "content__list"
  else
    
    x=1
    historical_fact = targets[0].children.children[0]
    until historical_fact == nil
      all_history << historical_fact.to_s
      historical_fact = targets[0].children.children[x] 
      x +=1
    end
  end
  
  return all_history
 # /html/body/main/article/div[1]/ul/li

end

def get_music(birth_date)

  url_stub = "#{birth_date.strftime("%Y")}"
  url = "http://www.bobborst.com/popculture/number-one-songs-by-year/?y=#{url_stub}"
  doc = Nokogiri::HTML(open(url)) 
  targets = doc.xpath("/html/body/div[4]/div[4]/div[1]/div[1]/table/tbody/tr/td")
  # targets = doc.xpath("/html/body/div[4]/div[4]/div[1]/div[1]/table/tbody/tr/td['children'][1]['attributes']['value']")
    counter = 0
    found_song = false
    total = targets.length
    song = ""
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
          song = x.children.text
          found_song = true
        end 
      end
      # dates = x.text
      # dates.strip!
      # dates_arr = dates.split(" \u{2013} ")
      # binding.pry
      # dates_arr = dates_arr.map {|y| Date.parse(y)}
      # date_range = (dates_arr[0]-1)..(dates_arr[1]+1)
      # covered = date_range.cover?(birth_date)
   
      # if covered == true
      #   song = x.following-sibling::['children'][0].text
      #   binding.pry

      # end
      counter +=1
    end
   

    
      # date_range = (Date.parse(x.children[1].attributes["datetime"].value))-1..(Date.parse(x.children[3].attributes["datetime"].value))+1
           
      # begin_date = x.children[1].attributes["datetime"].value


      #   end_date = x.children[3].attributes["datetime"].value
       
      #   begin_date_parsed = Date.parse(begin_date)
      #   begin_date_parsed_reduced = begin_date_parsed - 1
      #   end_date_parsed = Date.parse(end_date)
      #   end_date_parsed_increased = end_date_parsed + 1
      #   date_range = begin_date_parsed_reduced..end_date_parsed_increased

      #   y = date_range.cover?(birth_date)
      
      return song
  
end



  # [23] pry(main)> targets[0].children[1].attributes["datetime"].value
# => "1977-10-09"


def control
  birth_date = query_user
  week_day = find_day_of_week(birth_date)
  puts 
  puts "You were born on a #{week_day}"
  puts

  all_history = get_history(birth_date)
  if all_history[0] == nil
    puts "Nothing of historical significance happened on day you were born."
    puts
  else
    puts "Significant historical events that happened on your birthday include: "
    puts
    all_history.each do |x|
      puts x
      puts
    end
  end

  song = get_music(birth_date)
  puts "The number one song in the United States on your birthday was:"
  puts 
  puts song

end

control
