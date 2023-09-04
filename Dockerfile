FROM ruby:3.2.0

RUN apt-get update -yqq \
    && apt-get install -yqq --no-install-recommends \
    postgresql-client

RUN curl -sL https://deb.nodesource.com/setup_16.x | bash - && apt install -y nodejs npm

RUN mkdir /myapp
COPY . /myapp

# Building the frontend assets from the frontend directory
# the project.json specifies a build path so they will be built into the /public/static directory and rails can serve them
# WORKDIR /myapp/frontend
# RUN npm install && npm run build
#
WORKDIR /myapp

COPY Gemfile /myapp/Gemfile
COPY Gemfile.lock /myapp/Gemfile.lock

RUN bundle install


EXPOSE 3000
CMD ["./start.sh"]
