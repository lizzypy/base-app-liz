FROM ruby:3.2.0

# RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash - && \
#  apt-get install -y nodejs npm postgresql-client
RUN apt-get update
RUN apt-get install -y ca-certificates curl gnupg
RUN mkdir -p /etc/apt/keyrings
RUN curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg

ENV NODE_MAJOR=20
RUN echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" | tee /etc/apt/sources.list.d/nodesource.list

RUN apt-get update
RUN apt-get install nodejs -y

RUN mkdir /myapp
COPY . /myapp

# Building the frontend assets from the frontend directory
# the project.json specifies a build path so they will be built into the /public/static directory and rails can serve them
WORKDIR /myapp/frontend
RUN npm install --legacy-peer-deps && npm run build
#
WORKDIR /myapp

COPY Gemfile /myapp/Gemfile
COPY Gemfile.lock /myapp/Gemfile.lock

RUN bundle install


EXPOSE 3000
CMD ["./start.sh"]
