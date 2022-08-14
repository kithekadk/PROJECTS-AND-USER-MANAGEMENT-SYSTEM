CREATE PROCEDURE checkAssigned
AS
BEGIN
	SELECT projectId, projectName, description,deadline FROM dbo.PROJECTS p INNER JOIN dbo.USERS u ON u.userId = p.userId WHERE status=0
END