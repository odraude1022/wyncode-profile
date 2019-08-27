class UsersController < ApplicationController
  before_action :set_user, only: [:show, :edit, :destroy]
  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      user_log_in @user
      respond_to do |format|
        format.html do
          redirect_to @user
        end
        format.json do
          render json: @user
        end
      end
    else
      respond_to do |format|
        format.html do
          redirect_to new_user_path,
          alert: @user.errors.full_messages.to_sentence
        end
        format.json do
          render json: { errors: @user.errors.full_messages }, status: 422
        end
      end
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
    set_user
  end

  def edit
    if @user != current_user
      redirect_to root_path
    end
  end

  def update
    @user = current_user
    if @user.update(user_params)
      redirect_to @user, notice: "Successfully updated profile"
    else
      redirect_to edit_user_path, alert: @user.errors.full_messages.to_sentence
    end
  end

  def destroy
    if @user == current_user
      @user.destroy
    end
    redirect_to root_path
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
