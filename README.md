chat-counter-api

To deploy:

- Install Heroku CLI (and git if needed) 
	https://devcenter.heroku.com/articles/heroku-cli
- Fork repo
- Clone repo to local
- Open folder where you cloned the repo in terminal
- heroku create
- `git push heroku main`
- `heroku addons:create heroku-postgresql:hobby-dev`
- Go to the heroku dashboard and find your app:
	https://dashboard.heroku.com/
- Go to settings and 'Reveal Config Vars"
- Add a new config var called "API_KEY". Value can be whatever you want this will be used when you edit values in the frontend for the database.

Done! Hopefully.