## Monday, 15th  June 2020 - Week 7
Sprint planning and team meeting

	• Time: 11:00– 12:30
	• Attendees: Vladyslav Petrykov (Product Owner), Victor Hubbers, Tien Thai,
	 Katarzyna Stróżykowska, Vy Tran (scrum master), Mark Kravchuk
	• Notes: 
		○ First of all, out Product Owner sent an email to Kris with a question what time should we have the Demo meeting 
		and where (Blackboard or Microsoft Teams). We also asked him for a suggestion on how to get result from their 
		API but still not got his reply yet.
		○ We closed more than half of the issues  from the Sprint 2 and we still have around 6 issues related to API 
		connection:
			▪  API results- connection with frontend: We need to wait for reply from Kris to finish this task.
			▪ Web socket implementation: Mark did a demo on how we can implement web socket for the project. 
			But he was also busy with our own backend API on sprint 2 so we decided to move web socket deployment to sprint 3.
			▪ Implement timing functionality: we implemented time count down in frontend, but we need to include it in the web socket for fully functionality.
			▪ Frontend refinement: we added some animation to make the design looks nicer but they are still a bit buggy so we decided to move it to sprint 3 to make some other changes.
		○ We started planning the next Sprint. We also add new issues for sprint 3. We will have updates after meeting with client (Sprint review). The most important tasks for this Sprint are: 
			▪ Implement socket.io
			▪ Provide functionality for a timer.
			▪ AWS: integration and testing implementation.
			▪ Finish the frontend for all pages: podium and statistic screens
			▪ Fix some problems on connecting API for frontend and backend
			▪ Provide a consistent look for every page, split big pages into smaller components.
			▪ Documentation: update final changes for functional and technical design, API doc and researches.
		○ Everyone is obliged to write a short Sprint retrospective and put it into our OneNote file.
	• Upcoming scheduled meetings: 
		○ Tuesday 16th June 2020, daily stand-up at 10:00am
		○ Wednesday 17th June 2020, meeting with Kris at 11:00am
		○ Wednesday 17th June 2020, meeting with client (Demo) probably at 14.30


## Tuesday, 16th  June 2020 - Week 7
Team meeting with Paul

	• Time: 13:30-15:30
	• Attendees: Vladyslav Petrykov (Product Owner), Victor Hubbers, Tien Thai, Katarzyna Stróżykowska, Vy Tran (scrum master), Mark Kravchuk
	• Notes: 
		○ Vlad updated Paul the new plan for sprint 3, which includes:
			▪ Implement socket.io
			▪ Provide functionality for a timer.
			▪ AWS: integration and testing implementation.
			▪ Finish the frontend for all pages: podium and statistic screens
			▪ Fix some problems on connecting API for frontend and backend
			▪ Provide a consistent look for every page, split big pages into smaller components.
			▪ Documentation: update final changes for functional and technical design, API doc and researches.
		○ Mark showed Paul a basic demo for web socket implementation.
		○ Mark already finished implemented web socket for backend, and need to do more research on how to implement web socket for frontend.
		○ Tien created a local SQL database for result storages and will continue working on api for results. Vy will help Tien with this part.
		○ Katarzyna, Vy will also implement 2 new screens.
		○ Vlad, Victor will keep on working for their 20% part.
	• Upcoming scheduled meetings: 
		○ Wednesday 17th June 2020, meeting with Kris at 11:00am
		○ Thursday 18th June 2020, meeting with client (Demo) probably at 14.30

## Wednesday, 17th  June 2020 - Week 7
Daily stand up, client meeting, sprint 2 demo

	• Time: 13:30-15:30
	• Attendees: Vladyslav Petrykov (Product Owner), Victor Hubbers, Tien Thai, Katarzyna Stróżykowska, Vy Tran (scrum master), Mark Kravchuk
	• Notes: 
		○ Daily stand up
			• Victor made some unit test for frontend
			• Kasia created statistic dashboard page
			• Tien finished all the api for the result in respondent site, still have some bugs with api to get result lists for the moderator site.
			• Mark is still working on the websocket.
			• Vy helped Tien with api result and backend database.
		○ Client meeting
		We updated Kris that we will build our own database for the quiz results according to his suggestion. We also had some questions for him:
			1. How would we deliver the final products?
			Our final products and documentations should be included in a zip file.
			2. Any suggestion on what we should include for the sprint review?-> No
			3. Time for sprint 2 demo
			Kris sent the wrong date for the meeting demo on email.
		○ Sprint 2 demo
		The client gave big compliments about our design and demo presentation.
		They hope that they could see our group through video call for the final demo.
	• Upcoming scheduled meetings: 
		○ Thursday 18th June 2020, meeting with Paul and daily stand up

