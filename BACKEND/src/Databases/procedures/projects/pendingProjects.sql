CREATE PROCEDURE pendingProjects 
AS
BEGIN
	SELECT projectId,projectName,description,deadline, userId FROM dbo.PROJECTS WHERE status=0
END