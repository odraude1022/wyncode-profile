class UserSessionsController < ApplicationController
  def new
  end

  def create
    user = User.find_by(email: params[:session][:email].downcase)
    if user && user.authenticate(params[:session][:password])
      user_log_in user
      params[:session][:remember_me] == '1' ? user_remember(user) : user_forget(user)
      respond_to do |format|
        format.html do
          redirect_to user
        end
        format.json do
          render json: { user: user }
        end
      end
    else
      respond_to do |format|
        format.html do
          redirect_to login_path, alert: "Invalid email/password"
        end
        format.json do
          render json: { error: "Invalid email/password" }, status: 422
        end
      end
    end
  end

  def destroy
    user_log_out if user_logged_in?
    redirect_to root_url
  end
end
