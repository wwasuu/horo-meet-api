

deploy:
	gcloud config set project horomeet-api
	gcloud app deploy
browse:
	gcloud config set project horomeet-api
	gcloud app browse
logs:
	gcloud config set project horomeet-api
	gcloud app logs tail -s default