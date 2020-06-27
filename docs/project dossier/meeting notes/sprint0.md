## Wednesday, 6th May 2020 - Week 1
Sprint planning and team meeting

	• Time: 3:00pm - 4:15pm
	• Attendees: Vladyslav Petrykov (Product Owner), Tien Thai (scrum master), Katarzyna Strózykowska, Vy Tran, Victor Hubbers, Mark Kravchukyep
	• Notes: 
		1. All members of the team arrived on time and stayed until the end of the meeting
		2. Activity logs and topic of discussion 
			§ Addressed the problem concerning contact person in Parantion with Paul. In the end we decided to wait for the response and may have a potential meeting at 10am on Friday
			§ Product owner lead the meeting for 1 hour concerning questions to ask the client in the kickoff meeting. We also went through the possible questions from other team so that we could get the most out of the first meeting
			§ Scrum master took over the meeting for 15 minutes to split the tasks and todos in the PoA documentation. Everyone will take a task and report it later on the next meeting. The full assigned task per person will be discuss tomorrow
	• Upcoming scheduled meeting: Thursday 7th May 2020, from 8.30 am
	

## Thursday, 7th May 2020  
Team meeting

	• Time: 8:30am - 10.30am
	• Attendees: Vladyslav Petrykov (Product Owner), Tien Thai (scrum master), Katarzyna Strózykowska, Vy Tran, Victor Hubbers, Mark Kravchukyep
	• Notes: 
		1. All members of the team arrived on time and stayed until the end of the meeting
		2. Activity logs and topics of discussion 
			§ Questioned Paul concerning the sprint 0 deliverables ⇒ PoA is suffice, need to improve after the client meeting. Functional/Technical design are advised to prepare.
			§ Discussion on project planning using scrum methodology: Scrum poker would be convenient for defining user stories and priorities the tasks. The client could possibly ask about this, so we should be prepared
			§ 15 minutes break to read through the project start off documentation sent by the client
			§ Mark took over the meeting for 20 minutes to re-evaluate the questions for the client next meeting. Some of the questions are considered "already mentioned" in the doc. Some new questions came up. The latest version is updated in OneNote
			§ Product owner took over the meeting for 20 minutes to split the remaining sections that needs to be completed in the PoA. Some of the sections are possible to be done after reviewing the documentation from the client. Sections are assigned as follows: 
				□ Requirements management: Vladyslav
				□ User stories : Vladyslav
				□ Scope management (excluding "out of scope"): Vladyslav
			§ Discussion on requesting changing the meeting time every Thursday: All team members agree to set the meeting time at 9.30am instead of 8.30am
	• Upcoming scheduled meeting: 
		○ Client kick-off: Friday 8th May 2020, from 10 am. Link to collaboration session could be found in: https://eu.bbcollab.com/guest/4c10ffb9280544cea8d607722ff50e79
		○ Follow up meeting: Will be scheduled after the kick-off
		
##Saturday, 9th May 2020  
Team meeting

	• Time: 14:00pm - 16.00pm
	• Attendees: Vladyslav Petrykov (Product Owner), Tien Thai (scrum master), Katarzyna Strózykowska, Vy Tran, Victor Hubbers, Mark Kravchukyep
	• Notes: 
		1. All members of the team arrived on time and stayed until the end of the meeting
		2. Activity logs and topics of discussion 
			§ Review kickoff meeting with the client: Discussion on clients' requirements and desired functionalities for the app. The features on top priority vs the ones that don't need much work and attention. The discussion went on for roughly 40-45 minutes.
			§ Update on the team coach from the client's side: Chris
			§ Discussion on tasks and researches to be done + think of 20% extra features to be split among team members 
				□ Testing: Victor
				□ AWS: Vladyslav
				□ Research on solutions using websocket: Mark & Katarzyna
				□ Research on UI/UX: Tien & Vy
			§ Discussion on storing documentation and research paper for sprint 0 (current sprint) 
				□ A separate folder name "doc" in the master branch on gitlab repo: Assigned to Mark to create the folder
				□ A research folder inside the doc folder on master branch on gitlab repo: Assigned to Mark to create this folder
				□ The documentation storing on gitlab include: PoA (markdown version - converted by Tien), Research paper, project file and system file (will be discussed further)
				□ All documentation stored on gitlab are in markdown format
				□ The Technical and functional design will be uploaded in Microsoft Team, under tab "files" - assigned to Tien
			§ Discussion on schedule meeting with the client and arrange daily standup among team members: 
				□ Email the client to propose a weekly sync meetup : Thursday
				□ The daily stand up time and day are scheduled as below. The schedule was agreed by all the team members (each standup lasts at least 15 mins) 
					® Monday: 10am
					® Tuesday: 12.30pm
					® Wednesday: 10am
					® Thursday: 9.30am
			§ Discussion on separate the remaining sections from the PoA in the team. The tasks are divided as follow 
				□ Risk analysis: Katarzyna
				□ Objectives, secondary objectives and out of scope: Tien
				□ Requirements: Vladyslav ( with Victor and Katarzyna)
				□ User stories : Vladyslav (with Victor and Katarzyna)
				□ Product backlog (update): Vladyslav
			§ Discussion on separating the sections to finish the functional and technical design: The tasks are assigned as follow 
				1. Functional design 
					® Background of the client's company (including reasons to make the web):  Mark
					® functionalities and features: Victor & Katarzyna 
						◊ Ex: Users can login with (email and password)
					® Usecase diagram:  Vy
					® Mockup-wireframes: Tien & Vy
				2. Technical design 
					® Realize the infrastructure services: done! (to be put in the documentation) 
						◊ Web application
						◊ Optimize on mobile devices
					® Infrastructure: Victor
					® Required system software: done! (To be put in the documentation) 
						◊ Vuejs quasar, vuex: ES6
						◊ Websocket
						◊ SQL- non-SQL database
						◊ Nodejs
						◊ Gitlab (project management)
						◊ AWS for intergration?/Testing?/Db
						◊ Software for continuous deployment
						◊ API Doc
					® Class diagram //TODO (after the client email)
					® Database schema/design/structure //TODO (after the client email)
					® Manual (in the end of the project)
					® Relevant information regarding security, scripting, backups and monitoring: done! (to be put in the documentation) 
						◊ Security is not top priority
						◊ Each request to API will be made using oAuth2 access tokens
						◊ Passwords will be encrypted with md5 hashing algorithm
					® CI/CD:// TODO
	• Upcoming scheduled meeting: 
		○ Daily standup on Monday, 11th May from 10am
		○ Follow up meeting: Daily standup on Tuesday, 12th May from 12.30pm
	• Deliverable for sprint 0: 
		○ Deadline: Monday 18th May at 9.00am
		○ Hand-in: Updated PoA
