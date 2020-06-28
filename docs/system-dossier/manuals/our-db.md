**Problems encountered**

1. The respondent&#39;s token retrieval reaches max attemp
2. Respondent can only post the answerIds and questionIds to the DB when we need an extra field for timing
3. The respondents with its retrieved tokens cannot view the set of questions and answers
4. It&#39;s too tricky for the respondents to view his/her own answers, and from there to get the result
5. The quiz master cannot view results of different respondents

**Solutions proposal**

1. Get the respondents easy to access to the quiz: Instead of token, we give then unique ids that is long enough for them to not be able to remember
2. Retrieve the questions and answers of a certain quiz using quiz master token → pass it to the state of the temp list that the respondents can get access to, but still remain impossible to know the quiz master&#39;s token
3. Build a temp database so that all needed information are stored and from that both quiz master and respondents can easily fetch the results

**Database schema and structure**

1. Tables:
  1. Respondents:
    - Purpose: This table is used to store the respondents information once they join a quiz. For privacy purposes, this data is subject to be deleted on a frequent basis or base on respondents wishes
    - Data structure:

id: TEXT value (Primary Key) - NOT NULL

displayName: TEXT value - NOT NULL

quizId: TEXT value - NOT NULL

id : this is the unique id of the respondents that will be generated automatically from our backend. Respondents will be identified solely based on this id

displayName : The input name/nickname from the respondents. Will be used later to show the result screens

quizId: the unique id of the quiz (tn value from Parantion&#39;s db), used to identified the quiz that the respondents are invited to join

  1. Responses
    - Purpose: This table is used to store all respondents&#39; answers to questions and quizzes. It&#39;s the key why we&#39;re designing a temp db, because through this table it&#39;s piece of cake to retrieve the results for both respondents and quiz masters.
    - Data structure:

uid: TEXT value (Foreign key to respondents.id) - NOT NULL

quizId: TEXT value - NOT NULL

questionTitle: TEXT value - NOT NULL

answerLabel: TEXT value - NOT NULL

time: INTEGER value - NOT NULL

correct: BOOLEAN value - NOT NULL

totalTime: INTEGER value - NOT NULL

score: INTEGER value - NOT NULL

uid this is the respondent&#39;s token. We used this to easily group the results to show for both respondents and quiz masters

quizId this is the id of the quiz that the respondents are invited to join. We know this is repetitive since this information is already stored in the respondents table, but with this value be present in this table, it&#39;s again easier to group results, remove data once done being used

questionTitle this is the question title that the respondent is answering to → instead of using id to referring, we use actual data for to convenience purpose

answerLabel this is the answer that the respondent give → instead of using id to referring, we use actual data for to convenience purpose

time the time that respondents take to answer the question

totalTime the total time given to a question

correct whether the respondent&#39;s answer is correct or not

score the calculated score (done in the backend) that the respondent gets for certain question based on his/her answer and taken time

**APIs related and tables&#39; usages**

1. POST APIs
  1. API to join the invited quiz (respondent) - data are store in the respondents table
  2. API to answer the questions (respondent) - data are stored in the responses table
2. GET APIs
  1. API to start the quiz (quizMaster) - data are quiz&#39;s info, questions, answers and are stored in the temp list inside our backend → make it accessible for respondents\
  2. API to get the result (respondent) - data are retrieved using the responses table, filtered by using the WHERE clause with the respondent&#39;s id
  3. API to get the list of result for a quiz (quizMaster) - data are retrieved using the responses table, filtered using the WHERE clause with the quizId
3. DELETE APIs
  1. API to delete the record inside responses table (quizMaster) - responses data related to a certain quiz will be deleted by quiz master of that quiz once the quiz is finished and the records are no longer needed. This way we make sure the table size will not getting too big and no duplication will be found when showing result

**Recommendation**

1. In term of stability
  - the quizList (temp) can be removed or updated with a different approach to minimized duplication or overwriting data
  
2. In term of scalability
  - The tables of responses and respondents could be further improved, so that repetitive keys and values are eliminated
  - The respondents&#39; id could be replaced using tokens with expired duration
  - The responses table should be cleared out or extend to be able to handle hundred of quizzes with thousands of responses → the sqlite db could be replace with more robust sql db, be hosted on its own server