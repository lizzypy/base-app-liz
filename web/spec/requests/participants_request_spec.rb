require 'rails_helper'

describe ParticipantsController, type: :request do

  describe "create" do
    let(:first_name) { "first" }
    let(:last_name) { "last" }
    let(:birthdate) { "2000-01-01" }
    let(:request) { post '/participants', params: { participant: {
      first_name: first_name,
      last_name: last_name,
      birthdate: birthdate,
    } } }
    let(:expected_response) { {
      "first_name" => first_name,
      "last_name" => last_name,
      "birthdate" => birthdate.to_s,
    } }

    it "should add a new participant and return response" do
      expect { request }.to change { Participant.count }.by 1
      expect(JSON.parse(response.body)).to include expected_response
    end
  end

  describe "index" do
    let!(:participant1) { create :participant }
    let!(:participant2) { create :participant }
    let(:request) { get '/participants' }

    it "returns all the participants" do
      request
      body = JSON.parse(response.body)
      expect(body.length).to eq 2
      expect(body.first["first_name"]).to eq participant1.first_name
    end
  end
end