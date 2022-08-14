CREATE PROCEDURE pendingProjects 
AS
BEGIN
	SELECT projectId,projectName,description,deadline FROM dbo.PROJECTS WHERE userId IS NULL
END