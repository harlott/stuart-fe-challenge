# stuart-fe-challenge

## INSTRUCTIONS

1) Create .env file and put your developer key, like in .env.example file
2) execute npm install;
3) execute npm start for development (http://localhost:8081) and npm run build for production bundle;
4) execute npm run serve if you want to run production bundle (http://localhost:8081) (after npm run build);

## IMPROVEMENTS
1) remove "only two addresses" rule;
2) A "Notes", a "Job Label" and a "Job code" fields on form to put them into marker title;
3) Marker icons related to the job (by react svg components) and not to pickup or dropoff address (in this way you could see on the maps all the pickup/dropff addressese represented by job code on icon, i.e "JOB1");
4) A button to create a list of prioritized jobs to execute based on pickup and dropoff addresses; every item of the list could have a button to show directions;

## WHAT I COULD DO BETTER
1) optimize the bundle;
2) react form handling to fix input labels behavior: I have used used react-hook-form since a year, and now I think it's not so cool after last upgrades;
3) marker svg icons;
5) documentation;
6) unit test;
7) cypress test;
8) add a linter;
9) this file layout style :(
  
