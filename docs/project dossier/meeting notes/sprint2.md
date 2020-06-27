## Tuesday, 2nd June 2020 - Week 5
Sprint planning and team meeting

	• Time: 10:00– 11:45
	• Attendees: Vladyslav Petrykov (Product Owner), Victor Hubbers, Tien Thai, Katarzyna Stróżykowska(Scrum Master), Vy Tran, Mark Kravchuk
	• Notes: 
		○ First of all, out Product Owner sent an email to Kris with a question what time should we have the Demo meeting and where (Blackboard or Microsoft Teams)
		○ We updated all the issues from the Sprint 1 (closed all finished issues).  We started planning the next Sprint and we decided to add new issues after meeting with client (Sprint review). The most important tasks for this Sprint are: 
			▪ Finish the API implementation – be able to request data from Parantion's database,
			▪ Implement socket.io
			▪ Discuss with the client how to store an image in database and implement it
			▪ Provide functionality for a timer
			▪ Finish the frontend for all pages
			▪ Connect our frontend with the API
			▪ Provide a consistent look for every page
		○ We prepared a presentation  for tomorrow's meeting with the client (Presentation made by Vladyslav and Katarzyna)
		○ Everyone is obliged to write a short Sprint retrospective and put it into our OneNote file.
	• Upcoming scheduled meetings: 
		○ Wednesday 3rd June 2020, daily stand-up at 10:00am
		○ Wednesday 3rd June 2020, meeting with Kris at 11:00am
			▪ Q: About the database, how to store a quiz.
			▪ Q: Unique account for every group
		○ Wednesday 3rd June 2020, meeting with client (Demo) probably at 14.30
			
	

## Tuesday, 2nd June 2020 - Week 5
Team meeting with coach

	• Time: 13:30 – 14:15
	• Attendees: Vladyslav Petrykov (Product Owner), Victor Hubbers, Tien Thai, Katarzyna Stróżykowska(Scrum Master), Vy Tran, Mark Kravchuk, Paul de Groot (coach)
	• Notes: 
		○ First of all we showed Paul our presentation and asked about feedback. Generally the presentation was good (we kept it short), but maybe we should inform the client, when he can ask us some questions. We should also be more specific about our planning for the next Sprint. Only one person should present the presentation (we chose our Product Owner), the rest of the team is going to make notes.
		○ Later on we discussed with Paul our technical and functional design. We should replace class diagram with 'components diagram', describe how different software's are going to work together and include API documentation in the technical design. 
	• Upcoming scheduled meetings: 
		○ Wednesday 3rd June 2002, meeting with client (Demo) probably at 14.30
			
			
## Wednesday, 3rd June 2020 - Week 5
Daily stand-up and meeting with the client 
	• Time: 10:00 – 12:00
	• Attendees: Vladyslav Petrykov (Product Owner), Victor Hubbers, Tien Thai, Katarzyna Stróżykowska(Scrum Master), Vy Tran, Mark Kravchuk
	• Notes: 
		○ During the first hour we discussed our planning for the next Sprint. We added issues to the GitLab and prioritized them.  This Sprint we are going to finish Frontend (3 pages), connect everything via Vuex, implement timer functionality, provide possibility to upload images/logos for quizzes/questions and make connections: Parantion's backend – our backend, our frontend- our backend.
		○ After that we had meeting with our client, we showed him the demo of the product. He was positive about our work, but we should improve our Frontend: one font for the text, only white color of the text with dark background, make the 'upload' button smaller, use only light or dark theme's colors
	• Upcoming scheduled meetings: 
		○ Wednesday 3rd June 2002, meeting with client (Demo) probably at 14.30


## Wednesday, 3rd June 2020 - Week 5
Sprint review and official DEMO for the client 

	• Time: 14:45 – 16:00
	• Attendees: Vladyslav Petrykov (Product Owner), Victor Hubbers, Tien Thai, Katarzyna Stróżykowska(Scrum Master), Vy Tran,  Paul de Groot (coach), 
	• Absent: Mark Kravchuk (internship interview)
	• Notes: 
		○ We made a presentation for the client, where we included all the issues done in Sprint 1, our planning for the next sprint and the demo of the product. The feedback from the client was positive. We should figure out how to make the application more attractive for the user, maybe we should include some rewards for the top players or make some 'global' ranking (for all players). 
		○ After the meeting with the client we discussed about a 'timing' functionality. There are two possible options to implement: a timer for every questions or one timer for the whole quiz. We decided to implement the timer for every questions, because we had already implement this functionality in our mock-ups.
	• Upcoming scheduled meetings: 
		○ Thursday 4rd June2002, meeting with coach at 9.15
		
		
