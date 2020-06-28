# Backend
				
1. The statistic page is a recommended feature that we've implemented for the frontend of the app, but still not yet for the backend. This page needs information about the quizzes, but these information depend on the responses table in our own database. What we would suggest is: In our backend, implement functions that keep track of the overall information needed for this page in a quiz in the responses api, and then update this information to the page where the quiz info is stored (form v5 or template v5):
    1. For example: In the statistic page, we keep track of how many people has participated in a certain quiz. This could be implemented by counting the number of respondents in the responses api file. Then do a request to update these figures to Parantion's db. That way, we make sure that even though our own DB will be cleaned up once in a while, the records we needed will not be removed.

2. [Our backend](../manuals/our-db.md) database recommendations could be found in "Recommendation" paragraph of the linked file.

3. Our tests only check the good case scenario, we haven't done tests for bad behaviour.

4. Try to archive 100 % lines coverage in a backend (server.js, routers folder).

5. Write websocket server code inside a separate file. Right now all the code for websocket server is inside main file because we didn't know how to write functionality from outers files.


# Frontend

1. statistic page API connection. The frontend is already there, but we didn't write any actions and APIs to that page.
  
2. adapt adding quiz page for the mobile phone screens.
   
3. forgot password function on the login screen doesn't have any functionality now so maybe you can develop it.

4. provide more customizability for the side-bar/statistic/quiz results page.

5. split pages into multiple component. A few pages were already split into multiple components, but we are sure it could be done more widely.
 
6. btn could be more interactive: some screen still have this awkward space, nothing happens when user interact with smt. Progress spinner or blurry background could help.

7. [Eslint recommendations](../manuals/eslint-manual.md) could be found in "Recommendations" paragraph of the linked file.

8. [Hosting recommendations](../manuals/hosting-manual.md) could be found in "Improvement" paragraph of the linked file.

9. [Vuex recommendations](../manuals/Vuex-manual.md) could be found in "Choices" paragraph of the linked file.

