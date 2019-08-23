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
    set_users
    respond_to do |format|
      format.json do
        render json: { users: @users }
      end
    end
  end

  def show
  end

  private

  def set_user
    @user = User.find(params[:id])
  end

  def set_users
    @users = User.all.ordered
    if(params[:term] && params[:term] != '' && params[:term] != 'undefined')
      @users = @users.search(params[:term])
    end
    if(params[:cohort] && params[:cohort] != '' && params[:cohort] != 'undefined')
      @users = @users.cohort_search(params[:cohort].to_i)
    end
  end

  def user_params
    params.require(:user).permit(:first_name, :last_name, :email, :cohort,
                                 :password, :password_confirmation, :avatar)
  end
end
