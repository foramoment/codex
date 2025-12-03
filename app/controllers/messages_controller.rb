require "securerandom"

class MessagesController < ApplicationController
  before_action :ensure_username

  def index
    @message = Message.new(username: session[:username])
    @messages = Message.order(created_at: :asc).last(200)
  end

  def create
    @message = Message.new(message_params.merge(username: session[:username]))

    if @message.save
      respond_to do |format|
        format.turbo_stream
        format.html { redirect_to root_path }
      end
    else
      @messages = Message.order(created_at: :asc).last(200)
      render :index, status: :unprocessable_entity
    end
  end

  private

  def message_params
    params.require(:message).permit(:content)
  end

  def ensure_username
    session[:username] ||= "Гость#{SecureRandom.hex(3)}"
  end
end
