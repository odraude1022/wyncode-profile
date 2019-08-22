# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

user_list = [
  ["Eduardo", "Iglesias", "eriglesias@ufl.edu", 32, "password", "password"],
  ["Rocio", "De Santiago", "rociodes4@hotmail.com", 33, "password", "password"],
  ["Thayna", "Santana", "thaynamenezes01@gmail.com", 31, "password", "password"],
  ["Gina", "De Santiago", "gina.gina@gina.gina", 34, "password", "password"]
]

user_list.each do |first_name, last_name, email, cohort, password, password_confirmation|
  User.create(first_name: first_name, last_name: last_name, email: email, cohort: cohort, password: password, password_confirmation: password_confirmation);
end
