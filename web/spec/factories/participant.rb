FactoryBot.define do
  factory :participant do
    first_name { "name1" }
    last_name { "name2" }
    birthdate { Date.today }
  end
end