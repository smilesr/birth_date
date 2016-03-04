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

def control
  birth_date = query_user
  week_day = find_day_of_week(birth_date)

  puts "You were born on a #{week_day}"
end

control
