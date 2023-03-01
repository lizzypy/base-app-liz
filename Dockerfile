FROM ruby:3.2.0

RUN curl -fsSL https://deb.nodesource.com/setup_14.x | bash - && \
 apt-get install -y nodejs postgresql-client

RUN mkdir /myapp
COPY . /myapp

WORKDIR /myapp/frontend
RUN npm install && npm run build

WORKDIR /myapp

COPY Gemfile /myapp/Gemfile
COPY Gemfile.lock /myapp/Gemfile.lock

RUN bundle install


EXPOSE 3000
CMD ["./start.sh"]