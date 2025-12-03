class Message < ApplicationRecord
  broadcasts_to ->(_message) { "messages" }, inserts_by: :append

  validates :username, presence: true, length: { maximum: 50 }
  validates :content, presence: true, length: { maximum: 1000 }
end
