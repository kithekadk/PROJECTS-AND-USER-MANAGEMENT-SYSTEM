CREATE PROCEDURE deleteProject (@projectName VARCHAR(200))
AS
BEGIN
IF EXISTS (SELECT projectId, ProjectName FROM dbo.PROJECTS WHERE projectName=@projectName)
BEGIN
	DELETE FROM PROJECTS WHERE projectName=@projectName;
	RETURN;
END
BEGIN
	RAISERROR('No Task With That Id', 11,1);
END
END