## Thursday, 4th June 2020 - Week 5
Team meeting with coach

	• Time: 9.15 – 10:15
	• Attendees: Vladyslav Petrykov (Product Owner), Victor Hubbers, Tien Thai, Katarzyna Stróżykowska(Scrum Master), Vy Tran, Mark Kravchuk, Paul de Groot (coach)
	• Notes: 
		○ We discussed about the presentation. For the next 'Demo', we should 'surprise' client and prepare some creative ideas/features which we(or maintainers) could implement in the future. 
		○ Paul suggested that we should add weight to every issue on GitLab, so we created a Excel file, everyone could add a weight for a particular issue, we calculated the average and added to GitLab.
		
	• Upcoming scheduled meetings: 
		○ Saturday 6rd June 2002, backend team meeting  at 14.30
		○ Monday 8th June, standup meeting at 11.00


## Monday, 8th June 2020 - Week 6
Daily stand-up

	• Time: 11.00 – 12:00
	• Attendees: Vladyslav Petrykov (Product Owner), Victor Hubbers, Tien Thai, Katarzyna Stróżykowska(Scrum Master), Vy Tran, Mark Kravchuk
	• Notes: 
		○ Everyone showed the progress, we closed some issues on Gitlab and created merge requests. 
		○ The backend team still need some time to finish the API connection, write tests/documentation, but most of the request should be ready on Tuesday.
	• Upcoming scheduled meetings: 
		○ Tuesday 9th June 2002, meeting with the coach at 13.30


## Tuesday, 9th June 2020 - Week 6
Team meeting with coach

	• Time: 13.30 – 15:00
	• Attendees: Vladyslav Petrykov (Product Owner), Victor Hubbers, Tien Thai, Katarzyna Stróżykowska(Scrum Master), Vy Tran, Mark Kravchuk, Paul de Groot (coach)
	• Notes: 
		○ We showed Paul updated version of the frontend and discussed our plans for the coming days.
		○ We still have two big tasks to do  during this Sprint: connecting frontend with the backend and the implementation of web sockets. We decided that Mark is going to work on the websockets implementation and the rest of the team will concentrate on the connection between frontend and backend. 
		○ We discovered a new problem with the connection between frontend and backend -> probably the number of the tokens is limited, so we cannot fully tested the functionality of the application. Tomorrow we are going to talk with the client about this problem. 
	• Upcoming scheduled meetings: 
		○ Wednesday 10th June 2020, daily stand-up at 10:00am
		○ Wednesday 10th June 2020, meeting with Kris at 11:00am
		
## Wednesday, 10th June 2020 - Week 6
Stand up and meeting with the client

	• Time: 13.30 – 15:00
	• Attendees: Vladyslav Petrykov (Product Owner), Victor Hubbers, Tien Thai, Katarzyna Stróżykowska(Scrum Master), Vy Tran, Mark Kravchuk
	• Notes: 
		○ First we did stand up and we discussed the progress with the connection frontend-backend. 
		○ Mark gave a small presentation about websockets, how they work and how we should implement it
		○ After that we had a meeting with the client. We talked with him about our problem with login. Probably we blocked our account, because we provided too many times wrong password. The client said that he will reset the account for us. We also asked him some questions about getting results from their database, we explained to us about those requests.
	• Upcoming scheduled meetings: 
		○ Thursday 11th June 2020, meeting with Paul at 10:15am
	
	
## Thursday, 11th June 2020 - Week 6
Team meeting with coach and stand-up meeting

	• Time: 10.15 – 11.15
	• Attendees: Vladyslav Petrykov (Product Owner), Victor Hubbers, Tien Thai, Katarzyna Stróżykowska(Scrum Master), Vy Tran, Mark Kravchuk, Paul de Groot (coach)
	• Notes: 
		○ We must call to the company, because our login functionality still wasn't working (for one day we couldn't use our backend)
		○ When our account has been reset, we came back to our tasks (connection frontend-backend)
	• Upcoming scheduled meetings: 
		○ Friday 12th June 2020, stand-up meeting – not mandatory
		○ Saturday 13th June 2020, stand-up meeting – not mandatory
		○ Monday 15th June 2020, daily stand-up meeting

## Friday, 12th June 2020 - Week 6
Stand-up meeting

	• Time: 13.30-15.30
	• Attendees: Victor Hubbers, Tien Thai, Vy Tran, Mark Kravchuk
	• Absent: Katarzyna Strozykowska (work), Vladyslav Petrykov
	• Upcoming scheduled meetings: 
		○ Saturday 13th June 2020, stand-up meeting – not mandatory
		○ Monday 15th June 2020, daily stand-up meeting
		
		
## Saturday, 13th June 2020 - Week 6
Stand-up meeting

	• Time: 13.30-15.30
	• Attendees: Vladyslav Petrykov (Product Owner), Victor Hubbers, Tien Thai, Katarzyna Stróżykowska(Scrum Master), Vy Tran, Mark Kravchuk, Paul de Groot (coach)
	• Absent: Vladyslav Petrykov
	• Notes: 
		○ Everyone showed own progress
		○ We reviewed code, closed some user stories and merged branches to the 'develop' branch.
	• Upcoming scheduled meetings: 
		○ Monday 15th June 2020, daily stand-up meeting

