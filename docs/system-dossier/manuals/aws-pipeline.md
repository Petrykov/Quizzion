## AWS Pipeline implementation manual

-  In this document, we’ll explain how we connected AWS Pipeline service from AWS to our “Quizzion“ project. 

-  Firstly, we synchronize the GitHub project with our GitLab one on which we develop the entire product. There’s a possibility that GitLab provides “Settings --> Repositories --> Mirroring Repositories”. Over there we specified a GitHub URL repository to which we want to synchronize out a project with the mirror direction of pull. After that, each time new data arrived on the GitLab repository, the GitHub one will notify that the source branch to which it synchronized was updated and is able to receive all data by pulling it from GitLab. While pull requests from the source branch there’s a possibility to choose a specific branch and to compare it to the existing one from the GitHub to see whether it’s needed to be pulled.

-  Secondly, to run the Pipelines we set 2 different services on AWS: “Code Build” was the first one where we wrote our build-spec file inside which we mentioned all the commands that should be executed each time new data arrived on GitHub repository. You can also keep track of “Build history” after each build there. And the second service is the “Pipeline” itself. There, we set the base URL of the project from “GitHub” and the “Code Build” project that we did earlier. By the time the “GitHub” project retrieves any change, “Pipeline” executes automatically and there’s a possibility to see how it was complete step by step by clicking on “Details” of the Build.
 
-  Thirdly, to explain the reason why we did it in such a hook through “GitHub” is that AWS didn’t give us access to use the “IAM user”. That was the only way to connect it directly from GitLab. After researching how it could be done differently, we found ourselves the way we explained in this document.

