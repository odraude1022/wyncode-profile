class UsersController < ApplicationController
  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      user_log_in @user
      redirect_to @user
    else
      redirect_to new_user_path, alert: @user.errors.full_messages.to_sentence
    end
  end

  def index
  end

  def show
  end

  private

  def set_user
    @user = User.find(params[:id])
  end

  def user_params
    params.require(:user).permit(:first_name, :last_name, :email, :cohort,
                                 :password, :password_confirmation, :avatar)
  end
end