## Thursday , 18th  June 2020 - Week 7
Meeting with Paul, daily standup

	• Time:8:30-9:30
	• Attendees: Vladyslav Petrykov (Product Owner), Victor Hubbers, Tien Thai, Katarzyna Stróżykowska, Vy Tran (scrum master), Mark Kravchuk
	• Notes: 
		○ Questions for Paul:
			• Template for the technical design: Technical design should be more specific (for example why would we choose firebase instead of SQL for our backend)
		○ Daily stand up:
			• Tien and Victor finished the API results for respondent and connected with frontend.
			• Mark implemented simple web socket for frontend component, however there is some errors with timing so he could not run quiz from respondent perspective. He need to wait for changes from Victor to keep working on that.
			• Katarzyna and Vy are still working on statistic dashboard and podium screen
			• Katarzyna, Vlad and Victor are working on AWS integration and testing.
	• Upcoming scheduled meetings: 
		○ Saturday 20th June 2020, weeky sync

## Monday, 22nd  June 2020 - Week 8
Daily standup

	• Time:11:00-14:00
	• Attendees: Vladyslav Petrykov (Product Owner), Victor Hubbers, Tien Thai, Katarzyna Stróżykowska, Vy Tran (scrum master), Mark Kravchuk
	• Notes: 
		○ Daily stand up:
			• Mark finished web socket implementation. 
			• Katarzyna created configuration file for eslint for both frontend and backend
			• Vy finished connecting vuex for podium screen, but we agreed to add some animation and fix some components for it.
			• Victor worked on frontend refinements: added loading text, resize some components and added border to differentiate quizzes. He also looked at how to host frontend and backend product on AWS.
			• We merged and close web socket implementation, result api, frontend requirement and statistic dashboard branches.
	• Upcoming scheduled meetings: 
		○ Tuesday 23rd  June 2020, Daily stand up and meeting with Paul

## Tuesday, 23rd   June 2020 - Week 8
Daily standup

	• Time:13:30-15:00
	• Attendees: Vladyslav Petrykov (Product Owner), Victor Hubbers, Tien Thai, Katarzyna Stróżykowska, Vy Tran (scrum master), Mark Kravchuk
	• Notes: 
		○ Daily stand up:
			• Vlad created a project on github to connect with AWS development tools service for integration and testing.
			• Vy and Vlad was working on adding animations for Podium screen. The background need to be changed and score should be added below the name. The page should just be possible after all the players finishes the quiz.
			• Others are updating documents. 
	• Upcoming scheduled meetings: 
		○ Wednesday 24th   June 2020, Daily stand up and meeting with Kris

## Wednesday, 24th June 2020 - Week 8
Daily standup and meeting with Kris

	• Time:10:00-12:00
	• Attendees: Vladyslav Petrykov (Product Owner), Victor Hubbers, Tien Thai, Katarzyna Stróżykowska, Vy Tran (scrum master), Mark Kravchuk
	• Notes: 
		○ Daily stand up:
			• Vy refined Login page, Podium page
			• Katarzyna and Tien worked on API doc
			• Victor worked on updating technical design
			• Vlad is implementing aws ci from github project , need to check on how to run cypress and eslint.
		○ Meeting with Kris:
			• We played the quiz together with Kris, we also showed him the podium screen and some changes in frontend.
			• He thinks that we should also show the sprint review for the final review
			• We can deliver our product to Paration before the final demo.
			• He also thinks it would be nice if we change the color of the sidebar.
	• Upcoming scheduled meetings: 
		○ Thursday 25th June 2020, Daily stand up and meeting with Paul.

## Thursday, 25th June 2020 - Week 8
Daily standup and meeting with Kris

	• Time:11:00-15:00
	• Attendees: Vladyslav Petrykov (Product Owner), Victor Hubbers, Tien Thai, Katarzyna Stróżykowska, Vy Tran (scrum master), Mark Kravchuk
	• Notes: 
		○ Daily stand up:
			• We checked merge request and merges complete branches. Then we fixed errors for Eslint.
		○ Meeting with Paul:
		Recommendation from Paul: 
			• Using Eslint can cause many conflict when merging branches, but we decided to fix when everything is merged together.



