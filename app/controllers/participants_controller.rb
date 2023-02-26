class ParticipantsController < ApplicationController
  def index
    @participants = Participant.all
    render json: @participants.to_json
  end

  def create
    @participant = Participant.create(participant_params)
    render json: @participant.to_json
  end

  private
  def participant_params
    params.require(:participant).permit(:first_name, :last_name, :birthdate)
  end
end
