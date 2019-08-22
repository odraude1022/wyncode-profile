class User < ApplicationRecord
  has_secure_password
  validates :password, length: { minimum: 6 }, allow_nil: true
  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :cohort, presence: true
  validates :email, presence: true, uniqueness: true

  # Returns the hash digest of the given string.
  def User.digest(string)
    cost = ActiveModel::SecurePassword.min_cost ? BCrypt::Engine::MIN_COST :
                                                  BCrypt::Engine.cost
    BCrypt::Password.create(string, cost: cost)
  end

  # Returns a random token.
  def User.new_token
    SecureRandom.urlsafe_base64
  end

  #Remembers a user in the database for use in persistent sessions.
  def remember
    self.remember_token = User.new_token
    update_attribute(:remember_digest, User.digest(remember_token))
  end

 # Returns true if the given token matches the digest.
  def authenticated?(remember_token)
    return false if remember_digest.nil?
    BCrypt::Password.new(remember_digest).is_password?(remember_token)
  end

  # Forgets a user.
  def forget
    update_attribute(:remember_digest, nil)
  end

  scope :search,    ->  (term) { where("first_name ilike ? OR last_name ilike ?" , "%#{term}%", "%#{term}%") }
  scope :cohort_search, -> (c) {where("cohort = ?", "#{c}")}
  scope :ordered,   ->  { order(cohort: :desc) }

end
