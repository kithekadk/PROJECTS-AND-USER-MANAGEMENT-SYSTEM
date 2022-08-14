CREATE PROCEDURE completeProjects 
AS
BEGIN
	SELECT projectId,projectName,description,deadline FROM dbo.PROJECTS WHERE status= 1
END